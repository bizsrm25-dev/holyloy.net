import type { Project } from "@/lib/types";

const project: Project = {
  slug: "pharma-manufacturing",
  name: "Pharmaceutical Manufacturing Plant",
  sector: "health",
  thesis:
    "A generic medicines facility producing tablets and capsules to support healthcare localisation and reduce import dependency.",
  cardImage: "/images/projects/pharma-manufacturing-card.jpg",
  cardFigures: [
    { value: "USD 15 Million", label: "Total project investment" },
    { value: "50-70 Million", label: "Tablets and capsules per year" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Building local pharmaceutical excellence",
      thesis:
        "A medium-scale facility focused on high-demand generic medicines, strengthening the Kingdom's drug security.",
      image: "/images/projects/pharma-manufacturing-hero.jpg",
      facts: [
        { value: "USD 15 Million", label: "Total project investment" },
        { value: "50-70 Million", label: "Units per year" },
        { value: "2,000-3,000 m2", label: "Planned facility area" },
        { value: "24-30 Months", label: "Estimated implementation" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "USD 7+ Billion", label: "Saudi pharmaceutical market size" },
        { value: "7-9%", label: "Estimated market growth" },
        { value: "80%+", label: "Import dependency in the Kingdom" },
        { value: "25-30%", label: "Annual ROI after year two" },
      ],
    },
    {
      type: "portfolio",
      eyebrow: "Product portfolio",
      heading: "Four therapeutic categories at launch",
      categories: [
        {
          title: "Anti-diabetic",
          image: "/images/projects/pharma-manufacturing-diabetic.jpg",
          items: ["Metformin"],
        },
        {
          title: "Cardiovascular",
          image: "/images/projects/pharma-manufacturing-cardio.jpg",
          items: ["Atorvastatin", "Amlodipine"],
        },
        {
          title: "Gastrointestinal",
          image: "/images/projects/pharma-manufacturing-gastro.jpg",
          items: ["Omeprazole"],
        },
        {
          title: "Analgesics and anti-inflammatories",
          image: "/images/projects/pharma-manufacturing-analgesic.jpg",
          items: ["Paracetamol", "Ibuprofen"],
        },
      ],
    },
    {
      type: "economics",
      heading: "Fifteen million in, and what it returns",
      headline: [
        { value: "USD 12-18M", label: "Annual revenue potential" },
        { value: "35-40%", label: "Gross profit margin" },
        { value: "20-25%", label: "EBITDA margin" },
        { value: "5-7 Years", label: "Payback period" },
      ],
      detail: [
        { label: "Land and building", value: "USD 4.5M" },
        { label: "Machinery and equipment", value: "USD 6.0M" },
        { label: "Utilities and installation", value: "USD 1.0M" },
        { label: "Raw material inventory", value: "USD 2.0M" },
        { label: "SFDA registration and consultancy", value: "USD 0.5M" },
        { label: "Initial marketing and salaries", value: "USD 1.0M" },
        { label: "Total capital expenditure", value: "USD 11.5M" },
        { label: "Working capital and pre-operational", value: "USD 3.5M" },
        { label: "Annual EBITDA potential", value: "USD 3-5M" },
      ],
    },
    {
      type: "comparison",
      heading: "The incentive environment, by benefit type",
      clusters: [
        {
          title: "Tax",
          rows: [
            { label: "Corporate tax", value: "0% up to 20 years" },
            { label: "Effect", value: "Higher long-term returns" },
          ],
        },
        {
          title: "Financing",
          rows: [
            { label: "Potential SIDF financing", value: "75% of project cost" },
            { label: "Effect", value: "Reduced equity requirement" },
          ],
        },
        {
          title: "Procurement",
          rows: [
            { label: "Government price preference", value: "10-15%" },
            { label: "Effect", value: "Advantage in public tenders" },
          ],
        },
        {
          title: "Duty",
          rows: [
            { label: "Exemption value", value: "USD 300K-500K" },
            { label: "Applies to", value: "Imported machinery and raw materials" },
          ],
        },
      ],
    },
    {
      type: "timeline",
      heading: "Twenty-four to thirty months to commercial launch",
      phases: [
        {
          horizon: "6 months",
          title: "Planning and approvals",
          body: "Manufacturing licence and product registration with SFDA.",
        },
        {
          horizon: "12 months",
          title: "Design and construction",
          body: "Facility build to GMP specification.",
        },
        {
          horizon: "6 months",
          title: "Procurement and installation",
          body: "Machinery delivery, installation and qualification.",
        },
        {
          horizon: "6 to 12 months",
          title: "Regulatory and commissioning",
          body: "GMP compliance, pre-approval inspection and validation studies.",
        },
        {
          horizon: "Operations begin",
          title: "Commercial launch",
          body: "First commercial batches released to market.",
        },
      ],
    },
    {
      type: "closing",
      heading: "A healthier future for Saudi Arabia",
      points: [
        "Healthcare localisation under Vision 2030",
        "Import dependency reduction across essential medicines",
        "Skilled job creation and economic growth",
        "Stronger national drug security",
      ],
    },
  ],
};

export default project;
