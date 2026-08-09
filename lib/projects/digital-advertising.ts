import type { Project } from "@/lib/types";

const project: Project = {
  slug: "digital-advertising",
  name: "Digital Advertising and Electronic Media",
  sector: "services",
  thesis:
    "A digital advertising and electronic media platform delivering brand communication across Saudi Arabia's fastest growing markets.",
  cardImage: "/images/projects/digital-advertising-card.jpg",
  cardFigures: [
    { value: "USD 5-7 Million", label: "Estimated equipment investment" },
    { value: "6,000+ Nits", label: "Outdoor LED brightness" },
  ],
  blocks: [
    {
      type: "hero",
      tagline: "Next generation digital advertising",
      thesis:
        "A digital advertising and electronic media platform delivering powerful brand communication across Saudi Arabia.",
      image: "/images/projects/digital-advertising-hero.jpg",
      facts: [
        { value: "USD 5-7 Million", label: "Estimated equipment investment" },
        { value: "6,000+ Nits", label: "Outdoor LED brightness" },
        { value: "4K / 8K", label: "Video production" },
        { value: "4G / 5G", label: "Connectivity across the Kingdom" },
      ],
    },
    {
      type: "pillars",
      eyebrow: "Where the demand comes from",
      heading: "Six markets opening at once",
      items: [
        {
          title: "Giga projects and real estate",
          icon: "buildings",
          image: "/images/projects/digital-advertising-giga.jpg",
          body: "Vision 2030 mega developments open branding opportunities at a scale the market has not seen before.",
        },
        {
          title: "Entertainment and events",
          icon: "sparkle",
          body: "A new entertainment sector creating recurring campaign demand.",
        },
        {
          title: "Tourism and hospitality",
          icon: "globe",
          body: "Hotels, resorts and destinations competing for visitor attention.",
        },
        {
          title: "Oil, gas and energy",
          icon: "lightning",
          body: "Corporate communication for the Kingdom's largest industrial employers.",
        },
        {
          title: "Retail and commercial",
          icon: "shopping",
          body: "In-store and mall-based digital display networks.",
        },
        {
          title: "Healthcare and services",
          icon: "shield",
          body: "Provider and service-sector brand building.",
        },
      ],
    },
    {
      type: "portfolio",
      heading: "Four advertising surfaces",
      categories: [
        {
          title: "Outdoor advertising",
          image: "/images/projects/digital-advertising-outdoor.jpg",
          items: [
            "Large format LED billboards",
            "Digital signage towers",
            "Transparent LED screens",
            "Highway and intersection displays",
          ],
        },
        {
          title: "Indoor advertising",
          image: "/images/projects/digital-advertising-indoor.jpg",
          items: [
            "LED video walls",
            "Large format LCD and LED displays",
            "Interactive touchscreen kiosks",
            "Retail, hotel and elevator displays",
          ],
        },
        {
          title: "Mobile and event",
          image: "/images/projects/digital-advertising-mobile.jpg",
          items: [
            "Mobile LED trucks and vans",
            "Modular LED screens",
            "Digital standees",
            "Event and exhibition displays",
          ],
        },
        {
          title: "Creative production",
          image: "/images/projects/digital-advertising-production.jpg",
          items: [
            "Video editing and motion graphics",
            "3D modelling and animation",
            "4K and 8K video production",
            "Drone and aerial filming",
          ],
        },
      ],
    },
    {
      type: "comparison",
      heading: "The technical stack behind the screens",
      clusters: [
        {
          title: "Compute",
          rows: [
            { label: "Workstation RAM", value: "32GB+" },
            { label: "Graphics", value: "NVIDIA RTX GPUs" },
            { label: "Storage", value: "Network attached storage" },
          ],
        },
        {
          title: "Network",
          rows: [
            { label: "Connectivity", value: "4G / 5G" },
            { label: "Switching", value: "Industrial network switches" },
            { label: "Power", value: "UPS backup" },
          ],
        },
        {
          title: "Display",
          rows: [
            { label: "Outdoor brightness", value: "6,000+ nits" },
            { label: "Production resolution", value: "4K / 8K" },
            { label: "Formats", value: "Outdoor, indoor, mobile, event" },
          ],
        },
        {
          title: "Systems",
          rows: [
            { label: "Scheduling", value: "Content management system" },
            { label: "Operations", value: "Enterprise ERP" },
            { label: "Clients", value: "Enterprise CRM" },
          ],
        },
      ],
    },
    {
      type: "flow",
      heading: "Consultation to continuous optimisation",
      steps: [
        { label: "Consult", body: "Client consultation and campaign objectives." },
        { label: "Strategise", body: "Creative strategy and media planning." },
        { label: "Produce", body: "Content production across video, 3D and aerial." },
        { label: "Schedule", body: "CMS scheduling and distribution to the network." },
        { label: "Deploy", body: "Display deployment and installation." },
        { label: "Optimise", body: "Monitoring and performance optimisation." },
        { label: "Maintain", body: "Maintenance and ongoing support." },
      ],
    },
    {
      type: "economics",
      heading: "What the platform costs to stand up",
      headline: [
        { value: "USD 5-7 Million", label: "Estimated equipment investment" },
        { value: "6,000+ Nits", label: "Outdoor LED brightness" },
        { value: "32GB+", label: "Workstation memory" },
        { value: "4K / 8K", label: "Production capability" },
      ],
      detail: [
        { label: "Return on visibility", value: "Maximum impact" },
        { label: "Business scalability", value: "High growth potential" },
        { label: "Connectivity", value: "4G / 5G across Saudi Arabia" },
        { label: "Format coverage", value: "Outdoor, indoor, mobile and event" },
      ],
    },
    {
      type: "closing",
      heading: "Building stronger brands, creating lasting impressions",
      points: [
        "Deep understanding of the Saudi market",
        "Advanced technology and creative excellence",
        "End-to-end solution from concept to execution",
        "Proven experience with leading brands",
        "High impact visibility aligned with Vision 2030",
      ],
    },
  ],
};

export default project;
