#!/usr/bin/env python3
"""
AVA GTM — Google Maps Scraper (FREE — replaces Apify)
Scrape business leads from Google Maps using Google's public Places API.

This scraper uses Google Maps' publicly accessible search results
to find businesses by category and location. 100% gratuit.

Usage:
    python3 scripts/google_maps_scraper.py --query "dentiste Paris" --limit 100
    python3 scripts/google_maps_scraper.py --verticale dentiste --ville Paris --limit 200
    python3 scripts/google_maps_scraper.py --config scripts/scrape_config.json
"""

import csv
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Google Maps search URL (no API key needed — public web search)
GOOGLE_MAPS_SEARCH_URL = "https://www.google.com/maps/search/{query}"

# Headers to mimic a real browser
BROWSER_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/121.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.5",
    "Accept-Encoding": "identity",
}

REQUEST_TIMEOUT = 15
DELAY_BETWEEN_REQUESTS = 2  # seconds — be respectful

# French cities to target
FRENCH_CITIES = [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes",
    "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes",
    "Reims", "Saint-Étienne", "Toulon", "Le Havre", "Grenoble",
    "Dijon", "Angers", "Nîmes", "Villeurbanne", "Clermont-Ferrand",
    "Le Mans", "Aix-en-Provence", "Brest", "Tours", "Amiens",
    "Limoges", "Perpignan", "Metz", "Besançon", "Orléans",
    "Rouen", "Mulhouse", "Caen", "Nancy", "Avignon",
]

# Verticale → Google Maps search queries
VERTICALE_QUERIES: dict[str, list[str]] = {
    "dentiste": ["dentiste", "cabinet dentaire", "chirurgien dentiste"],
    "medecin": ["médecin généraliste", "cabinet médical", "docteur"],
    "immobilier": ["agence immobilière", "immobilier"],
    "avocat": ["avocat", "cabinet d'avocat", "cabinet juridique"],
    "comptable": ["expert comptable", "cabinet comptable"],
    "formation": ["centre de formation", "organisme de formation", "école formation"],
    "coiffeur": ["salon de coiffure", "coiffeur"],
    "beaute": ["salon de beauté", "institut de beauté", "esthéticienne"],
    "restaurant": ["restaurant gastronomique", "restaurant étoilé"],
    "veterinaire": ["vétérinaire", "clinique vétérinaire"],
    "plombier": ["plombier", "plombier chauffagiste"],
    "electricien": ["électricien", "entreprise électricité"],
    "garage": ["garage automobile", "réparation automobile"],
    "auto_ecole": ["auto-école", "auto école"],
    "architecte": ["architecte", "cabinet d'architecture"],
    "kine": ["kinésithérapeute", "cabinet de kiné"],
    "osteopathe": ["ostéopathe", "cabinet ostéopathie"],
    "opticien": ["opticien", "lunettes"],
    "pharmacie": ["pharmacie"],
    "assurance": ["assurance", "cabinet assurance", "courtier assurance"],
}


@dataclass
class ScrapedBusiness:
    """A business scraped from Google Maps."""
    name: str = ""
    phone: str = ""
    website: str = ""
    address: str = ""
    city: str = ""
    category: str = ""
    rating: float = 0.0
    reviews: int = 0
    place_id: str = ""
    latitude: float = 0.0
    longitude: float = 0.0


# ---------------------------------------------------------------------------
# Google Maps HTML Parser
# ---------------------------------------------------------------------------

def extract_businesses_from_html(html: str, query: str, city: str) -> list[ScrapedBusiness]:
    """Extract business data from Google Maps search HTML."""
    businesses: list[ScrapedBusiness] = []

    # Google Maps embeds business data in JavaScript as JSON-like structures
    # Pattern 1: Extract from window.APP_INITIALIZATION_STATE or similar
    # Pattern 2: Extract from data attributes
    # Pattern 3: Regex on structured data patterns

    # Extract phone numbers
    phone_pattern = re.compile(r'(\+33[\s.-]?\d[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2})')
    phones_found = phone_pattern.findall(html)

    # Extract websites
    website_pattern = re.compile(r'https?://(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)')
    websites_found = website_pattern.findall(html)

    # Extract ratings (e.g., "4.5" near "avis" or "étoiles")
    rating_pattern = re.compile(r'(\d\.\d)\s*(?:étoiles|stars|sur\s*5)')

    # Extract business names from structured data
    # Google Maps uses a specific JSON structure we can parse
    name_patterns = [
        re.compile(r'\["([^"]{3,80})","[^"]*",\[(?:null|\d),(?:null|\d)'),
        re.compile(r'aria-label="([^"]{3,80})"'),
        re.compile(r'data-tooltip="([^"]{3,80})"'),
    ]

    # Parse the page for structured business data
    # Google Maps returns data in a complex nested array format
    # We look for patterns like: [null,null,["business_name",...]]

    # Try to find JSON-embedded data
    json_blocks = re.findall(r'\[\[\"(.*?)\"(?:,|\])', html[:500000])

    # Simpler approach: find all business-like entries
    # Google Maps HTML contains patterns like:
    # "BusinessName","address","phone"
    entry_pattern = re.compile(
        r'"([^"]{2,80})"[,\s]*"([^"]*(?:rue|avenue|boulevard|place|chemin|allée|impasse|cours|passage)[^"]*)"',
        re.IGNORECASE
    )

    entries = entry_pattern.findall(html[:500000])
    for name, address in entries[:50]:  # Limit to 50 per page
        if len(name) < 3 or len(name) > 80:
            continue
        # Skip non-business entries
        if any(skip in name.lower() for skip in ["google", "maps", "search", "javascript", "window"]):
            continue

        biz = ScrapedBusiness(
            name=name,
            address=address,
            city=city,
            category=query,
        )
        businesses.append(biz)

    # Also try to extract from structured arrays
    # Pattern: [null,[lat,lng],...,"business name",...,"address",...,"phone"]
    struct_pattern = re.compile(
        r'\[null,\[(-?\d+\.\d+),(-?\d+\.\d+)\].*?"([^"]{3,80})".*?"(\+33[^"]*)"',
        re.DOTALL
    )
    for match in struct_pattern.finditer(html[:500000]):
        lat, lng, name, phone = match.groups()
        biz = ScrapedBusiness(
            name=name,
            phone=phone.replace(" ", ""),
            city=city,
            category=query,
            latitude=float(lat),
            longitude=float(lng),
        )
        businesses.append(biz)

    return businesses


def search_google_maps(query: str, city: str) -> list[ScrapedBusiness]:
    """Search Google Maps for businesses and extract results."""
    search_term = f"{query} {city}"
    encoded = urllib.parse.quote(search_term)
    url = GOOGLE_MAPS_SEARCH_URL.format(query=encoded)

    req = urllib.request.Request(url, headers=BROWSER_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
            html = resp.read().decode("utf-8", errors="replace")
            return extract_businesses_from_html(html, query, city)
    except Exception as e:
        print(f"    Error searching '{search_term}': {e}")
        return []


# ---------------------------------------------------------------------------
# Alternative: Use Google Places Nearby Search (Text Search)
# This uses Google's public web endpoints, not the paid API
# ---------------------------------------------------------------------------

def search_via_serpapi_free(query: str, city: str) -> list[ScrapedBusiness]:
    """
    Alternative scraping approach using public search results.
    Parses Google search results for business info.
    """
    search_term = f"{query} {city} site:google.com/maps"
    encoded = urllib.parse.quote(search_term)
    url = f"https://www.google.com/search?q={encoded}&num=20&hl=fr"

    req = urllib.request.Request(url, headers=BROWSER_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
            html = resp.read().decode("utf-8", errors="replace")

        businesses: list[ScrapedBusiness] = []

        # Extract business names and details from Google search results
        # Pattern: business name in title tags
        title_pattern = re.compile(r'<h3[^>]*>([^<]+)</h3>')
        phone_pattern = re.compile(r'(\+33[\s.-]?\d[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2})')

        titles = title_pattern.findall(html)
        phones = phone_pattern.findall(html)

        for title in titles[:20]:
            if len(title) < 3 or any(skip in title.lower() for skip in ["google", "maps", "search"]):
                continue
            biz = ScrapedBusiness(
                name=title,
                city=city,
                category=query,
            )
            businesses.append(biz)

        # Try to match phones to businesses
        for i, phone in enumerate(phones):
            if i < len(businesses):
                businesses[i].phone = phone.replace(" ", "").replace(".", "")

        return businesses

    except Exception as e:
        print(f"    Error in Google search for '{query} {city}': {e}")
        return []


# ---------------------------------------------------------------------------
# Pages Jaunes Scraper (BEST FREE ALTERNATIVE)
# ---------------------------------------------------------------------------

def search_pages_jaunes(query: str, city: str) -> list[ScrapedBusiness]:
    """
    Scrape PagesJaunes.fr — the BEST free source for French businesses.
    Returns name, phone, address, website for each result.
    """
    encoded_query = urllib.parse.quote(query)
    encoded_city = urllib.parse.quote(city)
    url = f"https://www.pagesjaunes.fr/annuaire/chercherlespros?quoiqui={encoded_query}&ou={encoded_city}"

    req = urllib.request.Request(url, headers=BROWSER_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
            html = resp.read().decode("utf-8", errors="replace")

        businesses: list[ScrapedBusiness] = []

        # PagesJaunes uses structured HTML with clear patterns
        # Business name: class="denomination-links"
        # Phone: class="number-phone"
        # Address: class="adresse"
        # Website: class="pj-link" or href to external site

        # Extract business blocks
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(html, "html.parser")

        # Each business is in a <li> with class "bi-bloc"
        blocks = soup.find_all("div", class_="bi-content") or soup.find_all("li", class_="bi-bloc")

        if not blocks:
            # Fallback: try to find any business-like entries
            blocks = soup.find_all("div", {"data-pjlb": True})

        for block in blocks[:50]:
            biz = ScrapedBusiness(city=city, category=query)

            # Name
            name_el = (
                block.find("a", class_="denomination-links")
                or block.find("span", class_="denomination")
                or block.find("h2")
                or block.find("h3")
            )
            if name_el:
                biz.name = name_el.get_text(strip=True)

            # Phone
            phone_el = block.find("span", class_="number-phone") or block.find("a", {"data-pjlb": "tel"})
            if phone_el:
                biz.phone = phone_el.get_text(strip=True).replace(" ", "").replace(".", "")

            # Address
            addr_el = block.find("div", class_="adresse") or block.find("span", class_="adresse")
            if addr_el:
                biz.address = addr_el.get_text(strip=True)

            # Website
            for link in block.find_all("a", href=True):
                href = link["href"]
                if "pagesjaunes.fr" not in href and href.startswith("http"):
                    biz.website = href
                    break

            # Rating
            rating_el = block.find("span", class_="note")
            if rating_el:
                try:
                    biz.rating = float(rating_el.get_text(strip=True).replace(",", "."))
                except ValueError:
                    pass

            # Reviews count
            reviews_el = block.find("span", class_="nb-avis")
            if reviews_el:
                text = reviews_el.get_text(strip=True)
                nums = re.findall(r'\d+', text)
                if nums:
                    biz.reviews = int(nums[0])

            if biz.name and len(biz.name) > 2:
                businesses.append(biz)

        return businesses

    except ImportError:
        print("    [WARN] BeautifulSoup not available for PagesJaunes parsing")
        return []
    except Exception as e:
        print(f"    Error scraping PagesJaunes for '{query} {city}': {e}")
        return []


# ---------------------------------------------------------------------------
# Main Scraper Logic
# ---------------------------------------------------------------------------

def scrape_verticale(
    verticale: str,
    cities: list[str],
    limit_per_city: int = 50,
    source: str = "pagesjaunes",
) -> list[ScrapedBusiness]:
    """Scrape a verticale across multiple cities."""
    queries = VERTICALE_QUERIES.get(verticale, [verticale])
    all_businesses: list[ScrapedBusiness] = []
    seen_names: set[str] = set()

    total_queries = len(queries) * len(cities)
    done = 0

    for query in queries:
        for city in cities:
            done += 1
            print(f"  [{done}/{total_queries}] {query} — {city}...", end=" ")
            sys.stdout.flush()

            if source == "pagesjaunes":
                results = search_pages_jaunes(query, city)
            elif source == "google":
                results = search_google_maps(query, city)
            else:
                results = search_via_serpapi_free(query, city)

            new_count = 0
            for biz in results[:limit_per_city]:
                key = f"{biz.name}|{biz.city}".lower()
                if key not in seen_names:
                    seen_names.add(key)
                    all_businesses.append(biz)
                    new_count += 1

            print(f"+{new_count} leads")
            sys.stdout.flush()

            # Rate limiting
            time.sleep(DELAY_BETWEEN_REQUESTS)

    return all_businesses


def export_leads_csv(businesses: list[ScrapedBusiness], output_path: str) -> None:
    """Export scraped businesses to CSV."""
    fieldnames = [
        "title", "phone", "website", "category", "city",
        "address", "rating", "reviews", "place_id",
    ]

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()

        for biz in businesses:
            writer.writerow({
                "title": biz.name,
                "phone": biz.phone,
                "website": biz.website,
                "category": biz.category,
                "city": biz.city,
                "address": biz.address,
                "rating": biz.rating,
                "reviews": biz.reviews,
                "place_id": biz.place_id,
            })

    print(f"\n[Export] {len(businesses)} leads → {output_path}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="AVA GTM — Google Maps Scraper (FREE)")
    parser.add_argument("--verticale", type=str, help="Verticale to scrape (e.g., dentiste, avocat)")
    parser.add_argument("--ville", type=str, help="Single city to scrape")
    parser.add_argument("--villes", type=int, default=10, help="Number of top cities to scrape (default: 10)")
    parser.add_argument("--limit", type=int, default=50, help="Max leads per city per query")
    parser.add_argument("--source", type=str, default="pagesjaunes", choices=["pagesjaunes", "google", "search"], help="Data source")
    parser.add_argument("--output", type=str, default="scripts/scraped-leads.csv", help="Output CSV path")
    parser.add_argument("--list-verticales", action="store_true", help="List available verticales")
    parser.add_argument("--config", type=str, help="JSON config file for batch scraping")
    args = parser.parse_args()

    print("=" * 60)
    print("  AVA GTM — GOOGLE MAPS SCRAPER (FREE)")
    print("  No Apify. No API key. 100% gratuit.")
    print("=" * 60)

    if args.list_verticales:
        print("\nVerticales disponibles :")
        for v, queries in sorted(VERTICALE_QUERIES.items()):
            print(f"  {v:20s} : {', '.join(queries)}")
        return

    # Config file mode
    if args.config:
        with open(args.config) as f:
            config = json.load(f)
        all_leads: list[ScrapedBusiness] = []
        for job in config.get("jobs", []):
            verticale = job["verticale"]
            cities = job.get("villes", FRENCH_CITIES[:args.villes])
            limit = job.get("limit", args.limit)
            print(f"\n[Job] Scraping {verticale} in {len(cities)} cities...")
            leads = scrape_verticale(verticale, cities, limit, args.source)
            all_leads.extend(leads)
        export_leads_csv(all_leads, args.output)
        return

    # Single verticale mode
    if not args.verticale:
        print("[ERROR] Specify --verticale (e.g., --verticale dentiste)")
        print("  Use --list-verticales to see all options")
        sys.exit(1)

    cities = [args.ville] if args.ville else FRENCH_CITIES[:args.villes]

    print(f"\n[Config] Verticale: {args.verticale}")
    print(f"[Config] Cities: {', '.join(cities)}")
    print(f"[Config] Source: {args.source}")
    print(f"[Config] Limit per city: {args.limit}")
    print()

    leads = scrape_verticale(args.verticale, cities, args.limit, args.source)

    # Export
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    export_leads_csv(leads, str(output))

    # Summary
    with_phone = sum(1 for l in leads if l.phone)
    with_website = sum(1 for l in leads if l.website)
    print(f"\n{'='*60}")
    print(f"  SCRAPING COMPLETE")
    print(f"{'='*60}")
    print(f"  Total leads:    {len(leads)}")
    print(f"  With phone:     {with_phone} ({100*with_phone/max(len(leads),1):.0f}%)")
    print(f"  With website:   {with_website} ({100*with_website/max(len(leads),1):.0f}%)")
    print(f"  Output:         {args.output}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
