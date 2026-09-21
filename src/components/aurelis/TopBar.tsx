type TopBarProps = {
  line1: string;
  line2: string;
};

export function TopBar({ line1, line2 }: TopBarProps) {
  return (
    <div className="bg-cyan text-cyan-foreground">
      <div className="shell flex flex-col items-center gap-0.5 py-2 text-center text-[13px] font-semibold sm:flex-row sm:justify-center sm:gap-6 sm:text-sm">
        <span>{line1}</span>
        <span className="opacity-95">{line2}</span>
      </div>
    </div>
  );
}
