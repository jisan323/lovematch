import {
  AstrologicalDetails,
  ChaldeanDetails,
  CompatibilityResult,
  CompatibilityTier,
  DateNightIdea,
  DimensionalScores,
  FlamesDetails,
  PhoneticDetails,
  PythagoreanDetails,
} from '../types/compatibility';

// Pythagorean letter values
const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

// Chaldean letter values
export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

// Chaldean planetary rulers
const PLANETARY_RULERS: Record<number, string> = {
  1: 'The Sun (Vitality & Radiant Warmth)',
  2: 'The Moon (Intuition & Emotional Empathy)',
  3: 'Jupiter (Expansion, Wisdom & Joy)',
  4: 'Uranus (Innovation & Magnetic Originality)',
  5: 'Mercury (Eloquent Wit & Nimble Mind)',
  6: 'Venus (Supreme Romantic Love & Aesthetic Grace)',
  7: 'Neptune (Dreamy Mysticism & Spiritual Bond)',
  8: 'Saturn (Enduring Loyalty & Grounded Devotion)',
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

// Reduce a number to single digit or Master Number (11, 22, 33)
function reducePythagorean(num: number, preserveMaster = true): number {
  if (preserveMaster && (num === 11 || num === 22 || num === 33)) {
    return num;
  }
  while (num > 9) {
    if (preserveMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = String(num)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

// Chaldean single digit reduction (always 1-8 or 9)
function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = String(num)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num === 0 ? 1 : num;
}

// Clean and standardize name string
export function sanitizeName(name: string): string {
  return name.trim().toUpperCase().replace(/[^A-Z]/g, '');
}

// Get individual letter values for interactive live preview
export function getLetterBreakdown(name: string): { letter: string; pyth: number; chald: number; isVowel: boolean }[] {
  const clean = sanitizeName(name);
  return clean.split('').map((char) => ({
    letter: char,
    pyth: PYTHAGOREAN_MAP[char] || 0,
    chald: CHALDEAN_MAP[char] || 0,
    isVowel: VOWELS.has(char),
  }));
}

// Calculate Pythagorean Numerology
export function calculatePythagorean(name1: string, name2: string): PythagoreanDetails {
  const p1Chars = sanitizeName(name1).split('');
  const p2Chars = sanitizeName(name2).split('');

  const p1SumAll = p1Chars.reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);
  const p2SumAll = p2Chars.reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);

  const p1VowelsSum = p1Chars
    .filter((ch) => VOWELS.has(ch))
    .reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);
  const p2VowelsSum = p2Chars
    .filter((ch) => VOWELS.has(ch))
    .reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);

  const p1ConsonantsSum = p1Chars
    .filter((ch) => !VOWELS.has(ch))
    .reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);
  const p2ConsonantsSum = p2Chars
    .filter((ch) => !VOWELS.has(ch))
    .reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch] || 0), 0);

  const p1Expression = reducePythagorean(p1SumAll, true);
  const p2Expression = reducePythagorean(p2SumAll, true);

  const p1SoulUrge = reducePythagorean(p1VowelsSum || 1, false);
  const p2SoulUrge = reducePythagorean(p2VowelsSum || 1, false);

  const p1Personality = reducePythagorean(p1ConsonantsSum || 1, false);
  const p2Personality = reducePythagorean(p2ConsonantsSum || 1, false);

  // Natural affinity triads:
  // Triad 1: 1, 5, 7 (Intellectual / Visionary / Freedom)
  // Triad 2: 2, 4, 8 (Practical / Loyal / Material Manifestation)
  // Triad 3: 3, 6, 9 (Creative / Compassionate / Heart-Centered)
  const isMaster1 = [11, 22, 33].includes(p1Expression);
  const isMaster2 = [11, 22, 33].includes(p2Expression);

  const base1 = reducePythagorean(p1Expression, false);
  const base2 = reducePythagorean(p2Expression, false);

  let harmonyScore = 75;
  let affinityType: PythagoreanDetails['affinityType'] = 'Complementary Spark';
  let interpretation = '';

  const triadMap: Record<number, number> = {
    1: 1, 5: 1, 7: 1,
    2: 2, 4: 2, 8: 2,
    3: 3, 6: 3, 9: 3,
  };

  if (isMaster1 || isMaster2) {
    affinityType = 'Master Resonance';
    harmonyScore = 92 + (isMaster1 && isMaster2 ? 6 : 2);
    interpretation = 'A profound karmic and spiritual synchronization. One or both partners embody Master Numbers, signaling transformative shared purpose and intuitive telepathy.';
  } else if (base1 === base2) {
    affinityType = 'Natural Affinity';
    harmonyScore = 94;
    interpretation = `Mirror Soul vibration. Both resonate to Expression Number ${base1}, giving an effortless instinct for one another's emotional patterns and core values.`;
  } else if (triadMap[base1] === triadMap[base2]) {
    affinityType = 'Natural Affinity';
    harmonyScore = 89;
    interpretation = `Belonging to the same harmonic vibrational family (${base1} & ${base2}), your instincts naturally synchronize across daily decisions and visionary life goals.`;
  } else {
    // Cross-triad complementary combinations
    const diff = Math.abs(base1 - base2);
    if (diff === 1 || diff === 3 || diff === 6) {
      affinityType = 'Complementary Spark';
      harmonyScore = 82;
      interpretation = `Creative polarity. Expression ${base1} and ${base2} offer each other what they lack, turning differences into magnetic curiosity and mutual growth.`;
    } else {
      affinityType = 'Dynamic Challenge';
      harmonyScore = 78;
      interpretation = `A dynamic catalyst. Expression ${base1} and ${base2} sharpen each other's edges, preventing complacency and fostering a deeply stimulating partnership.`;
    }
  }

  // Adjust harmony slightly by Soul Urge alignment
  const soulDelta = Math.abs(p1SoulUrge - p2SoulUrge);
  if (soulDelta === 0) harmonyScore += 4;
  else if (soulDelta <= 2) harmonyScore += 2;

  harmonyScore = Math.min(99, Math.max(68, harmonyScore));

  return {
    p1Expression,
    p2Expression,
    p1SoulUrge,
    p2SoulUrge,
    p1Personality,
    p2Personality,
    harmonyScore,
    affinityType,
    interpretation,
  };
}

// Calculate Chaldean Vibrational Resonance
export function calculateChaldean(name1: string, name2: string): ChaldeanDetails {
  const p1Chars = sanitizeName(name1).split('');
  const p2Chars = sanitizeName(name2).split('');

  const p1Sum = p1Chars.reduce((sum, ch) => sum + (CHALDEAN_MAP[ch] || 0), 0);
  const p2Sum = p2Chars.reduce((sum, ch) => sum + (CHALDEAN_MAP[ch] || 0), 0);

  const p1Single = reduceToSingleDigit(p1Sum);
  const p2Single = reduceToSingleDigit(p2Sum);

  const p1Ruler = PLANETARY_RULERS[p1Single] || 'Universal Celestial Influence';
  const p2Ruler = PLANETARY_RULERS[p2Single] || 'Universal Celestial Influence';

  // Chaldean affinity rules:
  // Numbers ruled by Venus (6), Moon (2), Sun (1), and Jupiter (3) blend with warm high synergy
  let score = 76;
  const pair = [p1Single, p2Single].sort((a, b) => a - b).join('-');

  if (p1Single === p2Single) {
    score = 95;
  } else if (
    ['1-2', '1-3', '1-6', '2-6', '3-6', '5-6', '2-7'].includes(pair)
  ) {
    score = 93;
  } else if (
    ['1-5', '2-4', '3-5', '4-8', '5-7', '7-8', '2-8'].includes(pair)
  ) {
    score = 86;
  } else {
    score = 80;
  }

  // Bonus for harmonious compound sum
  const compound = p1Sum + p2Sum;
  if (compound % 6 === 0 || compound % 7 === 0 || compound % 9 === 0) {
    score += 3;
  }

  score = Math.min(98, score);

  let vibrationalInterpretation = '';
  if (score >= 90) {
    score = Math.min(99, score);
    vibrationalInterpretation = `Chaldean planetary alignment reveals divine celestial accord between ${p1Ruler.split('(')[0].trim()} and ${p2Ruler.split('(')[0].trim()}. Your vibrational compound of ${compound} emits a steady frequency of romantic devotion and good fortune.`;
  } else if (score >= 82) {
    vibrationalInterpretation = `Favorable cosmic resonance. The magnetic balance between ${p1Ruler.split('(')[0].trim()} and ${p2Ruler.split('(')[0].trim()} creates an irresistible chemistry that keeps both minds engaged and hearts receptive.`;
  } else {
    vibrationalInterpretation = `An intriguing polarity of celestial rulers. Your interaction stimulates profound personal evolution, teaching each of you new dimensions of affection and emotional patience.`;
  }

  return {
    p1VibrationalSum: p1Sum,
    p2VibrationalSum: p2Sum,
    p1SingleDigit: p1Single,
    p2SingleDigit: p2Single,
    p1PlanetaryRuler: p1Ruler,
    p2PlanetaryRuler: p2Ruler,
    compoundResonanceScore: score,
    vibrationalInterpretation,
  };
}

// Calculate Phonetic Acoustics & Cadence
export function calculatePhonetics(name1: string, name2: string): PhoneticDetails {
  const n1 = sanitizeName(name1);
  const n2 = sanitizeName(name2);

  // Approximate syllable counting: count vowel sequences
  const countSyllables = (str: string) => {
    const matches = str.match(/[AEIOU]+/g);
    return Math.max(1, matches ? matches.length : 1);
  };

  const p1Syllables = countSyllables(n1);
  const p2Syllables = countSyllables(n2);

  // Syllable balance: equal or complementary (e.g., 2 & 2 or 2 & 3 have lyrical cadence)
  let syllableScore = 80;
  const sylDiff = Math.abs(p1Syllables - p2Syllables);
  if (sylDiff === 0) syllableScore = 96;
  else if (sylDiff === 1) syllableScore = 90;
  else if (sylDiff === 2) syllableScore = 82;
  else syllableScore = 74;

  // Vowel harmony: check shared vowels and harmonious openings/endings
  const p1Vowels = Array.from(new Set(n1.split('').filter((c) => VOWELS.has(c))));
  const p2Vowels = Array.from(new Set(n2.split('').filter((c) => VOWELS.has(c))));
  const sharedVowels = p1Vowels.filter((v) => p2Vowels.includes(v));

  let vowelHarmonyScore = 75;
  if (sharedVowels.length >= 2) vowelHarmonyScore = 94;
  else if (sharedVowels.length === 1) vowelHarmonyScore = 86;
  else vowelHarmonyScore = 76;

  // Soft liquid consonants (L, M, N, R, W, Y) give melodious flow
  const softSet = new Set(['L', 'M', 'N', 'R', 'W', 'Y', 'S']);
  const p1SoftCount = n1.split('').filter((c) => softSet.has(c)).length;
  const p2SoftCount = n2.split('').filter((c) => softSet.has(c)).length;
  const consonantSoftnessScore = Math.min(95, 78 + (p1SoftCount + p2SoftCount) * 2);

  // Ending flow: vowel-vowel or vowel-consonant alternation
  const p1EndsVowel = VOWELS.has(n1.slice(-1));
  const p2EndsVowel = VOWELS.has(n2.slice(-1));
  const rhythmScore = (p1EndsVowel && p2EndsVowel) ? 92 : (p1EndsVowel !== p2EndsVowel ? 88 : 83);

  const overallAcousticScore = Math.round(
    syllableScore * 0.3 + vowelHarmonyScore * 0.3 + consonantSoftnessScore * 0.2 + rhythmScore * 0.2
  );

  let analysisText = '';
  if (sharedVowels.length > 0) {
    analysisText = `Your names share melodic vowel resonance with harmonious acoustic cadence (${sharedVowels.join(', ')}), creating an effortless, musical rhythm when spoken together in affection.`;
  } else {
    analysisText = `Your names showcase complementary acoustic contrast—one offering crisp articulation and the other soft tonal cadence, resulting in memorable verbal harmony.`;
  }

  return {
    vowelHarmonyScore,
    syllableBalanceScore: syllableScore,
    consonantSoftnessScore,
    rhythmScore,
    overallAcousticScore,
    analysisText,
    p1Syllables,
    p2Syllables,
    sharedVowels,
  };
}

// Calculate the classic FLAMES algorithm with step-by-step trace
export function calculateFlames(name1: string, name2: string): FlamesDetails {
  const n1 = sanitizeName(name1);
  const n2 = sanitizeName(name2);

  const arr1 = n1.split('');
  const arr2 = n2.split('');

  const commonLetters: string[] = [];
  const remaining1: string[] = [...arr1];
  const remaining2: string[] = [...arr2];

  // Cross-cancel common letters
  for (let i = remaining1.length - 1; i >= 0; i--) {
    const char = remaining1[i];
    const matchIndex = remaining2.indexOf(char);
    if (matchIndex !== -1) {
      commonLetters.push(char);
      remaining1.splice(i, 1);
      remaining2.splice(matchIndex, 1);
    }
  }

  const totalRemaining = remaining1.length + remaining2.length;
  const count = totalRemaining > 0 ? totalRemaining : 6;

  // Classic FLAMES letters
  const flamesArray = ['F', 'L', 'A', 'M', 'E', 'S'] as const;
  const currentFlames = [...flamesArray];
  const trace: string[] = [];

  trace.push(
    `Initial comparison: Found ${commonLetters.length} common letters (${commonLetters.length ? commonLetters.join(', ') : 'none'}). Remaining letter count: ${totalRemaining}.`
  );

  let pointer = 0;
  while (currentFlames.length > 1) {
    pointer = (pointer + count - 1) % currentFlames.length;
    const eliminated = currentFlames.splice(pointer, 1)[0];
    trace.push(`Count of ${count} eliminated letter '${eliminated}', remaining: [${currentFlames.join(', ')}]`);
  }

  const finalLetter = currentFlames[0];

  const outcomes: Record<
    'F' | 'L' | 'A' | 'M' | 'E' | 'S',
    { title: string; bonus: number; desc: string }
  > = {
    F: {
      title: 'Friendship & Deep Complicity',
      bonus: 84,
      desc: 'An unshakable foundation built on genuine companionship, laughter, and trust that weathers every season.',
    },
    L: {
      title: 'Unconditional Love & Passion',
      bonus: 96,
      desc: 'The purest romantic outcome in the FLAMES lineage: incandescent adoration, vulnerability, and magnetic attraction.',
    },
    A: {
      title: 'Affection & Tender Tenderness',
      bonus: 88,
      desc: 'Deep warmth, comforting touches, and gentle emotional safety that makes home feel like wherever you are together.',
    },
    M: {
      title: 'Marriage & Enduring Union',
      bonus: 94,
      desc: 'Destined partnership built for longevity, shared horizons, family warmth, and building an empire of memories.',
    },
    E: {
      title: 'Electric Spark & Chemistry',
      bonus: 86,
      desc: 'High-voltage magnetic pull and playful banter. You continually inspire each other to stay curious and alive.',
    },
    S: {
      title: 'Soulmates & Twin Flame Kinship',
      bonus: 98,
      desc: 'An instantaneous, timeless recognition of spirits. You understand what the other is feeling without a single word.',
    },
  };

  const match = outcomes[finalLetter];

  return {
    resultLetter: finalLetter,
    resultTitle: match.title,
    scoreBonus: match.bonus,
    description: match.desc,
    commonLetters,
    p1Remaining: remaining1,
    p2Remaining: remaining2,
    totalRemainingCount: totalRemaining,
    stepByStepTrace: trace,
  };
}

// Calculate Astrological resonance if birthdays are provided
export function calculateAstrology(date1: string, date2: string): AstrologicalDetails | undefined {
  if (!date1 || !date2) return undefined;

  const getZodiac = (dateStr: string): { sign: string; element: 'Fire' | 'Earth' | 'Air' | 'Water' } => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { sign: 'Unknown', element: 'Air' };

    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: 'Aries', element: 'Fire' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: 'Taurus', element: 'Earth' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: 'Gemini', element: 'Air' };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: 'Cancer', element: 'Water' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: 'Leo', element: 'Fire' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: 'Virgo', element: 'Earth' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Libra', element: 'Air' };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: 'Scorpio', element: 'Water' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: 'Sagittarius', element: 'Fire' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: 'Capricorn', element: 'Earth' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: 'Aquarius', element: 'Air' };
    return { sign: 'Pisces', element: 'Water' };
  };

  const z1 = getZodiac(date1);
  const z2 = getZodiac(date2);

  const el1 = z1.element;
  const el2 = z2.element;

  let elementScore = 80;
  let elementalSynergy = '';
  let description = '';

  const pairKey = [el1, el2].sort().join('+');

  if (el1 === el2) {
    elementScore = 92;
    elementalSynergy = `Elemental Kinship (${el1} + ${el2})`;
    description = `Sharing the ${el1} element creates instinctive understanding. Your emotional rhythms, pacing, and core motivations mirror each other gracefully.`;
  } else if (pairKey === 'Air+Fire') {
    elementScore = 95;
    elementalSynergy = 'Dynamic Blaze (Fire + Air)';
    description = 'Air fuels Fire into vibrant life, while Fire inspires Air with passionate purpose. An adventurous and creative match.';
  } else if (pairKey === 'Earth+Water') {
    elementScore = 94;
    elementalSynergy = 'Nurturing Oasis (Earth + Water)';
    description = 'Water softens the Earth into flourishing abundance, while Earth gives gentle sanctuary and stability to Water. Exceptionally loyal and romantic.';
  } else if (pairKey === 'Fire+Water') {
    elementScore = 84;
    elementalSynergy = 'Steamy Polarity (Fire + Water)';
    description = 'High intensity and transformative passion. Fire teaches courage while Water introduces tender vulnerability.';
  } else if (pairKey === 'Air+Earth') {
    elementScore = 82;
    elementalSynergy = 'Architectural Harmony (Air + Earth)';
    description = 'Air dreams up the vision and Earth builds the foundation stone by stone. Pragmatic yet deeply inspiring.';
  } else {
    elementScore = 85;
    elementalSynergy = `${el1} & ${el2} Dynamic`;
    description = 'Complementary elemental traits that balance each other against extremes.';
  }

  return {
    p1Zodiac: z1.sign,
    p2Zodiac: z2.sign,
    p1Element: el1,
    p2Element: el2,
    elementalSynergy,
    elementScore,
    description,
  };
}

// Generate Relationship Strengths & Growth Areas
function generateInsights(
  overall: number,
  dimensions: DimensionalScores,
  n1: string,
  n2: string
): { strengths: string[]; growth: string[]; synastry: string } {
  const strengths: string[] = [];
  const growth: string[] = [];

  if (dimensions.passion >= 88) {
    strengths.push('Instant Magnetic Electricity: High romantic chemistry and intense eye contact that never fades into routine.');
  } else {
    strengths.push('Steady Warming Fire: A love that deepens slowly and genuinely, building lasting warmth over flash-in-the-pan infatuation.');
  }

  if (dimensions.emotional >= 85) {
    strengths.push('Intuitive Emotional Telepathy: You sense changes in each other’s unspoken moods and offer solace before words are even needed.');
  } else {
    strengths.push('Reflective Vulnerability: Mutual respect that encourages openness and authentic emotional expression without fear of judgment.');
  }

  if (dimensions.stability >= 85) {
    strengths.push('Fortress of Trust: An unshakable sanctuary of reliability, loyalty, and unwavering support during life’s stormiest seasons.');
  } else {
    strengths.push('Spontaneous Adventure: An exciting aversion to stagnation, keeping the relationship dynamic and perpetually fresh.');
  }

  if (dimensions.intellect >= 85) {
    strengths.push('Electric Midnight Dialogues: Effortless philosophical banter, shared curiosity, and deep mental compatibility.');
  } else {
    strengths.push('Action-Oriented Harmony: You express devotion through thoughtful gestures, shared experiences, and presence rather than over-intellectualizing.');
  }

  // Growth areas
  if (dimensions.passion > 90 && dimensions.stability < 80) {
    growth.push('Grounding High Energy: Channel your fiery passion into shared domestic rituals and quiet routines to avoid emotional burnout.');
  } else if (dimensions.stability > 90 && dimensions.passion < 80) {
    growth.push('Reigniting Spontaneity: Schedule surprise date nights or spontaneous getaways to preserve romantic anticipation.');
  } else {
    growth.push('Curating Uninterrupted Moments: Protect dedicated screens-off sanctuary hours weekly to nurture uninterrupted connection.');
  }

  growth.push('Honoring Individual Solitude: Allow each partner sacred creative space to recharge, bringing enriched energy back into your shared orbit.');

  const synastry = `${n1} and ${n2} share a rare harmonic synthesis. With an overall resonance of ${overall}%, your names vibrate with complimentary frequencies that bridge emotional depth and joyful daily companionship.`;

  return { strengths, growth, synastry };
}

// Curated date night ideas based on dimensional profile
function generateDateIdeas(dimensions: DimensionalScores): DateNightIdea[] {
  if (dimensions.passion >= 88) {
    return [
      {
        title: 'Candlelight Speakeasy & Jazz Rendezvous',
        description: 'Dressing to the nines for intimate craft cocktails in a dimly lit corner booth with sultry live acoustic music.',
        vibe: 'Sophisticated, Magnetic & Sensual',
        idealTiming: 'Friday midnight or rainy evening',
      },
      {
        title: 'Sunset Rooftop Tapas & Vinyl Listening',
        description: 'Sipping chilled wine while the city sky turns gold, sharing favorite record tracks and dancing in socks.',
        vibe: 'Golden Hour Romance',
        idealTiming: 'Warm twilight',
      },
      {
        title: 'Private Stargazing Picnic with Hot Cider',
        description: 'Packing warm cashmere blankets, artisanal cheeses, and driving away from city lights under the open cosmos.',
        vibe: 'Intimate & Adventurous',
        idealTiming: 'Clear new moon night',
      },
    ];
  } else if (dimensions.intellect >= 88) {
    return [
      {
        title: 'Late Night Art Gallery Stroll & Gelato',
        description: 'Wandering through quiet museum exhibits followed by lively debate over artisan desserts in a cobblestone café.',
        vibe: 'Inspiring & Cultured',
        idealTiming: 'Thursday cultural evening',
      },
      {
        title: 'Bookstore Scavenger Hunt & Cozy Coffee',
        description: 'Picking three books for each other with secret romantic inscriptions, followed by corner armchair reading together.',
        vibe: 'Thoughtful & Comforting',
        idealTiming: 'Lazy Sunday afternoon',
      },
      {
        title: 'Artisanal Pasta Making Masterclass',
        description: 'Rolling fresh tagliatelle by hand with fragrant basil, garlic, and good Chianti laughing over flour-dusted noses.',
        vibe: 'Playful Collaboration',
        idealTiming: 'Saturday supper',
      },
    ];
  } else {
    return [
      {
        title: 'Seaside Sunset Promenade & Salt-Air Dinner',
        description: 'Walking hand in hand along the shoreline watching rolling waves, then warming up over fresh seafood.',
        vibe: 'Grounding & Timeless',
        idealTiming: 'Weekend getaway',
      },
      {
        title: 'Living Room Pillow Fort & Vintage Film Marathon',
        description: 'Building an extravagant fairy-lit canopy, popcorn with truffle oil, and screening timeless black-and-white cinema.',
        vibe: 'Cozy Sanctuary',
        idealTiming: 'Stormy winter evening',
      },
      {
        title: 'Botanical Conservatory & High Tea Escape',
        description: 'Immersing in lush exotic glasshouses, breathing in orchids, and enjoying warm scones with strawberry preserve.',
        vibe: 'Serene & Enchanting',
        idealTiming: 'Saturday morning',
      },
    ];
  }
}

// Map score to refined luxury tier
function getCompatibilityTier(score: number): CompatibilityTier {
  if (score >= 95) {
    return {
      title: 'Celestial Twin Flames',
      subtitle: 'Highest Vibrational Synchronization',
      tierBadge: 'Tier IX · Divine Harmony',
      summary: 'Your names share an exceedingly rare cosmic equilibrium. Your emotional and vibrational frequencies naturally reinforce one another.',
      colorScheme: {
        primary: 'from-amber-400 via-rose-400 to-pink-500',
        glow: 'rgba(251, 113, 133, 0.45)',
        accent: '#fb7185',
      },
    };
  }
  if (score >= 88) {
    return {
      title: 'Harmonic Soulmates',
      subtitle: 'Profound Devotion & Enduring Chemistry',
      tierBadge: 'Tier VIII · Soulmate Synergy',
      summary: 'An extraordinary union of warmth, mutual respect, and magnetic charm. You balance each other effortlessly.',
      colorScheme: {
        primary: 'from-rose-400 via-pink-500 to-purple-500',
        glow: 'rgba(236, 72, 153, 0.4)',
        accent: '#ec4899',
      },
    };
  }
  if (score >= 80) {
    return {
      title: 'Golden Constellation',
      subtitle: 'Luminous Affection & Shared Dreams',
      tierBadge: 'Tier VII · Radiant Bond',
      summary: 'Deeply grounded in affection and sparkling conversation. Your partnership fosters both personal independence and intimate togetherness.',
      colorScheme: {
        primary: 'from-pink-400 via-rose-400 to-amber-300',
        glow: 'rgba(244, 114, 182, 0.35)',
        accent: '#f472b6',
      },
    };
  }
  if (score >= 72) {
    return {
      title: 'Passionate Catalyst',
      subtitle: 'Magnetic Chemistry & Dynamic Spark',
      tierBadge: 'Tier VI · Electric Polarity',
      summary: 'High energy and playful friction. You challenge each other to step outside comfort zones and evolve continuously.',
      colorScheme: {
        primary: 'from-purple-400 via-rose-400 to-orange-400',
        glow: 'rgba(192, 132, 252, 0.35)',
        accent: '#c084fc',
      },
    };
  }
  return {
    title: 'Complementary Odyssey',
    subtitle: 'Intriguing Contrast & Deep Growth',
    tierBadge: 'Tier V · Evolutionary Bond',
    summary: 'A fascinating pairing of unique personalities that continuously reveals fresh layers of depth and shared discovery.',
    colorScheme: {
      primary: 'from-indigo-400 via-pink-400 to-rose-400',
      glow: 'rgba(129, 140, 248, 0.35)',
      accent: '#818cf8',
    },
  };
}

// Generate Archetype Name and Essence
function getArchetype(
  score: number,
  pyth: PythagoreanDetails,
  chald: ChaldeanDetails,
  dimensions: DimensionalScores
): { name: string; motto: string; essence: string } {
  if (dimensions.passion >= 90) {
    return {
      name: 'The Sun & Aurora',
      motto: 'Radiant Fire, Boundless Horizons',
      essence: 'A high-voltage romantic pairing that illuminates any room, characterized by sparkling romance and grand romantic gestures.',
    };
  }
  if (dimensions.emotional >= 90) {
    return {
      name: 'The Ocean & Horizon',
      motto: 'Infinite Depth, Unspoken Peace',
      essence: 'An empathetic haven where two souls find complete solace, understanding each other through quiet glances and unconditional acceptance.',
    };
  }
  if (dimensions.stability >= 88) {
    return {
      name: 'The Golden Anchor & Star',
      motto: 'Rooted Devotion, Celestial Dreams',
      essence: 'One partner provides an unwavering foundation while the other provides inspirational vision, creating an unstoppable life sanctuary.',
    };
  }
  if (dimensions.intellect >= 88) {
    return {
      name: 'The Philosophers of the Heart',
      motto: 'Quick Minds, Intertwined Destinies',
      essence: 'Driven by endless curiosity, mutual wit, and deep conversations that stretch into dawn, never running out of questions or wonder.',
    };
  }
  return {
    name: 'The Harmonious Weavers',
    motto: 'Two Threads, One Tapestry',
    essence: 'A grounded, well-rounded love that seamlessly balances friendship, passionate romance, and gentle everyday laughter.',
  };
}

// Master Compatibility Orchestrator
export function calculateCompatibility(
  name1: string,
  name2: string,
  options?: {
    relationshipStage?: string;
    partner1BirthDate?: string;
    partner2BirthDate?: string;
  }
): CompatibilityResult {
  const p1Name = name1.trim();
  const p2Name = name2.trim();

  // Run all sub-algorithms
  const pythagorean = calculatePythagorean(p1Name, p2Name);
  const chaldean = calculateChaldean(p1Name, p2Name);
  const phonetic = calculatePhonetics(p1Name, p2Name);
  const flames = calculateFlames(p1Name, p2Name);
  const astrology = options?.partner1BirthDate && options?.partner2BirthDate
    ? calculateAstrology(options.partner1BirthDate, options.partner2BirthDate)
    : undefined;

  // Composite calculation with balanced weighting:
  // Pythagorean harmony: 25%
  // Chaldean resonance: 25%
  // Phonetic flow: 20%
  // FLAMES bonus: 20%
  // Astrological alignment: 10% (or distributed if not provided)
  let rawScore: number;
  if (astrology) {
    rawScore =
      pythagorean.harmonyScore * 0.25 +
      chaldean.compoundResonanceScore * 0.25 +
      phonetic.overallAcousticScore * 0.2 +
      flames.scoreBonus * 0.2 +
      astrology.elementScore * 0.1;
  } else {
    rawScore =
      pythagorean.harmonyScore * 0.3 +
      chaldean.compoundResonanceScore * 0.3 +
      phonetic.overallAcousticScore * 0.2 +
      flames.scoreBonus * 0.2;
  }

  // Normalize between 68 and 98 to keep it both inspiring and grounded
  const overallPercentage = Math.round(Math.min(99, Math.max(68, rawScore)));

  // Compute 5 dimensional scores with deterministic variance from sub-algorithms
  const passion = Math.min(
    99,
    Math.max(
      65,
      Math.round(
        (chaldean.compoundResonanceScore * 0.4 +
          (flames.resultLetter === 'L' || flames.resultLetter === 'S' || flames.resultLetter === 'E' ? 95 : 78) * 0.4 +
          pythagorean.p1SoulUrge * 2 +
          pythagorean.p2SoulUrge * 2)
      )
    )
  );

  const emotional = Math.min(
    99,
    Math.max(
      68,
      Math.round(
        (pythagorean.harmonyScore * 0.45 +
          phonetic.vowelHarmonyScore * 0.35 +
          (flames.resultLetter === 'S' || flames.resultLetter === 'A' || flames.resultLetter === 'M' ? 96 : 80) * 0.2)
      )
    )
  );

  const stability = Math.min(
    99,
    Math.max(
      62,
      Math.round(
        ((flames.resultLetter === 'M' || flames.resultLetter === 'F' ? 96 : 82) * 0.4 +
          chaldean.compoundResonanceScore * 0.35 +
          phonetic.syllableBalanceScore * 0.25)
      )
    )
  );

  const intellect = Math.min(
    99,
    Math.max(
      66,
      Math.round(
        (pythagorean.harmonyScore * 0.4 +
          phonetic.overallAcousticScore * 0.4 +
          ((pythagorean.p1Expression + pythagorean.p2Expression) % 7) * 2 + 75)
      )
    )
  );

  const playfulness = Math.min(
    99,
    Math.max(
      65,
      Math.round(
        (flames.scoreBonus * 0.4 +
          phonetic.consonantSoftnessScore * 0.3 +
          ((chaldean.p1VibrationalSum + chaldean.p2VibrationalSum) % 5) * 3 + 74)
      )
    )
  );

  const dimensions: DimensionalScores = {
    passion,
    emotional,
    stability,
    intellect,
    playfulness,
  };

  const tier = getCompatibilityTier(overallPercentage);
  const archetype = getArchetype(overallPercentage, pythagorean, chaldean, dimensions);
  const { strengths, growth, synastry } = generateInsights(overallPercentage, dimensions, p1Name, p2Name);
  const dateNightIdeas = generateDateIdeas(dimensions);

  return {
    id: `${p1Name.toLowerCase()}-${p2Name.toLowerCase()}-${Date.now()}`,
    calculatedAt: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    partner1Name: p1Name,
    partner2Name: p2Name,
    relationshipStage: options?.relationshipStage || 'Dating',
    partner1BirthDate: options?.partner1BirthDate,
    partner2BirthDate: options?.partner2BirthDate,
    overallPercentage,
    tier,
    archetype,
    dimensions,
    pythagorean,
    chaldean,
    phonetic,
    flames,
    astrological: astrology,
    strengths,
    growthAdvice: growth,
    dateNightIdeas,
    synastrySummary: synastry,
  };
}
