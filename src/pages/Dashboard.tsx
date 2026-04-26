import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHistory } from "@/lib/storage";
import { BeanAnalysis } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Coffee, FileBarChart, Sparkles, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [items, setItems] = useState<BeanAnalysis[]>([]);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  const total = items.length;
  const avg = total ? Math.round(items.reduce((s, x) => s + x.qualityScore, 0) / total) : 0;
  const specialty = items.filter((x) => x.qualityScore >= 88).length;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-script text-2xl text-accent">your roastery</p>
          <h1 className="font-display text-5xl text-foreground md:text-6xl">batch dashboard.</h1>
        </div>
        <Button asChild className="rounded-full bg-foreground text-cream hover:bg-foreground/90">
          <Link to="/upload"><Sparkles className="mr-2 h-4 w-4" />New scan</Link>
        </Button>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Total scans" value={String(total)} icon={FileBarChart} />
        <StatCard label="Avg quality" value={total ? `${avg}/100` : "—"} icon={TrendingUp} />
        <StatCard label="Specialty grade" value={String(specialty)} icon={Coffee} />
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-soft">
        <div className="border-b border-border/50 p-6">
          <p className="font-script text-xl text-accent">recent batches</p>
          <h2 className="font-display text-3xl text-foreground">history</h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Coffee className="h-9 w-9 text-foreground/40" />
            </div>
            <p className="font-display text-3xl text-foreground">no batches yet.</p>
            <p className="mt-2 max-w-sm font-body text-sm text-muted-foreground">
              Run your first scan to start building your batch library.
            </p>
            <Button asChild className="mt-5 rounded-full bg-foreground text-cream hover:bg-foreground/90">
              <Link to="/upload">Start scanning</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {items.map((b) => (
              <Link
                key={b.id}
                to={`/results/${b.id}`}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary/40"
              >
                <img src={b.imageDataUrl} alt="" className="h-16 w-16 rounded-2xl object-cover shadow-soft" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-xl text-foreground">{b.origin}</p>
                  <p className="font-body text-xs text-muted-foreground">
                    {b.roastClass} roast · {new Date(b.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="hidden flex-wrap gap-1 md:flex">
                  {b.flavorNotes.slice(0, 2).map((n) => (
                    <span key={n} className="rounded-full bg-secondary px-2 py-1 font-body text-[10px] font-semibold text-foreground">{n}</span>
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl text-foreground">{b.qualityScore}</p>
                  <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">score</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-cream">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 font-display text-5xl text-foreground">{value}</p>
    </div>
  );
}