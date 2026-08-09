import type { Project } from "@/lib/types";

const project: Project = {
  slug: "food-trade",
  name: "Food Grain and Consumable Products Trading",
  sector: "trade",
  thesis:
    "Importing and distributing food grains and essential consumables into Saudi Arabia and the wider GCC market.",
  cardImage: "/images/projects/food-trade-card.jpg",
  cardFigures: [
    { value: "USD 5.6 Billion", label: "Food grain imports", note: "2021 to 2025" },
    { value: "80%", label: "Food import dependency" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Supplying quality, building trust, creating value",
      thesis:
        "A trading business importing and supplying high-quality food grains and essential consumables across Saudi Arabia and the GCC.",
      image: "/images/projects/food-trade-hero.jpg",
      facts: [
        { value: "34.2 Million", label: "Population" },
        { value: "80%", label: "Food import dependency" },
        { value: "SAR 3 Million", label: "Approximate startup investment" },
        { value: "20-30%", label: "Estimated profit margin" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "USD 5.6 Billion", label: "Food grain imports", note: "2021 to 2025" },
        { value: "USD 1.115 Billion", label: "Rice imports", note: "Mid 2025" },
        { value: "53.8-57.4 kg", label: "Rice consumption per capita" },
        { value: "34.2 Million", label: "Population served" },
      ],
    },
    {
      type: "portfolio",
      eyebrow: "Product portfolio",
      heading: "Five categories on one supply chain",
      categories: [
        {
          title: "Food grains",
          image: "/images/projects/food-trade-grains.jpg",
          items: [
            "Basmati rice",
            "Non-basmati rice",
            "Wheat",
            "Barley",
            "Maize",
            "Sugar ICUMSA-45",
          ],
        },
        {
          title: "Natural products",
          image: "/images/projects/food-trade-natural.jpg",
          items: ["Natural herbs", "Seeds", "Cereals", "Beans and legumes", "Chick peas"],
        },
        {
          title: "Cooking oils",
          image: "/images/projects/food-trade-oils.jpg",
          items: ["Sunflower oil", "Corn oil", "Olive oil", "Palm oil"],
        },
        {
          title: "Spices",
          image: "/images/projects/food-trade-spices.jpg",
          items: ["Premium quality", "Wide variety", "Authentic taste"],
        },
        {
          title: "Halal meat",
          image: "/images/projects/food-trade-meat.jpg",
          items: ["High quality", "Halal certified", "Fresh and frozen"],
        },
      ],
    },
    {
      type: "flow",
      heading: "Global source to Saudi shelf",
      steps: [
        {
          label: "Source",
          body: "Supplier network across India, Pakistan, USA, Vietnam, Thailand and Portugal.",
        },
        {
          label: "Verify",
          body: "Quality control and compliance against SFDA standards.",
        },
        {
          label: "Ship",
          body: "Sea freight and import into Saudi ports.",
        },
        {
          label: "Clear",
          body: "Customs handling and regulatory compliance.",
        },
        {
          label: "Store",
          body: "Warehousing and inventory management from the Jeddah hub.",
        },
        {
          label: "Distribute",
          body: "Delivery to institutional, wholesale and retail clients.",
        },
      ],
    },
    {
      type: "comparison",
      heading: "Duty and tax, grouped by what it applies to",
      clusters: [
        {
          title: "Import duty",
          rows: [
            { label: "Standard customs duty", value: "5%" },
            { label: "Certain processed goods", value: "Up to 25%" },
          ],
        },
        {
          title: "Consumption tax",
          rows: [
            { label: "VAT", value: "15%" },
            { label: "Soft drink excise", value: "50%" },
            { label: "Energy drink excise", value: "100%" },
          ],
        },
        {
          title: "Expansion path",
          rows: [
            { label: "Initial hub", value: "Jeddah" },
            { label: "Second phase", value: "Across KSA" },
            { label: "Third phase", value: "GCC markets" },
          ],
        },
      ],
    },
    {
      type: "economics",
      heading: "Startup capital and the return on it",
      headline: [
        { value: "SAR 3 Million", label: "Approximate minimum startup investment" },
        { value: "20-30%", label: "Estimated profit margin" },
        { value: "6 Months", label: "Payback period" },
        { value: "5%", label: "Standard customs duty" },
      ],
      detail: [
        { label: "Population served", value: "34.2 million" },
        { label: "Food import dependency", value: "80%" },
        { label: "Food grain imports 2021 to 2025", value: "USD 5.6 billion" },
        { label: "Rice imports mid 2025", value: "USD 1.115 billion" },
        { label: "Rice consumption per capita", value: "53.8 to 57.4 kg" },
      ],
    },
    {
      type: "narrative",
      heading: "Who actually buys at this volume",
      body:
        "Demand concentrates in institutions rather than individuals. Government departments, the Ministry of Defense, five-star hotels, airline catering, wholesale distributors, retail chains and large healthcare groups all buy on contract, in quantity, and on repeat. That is what makes the fast turnover model work.",
      image: "/images/projects/food-trade-customers.jpg",
      pull: { value: "6 Months", label: "Indicative payback period" },
    },
    {
      type: "closing",
      heading: "Quality, trust, reliability",
      points: [
        "Strong market opportunity built on structural import dependency",
        "High quality products to international standards",
        "Efficient logistics and distribution from Jeddah",
        "Regulatory compliance with SFDA requirements",
        "Long-term growth path across the GCC",
      ],
    },
  ],
};

export default project;
