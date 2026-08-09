import type { Project } from "@/lib/types";

const project: Project = {
  slug: "civil-engineering",
  name: "Civil Engineering and Construction",
  sector: "industry",
  thesis:
    "A civil engineering and construction practice delivering infrastructure, smart cities and sustainable urban development across the Kingdom.",
  cardImage: "/images/projects/civil-engineering-card.jpg",
  cardFigures: [
    { value: "USD 1.50+ Trillion", label: "Infrastructure pipeline under planning" },
    { value: "SAR 1M", label: "Estimated initial setup" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Building the infrastructure of tomorrow",
      thesis:
        "A large-scale civil engineering initiative delivering world-class infrastructure, smart cities and sustainable urban development.",
      image: "/images/projects/civil-engineering-hero.jpg",
      facts: [
        { value: "USD 1.50+ Trillion", label: "Infrastructure pipeline" },
        { value: "USD 1 Trillion", label: "Riyadh development plan" },
        { value: "26,500 km2", label: "NEOM planned area" },
        { value: "USD 500+ Billion", label: "Estimated NEOM investment" },
      ],
    },
    {
      type: "portfolio",
      eyebrow: "Mega project ecosystem",
      heading: "Where the work is",
      categories: [
        {
          title: "NEOM",
          image: "/images/projects/civil-engineering-neom.jpg",
          items: ["26,500 km2 development area", "USD 500+ billion investment"],
        },
        {
          title: "Red Sea Project",
          image: "/images/projects/civil-engineering-redsea.jpg",
          items: ["Tourism infrastructure", "Resorts and coastal works"],
        },
        {
          title: "Qiddiya",
          image: "/images/projects/civil-engineering-qiddiya.jpg",
          items: ["Entertainment districts", "Sports facilities"],
        },
        {
          title: "Riyadh Metro",
          image: "/images/projects/civil-engineering-metro.jpg",
          items: ["Urban transit", "Stations and depots"],
        },
        {
          title: "Diriyah Gate",
          image: "/images/projects/civil-engineering-diriyah.jpg",
          items: ["Cultural facilities", "Heritage development"],
        },
        {
          title: "Roshn",
          image: "/images/projects/civil-engineering-roshn.jpg",
          items: ["Residential communities", "Township infrastructure"],
        },
      ],
    },
    {
      type: "comparison",
      heading: "Six opportunity areas, grouped by discipline",
      clusters: [
        {
          title: "Infrastructure",
          rows: [
            { label: "Roads and highways", value: "Core" },
            { label: "Bridges", value: "Core" },
            { label: "Railways and urban transit", value: "Core" },
            { label: "Airports and ports", value: "Core" },
          ],
        },
        {
          title: "Utilities",
          rows: [
            { label: "Water and wastewater", value: "Core" },
            { label: "Desalination", value: "Specialist" },
            { label: "Power transmission", value: "Core" },
            { label: "Waste to energy", value: "Specialist" },
          ],
        },
        {
          title: "Urban development",
          rows: [
            { label: "Residential communities", value: "Core" },
            { label: "Commercial developments", value: "Core" },
            { label: "Smart cities and townships", value: "Growth" },
          ],
        },
        {
          title: "Tourism and hospitality",
          rows: [
            { label: "Hotels and resorts", value: "Growth" },
            { label: "Cultural facilities", value: "Growth" },
            { label: "Entertainment and sports", value: "Growth" },
          ],
        },
        {
          title: "Healthcare",
          rows: [
            { label: "Hospitals", value: "Core" },
            { label: "Medical facilities", value: "Core" },
          ],
        },
        {
          title: "Industrial and others",
          rows: [
            { label: "Manufacturing plants", value: "Core" },
            { label: "Telecommunications", value: "Specialist" },
            { label: "Logistics and warehouses", value: "Growth" },
          ],
        },
      ],
    },
    {
      type: "economics",
      heading: "What it takes to stand the practice up",
      headline: [
        { value: "SAR 1M", label: "Estimated initial setup investment" },
        { value: "SAR 215K-300K", label: "Office setup and operations" },
        { value: "SAR 150K-200K+", label: "Annual office rent" },
        { value: "SAR 25K-50K", label: "Initial staffing cost" },
      ],
      detail: [
        { label: "Pre-licensing and registration", value: "SAR 15K-30K" },
        { label: "Office furniture and equipment", value: "SAR 50K-75K+" },
        { label: "IT and communication setup", value: "SAR 15K-25K" },
        { label: "Total initial investment", value: "SAR 1,000,000" },
      ],
    },
    {
      type: "flow",
      heading: "Five capability areas across the project life",
      steps: [
        {
          label: "Pre-construction",
          body: "Feasibility, design review, value engineering, quantity take-off and planning.",
        },
        {
          label: "Site engineering",
          body: "Earthworks, excavation, foundations, concrete, steel fixing and structural works.",
        },
        {
          label: "Project management",
          body: "Scheduling, contractor coordination, workforce management and technical reporting.",
        },
        {
          label: "Quality and safety",
          body: "QA and QC, materials testing, inspection, HSE management and risk mitigation.",
        },
        {
          label: "MEP works",
          body: "Utilities installation, road and drainage, finishing, testing and handover.",
        },
      ],
    },
    {
      type: "closing",
      heading: "Building the future of Saudi Arabia",
      points: [
        "Quality construction to international standards",
        "On-time delivery against mega project schedules",
        "Safety first across every site",
        "Sustainable solutions aligned with Vision 2030",
        "Long-term partnership rather than single contracts",
      ],
    },
  ],
};

export default project;
