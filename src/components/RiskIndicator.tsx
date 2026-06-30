// Shows a simple risk indicator based on time until appointment

import type { RiskLevel } from "../types/booking";

interface RiskIndicatorProps {
  risk: RiskLevel;
}

export function RiskIndicator({ risk }: RiskIndicatorProps) {
  const map: Record<RiskLevel, { label: string; color: string }> = {
    normal: {
      label: "Normal",
      color: "text-slate-300"
    },
    medium: {
      label: "Medium risk",
      color: "text-yellow-300"
    },
    high: {
      label: "High risk",
      color: "text-red-400"
    }
  };

  const { label, color } = map[risk];

  return <span className={`text-xs font-medium ${color}`}>{label}</span>;
}