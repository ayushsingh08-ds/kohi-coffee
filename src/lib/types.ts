export interface Defect {
  type: string;
  severity: "low" | "medium" | "high";
  count: number;
  description: string;
}

export interface FlavorProfile {
  acidity: number;
  bitterness: number;
  sweetness: number;
  body: number;
  aroma: number;
}

export interface BrewRecommendation {
  method: string;
  grindSize: string;
  waterTempC: number;
  ratio: string;
  brewTimeSec: number;
  notes: string;
}

export interface BeanAnalysis {
  id: string;
  imageDataUrl: string;
  origin: string;
  roastTime: number;
  temperature: number;
  moisture: number;
  qualityScore: number;
  roastClass: string;
  defects: Defect[];
  flavor: FlavorProfile;
  brew: BrewRecommendation;
  flavorNotes: string[];
  summary: string;
  createdAt: string;
}