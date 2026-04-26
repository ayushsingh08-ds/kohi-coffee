import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Droplets, Eye, Sparkles, TrendingUp, Zap } from "lucide-react";
import heroBeans from "@/assets/hero-beans.jpg";
import singleBean from "@/assets/single-bean.jpg";
import roastLevels from "@/assets/roast-levels.jpg";

export default function Landing() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto grid items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered coffee intelligence
            </span>
            <h1 className="font-display text-6xl leading-[0.95] text-foreground md:text-7xl lg:text-8xl">
              decode every <span className="text-gradient-roast">bean.</span>
            </h1>
            <p className="max-w-md font-body text-lg leading-relaxed text-muted-foreground">
              Snap a photo of your beans. BeanDNA spots defects, predicts the
              cup profile, and dials in your perfect brew — in seconds.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full bg-foreground px-8 text-cream shadow-warm hover:bg-foreground/90">
                <Link to="/upload">
                  Start scanning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20 px-8 hover:bg-secondary">
                <Link to="/dashboard">See dashboard</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 font-body text-sm text-muted-foreground">
              <div><span className="font-display text-2xl text-foreground">95%</span> defect accuracy</div>
              <div className="h-8 w-px bg-border" />
              <div><span className="font-display text-2xl text-foreground">&lt;5s</span> per scan</div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[3rem] shadow-warm">
              <img
                src={heroBeans}
                alt="Roasted coffee beans on warm cream background"
                width={1600}
                height={1200}
                className="h-[520px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-espresso/30 via-transparent to-transparent" />
            </div>
            {/* Floating quality card */}
            <div className="absolute -bottom-6 -left-6 w-56 rounded-3xl bg-card p-5 shadow-warm md:-left-12">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quality</span>
                <span className="rounded-full bg-sage/20 px-2 py-0.5 font-body text-[10px] font-bold text-foreground">SPECIALTY</span>
              </div>
              <div className="mt-2 font-display text-5xl text-foreground">92<span className="font-display text-2xl text-muted-foreground">/100</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-accent to-caramel" />
              </div>
            </div>
            {/* Floating flavor tag */}
            <div className="absolute -right-4 top-8 rotate-6 rounded-2xl bg-foreground px-4 py-3 text-cream shadow-warm md:-right-8">
              <p className="font-script text-xl leading-none">tasting notes</p>
              <p className="mt-1 font-body text-sm">blueberry · jasmine · honey</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-border/50 bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-script text-3xl text-accent">what we look for</p>
            <h2 className="mt-2 font-display text-5xl text-foreground md:text-6xl">five senses, one scan.</h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-cream transition-transform group-hover:rotate-6">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-3xl text-foreground">{f.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="py-24">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="relative">
            <img
              src={roastLevels}
              alt="Three roast levels in ceramic bowls"
              width={1200}
              height={900}
              loading="lazy"
              className="h-auto w-full rounded-[3rem] shadow-warm"
            />
            <img
              src={singleBean}
              alt="Macro view of a single bean"
              width={800}
              height={800}
              loading="lazy"
              className="absolute -bottom-8 -right-6 hidden h-44 w-44 rounded-full border-8 border-background object-cover shadow-warm md:block"
            />
          </div>
          <div>
            <p className="font-script text-3xl text-accent">how it works</p>
            <h2 className="mt-2 font-display text-5xl text-foreground md:text-6xl">three sips to clarity.</h2>
            <ol className="mt-8 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-display text-2xl text-accent-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{s.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="container mx-auto overflow-hidden rounded-[3rem] bg-gradient-to-br from-[hsl(var(--espresso))] to-[hsl(var(--mocha))] px-8 py-20 text-center text-cream shadow-warm">
          <p className="font-script text-3xl text-accent">ready when you are</p>
          <h2 className="mt-2 font-display text-5xl md:text-7xl">your first scan is free.</h2>
          <p className="mx-auto mt-4 max-w-md font-body text-cream/70">
            Upload a bean photo and meet your coffee's DNA in under five seconds.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-accent px-10 text-accent-foreground hover:bg-caramel">
            <Link to="/upload">
              <Coffee className="mr-2 h-5 w-5" /> Scan my beans
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

const features = [
  {
    title: "defect eye",
    desc: "Computer vision flags broken beans, quakers, insect damage and more — with confidence heatmaps you can trust.",
    icon: Eye,
  },
  {
    title: "flavor radar",
    desc: "Predict acidity, sweetness, body, bitterness and aroma before you ever brew a cup.",
    icon: TrendingUp,
  },
  {
    title: "brew genie",
    desc: "Get grind size, water temp, ratio and time tuned to this exact batch — pour-over to espresso.",
    icon: Droplets,
  },
];

const steps = [
  { title: "snap a photo", desc: "Drag in an image of your green or roasted beans. Phone camera works great." },
  { title: "add roast notes", desc: "Origin, roast time and temperature help us sharpen the prediction." },
  { title: "sip the insights", desc: "Quality score, defect map, flavor radar and brew recipe — instantly." },
];