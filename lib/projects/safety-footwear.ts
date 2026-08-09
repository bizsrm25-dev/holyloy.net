import type { Project } from "@/lib/types";

const project: Project = {
  slug: "safety-footwear",
  name: "Safety Shoes Distribution",
  sector: "industry",
  thesis:
    "B2B distribution of certified safety footwear into Saudi industry, construction, oil and gas, manufacturing and logistics.",
  cardImage: "/images/projects/safety-footwear-card.jpg",
  cardFigures: [
    { value: "USD 507.6 Million", label: "Saudi market by 2030" },
    { value: "95%+", label: "Safety shoes imported into KSA" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Supplying safety, empowering industries",
      thesis:
        "A distribution initiative meeting demand for certified safety footwear across Saudi industry, construction and logistics.",
      image: "/images/projects/safety-footwear-hero.jpg",
      facts: [
        { value: "USD 507.6 Million", label: "Saudi market by 2030" },
        { value: "7.1%", label: "Market growth", note: "2023 to 2030" },
        { value: "95%+", label: "Imported into the Kingdom" },
        { value: "20-25%", label: "Potential net profit margin" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "USD 5.8 Billion", label: "Global market size", note: "2024" },
        { value: "USD 8.9 Billion", label: "Global market by 2033" },
        { value: "12%", label: "Share of global import shipments" },
        { value: "7.1%", label: "Saudi market CAGR" },
      ],
    },
    {
      type: "pillars",
      eyebrow: "Demand drivers",
      heading: "Why this demand does not soften",
      items: [
        {
          title: "Mandatory by law",
          icon: "shield",
          image: "/images/projects/safety-footwear-regulation.jpg",
          body: "Regulations require employers to provide certified protective equipment. Safety footwear is a non-negotiable line item, not a discretionary purchase.",
        },
        {
          title: "Mega projects",
          icon: "buildings",
          body: "NEOM, Red Sea Global, Qiddiya and Diriyah Gate drive persistent large-scale demand.",
        },
        {
          title: "Industrial sectors",
          icon: "factory",
          body: "Construction, oil and gas, manufacturing, logistics and warehousing consume continuously.",
        },
        {
          title: "Worker safety focus",
          icon: "users",
          body: "Higher awareness of comfort and performance reduces accidents and long-term operational cost.",
        },
      ],
    },
    {
      type: "portfolio",
      heading: "Eight categories, from basic protection to specialist",
      categories: [
        {
          title: "Steel-toe",
          image: "/images/projects/safety-footwear-steel.jpg",
          items: ["Impact protection", "General industrial use"],
        },
        {
          title: "Composite-toe",
          image: "/images/projects/safety-footwear-composite.jpg",
          items: ["Lightweight protection", "Non-metallic"],
        },
        {
          title: "Puncture-resistant",
          image: "/images/projects/safety-footwear-puncture.jpg",
          items: ["Sole penetration protection", "Construction sites"],
        },
        {
          title: "Anti-static",
          image: "/images/projects/safety-footwear-antistatic.jpg",
          items: ["Charge dissipation", "Electronics and fuel handling"],
        },
        {
          title: "Waterproof",
          image: "/images/projects/safety-footwear-waterproof.jpg",
          items: ["Wet environments", "Utilities and marine"],
        },
        {
          title: "Heat and chemical resistant",
          image: "/images/projects/safety-footwear-heat.jpg",
          items: ["Foundries and refineries", "Chemical handling"],
        },
        {
          title: "Lightweight comfort",
          image: "/images/projects/safety-footwear-comfort.jpg",
          items: ["All-day wear", "Reduced fatigue"],
        },
        {
          title: "Specialised industrial",
          image: "/images/projects/safety-footwear-specialised.jpg",
          items: ["Oil and gas segment", "High-specification roles"],
        },
      ],
    },
    {
      type: "flow",
      heading: "Manufacturer to industrial customer",
      steps: [
        { label: "Source", body: "Global manufacturers and trusted supply partners." },
        { label: "Certify", body: "SASO certification and compliance verification." },
        { label: "Import", body: "Customs clearance and duty handling." },
        { label: "Warehouse", body: "KSA warehousing and inventory management." },
        { label: "Distribute", body: "B2B sales and distribution across the Kingdom." },
        { label: "Serve", body: "Industrial and corporate account management." },
      ],
    },
    {
      type: "economics",
      heading: "Landed cost against three price segments",
      headline: [
        { value: "SAR 40-53", label: "Estimated landed cost per pair" },
        { value: "SAR 55-65", label: "Economy segment price" },
        { value: "SAR 70-85", label: "Mid-market price" },
        { value: "SAR 90-120+", label: "Premium oil and gas price" },
      ],
      detail: [
        { label: "Gross margin, economy", value: "23%" },
        { label: "Gross margin, mid-market", value: "37.5%" },
        { label: "Gross margin, premium", value: "54.5%" },
        { label: "Potential net profit margin", value: "20-25%" },
        { label: "Initial investment range", value: "SAR 526,000 to 1,275,000" },
      ],
    },
    {
      type: "closing",
      heading: "An essential product with consistent demand",
      points: [
        "Strong and growing market backed by Vision 2030",
        "Mandatory requirement across all major industries",
        "Import reliance above 95 percent creates the distribution opening",
        "Attractive margins with sustainable underlying demand",
      ],
    },
  ],
};

export default project;
