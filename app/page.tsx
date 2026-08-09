import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import Audiences from "@/components/home/Audiences";
import HowItWorks from "@/components/home/HowItWorks";
import Traction from "@/components/home/Traction";
import AppMoment from "@/components/home/AppMoment";
import Ventures from "@/components/home/Ventures";
import JoinBand from "@/components/home/JoinBand";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Audiences />
      <HowItWorks />
      <Traction />
      <AppMoment />
      <Ventures />
      <JoinBand />
    </main>
  );
}
