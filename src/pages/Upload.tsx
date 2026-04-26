import { useRef, useState, ChangeEvent, DragEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Upload as UploadIcon, X, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Upload() {
  const nav = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const [origin, setOrigin] = useState("");
  const [roastTime, setRoastTime] = useState("12");
  const [temperature, setTemperature] = useState("215");
  const [moisture, setMoisture] = useState("11");

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!imageDataUrl) {
      toast.error("Add a bean photo first.");
      return;
    }
    const tempId = crypto.randomUUID();
    sessionStorage.setItem(
      `pending_${tempId}`,
      JSON.stringify({
        imageDataUrl,
        origin: origin || "Unknown",
        roastTime: Number(roastTime) || 0,
        temperature: Number(temperature) || 0,
        moisture: Number(moisture) || 0,
      })
    );
    nav(`/analysis/${tempId}`);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="font-script text-2xl text-accent">step one</p>
        <h1 className="mt-1 font-display text-5xl text-foreground md:text-6xl">show us your beans.</h1>
        <p className="mx-auto mt-3 max-w-md font-body text-muted-foreground">
          A clear top-down photo works best. Add your roast notes for sharper predictions.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
        {/* Dropzone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className={`relative flex min-h-[420px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-dashed bg-card p-8 text-center transition-all ${
            dragOver ? "border-accent bg-accent/5 scale-[1.01]" : "border-border hover:border-accent/60 hover:bg-secondary/40"
          }`}
        >
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onChange} />
          {imageDataUrl ? (
            <>
              <img src={imageDataUrl} alt="Selected beans" className="absolute inset-0 h-full w-full object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setImageDataUrl(""); }}
                className="absolute right-4 top-4 z-10 rounded-full bg-foreground/80 p-2 text-cream backdrop-blur-sm transition hover:bg-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 to-transparent p-6 text-cream">
                <p className="font-script text-2xl">looks delicious.</p>
                <p className="font-body text-sm text-cream/80">Click to swap or drop a new image.</p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-foreground text-cream">
                <ImagePlus className="h-9 w-9" />
              </div>
              <p className="font-display text-3xl text-foreground">drop your beans here</p>
              <p className="mt-2 font-body text-sm text-muted-foreground">or click to browse · PNG, JPG up to 10MB</p>
            </>
          )}
        </div>

        {/* Metadata */}
        <div className="space-y-5 rounded-[2.5rem] border border-border/60 bg-card p-7 shadow-soft">
          <div>
            <p className="font-script text-2xl text-accent">roast notes</p>
            <p className="font-body text-xs text-muted-foreground">All optional, but they help.</p>
          </div>

          <Field label="Bean origin">
            <Input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Ethiopia, Yirgacheffe" className="rounded-2xl bg-background" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Roast time (min)">
              <Input type="number" value={roastTime} onChange={(e) => setRoastTime(e.target.value)} className="rounded-2xl bg-background" />
            </Field>
            <Field label="Temperature (°C)">
              <Input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="rounded-2xl bg-background" />
            </Field>
          </div>

          <Field label="Moisture (%)">
            <Input type="number" value={moisture} onChange={(e) => setMoisture(e.target.value)} className="rounded-2xl bg-background" />
          </Field>

          <Button type="submit" size="lg" className="mt-2 w-full rounded-full bg-foreground text-cream shadow-warm hover:bg-foreground/90">
            <Sparkles className="mr-2 h-4 w-4" />
            Analyze beans
          </Button>
          <p className="text-center font-body text-xs text-muted-foreground">
            <UploadIcon className="mr-1 inline h-3 w-3" /> Processed locally · ~5 sec
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}