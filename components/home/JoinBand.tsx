import ClosingBlock from "@/components/blocks/ClosingBlock";
import { JOIN } from "@/lib/home";

export default function JoinBand() {
  return (
    <ClosingBlock
      block={{ type: "closing", heading: JOIN.heading, points: JOIN.points }}
    />
  );
}
