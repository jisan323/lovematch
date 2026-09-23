export interface DimensionalScores {
  passion: number; // 0 - 100
  emotional: number; // 0 - 100
  stability: number; // 0 - 100
  intellect: number; // 0 - 100
  playfulness: number; // 0 - 100
}

export interface PythagoreanDetails {
  p1Expression: number;
  p2Expression: number;
  p1SoulUrge: number;
  p2SoulUrge: number;
  p1Personality: number;
  p2Personality: number;
  harmonyScore: number;
  affinityType: 'Natural Affinity' | 'Complementary Spark' | 'Dynamic Challenge' | 'Master Resonance';
  interpretation: string;
}

export interface ChaldeanDetails {
  p1VibrationalSum: number;
  p2VibrationalSum: number;
  p1SingleDigit: number;
  p2SingleDigit: number;
  p1PlanetaryRuler: string;
  p2PlanetaryRuler: string;
  compoundResonanceScore: number;
  vibrationalInterpretation: string;
}

export interface PhoneticDetails {
  vowelHarmonyScore: number;
  syllableBalanceScore: number;
  consonantSoftnessScore: number;
  rhythmScore: number;
  overallAcousticScore: number;
  analysisText: string;
  p1Syllables: number;
  p2Syllables: number;
  sharedVowels: string[];
}

export interface FlamesDetails {
  resultLetter: 'F' | 'L' | 'A' | 'M' | 'E' | 'S';
  resultTitle: string;
  scoreBonus: number;
  description: string;
  commonLetters: string[];
  p1Remaining: string[];
  p2Remaining: string[];
  totalRemainingCount: number;
  stepByStepTrace: string[];
}

export interface AstrologicalDetails {
  p1Zodiac: string;
  p2Zodiac: string;
  p1Element: 'Fire' | 'Earth' | 'Air' | 'Water';
  p2Element: 'Fire' | 'Earth' | 'Air' | 'Water';
  elementalSynergy: string;
  elementScore: number;
  description: string;
}

export interface DateNightIdea {
  title: string;
  description: string;
  vibe: string;
  idealTiming: string;
}

export interface CompatibilityTier {
  title: string;
  subtitle: string;
  tierBadge: string;
  summary: string;
  colorScheme: {
    primary: string;
    glow: string;
    accent: string;
  };
}

export interface CompatibilityResult {
  id: string;
  calculatedAt: string;
  partner1Name: string;
  partner2Name: string;
  relationshipStage?: string;
  partner1BirthDate?: string;
  partner2BirthDate?: string;
  
  overallPercentage: number;
  tier: CompatibilityTier;
  archetype: {
    name: string;
    motto: string;
    essence: string;
  };
  
  dimensions: DimensionalScores;
  pythagorean: PythagoreanDetails;
  chaldean: ChaldeanDetails;
  phonetic: PhoneticDetails;
  flames: FlamesDetails;
  astrological?: AstrologicalDetails;
  
  strengths: string[];
  growthAdvice: string[];
  dateNightIdeas: DateNightIdea[];
  synastrySummary: string;
}

export interface SavedCouple {
  id: string;
  partner1Name: string;
  partner2Name: string;
  overallPercentage: number;
  tierTitle: string;
  archetypeName: string;
  timestamp: string;
}
