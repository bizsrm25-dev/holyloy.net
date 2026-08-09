import type { Figure, Pillar, Step } from "@/lib/types";

export const HERO = {
  headline: "Loyalty is royalty.",
  accent: "royalty.",
  subtext:
    "A smarter loyalty ecosystem that turns everyday spending into meaningful rewards.",
  image: "/images/home/hero.jpg",
};

export const PILLARS: { eyebrow: string; heading: string; items: Pillar[] } = {
  eyebrow: "What is HolyLoy",
  heading: "More than a loyalty program. A value ecosystem.",
  items: [
    {
      title: "Loyalty",
      icon: "sparkle",
      image: "/images/home/pillar-loyalty.jpg",
      body: "Build lasting relationships between businesses and the customers who keep coming back.",
    },
    {
      title: "Rewards",
      icon: "package",
      body: "Turn customer engagement into valuable and tangible benefits.",
    },
    {
      title: "Digital commerce",
      icon: "shopping",
      body: "Connect loyalty with modern shopping and digital experiences.",
    },
    {
      title: "Data and intelligence",
      icon: "chart",
      body: "Use technology to deliver personalised experiences and smarter decisions.",
    },
    {
      title: "Sustainability",
      icon: "leaf",
      image: "/images/home/pillar-sustainability.jpg",
      body: "Reward responsible actions and support a circular economy.",
    },
  ],
};

export const AUDIENCES = [
  {
    title: "For consumers",
    image: "/images/home/audience-consumers.jpg",
    body: "Earn rewards from everyday activities and enjoy exclusive benefits.",
  },
  {
    title: "For businesses",
    image: "/images/home/audience-businesses.jpg",
    body: "Build stronger relationships, increase retention and grow your business.",
  },
  {
    title: "For communities",
    image: "/images/home/audience-communities.jpg",
    body: "Create shared value and strengthen local participation together.",
  },
  {
    title: "For sustainability",
    image: "/images/home/audience-sustainability.jpg",
    body: "Connect loyalty with environmental responsibility and a better impact.",
  },
];

export const HOW_IT_WORKS: { heading: string; steps: Step[] } = {
  heading: "A simple cycle of value",
  steps: [
    { label: "Shop", body: "Shop at participating businesses and services." },
    { label: "Earn", body: "Earn loyalty points or rewards for eligible transactions." },
    {
      label: "Engage",
      body: "Stay engaged with offers, activities and personalised experiences.",
    },
    { label: "Redeem", body: "Redeem your rewards for benefits and opportunities." },
    { label: "Return", body: "Enjoy more value and come back for even better experiences." },
  ],
};

export const TRACTION: Figure[] = [
  { value: "100K+", label: "Happy consumers" },
  { value: "3K+", label: "Partner businesses" },
  { value: "2M+", label: "Rewards redeemed" },
  { value: "500+ Ton", label: "Waste recycled" },
];

export const APP_MOMENT = {
  heading: "It is a relationship. It is a better future.",
  body:
    "Loyalty should not end at a discount. HolyLoy carries the relationship between a customer and a business across every transaction, rewards the choices that matter, and returns value to the communities both of them live in.",
  image: "/images/home/app.jpg",
  pull: { value: "2M+", label: "Rewards redeemed to date" },
};

export const VENTURES = {
  eyebrow: "The portfolio",
  heading: "Twelve ventures across the Kingdom",
};

export const JOIN = {
  heading: "One ecosystem. Shared value.",
  points: [
    "Loyalty that works for consumers and for the businesses serving them",
    "A single ecosystem rather than a wallet full of disconnected cards",
    "Rewards tied to sustainability, not just to spend",
    "Value that returns to the communities it came from",
  ],
};
