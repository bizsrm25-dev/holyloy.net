import PillarsBlock from "@/components/blocks/PillarsBlock";
import { PILLARS } from "@/lib/home";

export default function Pillars() {
  return (
    <div id="ecosystem">
      <PillarsBlock
        block={{
          type: "pillars",
          eyebrow: PILLARS.eyebrow,
          heading: PILLARS.heading,
          items: PILLARS.items,
        }}
      />
    </div>
  );
}
