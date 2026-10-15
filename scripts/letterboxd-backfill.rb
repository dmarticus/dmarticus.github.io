#!/usr/bin/env ruby
# Give every movie in the archive a Letterboxd link.
#
# Usage: ruby scripts/letterboxd-backfill.rb [--dry-run]
#
# Movies that appear in the account's public "films watched" list get the
# diary link (letterboxd.com/<user>/film/<slug>/). Anything else gets the
# plain film page, found by guessing the slug from the title and checking the
# page's og:title. The file is edited entry by entry as text so the header
# comments and existing formatting survive. Titles that still match nothing
# are listed at the end.

require "net/http"
require "uri"
require "yaml"
require "cgi"
require "date"

USERNAME = "dmarticus"
USER_AGENT = "Mozilla/5.0 (dylanamartin.com reading-log)"
LOG_PATH = File.join(File.expand_path("..", __dir__), "_data", "log.yml")
DRY_RUN = ARGV.include?("--dry-run")

# Logged titles whose Letterboxd slug can't be derived from the title.
ALIASES = {
  "French Dispatch" => %w[the-french-dispatch-of-the-liberty-kansas],
  "The Life Aquatic with Steven Zissou" => %w[the-life-aquatic-with-steve-zissou],
  "Dune 2" => %w[dune-part-two],
}

def http_get(url)
  uri = URI.parse(url)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.open_timeout = 15
  http.read_timeout = 20
  res = http.get(uri.request_uri, { "User-Agent" => USER_AGENT })
  return nil unless res.is_a?(Net::HTTPSuccess)
  res.body.force_encoding(Encoding::UTF_8).scrub
end

def norm(title)
  title.to_s.unicode_normalize(:nfkd).gsub(/\p{Mn}/, "").downcase
    .gsub(/\(.*?\)/, "")
    .gsub(/[’']/, "")
    .gsub(/&/, "and")
    .gsub(/[^a-z0-9]+/, " ").strip
end

def slugify(title)
  norm(title).gsub(" ", "-")
end

# Confirm a film page exists and is (close enough to) the film we think it is.
def verify(slug, title)
  html = http_get("https://letterboxd.com/film/#{slug}/")
  return false unless html
  return true if ALIASES.fetch(title, []).include?(slug) # a hand-picked slug only needs to exist
  og = CGI.unescapeHTML(html[/<meta property="og:title" content="([^"]*)"/, 1].to_s)
  og = norm(og.sub(/\s*\(\d{4}\)\s*\z/, ""))
  mine = norm(title)
  og == mine || og.include?(mine) || mine.include?(og)
end

def guess_slug(entry)
  title = entry["title"]
  candidates = (ALIASES[title] || []) + [slugify(title)]
  candidates << "#{slugify(title)}-#{entry["year"]}" if entry["year"]
  # Letterboxd suffixes the year when a title is shared; try recent years.
  candidates += (2015..2026).map { |y| "#{slugify(title)}-#{y}" }
  candidates.uniq.each do |slug|
    return slug if verify(slug, title)
    sleep 0.3
  end
  nil
end

# slug => title from the watched list
watched = {}
page = 1
loop do
  html = http_get("https://letterboxd.com/#{USERNAME}/films/page/#{page}/")
  break unless html
  pairs = html.scan(%r{data-target-link="/film/([^"/]+)/".*?alt="([^"]*)"}m)
  break if pairs.empty?
  pairs.each { |slug, title| watched[slug] ||= CGI.unescapeHTML(title) }
  page += 1
  sleep 0.5
end
warn "#{watched.size} films in the watched list"

by_title = Hash.new { |h, k| h[k] = [] }
watched.each { |slug, title| by_title[norm(title)] << slug }

text = File.read(LOG_PATH)
chunks = text.split(/^(?=- )/)
diary = 0
film_pages = 0
missing = []

chunks.map! do |chunk|
  next chunk unless chunk.start_with?("- ")
  entry = YAML.safe_load(chunk, permitted_classes: [Date]).first rescue nil
  next chunk unless entry && entry["type"] == "movie" && !entry["letterboxd"]

  slugs = by_title[norm(entry["title"])]
  url =
    if slugs.any?
      slug = slugs.find { |s| entry["year"] && s.end_with?("-#{entry["year"]}") } || slugs.first
      diary += 1
      "https://letterboxd.com/#{USERNAME}/film/#{slug}/"
    elsif (slug = guess_slug(entry))
      film_pages += 1
      "https://letterboxd.com/film/#{slug}/"
    end

  if url
    chunk.chomp + "\n  letterboxd: #{url}\n"
  else
    missing << entry["title"]
    chunk
  end
end

File.write(LOG_PATH, chunks.join) unless DRY_RUN
puts "diary links: #{diary}, film pages: #{film_pages}#{DRY_RUN ? ' (dry run)' : ''}"
unless missing.empty?
  puts "no match for #{missing.size}:"
  missing.each { |t| puts "  - #{t}" }
end
