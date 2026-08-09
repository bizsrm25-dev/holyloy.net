import FlowBlock from "@/components/blocks/FlowBlock";
import { HOW_IT_WORKS } from "@/lib/home";

export default function HowItWorks() {
  return (
    <div id="how-it-works">
      <FlowBlock
        block={{
          type: "flow",
          heading: HOW_IT_WORKS.heading,
          steps: HOW_IT_WORKS.steps,
        }}
      />
    </div>
  );
}
