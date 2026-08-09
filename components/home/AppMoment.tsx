import NarrativeBlock from "@/components/blocks/NarrativeBlock";
import { APP_MOMENT } from "@/lib/home";

export default function AppMoment() {
  return (
    <NarrativeBlock
      block={{
        type: "narrative",
        heading: APP_MOMENT.heading,
        body: APP_MOMENT.body,
        image: APP_MOMENT.image,
        pull: APP_MOMENT.pull,
      }}
    />
  );
}
