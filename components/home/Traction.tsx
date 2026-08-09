import FigureBandBlock from "@/components/blocks/FigureBandBlock";
import { TRACTION } from "@/lib/home";

export default function Traction() {
  return (
    <FigureBandBlock block={{ type: "figureBand", tone: "dark", figures: TRACTION }} />
  );
}
