import {
  Buildings, ChartLineUp, Cube, Factory, Gauge, Globe, Handshake, Leaf,
  Lightning, Package, ShieldCheck, ShoppingBag, Sparkle, Truck, Users,
} from "@phosphor-icons/react/dist/ssr";

const ICONS = {
  buildings: Buildings,
  chart: ChartLineUp,
  cube: Cube,
  factory: Factory,
  gauge: Gauge,
  globe: Globe,
  handshake: Handshake,
  leaf: Leaf,
  lightning: Lightning,
  package: Package,
  shield: ShieldCheck,
  shopping: ShoppingBag,
  sparkle: Sparkle,
  truck: Truck,
  users: Users,
} as const;

export type IconName = keyof typeof ICONS;

export function isIconName(value: string): value is IconName {
  return value in ICONS;
}

export default function Icon({ name, size = 24 }: { name: string; size?: number }) {
  if (!isIconName(name)) return null;
  const Glyph = ICONS[name];
  return <Glyph size={size} weight="regular" aria-hidden="true" />;
}
