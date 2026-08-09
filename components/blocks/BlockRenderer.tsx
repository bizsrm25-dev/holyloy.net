import type { Block } from "@/lib/types";
import HeroBlock from "./HeroBlock";
import FigureBandBlock from "./FigureBandBlock";
import PillarsBlock from "./PillarsBlock";
import PortfolioBlock from "./PortfolioBlock";
import FlowBlock from "./FlowBlock";
import ComparisonBlock from "./ComparisonBlock";
import EconomicsBlock from "./EconomicsBlock";
import NarrativeBlock from "./NarrativeBlock";
import TimelineBlock from "./TimelineBlock";
import ClosingBlock from "./ClosingBlock";

function renderBlock(block: Block, key: number) {
  switch (block.type) {
    case "hero":       return <HeroBlock key={key} block={block} />;
    case "figureBand": return <FigureBandBlock key={key} block={block} />;
    case "pillars":    return <PillarsBlock key={key} block={block} />;
    case "portfolio":  return <PortfolioBlock key={key} block={block} />;
    case "flow":       return <FlowBlock key={key} block={block} />;
    case "comparison": return <ComparisonBlock key={key} block={block} />;
    case "economics":  return <EconomicsBlock key={key} block={block} />;
    case "narrative":  return <NarrativeBlock key={key} block={block} />;
    case "timeline":   return <TimelineBlock key={key} block={block} />;
    case "closing":    return <ClosingBlock key={key} block={block} />;
    default: {
      const exhaustive: never = block;
      throw new Error(`Unhandled block: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map(renderBlock)}</>;
}
