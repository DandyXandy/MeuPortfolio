'use client';

export default function ToggleField({
  label,
  value,
  onChange,
  yesLabel,
  noLabel,
}: {
  label: string;
  value: string;
  onChange: (value: 'yes' | 'no') => void;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
      <span className="text-sm text-mist/80">{label}</span>
      <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-ink-950 p-1">
        <button
          type="button"
          onClick={() => onChange('yes')}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            value === 'yes' ? 'bg-aurora-gradient text-white' : 'text-mist/50 hover:text-mist'
          }`}
        >
          {yesLabel}
        </button>
        <button
          type="button"
          onClick={() => onChange('no')}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            value === 'no' ? 'bg-white/15 text-mist' : 'text-mist/50 hover:text-mist'
          }`}
        >
          {noLabel}
        </button>
      </div>
    </div>
  );
}
