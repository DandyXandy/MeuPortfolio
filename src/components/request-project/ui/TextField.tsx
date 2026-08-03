'use client';

import { forwardRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, Props>(({ label, error, ...props }, ref) => {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm text-mist/70">{label}</span>
      <input
        ref={ref}
        {...props}
        className={`rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-mist placeholder:text-mist/30 outline-none transition-colors focus:border-violet-light/60 ${
          error ? 'border-red-400/50' : 'border-white/10'
        }`}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
});

TextField.displayName = 'TextField';
export default TextField;
