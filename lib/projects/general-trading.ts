import type { Project } from "@/lib/types";

const project: Project = {
  slug: "general-trading",
  name: "General Trading and Import-Export",
  sector: "trade",
  thesis:
    "A diversified trading platform sourcing globally and delivering into Saudi Arabia and the GCC with reliability and efficiency.",
  cardImage: "/images/projects/general-trading-card.jpg",
  cardFigures: [
    { value: "USD 150+ Billion", label: "Annual goods imports" },
    { value: "SAR 1.5 Million", label: "Approximate startup investment" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Building connections, creating value",
      thesis:
        "A diversified trading platform sourcing quality products from global markets and delivering across Saudi Arabia and the GCC.",
      image: "/images/projects/general-trading-hero.jpg",
      facts: [
        { value: "USD 150+ Billion", label: "Annual goods imports" },
        { value: "SAR 1.5 Million", label: "Startup investment" },
        { value: "20-40%", label: "Profit margin" },
        { value: "6 Months", label: "Indicative payback" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "34.2M", label: "Population of Saudi Arabia" },
        { value: "40%", label: "Population under 25 years" },
        { value: "USD 370.98B", label: "Saudi exports", note: "2023" },
        { value: "USD 305B", label: "Saudi exports", note: "2024" },
      ],
    },
    {
      type: "portfolio",
      eyebrow: "Product portfolio",
      heading: "Five verticals under one trading licence",
      categories: [
        {
          title: "Construction and building",
          image: "/images/projects/general-trading-construction.jpg",
          items: [
            "Building materials",
            "HVAC and plumbing",
            "Electrical systems",
            "Aluminium and steel",
            "Finishes and furniture",
          ],
        },
        {
          title: "Industrial and technology",
          image: "/images/projects/general-trading-industrial.jpg",
          items: [
            "Industrial machinery",
            "Generators and transformers",
            "Tools and equipment",
            "Computers and laptops",
          ],
        },
        {
          title: "Healthcare and medical",
          image: "/images/projects/general-trading-medical.jpg",
          items: [
            "Medical equipment",
            "Hospital accessories",
            "Surgical instruments",
            "Medical consumables",
          ],
        },
        {
          title: "Food grains and agri",
          image: "/images/projects/general-trading-agri.jpg",
          items: [
            "Rice, wheat and sugar",
            "Pulses and legumes",
            "Cooking oils",
            "Herbs, seeds and spices",
            "Halal meat",
          ],
        },
        {
          title: "Consumer and lifestyle",
          image: "/images/projects/general-trading-consumer.jpg",
          items: [
            "Garments and shoes",
            "Cosmetics and watches",
            "Bags, toys and stationery",
            "Home and living products",
          ],
        },
      ],
    },
    {
      type: "comparison",
      heading: "Sourcing network and export categories",
      clusters: [
        {
          title: "Primary sourcing",
          rows: [
            { label: "China", value: "Core" },
            { label: "USA", value: "Core" },
            { label: "India", value: "Core" },
            { label: "Pakistan", value: "Core" },
          ],
        },
        {
          title: "Secondary sourcing",
          rows: [
            { label: "Thailand", value: "Active" },
            { label: "Vietnam", value: "Active" },
            { label: "Brazil", value: "Active" },
            { label: "Australia", value: "Active" },
          ],
        },
        {
          title: "Export categories",
          rows: [
            { label: "Energy and fuel", value: "Diesel EN590, Jet A-1" },
            { label: "Petrochemicals", value: "Industrial chemicals" },
            { label: "Polymers", value: "PE, PP, PVC, ABS" },
            { label: "Fertilizers", value: "NPK, DAP, Urea" },
            { label: "Metals", value: "Aluminium, copper, gold" },
          ],
        },
      ],
    },
    {
      type: "flow",
      heading: "Eight steps from supplier to buyer",
      steps: [
        { label: "Source", body: "Global sourcing from trusted suppliers." },
        { label: "Verify", body: "Quality verification and compliance checks." },
        { label: "Document", body: "Import and export documentation." },
        { label: "Finance", body: "Trade finance through letters of credit and bank guarantees." },
        { label: "Ship", body: "Logistics from global origin to Saudi ports." },
        { label: "Warehouse", body: "Warehousing and inventory control." },
        { label: "Distribute", body: "Distribution across KSA and the GCC." },
        { label: "Sell", body: "B2B sales and long-term partnerships." },
      ],
    },
    {
      type: "economics",
      heading: "Setup capital and trading economics",
      headline: [
        { value: "SAR 1.5 Million", label: "Approximate startup investment" },
        { value: "20-40%", label: "Profit margin" },
        { value: "6 Months", label: "Indicative payback period" },
        { value: "5%", label: "Import tax on CIF value" },
      ],
      detail: [
        { label: "Office setup, first year", value: "Included" },
        { label: "Office furniture and equipment", value: "Included" },
        { label: "Warehouse setup", value: "Included" },
        { label: "Licences and registrations", value: "Included" },
        { label: "Vehicles and delivery vans", value: "Included" },
        { label: "Initial staff, three months", value: "Included" },
        { label: "Software, systems and tracking", value: "Included" },
        { label: "VAT", value: "15%" },
      ],
    },
    {
      type: "timeline",
      heading: "Four phases to an integrated network",
      phases: [
        {
          horizon: "Market entry",
          title: "Establish from Jeddah",
          body: "Licensing, warehouse and first supplier relationships.",
        },
        {
          horizon: "National reach",
          title: "Expand across Saudi Arabia",
          body: "Distribution into Riyadh, Dammam and secondary markets.",
        },
        {
          horizon: "Regional reach",
          title: "Grow across GCC markets",
          body: "Cross-border trade built on the established supply base.",
        },
        {
          horizon: "Within five years",
          title: "Integrated logistics network",
          body: "Owned logistics capability rather than contracted freight.",
        },
      ],
    },
    {
      type: "closing",
      heading: "High margin trading with fast turnover",
      points: [
        "Strong supplier network worldwide",
        "Quality products to international standards",
        "Reliable logistics with end-to-end support",
        "Customer focused, built on long-term partnerships",
        "Sustainable growth across KSA and the GCC",
      ],
    },
  ],
};

export default project;
