// components/KpiCard.tsx
import { ArrowUpRight, ArrowDownRight } from "lucide-react"; 
import clsx from "clsx";
import type { ReactNode } from "react";

type KpiCardProps = {
  title: string;
  value: string | number;
  change?: number; // percentage
  icon?: ReactNode;
  prefix?: string; // $ ₹ etc
  suffix?: string; // M K %
};

export default function KpiCard({
  title,
  value,
  change,
  icon,
  prefix,
  suffix,
}: KpiCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{title}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          {prefix}
          {value}
          {suffix}
        </h2>

        {change !== undefined && (
          <div
            className={clsx(
              "flex items-center text-sm font-medium",
              isPositive && "text-green-600",
              isNegative && "text-red-600",
              !isPositive && !isNegative && "text-gray-500"
            )}
          >
            {isPositive && <ArrowUpRight size={16} />}
            {isNegative && <ArrowDownRight size={16} />}
            <span className="ml-1">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}