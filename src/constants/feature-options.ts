import type { LucideIcon } from "lucide-react";
import { Split, Wallet, LineChart } from "lucide-react";

export interface IFeature {
  id: string;
  label: string;
  logo: LucideIcon;
}

export const features: IFeature[] = [
  {
    id: "split-smart",
    label: "Split Smart",
    logo: Split,
  },
  {
    id: "settle-fast",
    label: "Settle Fast",
    logo: Wallet,
  },
  {
    id: "track-spend",
    label: "Track Spend",
    logo: LineChart,
  },
];
