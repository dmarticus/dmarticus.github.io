#!/usr/bin/env ruby
# Turn open `log`-labeled issues into archive entries and a seeded digest draft.
#
# Usage: ruby scripts/weekly-log.rb issues.json
# where issues.json is `gh issue list -l log --state open --json number,title,body,createdAt`
#
# Issue title conventions:
#   https://...                a link (title is fetched from the page)
#   book: Title — Author       a book; also movie:, show:, album:, podcast:, etc.
#   anything else              logged as-is with type "misc"
# The issue body is the note/review. It may start with a rating — "4/5",
# "4.5/5", or "★★★★½" — which is stored separately.
#
# Appends to _data/log.yml, writes _digest/<date>-week-of-<...>.md, and emits
# `count`, `closes`, and `digest_path` GitHub Actions outputs.

require "json"
require "yaml"
require "net/http"
require "uri"
require "cgi"
require "time"

REPO_ROOT = File.expand_path("..", __dir__)
LOG_PATH = File.join(REPO_ROOT, "_data", "log.yml")

def fetch_page_title(url, limit = 5)
  return nil if limit.zero?
  uri = URI.parse(url)
  return nil unless %w[http https].include?(uri.scheme)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = uri.scheme == "https"
  http.open_timeout = 10
  http.read_timeout = 10
  response = http.get(uri.request_uri, { "User-Agent" => "dylanamartin.com reading-log bot" })

  case response
  when Net::HTTPRedirection
    location = URI.join(url, response["location"]).to_s
    fetch_page_title(location, limit - 1)
  when Net::HTTPSuccess
    body = response.body.force_encoding(Encoding::UTF_8).scrub
    match = body.match(%r{<title[^>]*>(.*?)</title>}mi)
    match && CGI.unescapeHTML(match[1].strip.gsub(/\s+/, " "))
  end
rescue StandardError
  nil
end

def parse_link(url, date, note)
  uri = URI.parse(url)
  host = uri.host.to_s.sub(/\Awww\./, "")
  entry = { "date" => date, "title" => nil, "url" => url, "note" => note }

  case host
  when "x.com", "twitter.com"
    entry["type"] = "tweet"
    user = uri.path.split("/").reject(&:empty?).first
    entry["title"] = user ? "@#{user} on X" : "Post on X"
  when "youtube.com", "youtu.be"
    entry["type"] = "video"
    entry["title"] = fetch_page_title(url) || host
  else
    entry["type"] = "article"
    entry["title"] = fetch_page_title(url) || host
  end
  entry
end

def parse_typed(type, rest, date, note)
  title, creator = rest.split(/\s+—\s+|\s+–\s+|\s+-\s+/, 2)
  if creator.nil? && title =~ /\A(.+)\s+by\s+(.+)\z/i
    title, creator = Regexp.last_match(1), Regexp.last_match(2)
  end
  entry = { "date" => date, "type" => type, "title" => title.strip }
  entry["creator"] = creator.strip if creator
  entry["note"] = note
  entry
end

def parse_rating(note)
  return [nil, note] unless note

  if note =~ %r{\A(\d(?:\.\d)?)\s*/\s*5\b[\s—–:,-]*}
    [Regexp.last_match(1).to_f, note[Regexp.last_match(0).length..]]
  elsif note =~ /\A(★{1,5})(½)?[\s—–:,-]*/
    [Regexp.last_match(1).length + (Regexp.last_match(2) ? 0.5 : 0.0), note[Regexp.last_match(0).length..]]
  else
    [nil, note]
  end
end

def stars(rating)
  "★" * rating.floor + (rating % 1 >= 0.5 ? "½" : "")
end

def parse_issue(issue)
  raw = issue["title"].strip
  note = issue["body"].to_s.strip
  note = nil if note.empty?
  rating, note = parse_rating(note)
  note = nil if note && note.strip.empty?
  note = note.strip if note
  date = issue["createdAt"][0, 10]

  entry =
    if raw =~ %r{\Ahttps?://}
      parse_link(raw, date, note)
    elsif raw =~ /\A(\w+):\s*(.+)\z/
      parse_typed(Regexp.last_match(1).downcase, Regexp.last_match(2), date, note)
    else
      { "date" => date, "type" => "misc", "title" => raw, "note" => note }
    end
  entry["rating"] = rating if rating
  entry = entry.compact
  # Normalize key order so appended YAML matches the existing file's shape.
  ordered = %w[date type title url creator rating note].each_with_object({}) do |key, acc|
    acc[key] = entry[key] if entry.key?(key)
  end
  ordered.merge("issue" => issue["number"])
end

def digest_bullet(entry)
  rating = entry["rating"] ? " #{stars(entry["rating"])}" : ""
  note = entry["note"] ? " — #{entry["note"]}" : ""
  if entry["url"]
    "* [#{entry["title"]}](#{entry["url"]})#{note}"
  elsif entry["creator"]
    "* *#{entry["title"]}* by #{entry["creator"]} (#{entry["type"]})#{rating}#{note}"
  else
    "* #{entry["title"]} (#{entry["type"]})#{rating}#{note}"
  end
end

def set_output(key, value)
  if ENV["GITHUB_OUTPUT"]
    File.open(ENV["GITHUB_OUTPUT"], "a") { |f| f.puts "#{key}=#{value}" }
  end
  puts "#{key}=#{value}"
end

issues = JSON.parse(File.read(ARGV.fetch(0)))
if issues.empty?
  set_output("count", 0)
  exit
end

entries = issues.map { |issue| parse_issue(issue) }.sort_by { |e| e["date"] }
issue_numbers = entries.map { |e| e.delete("issue") }

# Append to the archive. Plain text append (not a YAML round-trip) so the
# file's comments and existing formatting survive.
yaml = entries.to_yaml.sub(/\A---\n/, "")
File.write(LOG_PATH, File.read(LOG_PATH).chomp + "\n" + yaml)

# Seed the digest draft for this week.
today = Time.now.utc
week_start = today - 6 * 86_400
slug = "#{today.strftime("%Y-%m-%d")}-week-of-#{week_start.strftime("%B-%-d").downcase}"
digest_path = File.join(REPO_ROOT, "_digest", "#{slug}.md")

File.write(digest_path, <<~DIGEST)
  ---
  title: "Week of #{week_start.strftime("%B %-d, %Y")}"
  layout: post
  tags: []
  summary: "TODO: a sentence or two about this week's highlights. Trim the list below to the favorites and punch up the notes — or delete this file from the PR to skip the digest this week."
  ---

  #{entries.map { |e| digest_bullet(e) }.join("\n")}
DIGEST

set_output("count", entries.length)
set_output("closes", issue_numbers.map { |n| "Closes ##{n}" }.join(", "))
set_output("digest_path", digest_path.sub("#{REPO_ROOT}/", ""))
