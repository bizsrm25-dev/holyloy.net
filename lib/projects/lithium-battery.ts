import type { Project } from "@/lib/types";

const project: Project = {
  slug: "lithium-battery",
  name: "Lithium-Ion Battery Manufacturing",
  sector: "energy",
  thesis:
    "Advanced lithium-ion battery manufacturing to drive Saudi Arabia's energy transition, industrial growth and sustainable mobility.",
  cardImage: "/images/projects/lithium-battery-card.jpg",
  cardFigures: [
    { value: "USD 7.27B", label: "Li-ion battery market by 2030" },
    { value: "1.5 GWh", label: "Base case annual capacity" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Powering Saudi Arabia's clean energy future",
      thesis:
        "Advanced lithium-ion battery manufacturing to drive the energy transition, industrial growth and sustainable mobility.",
      image: "/images/projects/lithium-battery-hero.jpg",
      facts: [
        { value: "USD 150M", label: "Estimated initial investment" },
        { value: "1.5 GWh", label: "Base case annual capacity" },
        { value: "25-30%", label: "Projected IRR" },
        { value: "25 Years", label: "Project life" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "15.4%", label: "Market CAGR", note: "2024 to 2030" },
        { value: "5 Million MT", label: "Lithium demand by 2030" },
        { value: "29.1%", label: "Revenue CAGR", note: "2024 to 2030" },
        { value: "27.8%", label: "Residential storage CAGR" },
      ],
    },
    {
      type: "portfolio",
      eyebrow: "Where the cells go",
      heading: "Five application segments carry the demand",
      categories: [
        {
          title: "Energy storage",
          image: "/images/projects/lithium-battery-storage.jpg",
          items: ["Grid-scale storage", "Renewable integration", "Backup power"],
        },
        {
          title: "Automotive",
          image: "/images/projects/lithium-battery-automotive.jpg",
          items: ["Electric vehicles", "EV battery systems", "Mobility solutions"],
        },
        {
          title: "Electronics",
          image: "/images/projects/lithium-battery-electronics.jpg",
          items: ["Consumer electronics", "Portable power", "Smart devices"],
        },
        {
          title: "Healthcare",
          image: "/images/projects/lithium-battery-healthcare.jpg",
          items: ["Medical devices", "Portable equipment", "Backup systems"],
        },
        {
          title: "Power tools",
          image: "/images/projects/lithium-battery-tools.jpg",
          items: ["High performance packs", "Industrial and trade use"],
        },
      ],
    },
    {
      type: "narrative",
      heading: "Energy density is the whole argument",
      body:
        "Cells today deliver 200 to 300 Wh per kilogram, with 400 and above within reach. That headroom is what turns storage from a grid accessory into infrastructure, and the Kingdom is securing lithium supply to match. Domestic demand is set to climb from under 750,000 metric tons in 2020 to more than 5 million by 2030.",
      image: "/images/projects/lithium-battery-density.jpg",
      pull: { value: "400+ Wh/kg", label: "Future potential energy density" },
    },
    {
      type: "economics",
      heading: "Base case at year three, ninety percent utilisation",
      headline: [
        { value: "USD 162M", label: "Annual revenue" },
        { value: "USD 29.70M", label: "EBITDA" },
        { value: "33.33%", label: "Gross margin" },
        { value: "6-8 Years", label: "Payback period" },
      ],
      detail: [
        { label: "Annual production", value: "1.35M kWh" },
        { label: "Cost of goods sold", value: "USD 108M" },
        { label: "Gross profit", value: "USD 54M" },
        { label: "Net profit", value: "USD 16.16M" },
        { label: "EBITDA margin", value: "13.39%" },
        { label: "Net present value", value: "USD 25-40M" },
        { label: "Profitability index", value: "1.7-1.9" },
        { label: "Long-term ROI", value: "60%+" },
        { label: "Broad investment range", value: "USD 50-200M+" },
        { label: "Profit margin", value: "20-40%" },
      ],
    },
    {
      type: "timeline",
      heading: "From site selection to market expansion",
      phases: [
        {
          horizon: "Before ground breaks",
          title: "Site selection and approvals",
          body: "Location assessment, permitting and regulatory clearance.",
        },
        {
          horizon: "Design stage",
          title: "Plant design and engineering",
          body: "Process design, plant layout and equipment specification.",
        },
        {
          horizon: "Build stage",
          title: "Equipment installation",
          body: "Automated production lines, PLC control and robotics in critical zones.",
        },
        {
          horizon: "Year 1, 50% utilisation",
          title: "Trial production and testing",
          body: "Commissioning, quality validation and yield tuning.",
        },
        {
          horizon: "Year 2, 75% utilisation",
          title: "Commercial production",
          body: "Output ramps against firm offtake as the line stabilises.",
        },
        {
          horizon: "Year 3, 90% utilisation",
          title: "Scale and market expansion",
          body: "Base case capacity reached and served beyond the initial segments.",
        },
      ],
    },
    {
      type: "closing",
      heading: "Built for the energy transition",
      points: [
        "Strategic location in Saudi Arabia",
        "Strong government support for local manufacturing",
        "Access to global raw materials",
        "Growing demand from electric vehicles and renewables",
        "Competitive returns and long-term value",
      ],
    },
  ],
};

export default project;
