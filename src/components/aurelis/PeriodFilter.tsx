import { Input } from "@/components/ui/input";
import { PERIODS, PERIOD_LABELS, type Period } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

export function PeriodFilter({
  period,
  onPeriodChange,
  customDate,
  onCustomDateChange,
}: {
  period: Period;
  onPeriodChange: (period: Period) => void;
  customDate: string;
  onCustomDateChange: (date: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap gap-1 rounded-2xl border border-border bg-card p-1 shadow-soft">
        {PERIODS.map((item) => (
          <button
            key={item}
            onClick={() => onPeriodChange(item)}
            className={cn(
              "rounded-xl px-3 py-2 text-xs font-bold transition sm:text-sm",
              period === item
                ? "bg-success text-success-foreground"
                : "text-muted-foreground hover:bg-secondary",
            )}
          >
            {PERIOD_LABELS[item]}
          </button>
        ))}
      </div>
      {period === "data" && (
        <Input
          type="date"
          value={customDate}
          onChange={(e) => onCustomDateChange(e.target.value)}
          className="h-11 w-auto"
        />
      )}
    </div>
  );
}
