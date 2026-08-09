import type { Project } from "@/lib/types";

const project: Project = {
  slug: "healthcare-development",
  name: "Vision 2030 Healthcare Development",
  sector: "health",
  thesis:
    "Identifying and developing opportunities across pharmaceuticals, nutraceuticals, veterinary health, distribution and healthcare investment.",
  cardImage: "/images/projects/healthcare-development-card.jpg",
  cardFigures: [
    { value: "USD 18-24 Billion", label: "Projected market size by 2030" },
    { value: "5-8%", label: "Growth through 2030" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Exploring the future of healthcare in the Kingdom",
      thesis:
        "A strategic initiative developing sustainable opportunities across pharmaceuticals, health products, distribution and healthcare investment.",
      image: "/images/projects/healthcare-development-hero.jpg",
      facts: [
        { value: "USD 12-15 Billion", label: "Current market", note: "Mid 2020s" },
        { value: "USD 18-24 Billion", label: "Projected size by 2030" },
        { value: "30-35%", label: "Share of GCC pharmaceutical spending" },
        { value: "5-8%", label: "Growth through 2030" },
      ],
    },
    {
      type: "narrative",
      heading: "One of the largest healthcare markets in the region",
      body:
        "The market is expanding on Vision 2030 reforms, private-sector participation, wider health insurance coverage, population growth and rising chronic and lifestyle-related disease. Historically dominated by originator brands, it is shifting toward generics and biosimilars, especially in public-sector procurement where cost efficiency and supply security drive decisions.",
      image: "/images/projects/healthcare-development-market.jpg",
      pull: { value: "30-35%", label: "Saudi share of GCC pharmaceutical spending" },
    },
    {
      type: "comparison",
      eyebrow: "Market structure",
      heading: "Where the value sits",
      clusters: [
        {
          title: "Prescription medicines",
          rows: [
            { label: "Share of market value", value: "65-70%" },
            { label: "Hospital procurement", value: "Primary channel" },
            { label: "Chronic disease therapies", value: "Growing" },
            { label: "Oncology and injectables", value: "High value" },
          ],
        },
        {
          title: "OTC and supplements",
          rows: [
            { label: "Share of market value", value: "30-35%" },
            { label: "Retail pharmacy chains", value: "Primary channel" },
            { label: "Preventive healthcare", value: "Growing" },
            { label: "Consumer wellness", value: "Growing" },
          ],
        },
        {
          title: "Food supplements",
          rows: [
            { label: "Segment CAGR", value: "7-10%" },
            { label: "Import dependence", value: "80%+" },
            { label: "Sourced from", value: "EU, USA, Asia" },
            { label: "Regulator", value: "SFDA" },
          ],
        },
        {
          title: "Veterinary and animal health",
          rows: [
            { label: "Estimated market size", value: "USD 350-650 Million" },
            { label: "Market growth", value: "6-8%+" },
            { label: "Poultry self-sufficiency target", value: "80%+" },
          ],
        },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "18-20%", label: "Estimated adult diabetes prevalence" },
        { value: "7-10%", label: "Food supplements CAGR" },
        { value: "80%+", label: "Supplement import dependence" },
        { value: "USD 350-650 Million", label: "Veterinary market size" },
      ],
    },
    {
      type: "pillars",
      heading: "Six focus areas",
      items: [
        {
          title: "Market intelligence",
          icon: "chart",
          image: "/images/projects/healthcare-development-intelligence.jpg",
          body: "Opportunity identification grounded in real procurement and prescribing data rather than headline market size.",
        },
        {
          title: "Strategic partnerships",
          icon: "handshake",
          body: "Working with Saudi companies, distributors and investors already inside the system.",
        },
        {
          title: "Regulatory awareness",
          icon: "shield",
          body: "SFDA compliance across ingredient limits, labelling and health claims.",
        },
        {
          title: "Market entry",
          icon: "truck",
          body: "Distribution and commercialisation routes into hospital and retail channels.",
        },
        {
          title: "Investment collaboration",
          icon: "globe",
          body: "Structuring participation alongside established healthcare operators.",
        },
        {
          title: "Sustainable value",
          icon: "leaf",
          body: "Long-term growth rather than opportunistic single-product entry.",
        },
      ],
    },
    {
      type: "closing",
      heading: "Connecting opportunity with capability",
      points: [
        "Healthcare transformation under Vision 2030",
        "Private-sector participation actively encouraged",
        "Localisation and supply security as national priorities",
        "Innovation and technology across the care pathway",
        "A more sustainable healthcare future",
      ],
    },
  ],
};

export default project;
