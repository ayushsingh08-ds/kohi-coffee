import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnalysis } from "@/lib/storage";
import { BeanAnalysis } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coffee, Droplets, Flame, ThermometerSun, Timer } from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis,
} from "recharts";

export default function Results() {
  const { id } = useParams();
  const [a, setA] = useState<BeanAnalysis | null>(null);

  useEffect(() => {
    if (id) setA(getAnalysis(id) ?? null);
  }, [id]);

  if (!a) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="font-display text-3xl text-foreground">Report not found.</p>
        <Button asChild className="mt-4 rounded-full"><Link to="/upload">Scan a bean</Link></Button>
      </div>
    );
  }

  const tier =
    a.qualityScore >= 88 ? { label: "Specialty", color: "sage" } :
    a.qualityScore >= 78 ? { label: "Premium", color: "accent" } :
    { label: "Commercial", color: "terracotta" };

  const flavorData = [
    { trait: "Acidity", value: a.flavor.acidity },
    { trait: "Aroma", value: a.flavor.aroma },
    { trait: "Sweetness", value: a.flavor.sweetness },
    { trait: "Body", value: a.flavor.body },
    { trait: "Bitterness", value: a.flavor.bitterness },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Button asChild variant="ghost" className="rounded-full">
          <Link to="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
        </Button>
        <Button asChild className="rounded-full bg-foreground text-cream hover:bg-foreground/90">
          <Link to="/upload">Scan another</Link>
        </Button>
      </div>

      <div className="mb-8">
        <p className="font-script text-2xl text-accent">your bean DNA</p>
        <h1 className="font-display text-5xl text-foreground md:text-6xl">{a.origin}</h1>
        <p className="mt-2 max-w-2xl font-body text-muted-foreground">{a.summary}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Quality + image */}
        <div className="md:col-span-5 space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] shadow-warm">
            <img src={a.imageDataUrl} alt="Analyzed beans" className="h-72 w-full object-cover" />
            {/* Heatmap overlay (simulated explainability) */}
            <div className="absolute inset-0 mix-blend-multiply"
              style={{
                background: `radial-gradient(circle at 30% 40%, hsl(12 80% 55% / 0.5) 0, transparent 18%),
                             radial-gradient(circle at 70% 60%, hsl(36 90% 55% / 0.45) 0, transparent 22%),
                             radial-gradient(circle at 55% 30%, hsl(95 50% 55% / 0.4) 0, transparent 16%)`,
              }}
            />
            <div className="absolute left-3 top-3 rounded-full bg-foreground/80 px-3 py-1 font-body text-xs font-semibold text-cream backdrop-blur-sm">
              Defect heatmap
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-[hsl(var(--mocha))] to-[hsl(var(--espresso))] p-7 text-cream shadow-warm">
            <div className="flex items-center justify-between">
              <p className="font-script text-xl text-accent">quality score</p>
              <span className="rounded-full bg-cream/15 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider">{tier.label}</span>
            </div>
            <div className="mt-2 font-display text-7xl">{a.qualityScore}<span className="font-display text-3xl text-cream/60">/100</span></div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-cream/15">
              <div className="h-full rounded-full bg-gradient-to-r from-accent to-caramel" style={{ width: `${a.qualityScore}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Stat icon={Flame} label="Roast class" value={a.roastClass} />
              <Stat icon={ThermometerSun} label="Temperature" value={`${a.temperature}°C`} />
              <Stat icon={Timer} label="Roast time" value={`${a.roastTime} min`} />
              <Stat icon={Droplets} label="Moisture" value={`${a.moisture}%`} />
            </div>
          </div>
        </div>

        {/* Flavor radar */}
        <div className="md:col-span-7 space-y-6">
          <div className="rounded-[2rem] border border-border/60 bg-card p-7 shadow-soft">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-script text-xl text-accent">flavor radar</p>
                <h3 className="font-display text-3xl text-foreground">predicted cup profile</h3>
              </div>
            </div>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={flavorData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="trait" tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="profile" dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.45} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {a.flavorNotes.map((n) => (
                <span key={n} className="rounded-full bg-secondary px-3 py-1 font-body text-xs font-semibold text-foreground">{n}</span>
              ))}
            </div>
          </div>

          {/* Defects */}
          <div className="rounded-[2rem] border border-border/60 bg-card p-7 shadow-soft">
            <p className="font-script text-xl text-accent">what we found</p>
            <h3 className="font-display text-3xl text-foreground">defect summary</h3>
            <div className="mt-4 space-y-3">
              {a.defects.map((d) => (
                <div key={d.type} className="flex items-start justify-between gap-4 rounded-2xl border border-border/40 bg-background/50 p-4">
                  <div>
                    <p className="font-display text-xl text-foreground">{d.type}</p>
                    <p className="font-body text-sm text-muted-foreground">{d.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block rounded-full px-3 py-1 font-body text-[10px] font-bold uppercase ${
                      d.severity === "high" ? "bg-destructive/15 text-destructive" :
                      d.severity === "medium" ? "bg-accent/20 text-accent-foreground" :
                      "bg-sage/20 text-foreground"
                    }`}>{d.severity}</span>
                    <p className="mt-1 font-display text-2xl text-foreground">{d.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brew recipe */}
        <div className="md:col-span-12">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[hsl(var(--cream))] via-secondary to-[hsl(var(--cream))] p-8 shadow-soft">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-script text-2xl text-accent">your brew recipe</p>
                <h3 className="font-display text-4xl text-foreground md:text-5xl">{a.brew.method}</h3>
                <p className="mt-2 max-w-md font-body text-sm text-muted-foreground">{a.brew.notes}</p>
              </div>
              <Coffee className="hidden h-20 w-20 text-foreground/15 md:block" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <BrewStat label="Grind" value={a.brew.grindSize} />
              <BrewStat label="Water temp" value={`${a.brew.waterTempC}°C`} />
              <BrewStat label="Ratio (coffee:water)" value={a.brew.ratio} />
              <BrewStat label="Brew time" value={`${a.brew.brewTimeSec}s`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-accent" />
      <div>
        <p className="font-body text-[10px] uppercase tracking-wider text-cream/60">{label}</p>
        <p className="font-display text-base">{value}</p>
      </div>
    </div>
  );
}

function BrewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background/70 p-4">
      <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl text-foreground">{value}</p>
    </div>
  );
}