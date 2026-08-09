import type { Project } from "@/lib/types";

const project: Project = {
  slug: "solar-energy",
  name: "Renewable Energy and Solar Power",
  sector: "energy",
  thesis:
    "Large-scale solar generation across EPC, IPP and O&M models, supporting the Kingdom's energy transition under Vision 2030.",
  cardImage: "/images/projects/solar-energy-card.jpg",
  cardFigures: [
    { value: "130 GW", label: "Renewable energy target by 2030" },
    { value: "USD 270B", label: "Low-carbon investment by 2030" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Powering Saudi Arabia's sustainable future",
      thesis:
        "A large-scale renewable initiative spanning solar generation, EPC, IPP and O&M, aligned with Vision 2030.",
      image: "/images/projects/solar-energy-hero.jpg",
      facts: [
        { value: "USD 22B", label: "Renewable energy budget" },
        { value: "130 GW", label: "Renewable target by 2030" },
        { value: "20 GW", label: "Annual addition target" },
        { value: "25+ Years", label: "Project lifetime" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "USD 270B", label: "Low-carbon energy investment by 2030" },
        { value: "278 Million Tons", label: "CO2 reduction target by 2030" },
        { value: "366 TWh", label: "Projected electricity demand by 2030" },
        { value: "50%", label: "Renewable share of the 2030 energy mix" },
      ],
    },
    {
      type: "narrative",
      heading: "One hundred megawatts outside Jeddah",
      body:
        "The indicative first build is a 100 MW plant on roughly 500,000 square metres, sited where irradiance runs near 5.8 kWh per square metre per day. It connects on-grid through SEC, or off-grid with storage. Total project cost lands between USD 55 and 75 million, and it removes about 60,000 tons of CO2 a year.",
      image: "/images/projects/solar-energy-plant.jpg",
      pull: { value: "5.8 kWh/m2", label: "Daily solar irradiance" },
    },
    {
      type: "economics",
      eyebrow: "Indicative economics",
      heading: "What the first plant costs and returns",
      headline: [
        { value: "USD 55-75M", label: "Total project cost" },
        { value: "6-8 Years", label: "Payback period" },
        { value: "60,000 Tons", label: "CO2 removed annually" },
        { value: "USD 0.02-0.03", label: "Indicative PPA tariff per kWh" },
      ],
      detail: [
        { label: "Solar PV system", value: "USD 40-50M" },
        { label: "Land acquisition or lease", value: "USD 2-5M" },
        { label: "EPC and installation", value: "USD 10-15M" },
        { label: "Grid connection", value: "USD 3-6M" },
        { label: "Annual operations and maintenance", value: "USD 0.5-1M" },
        { label: "Land requirement", value: "500,000 m2" },
        { label: "Project lifetime", value: "25+ years" },
      ],
    },
    {
      type: "flow",
      heading: "Six capabilities, feasibility through operations",
      steps: [
        {
          label: "Assess",
          body: "Solar studies, land assessment, grid connectivity and financial analysis.",
        },
        {
          label: "Design",
          body: "PV system design, electrical and structural engineering, performance simulation.",
        },
        {
          label: "Procure",
          body: "Sourcing modules, inverters, mounting systems and balance of plant.",
        },
        {
          label: "Construct",
          body: "Civil works, equipment installation, electrical works and grid integration.",
        },
        {
          label: "Commission",
          body: "Testing, performance validation and handover to commercial operation.",
        },
        {
          label: "Operate",
          body: "Monitoring, preventive maintenance, cleaning and performance optimisation.",
        },
      ],
    },
    {
      type: "pillars",
      heading: "Three ways to hold the asset",
      items: [
        {
          title: "EPC",
          icon: "factory",
          image: "/images/projects/solar-energy-epc.jpg",
          body: "Engineering, procurement and construction delivered for a third-party owner.",
        },
        {
          title: "IPP",
          icon: "lightning",
          body: "Independent power production, selling output under a long-term tariff.",
        },
        {
          title: "O&M",
          icon: "gauge",
          body: "Operations and maintenance contracted across plants built by others.",
        },
      ],
    },
    {
      type: "closing",
      heading: "Why Saudi solar, and why now",
      points: [
        "Strong government commitment under Vision 2030",
        "High solar potential and abundant resource",
        "Attractive financial returns at utility scale",
        "Sustainable and clean energy future",
        "Long-term market opportunity as demand doubles",
      ],
    },
  ],
};

export default project;
