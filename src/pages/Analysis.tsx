import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateMockAnalysis } from "@/lib/mockAnalysis";
import { saveAnalysis } from "@/lib/storage";
import { Eye, Microscope, Coffee, CheckCircle2 } from "lucide-react";

const STAGES = [
  { icon: Eye, label: "Scanning bean structure", detail: "Locating beans · isolating defects" },
  { icon: Microscope, label: "Detecting defects", detail: "Analyzing color, shape, surface" },
  { icon: Coffee, label: "Predicting flavor & brew", detail: "Cross-referencing roast profile" },
];

export default function Analysis() {
  const { id } = useParams();
  const nav = useNavigate();
  const [stage, setStage] = useState(0);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    const raw = sessionStorage.getItem(`pending_${id}`);
    if (!raw) {
      nav("/upload");
      return;
    }
    const input = JSON.parse(raw);
    setImageDataUrl(input.imageDataUrl);

    const t1 = setTimeout(() => setStage(1), 1100);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 3300);
    const t4 = setTimeout(() => {
      const analysis = generateMockAnalysis(input);
      saveAnalysis(analysis);
      sessionStorage.removeItem(`pending_${id}`);
      nav(`/results/${analysis.id}`, { replace: true });
    }, 3900);
    return () => { [t1, t2, t3, t4].forEach(clearTimeout); };
  }, [id, nav]);

  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <p className="font-script text-2xl text-accent">brewing insights</p>
        <h1 className="mt-1 font-display text-5xl text-foreground md:text-6xl">reading the leaves...</h1>
      </div>

      <div className="mt-10 grid w-full gap-8 md:grid-cols-[280px_1fr] md:items-center">
        {imageDataUrl && (
          <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-[2rem] shadow-warm">
            <img src={imageDataUrl} alt="Analyzing" className="h-full w-full object-cover" />
            {/* Scanning overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0 animate-scan-line" />
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-[1px]" />
            <div className="absolute inset-3 rounded-[1.6rem] border-2 border-dashed border-cream/60" />
          </div>
        )}

        <div className="space-y-3">
          {STAGES.map((s, i) => {
            const status: "done" | "active" | "wait" =
              stage > i ? "done" : stage === i ? "active" : "wait";
            const Icon = status === "done" ? CheckCircle2 : s.icon;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                  status === "active"
                    ? "border-accent bg-accent/10 shadow-soft"
                    : status === "done"
                    ? "border-sage/40 bg-sage/10"
                    : "border-border/50 bg-card opacity-60"
                }`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  status === "active" ? "bg-foreground text-cream animate-pulse" :
                  status === "done" ? "bg-sage/30 text-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-xl text-foreground">{s.label}</p>
                  <p className="font-body text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}