import type { Project } from "@/lib/types";

const project: Project = {
  slug: "manpower-sourcing",
  name: "Mega Manpower Sourcing",
  sector: "services",
  thesis:
    "A large-scale manpower sourcing and contracting platform connecting global talent with Saudi industries and giga projects.",
  cardImage: "/images/projects/manpower-sourcing-card.jpg",
  cardFigures: [
    { value: "10,500+", label: "Target manpower deployment" },
    { value: "SAR 126 Million", label: "Annual profit potential at year five" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Delivering the right people for a stronger Saudi Arabia",
      thesis:
        "A manpower sourcing and contracting platform connecting global talent with the Kingdom's growing industries and giga projects.",
      image: "/images/projects/manpower-sourcing-hero.jpg",
      facts: [
        { value: "10,500+", label: "Target deployment" },
        { value: "720 Days", label: "Deployment period" },
        { value: "7 Countries", label: "Sourcing network" },
        { value: "SAR 500", label: "Net profit per worker per month" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "10,500+", label: "Target manpower deployment" },
        { value: "SAR 126M", label: "Annual profit potential at year five" },
        { value: "7 Countries", label: "International sourcing network" },
        { value: "6-8 Months", label: "Payback period" },
      ],
    },
    {
      type: "comparison",
      eyebrow: "Sourcing network",
      heading: "Seven countries, eight sectors",
      clusters: [
        {
          title: "South Asia",
          rows: [
            { label: "Bangladesh", value: "Active" },
            { label: "India", value: "Active" },
            { label: "Nepal", value: "Active" },
            { label: "Pakistan", value: "Active" },
            { label: "Sri Lanka", value: "Active" },
          ],
        },
        {
          title: "Southeast Asia",
          rows: [
            { label: "Philippines", value: "Active" },
            { label: "Indonesia", value: "Active" },
          ],
        },
        {
          title: "Sectors served",
          rows: [
            { label: "Construction and infrastructure", value: "Primary" },
            { label: "Oil, gas and energy", value: "Primary" },
            { label: "Hospitality and tourism", value: "Primary" },
            { label: "Healthcare", value: "Growth" },
            { label: "Manufacturing and aviation", value: "Growth" },
            { label: "Retail and pilgrimage services", value: "Growth" },
          ],
        },
      ],
    },
    {
      type: "economics",
      heading: "The unit economics, per worker per month",
      headline: [
        { value: "SAR 3,500", label: "Outsourcing fee received" },
        { value: "SAR 500", label: "Net profit per worker" },
        { value: "SAR 126M", label: "Annual profit at year five" },
        { value: "6-8 Months", label: "Payback period" },
      ],
      detail: [
        { label: "Salary payable", value: "SAR 1,200" },
        { label: "Iqama provision", value: "SAR 1,000" },
        { label: "Administrative expenses", value: "SAR 500" },
        { label: "Contingency", value: "SAR 300" },
        { label: "Initial investment", value: "SAR 5-20M+" },
        { label: "Working capital", value: "SAR 10-25M+" },
        { label: "Recruitment cost per worker", value: "SAR 3,000-15,000+" },
        { label: "Year 1, 1,000 workers", value: "SAR 6M profit" },
        { label: "Year 2, 5,000 workers", value: "SAR 30M profit" },
        { label: "Year 3, 10,000 workers", value: "SAR 60M profit" },
        { label: "Year 4, 16,000 workers", value: "SAR 96M profit" },
        { label: "Year 5, 21,000 workers", value: "SAR 126M profit" },
      ],
    },
    {
      type: "flow",
      heading: "Employer requirement to ongoing management",
      steps: [
        { label: "Requirement", body: "Employer specifies roles, volumes and timelines." },
        { label: "Source", body: "Recruitment across the seven-country network." },
        { label: "Screen", body: "Screening, verification and skills validation." },
        { label: "Process", body: "Documentation and visa processing." },
        { label: "Train", body: "Pre-departure training and orientation." },
        { label: "Mobilise", body: "Mobilisation and arrival into the Kingdom." },
        { label: "Deploy", body: "Worker deployment to the employer site." },
        { label: "Manage", body: "Payroll, WPS, visa tracking and ongoing reporting." },
      ],
    },
    {
      type: "pillars",
      heading: "The operating base behind the numbers",
      items: [
        {
          title: "Head office in KSA",
          icon: "buildings",
          image: "/images/projects/manpower-sourcing-office.jpg",
          body: "Presence in Jeddah, Riyadh and Dammam, close to the employers and the giga project sites that drive demand.",
        },
        {
          title: "Worker accommodation",
          icon: "users",
          body: "Large-scale housing and dining built for continuous occupancy.",
        },
        {
          title: "Transport fleet",
          icon: "truck",
          body: "More than 50 buses and coasters moving workers between housing and site.",
        },
        {
          title: "Technology and ERP",
          icon: "gauge",
          body: "Payroll, WPS, visa tracking and reporting on one system.",
        },
      ],
    },
    {
      type: "closing",
      heading: "Empowering businesses, enriching livelihoods",
      points: [
        "Experienced management team",
        "Strong global recruitment network",
        "Proven operational excellence",
        "Technology driven operations",
        "High profitability and a scalable model",
      ],
    },
  ],
};

export default project;
