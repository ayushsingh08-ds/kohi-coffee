import { BeanAnalysis } from "./types";

// Deterministic-feeling mock generator. Structured so we can swap in a real
// /analyze endpoint or Lovable AI vision call later without touching pages.
export function generateMockAnalysis(input: {
  imageDataUrl: string;
  origin: string;
  roastTime: number;
  temperature: number;
  moisture: number;
}): BeanAnalysis {
  const seed =
    (input.origin.length * 7 + input.roastTime + input.temperature) % 100;
  const quality = Math.min(98, Math.max(62, 78 + (seed % 20) - 6));

  const allDefects = [
    { type: "Black bean", severity: "high" as const, description: "Over-fermented or dead cherry. Adds harsh bitterness." },
    { type: "Sour bean", severity: "medium" as const, description: "Vinegar / unpleasant sourness in the cup." },
    { type: "Insect damage", severity: "low" as const, description: "Small bore holes from coffee borers." },
    { type: "Quaker", severity: "low" as const, description: "Underdeveloped bean — pale and papery." },
    { type: "Broken bean", severity: "low" as const, description: "Mechanical damage during processing." },
  ];
  const defectCount = quality > 90 ? 1 : quality > 80 ? 2 : 3;
  const defects = allDefects.slice(0, defectCount).map((d) => ({
    ...d,
    count: Math.max(1, Math.round((100 - quality) / 8) + (seed % 3)),
  }));

  const roastClass =
    input.temperature < 200 ? "Light"
      : input.temperature < 220 ? "Medium"
      : input.temperature < 235 ? "Medium-Dark" : "Dark";

  const baseFlavor =
    roastClass === "Light"
      ? { acidity: 88, bitterness: 35, sweetness: 72, body: 55, aroma: 85 }
      : roastClass === "Medium"
      ? { acidity: 70, bitterness: 50, sweetness: 80, body: 70, aroma: 78 }
      : roastClass === "Medium-Dark"
      ? { acidity: 55, bitterness: 65, sweetness: 70, body: 80, aroma: 72 }
      : { acidity: 35, bitterness: 80, sweetness: 55, body: 90, aroma: 65 };

  const flavorNotesByOrigin: Record<string, string[]> = {
    ethiopia: ["Blueberry", "Jasmine", "Bergamot", "Honey"],
    colombia: ["Caramel", "Red apple", "Milk chocolate", "Almond"],
    brazil: ["Cocoa", "Hazelnut", "Brown sugar", "Walnut"],
    kenya: ["Blackcurrant", "Tomato", "Grapefruit", "Wine"],
    guatemala: ["Dark chocolate", "Orange peel", "Spice", "Toffee"],
    default: ["Caramel", "Cocoa", "Toasted nuts", "Stone fruit"],
  };
  const key = input.origin.toLowerCase();
  const flavorNotes =
    Object.keys(flavorNotesByOrigin).find((k) => key.includes(k))
      ? flavorNotesByOrigin[
          Object.keys(flavorNotesByOrigin).find((k) => key.includes(k))!
        ]
      : flavorNotesByOrigin.default;

  const brew =
    roastClass === "Light"
      ? {
          method: "Pour-over (V60)",
          grindSize: "Medium-fine",
          waterTempC: 96,
          ratio: "1:16",
          brewTimeSec: 180,
          notes: "Bloom 30s, slow pulse pours to coax sweetness.",
        }
      : roastClass === "Medium"
      ? {
          method: "Chemex",
          grindSize: "Medium",
          waterTempC: 94,
          ratio: "1:15",
          brewTimeSec: 240,
          notes: "Even pours, aim for clarity with body.",
        }
      : {
          method: "Espresso",
          grindSize: "Fine",
          waterTempC: 92,
          ratio: "1:2",
          brewTimeSec: 28,
          notes: "Lower temp prevents over-extraction of bitter notes.",
        };

  return {
    id: crypto.randomUUID(),
    imageDataUrl: input.imageDataUrl,
    origin: input.origin,
    roastTime: input.roastTime,
    temperature: input.temperature,
    moisture: input.moisture,
    qualityScore: quality,
    roastClass,
    defects,
    flavor: baseFlavor,
    brew,
    flavorNotes,
    summary: `A ${roastClass.toLowerCase()} roast from ${input.origin || "unknown origin"} with ${quality >= 88 ? "specialty-grade" : quality >= 78 ? "premium commercial" : "commercial"} quality. Expect notes of ${flavorNotes.slice(0, 3).join(", ").toLowerCase()}.`,
    createdAt: new Date().toISOString(),
  };
}