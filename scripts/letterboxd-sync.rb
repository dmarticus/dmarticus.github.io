#!/usr/bin/env ruby
# Pull new Letterboxd diary entries into the reading-log archive.
#
# Usage: ruby scripts/letterboxd-sync.rb [--dry-run]
#
# Reads the public RSS feed for the account below, skips anything already in
# _data/log.yml, looks up the director from the film page, and appends the
# rest as `movie` entries. Emits a `count` GitHub Actions output.
#
# Entry shape (matches the hand-logged movies, plus a few Letterboxd fields):
#   - date: '2026-10-13'          # the watched date, not the posting date
#     type: movie
#     title: Digger
#     year: 2026
#     creator: Alejandro G. Iñárritu
#     rating: 4.0
#     note: the review, paragraphs joined with blank lines
#     letterboxd: https://letterboxd.com/dmarticus/film/digger-2026/
#     rewatch: true               # only when true
#     spoilers: true              # only when the review is flagged on Letterboxd

require "net/http"
require "uri"
require "rexml/document"
require "yaml"
require "cgi"
require "time"

USERNAME = "dmarticus"
FEED_URL = "https://letterboxd.com/#{USERNAME}/rss/"
USER_AGENT = "dylanamartin.com reading-log bot (+https://www.dylanamartin.com)"
REPO_ROOT = File.expand_path("..", __dir__)
LOG_PATH = File.join(REPO_ROOT, "_data", "log.yml")
DRY_RUN = ARGV.include?("--dry-run")

def http_get(url, limit = 5)
  raise "too many redirects for #{url}" if limit.zero?
  uri = URI.parse(url)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = uri.scheme == "https"
  http.open_timeout = 15
  http.read_timeout = 20
  response = http.get(uri.request_uri, { "User-Agent" => USER_AGENT })
  case response
  when Net::HTTPRedirection then http_get(URI.join(url, response["location"]).to_s, limit - 1)
  when Net::HTTPSuccess then response.body.force_encoding(Encoding::UTF_8).scrub
  else raise "#{response.code} for #{url}"
  end
end

def text_of(item, name)
  node = item.elements[name]
  node && node.text && node.text.strip
end

# Turn the review HTML into plain paragraphs. Letterboxd prepends the poster
# and, for bare diary entries, a "Watched on ..." line; neither is a note.
def clean_note(html)
  return nil if html.nil?
  body = html.gsub(%r{<p>\s*<img[^>]*>\s*</p>}i, "")
  body = body.gsub(%r{<p>\s*<em>This review may contain spoilers\.</em>\s*</p>}i, "")
  paragraphs = body.scan(%r{<p>(.*?)</p>}mi).flatten.map do |p|
    CGI.unescapeHTML(p.gsub(%r{<br\s*/?>}i, "\n").gsub(/<[^>]+>/, "")).strip
  end
  paragraphs.reject! { |p| p.empty? || p =~ /\AWatched on .+\d{4}\.\z/ }
  paragraphs.empty? ? nil : paragraphs.join("\n\n")
end

def fetch_director(entry_url)
  film_url = entry_url.sub(%r{letterboxd\.com/#{USERNAME}/film/}, "letterboxd.com/film/")
  page = http_get(film_url)
  label = page[/<meta name="twitter:label1" content="([^"]*)"/, 1]
  data = page[/<meta name="twitter:data1" content="([^"]*)"/, 1]
  label == "Directed by" && data ? CGI.unescapeHTML(data) : nil
rescue StandardError => e
  warn "director lookup failed for #{film_url}: #{e.message}"
  nil
end

def parse_feed(xml)
  doc = REXML::Document.new(xml)
  doc.elements.to_a("//item").filter_map do |item|
    title = text_of(item, "letterboxd:filmTitle")
    next unless title # list activity and other non-diary items

    html = item.elements["description"]
    html = html && html.cdatas.map(&:value).join
    html = text_of(item, "description") if html.nil? || html.empty?

    entry = {
      "date" => text_of(item, "letterboxd:watchedDate") || Time.parse(text_of(item, "pubDate")).strftime("%Y-%m-%d"),
      "type" => "movie",
      "title" => CGI.unescapeHTML(title),
      "year" => text_of(item, "letterboxd:filmYear")&.to_i,
      "rating" => text_of(item, "letterboxd:memberRating")&.to_f,
      "note" => clean_note(html),
      "letterboxd" => text_of(item, "link"),
    }
    entry["rewatch"] = true if text_of(item, "letterboxd:rewatch") == "Yes"
    entry["spoilers"] = true if html.to_s =~ /This review may contain spoilers/i
    entry.compact
  end
end

def norm(title)
  title.to_s.downcase.gsub(/[^a-z0-9]+/, " ").strip
end

# An entry is already logged if its Letterboxd URL is in the archive, or if a
# movie with the same title was logged on the same date (or, for backfilled
# year-only entries, in the same year).
def already_logged?(entry, existing)
  existing.any? do |e|
    next true if e["letterboxd"] && e["letterboxd"] == entry["letterboxd"]
    next false unless e["type"] == "movie" && norm(e["title"]) == norm(entry["title"])
    e["date"].to_s == entry["date"] || (e["date"].to_s.length == 4 && e["date"].to_s == entry["date"][0, 4])
  end
end

def set_output(key, value)
  File.open(ENV["GITHUB_OUTPUT"], "a") { |f| f.puts "#{key}=#{value}" } if ENV["GITHUB_OUTPUT"]
  puts "#{key}=#{value}"
end

existing = YAML.safe_load(File.read(LOG_PATH), permitted_classes: [Date]) || []
feed_entries = parse_feed(http_get(FEED_URL))
new_entries = feed_entries.reject { |e| already_logged?(e, existing) }.sort_by { |e| [e["date"], e["title"]] }

if new_entries.empty?
  set_output("count", 0)
  exit
end

new_entries.each do |entry|
  director = fetch_director(entry["letterboxd"])
  entry["creator"] = director if director
  sleep 1 unless DRY_RUN
end

ordered = new_entries.map do |entry|
  %w[date type title year creator rating note letterboxd rewatch spoilers].each_with_object({}) do |key, acc|
    acc[key] = entry[key] if entry.key?(key)
  end
end

yaml = ordered.to_yaml.sub(/\A---\n/, "")
if DRY_RUN
  puts yaml
else
  # Plain text append so the file's comments and existing formatting survive.
  File.write(LOG_PATH, File.read(LOG_PATH).chomp + "\n" + yaml)
end

set_output("count", ordered.length)
set_output("titles", ordered.map { |e| e["title"] }.join(", "))
