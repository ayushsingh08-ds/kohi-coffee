import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--mocha))] to-[hsl(var(--espresso))] text-cream shadow-soft transition-transform group-hover:rotate-12">
        <span className="font-display text-2xl leading-none">b</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent animate-pulse-warm" />
      </span>
      <span className="font-display text-2xl leading-none text-foreground">
        Bean<span className="text-accent">DNA</span>
      </span>
    </Link>
  );
}