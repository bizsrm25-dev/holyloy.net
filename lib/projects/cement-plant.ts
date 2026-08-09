import type { Project } from "@/lib/types";

const project: Project = {
  slug: "cement-plant",
  name: "Cement Manufacturing Plant",
  sector: "industry",
  thesis:
    "A modern dry-process cement facility at one million tons a year, supplying Vision 2030 mega projects and urban development.",
  cardImage: "/images/projects/cement-plant-card.jpg",
  cardFigures: [
    { value: "1 MTPA", label: "Annual production capacity" },
    { value: "12-18%", label: "Indicative project IRR" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Building the infrastructure of a transforming nation",
      thesis:
        "A state-of-the-art dry-process cement plant supporting mega projects, urban development and the Kingdom's growing infrastructure.",
      image: "/images/projects/cement-plant-hero.jpg",
      facts: [
        { value: "1 MTPA", label: "Production capacity" },
        { value: "Dry Process", label: "Modern plant type" },
        { value: "6.10%", label: "Market CAGR through 2030" },
        { value: "5-7 Years", label: "Indicative payback" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "USD 1.97B", label: "Saudi cement market value", note: "2024" },
        { value: "USD 2.84B", label: "Projected market value by 2030" },
        { value: "USD 5.93B", label: "Projected value by 2033", note: "Alternate estimate" },
        { value: "5.25%", label: "CAGR to 2033", note: "Alternate estimate" },
      ],
    },
    {
      type: "narrative",
      heading: "Unprecedented construction momentum",
      body:
        "Mega projects including NEOM, Qiddiya, the Red Sea Project and Riyadh Metro drive consistent long-term demand. The PIF has committed more than USD 1.5 trillion across infrastructure and construction, with over USD 500 billion allocated to NEOM alone, 8,000 kilometres of new roads planned by 2030 and 59,000 new housing units alongside them.",
      image: "/images/projects/cement-plant-megaprojects.jpg",
      pull: { value: "USD 1.5+ Trillion", label: "PIF infrastructure commitment" },
    },
    {
      type: "pillars",
      heading: "What sustains demand past the current cycle",
      items: [
        {
          title: "Urbanisation",
          icon: "buildings",
          image: "/images/projects/cement-plant-urban.jpg",
          body: "More than 84 percent of the population lives in urban areas as of 2025, and that share keeps climbing.",
        },
        {
          title: "Housing",
          icon: "buildings",
          body: "Supply is projected to grow from 3.5 million units to 3.9 million by 2028. Riyadh alone needs 305,000 additional homes.",
        },
        {
          title: "Infrastructure",
          icon: "truck",
          body: "Consumption is expected to grow 5 to 7 percent a year on mega projects, utilities and industrial parks.",
        },
        {
          title: "Green cement",
          icon: "leaf",
          body: "Low-carbon segments hold roughly 13 percent growth potential as efficiency standards tighten.",
        },
      ],
    },
    {
      type: "economics",
      heading: "Cost, price and the margin between them",
      headline: [
        { value: "USD 35-45", label: "Operating cost per metric ton" },
        { value: "USD 55-65", label: "Market selling price per ton" },
        { value: "USD 20-25", label: "Indicative gross margin per ton" },
        { value: "12-18%", label: "Indicative project IRR" },
      ],
      detail: [
        { label: "Production capacity", value: "1 million metric tons per annum" },
        { label: "Plant type", value: "Modern dry process" },
        { label: "Technology adoption", value: "Automation, AI-guided control, IoT" },
        { label: "Indicative payback period", value: "5-7 years" },
        { label: "Market size 2024", value: "USD 1.97B" },
        { label: "Projected market value 2030", value: "USD 2.84B" },
      ],
    },
    {
      type: "closing",
      heading: "A strategic industrial investment",
      points: [
        "High growth market backed by Vision 2030",
        "Strong government support for local industry",
        "Low-carbon and energy-efficient by design",
        "Long-term value creation across the infrastructure cycle",
      ],
    },
  ],
};

export default project;
