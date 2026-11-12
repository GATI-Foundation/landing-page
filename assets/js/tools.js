/* ============================================================================
   TOOLS REGISTRY
   The one place to add, remove or re-point a tool on the hub. Each entry
   becomes a row in the "Tools" section, a step in the pathway strip and a
   link in the footer. Order here is the order on the page.
   ============================================================================ */
window.GATI_TOOLS = [
  {
    id: "demand",
    lens: "Demand",
    question: "Where are employers hiring?",
    title: "Labour Demand Dashboard",
    url: "https://job-demand-dashboard.vercel.app/",   /* CONFIRM: live URL of GATI-Foundation/job-demand-dashboard */
    icon: "bars",
    summary: "Job postings from German employers, classified to ISCO-08 occupations and ISIC Rev.4 employer sectors. Covers healthcare, hospitality, logistics and construction, with views by role, region, employer and visa signal.",
    facts: [
      ["Coverage", "Germany, 4 sectors"],
      ["Source", "StepStone Germany job postings"],
      ["Period", "Postings 6 May to 18 Jun 2026"]
    ],
    status: "snapshot"
  },
  {
    id: "mobility",
    lens: "Mobility",
    question: "Where does Indian talent already work?",
    title: "Indian Global Mobility Dashboard",
    url: "https://population-velocity-dashboard.vercel.app/",
    icon: "globe",
    summary: "Indians living and working abroad across 10 destination countries. Population, employment and the nursing workforce, shown as stocks and annual flows and benchmarked against all foreign nationals.",
    facts: [
      ["Coverage", "10 destination countries"],
      ["Source", "National statistics offices, OECD, Eurostat"],
      ["Measures", "Stocks and annual flows"]
    ],
    status: "official"
  },
  {
    id: "readiness",
    lens: "Readiness",
    question: "Where can candidates train in India?",
    title: "Language & Health Infrastructure Map",
    url: "https://gati-health-lang-infra-maps.vercel.app/",
    /* the same map is also deployed at https://infrastructure-maps-dashboard.vercel.app/ */
    icon: "pin",
    summary: "German language institutes, skilling centres, hospitals, and medical and nursing colleges, mapped at true coordinates across 15 hotspot cities and all of India.",
    facts: [
      ["Coverage", "India, 15 hotspot cities"],
      ["Source", "Goethe-Institut, telc, NSDC, NABH, NMC, INC"],
      ["Method", "Raw counts, no derived scores"]
    ],
    status: "official"
  },
  {
    id: "signals",
    lens: "Signals",
    question: "What changed in mobility policy?",
    title: "Global Skills Mobility News Tracker",
    url: "https://gsm-news-tracker.vercel.app/",
    icon: "news",
    summary: "Daily mobility and migration news, each item tagged positive, neutral or negative for India's labour-mobility goals. Trend views run from 7 days to a full year.",
    facts: [
      ["Coverage", "Global news"],
      ["Source", "GATI Daily Mobility & Migration Briefing"],
      ["Format", "Daily briefings, tagged by impact"]
    ],
    status: "live"
  }
];
