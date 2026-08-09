import type { Project } from "@/lib/types";

const project: Project = {
  slug: "smart-taxi",
  name: "Smart Taxi",
  sector: "mobility",
  thesis:
    "A modern taxi operation across four Saudi cities, starting with 500 new vehicles under app-based smart dispatch.",
  cardImage: "/images/projects/smart-taxi-card.jpg",
  cardFigures: [
    { value: "SAR 4.38B", label: "Addressable market annually" },
    { value: "500", label: "Initial fleet" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Modern, reliable, safe, always",
      thesis:
        "A modern taxi initiative across major Saudi cities, with an initial fleet of 500 new 1,500cc vehicles under smart dispatch.",
      image: "/images/projects/smart-taxi-hero.jpg",
      facts: [
        { value: "500", label: "Initial fleet" },
        { value: "4 Cities", label: "Target network" },
        { value: "600", label: "Professional drivers" },
        { value: "3 Shifts", label: "Round the clock operations" },
      ],
    },
    {
      type: "figureBand",
      tone: "dark",
      figures: [
        { value: "SAR 4.38B", label: "Addressable market annually" },
        { value: "8-12%", label: "Target market share" },
        { value: "SAR 350-525M", label: "Potential annual revenue" },
        { value: "78%", label: "Prefer app-based booking" },
      ],
    },
    {
      type: "comparison",
      eyebrow: "Market by city",
      heading: "Four cities, four different arguments",
      clusters: [
        {
          title: "Riyadh",
          rows: [
            { label: "Population", value: "7.6 Million" },
            { label: "Daily taxi trips", value: "400,000" },
            { label: "Annual market size", value: "SAR 2.4 Billion" },
            { label: "Annual growth", value: "8-10%" },
          ],
        },
        {
          title: "Jeddah",
          rows: [
            { label: "Population", value: "4.7 Million" },
            { label: "Daily taxi trips", value: "250,000" },
            { label: "Annual market size", value: "SAR 1.5 Billion" },
            { label: "Annual growth", value: "6-8%" },
          ],
        },
        {
          title: "Dammam",
          rows: [
            { label: "Population", value: "1.5 Million" },
            { label: "Daily taxi trips", value: "80,000" },
            { label: "Annual market size", value: "SAR 480 Million" },
            { label: "Annual growth", value: "5-7%" },
          ],
        },
        {
          title: "Mecca",
          rows: [
            { label: "Demand pattern", value: "Hajj and Umrah peaks" },
            { label: "Base demand", value: "Year-round" },
            { label: "Trip type", value: "Pilgrimage transport" },
          ],
        },
      ],
    },
    {
      type: "pillars",
      heading: "Why the market holds up",
      items: [
        {
          title: "Urbanisation",
          icon: "buildings",
          image: "/images/projects/smart-taxi-city.jpg",
          body: "Cities and population keep growing, and with them the number of trips that need covering every day.",
        },
        {
          title: "Tourism and pilgrimage",
          icon: "globe",
          body: "Hajj, Umrah and tourism drive consistent, predictable demand peaks.",
        },
        {
          title: "Digital shift",
          icon: "gauge",
          body: "Customers prefer app-based booking, and 78 percent already expect it.",
        },
        {
          title: "Future ready",
          icon: "lightning",
          body: "A clear path into electric vehicles and green mobility.",
        },
      ],
    },
    {
      type: "flow",
      heading: "How a trip works",
      steps: [
        { label: "Book", body: "App, call centre or walk-in." },
        { label: "Dispatch", body: "AI-guided allocation to the nearest available vehicle." },
        { label: "Ride", body: "GPS tracking and monitoring throughout the journey." },
        { label: "Pay", body: "Cash, card or digital wallet." },
        { label: "Grow", body: "Operations and partnerships compound revenue." },
      ],
    },
    {
      type: "economics",
      heading: "Eighty-five million in, five years out",
      headline: [
        { value: "SAR 84.7M", label: "Total initial investment" },
        { value: "SAR 322.75M", label: "Five-year revenue" },
        { value: "SAR 128.49M", label: "Five-year net income" },
        { value: "22%", label: "Projected IRR" },
      ],
      detail: [
        { label: "Vehicle fleet and setup", value: "SAR 47.0M" },
        { label: "Infrastructure and business setup", value: "SAR 26.2M" },
        { label: "Human resources and initial payroll", value: "SAR 11.5M" },
        { label: "Average five-year ROI", value: "52%" },
        { label: "Payback period", value: "3.5 years" },
        { label: "Year 1 revenue, 300 vehicles at 70%", value: "SAR 47.25M" },
        { label: "Year 3 revenue, 500 vehicles at 80%", value: "SAR 90.0M" },
        { label: "Year 5 revenue, 500 vehicles at 90%", value: "SAR 101.125M" },
        { label: "Base fare", value: "SAR 5" },
        { label: "Average trip value", value: "SAR 25" },
      ],
    },
    {
      type: "timeline",
      heading: "Eighteen months to full network",
      phases: [
        {
          horizon: "Months 1 to 6",
          title: "Soft launch",
          body: "100 vehicles in the primary market, corporate and airport contracts, limited marketing.",
        },
        {
          horizon: "Months 6 to 10",
          title: "Market entry",
          body: "300 vehicles across three cities, public marketing campaign and mobile app launch.",
        },
        {
          horizon: "Months 10 to 18",
          title: "Market expansion",
          body: "500 vehicles deployed, additional services and premium vehicle options.",
        },
      ],
    },
    {
      type: "closing",
      heading: "Moving Saudi Arabia forward",
      points: [
        "Four revenue streams beyond the meter",
        "Corporate contracts with businesses, hotels and airports",
        "In-cab and exterior advertising revenue",
        "Premium rides, airport express and delivery",
        "Smart mobility for a better tomorrow",
      ],
    },
  ],
};

export default project;
