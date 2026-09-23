export type Language = 'en' | 'bn';

export interface TranslationDictionary {
  // Brand
  brandName: string;
  brandTagline: string;
  brandSub: string;

  // Nav
  navCalculator: string;
  navAlgorithms: string;
  navFamous: string;
  navSaved: string;

  // Header Actions
  soundToggle: string;
  themeToggle: string;
  langToggle: string;
  installApp: string;

  // Love Form
  formTitle: string;
  formSubtitle: string;
  partner1Label: string;
  partner1Placeholder: string;
  partner2Label: string;
  partner2Placeholder: string;
  stageLabel: string;
  stages: {
    crush: string;
    dating: string;
    engaged: string;
    married: string;
    soulmates: string;
  };
  optionalAstrology: string;
  partner1Dob: string;
  partner2Dob: string;
  calculateButton: string;
  calculatingButton: string;
  validationError: string;

  // Animation Steps
  animStep1: string;
  animStep2: string;
  animStep3: string;
  animStep4: string;
  animStep5: string;

  // Result Hero
  harmonyScore: string;
  archetypeBadge: string;
  downloadStory: string;
  downloadCertificate: string;
  shareResult: string;
  shareLinkCopied: string;
  saveCouple: string;
  coupleSaved: string;
  recalculate: string;

  // Couple Ship Names
  shipNamesTitle: string;
  shipNamesSubtitle: string;
  copyMoniker: string;
  monikerCopied: string;
  classicPortmanteau: string;
  harmonicBlend: string;
  poeticMoniker: string;
  cosmicAlias: string;

  // Dimensions
  dimensionsTitle: string;
  dimensionsSubtitle: string;
  dimPassion: string;
  dimEmotional: string;
  dimStability: string;
  dimIntellect: string;
  dimPlayfulness: string;

  // Flags & Timeline
  greenFlagsTitle: string;
  greenFlagsSub: string;
  growthEdgesTitle: string;
  growthEdgesSub: string;
  theFix: string;
  timelineTitle: string;
  timelineSub: string;
  anchorLabel: string;

  // Story Modal
  storyModalTitle: string;
  storyModalSub: string;
  downloadStoryBtn: string;
  shareStoryBtn: string;
  storyTheme: string;
  generatingImage: string;

  // Themes
  themeMidnight: string;
  themeRoseGold: string;
  themeLavender: string;

  // PWA
  pwaInstallTitle: string;
  pwaInstallDesc: string;
  pwaIOSGuideTitle: string;
  pwaIOSGuideDesc: string;
  closeBtn: string;

  // Footer
  footerMadeWith: string;
  footerBy: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: 'LoveMatch',
    brandTagline: 'Algorithmic Love & Compatibility Calculator',
    brandSub: 'Decoding relational chemistry through Pythagorean, Chaldean & Phonetic science',

    navCalculator: 'Love Calculator',
    navAlgorithms: 'Algorithms',
    navFamous: 'Famous Pairs',
    navSaved: 'Saved Pairs',

    soundToggle: 'Audio Ambience',
    themeToggle: 'Switch Theme',
    langToggle: 'Language',
    installApp: 'Install App',

    formTitle: 'Discover Your Algorithmic Synastry',
    formSubtitle: 'Enter two names below to synthesize five mathematical and phonetic compatibility matrices.',
    partner1Label: 'First Partner Name',
    partner1Placeholder: 'e.g. Liam, Farhan, Romeo',
    partner2Label: 'Second Partner Name',
    partner2Placeholder: 'e.g. Olivia, Nusrat, Juliet',
    stageLabel: 'Relationship Stage',
    stages: {
      crush: 'Secret Crush',
      dating: 'Dating / Exploring',
      engaged: 'Engaged / Committed',
      married: 'Married Bliss',
      soulmates: 'Twin Flame / Soulmates',
    },
    optionalAstrology: 'Optional: Include Astrological Synastry',
    partner1Dob: 'Partner 1 Birthdate',
    partner2Dob: 'Partner 2 Birthdate',
    calculateButton: 'Calculate Love Compatibility',
    calculatingButton: 'Synthesizing Resonances...',
    validationError: 'Please enter both partner names (letters only).',

    animStep1: 'Synthesizing Pythagorean Numerological Core...',
    animStep2: 'Translating Chaldean Vibrational Matrix...',
    animStep3: 'Computing Acoustic & Phonetic Resonance...',
    animStep4: 'Resolving Classical FLAMES Alchemy...',
    animStep5: 'Finalizing Multi-Dimensional Synastry Matrix...',

    harmonyScore: 'Compatibility Score',
    archetypeBadge: 'Relational Archetype',
    downloadStory: 'Instagram/TikTok 9:16 Story',
    downloadCertificate: 'Official Love Certificate',
    shareResult: 'Share Result Link',
    shareLinkCopied: 'Shareable link copied to clipboard!',
    saveCouple: 'Save Couple',
    coupleSaved: 'Saved to Favorites',
    recalculate: 'Analyze Another Couple',

    shipNamesTitle: 'Couple Ship Names',
    shipNamesSubtitle: 'Algorithmic portmanteau and moniker blendings',
    copyMoniker: 'Tap to copy moniker',
    monikerCopied: 'Moniker copied!',
    classicPortmanteau: 'Classic Portmanteau',
    harmonicBlend: 'Harmonic Blend',
    poeticMoniker: 'Poetic Moniker',
    cosmicAlias: 'Cosmic Alias',

    dimensionsTitle: 'Five-Dimensional Synastry Spectrum',
    dimensionsSubtitle: 'A granular breakdown across the core psychological and energetic pillars of partnership.',
    dimPassion: 'Passion & Magnetism',
    dimEmotional: 'Emotional Depth',
    dimStability: 'Long-Term Stability',
    dimIntellect: 'Intellectual Synergy',
    dimPlayfulness: 'Playfulness & Joy',

    greenFlagsTitle: 'Green Flags & Superpowers',
    greenFlagsSub: 'Intuitive strengths that make this union feel effortless',
    growthEdgesTitle: 'Growth Edges & Playful Quirks',
    growthEdgesSub: 'Lovable friction points and how to turn them into closer intimacy',
    theFix: 'The Fix:',
    timelineTitle: 'Relationship Milestone Timeline',
    timelineSub: 'A projected trajectory of deeper connection, emotional breakthroughs, and shared memories',
    anchorLabel: 'Recommended Anchor:',

    storyModalTitle: '9:16 Story Card Generator',
    storyModalSub: 'High-resolution viral card designed for Instagram, TikTok & Facebook Stories',
    downloadStoryBtn: 'Download Story (1080x1920)',
    shareStoryBtn: 'Share to Story / Socials',
    storyTheme: 'Card Theme',
    generatingImage: 'Rendering High-Res Story...',

    themeMidnight: 'Midnight Velvet',
    themeRoseGold: 'Rose Gold & Champagne',
    themeLavender: 'Lavender Dream',

    pwaInstallTitle: 'Install LoveMatch',
    pwaInstallDesc: 'Add LoveMatch to your Home Screen for instant offline access and native experience.',
    pwaIOSGuideTitle: 'Install on iPhone / iPad',
    pwaIOSGuideDesc: 'Tap the Share button in Safari, then scroll down and tap "Add to Home Screen".',
    closeBtn: 'Close',
    footerMadeWith: 'Crafted with',
    footerBy: 'by',
  },

  bn: {
    brandName: 'লাভম্যাচ',
    brandTagline: 'অ্যালগরিদমিক লাভ ও সামঞ্জস্য ক্যালকুলেটর',
    brandSub: 'পিথাগোরিয়ান, ক্যালডিয়ান ও ধ্বনিতাত্ত্বিক বিজ্ঞানে ভালোবাসার গভীর রসায়ন অনুসন্ধান',

    navCalculator: 'লাভ ক্যালকুলেটর',
    navAlgorithms: 'অ্যালগরিদম',
    navFamous: 'বিখ্যাত জুটি',
    navSaved: 'সংরক্ষিত জুটি',

    soundToggle: 'শব্দ অন/অফ',
    themeToggle: 'থিম পরিবর্তন',
    langToggle: 'ভাষা / Language',
    installApp: 'অ্যাপ ইনস্টল করুন',

    formTitle: 'দুজনের ভালোবাসার সামঞ্জস্য জানুন',
    formSubtitle: 'নিচে দুজনের নাম লিখুন এবং ৫টি গাণিতিক ও ধ্বনিতাত্ত্বিক অ্যালগরিদমে আপনার সম্পর্কের গভীরতা দেখুন।',
    partner1Label: 'প্রথম পার্টনারের নাম',
    partner1Placeholder: 'যেমন: ফারহান, রাহুল, রোমিও',
    partner2Label: 'দ্বিতীয় পার্টনারের নাম',
    partner2Placeholder: 'যেমন: নুসরাত, প্রিয়া, জুলিয়েট',
    stageLabel: 'সম্পর্কের বর্তমান পর্যায়',
    stages: {
      crush: 'গোপন ক্রাশ / ভালোলাগা',
      dating: 'প্রেম / ডেটিং পর্যায়',
      engaged: 'বাগদান / প্রতিশ্রুতিবদ্ধ',
      married: 'বিবাহিত জীবন',
      soulmates: 'সোলমেট / স্বর্গীয় জুটি',
    },
    optionalAstrology: 'ঐচ্ছিক: জন্মতারিখ দিয়ে জ্যোতিষ গণনা যুক্ত করুন',
    partner1Dob: 'পার্টনার ১-এর জন্মতারিখ',
    partner2Dob: 'পার্টনার ২-এর জন্মতারিখ',
    calculateButton: 'ভালোবাসার সামঞ্জস্য মাপুন',
    calculatingButton: 'রসায়ন বিশ্লেষণ চলছে...',
    validationError: 'অনুগ্রহ করে দুজনের নাম সঠিকভাবে লিখুন।',

    animStep1: 'পিথাগোরিয়ান নিউমারোলজি বিশ্লেষণ চলছে...',
    animStep2: 'ক্যালডিয়ান শক্তি ম্যাট্রিক্স হিসাব করা হচ্ছে...',
    animStep3: 'নামের ধ্বনি ও সুরের অনুরণন পরিমাপ করা হচ্ছে...',
    animStep4: 'ঐতিহ্যবাহী FLAMES সমীকরণ সমাধান হচ্ছে...',
    animStep5: 'সামগ্রিক হারমোনি রিপোর্ট প্রস্তুত হচ্ছে...',

    harmonyScore: 'সামঞ্জস্য স্কোর',
    archetypeBadge: 'সম্পর্কের আর্কেটাইপ',
    downloadStory: 'ইনস্টাগ্রাম/টিকটক ৯:১৬ স্টোরি',
    downloadCertificate: 'লাভ সার্টিফিকেট ডাউনলোড',
    shareResult: 'রেজাল্ট লিংক শেয়ার করুন',
    shareLinkCopied: 'শেয়ারেবল লিংক ক্লিপবোর্ডে কপি হয়েছে!',
    saveCouple: 'সংরক্ষণ করুন',
    coupleSaved: 'সংরক্ষিত হয়েছে',
    recalculate: 'অন্য জুটির সামঞ্জস্য দেখুন',

    shipNamesTitle: 'রোমান্টিক কাপল শিপ নেম',
    shipNamesSubtitle: 'দুজনের নাম মিলিয়ে তৈরি অ্যালগরিদমিক ডাকনাম',
    copyMoniker: 'কপি করতে ট্যাপ করুন',
    monikerCopied: 'ডাকনাম কপি হয়েছে!',
    classicPortmanteau: 'ক্লাসিক ব্লেন্ড',
    harmonicBlend: 'হারমোনিক মিষ্টি ডাকনাম',
    poeticMoniker: 'কাব্যিক মনিকার',
    cosmicAlias: 'পাওয়ার-কাপল চিহ্ন',

    dimensionsTitle: 'সম্পর্কের ৫টি মাত্রা বিশ্লেষণ',
    dimensionsSubtitle: 'মনস্তাত্ত্বিক ও আবেগীয় ৫টি প্রধান স্তম্ভের বিস্তারিত স্কোর।',
    dimPassion: 'আকর্ষণ ও রোমান্স',
    dimEmotional: 'আবেগের গভীরতা',
    dimStability: 'দীর্ঘমেয়াদী স্থায়িত্ব',
    dimIntellect: 'বুদ্ধিবৃত্তিক মেলবন্ধন',
    dimPlayfulness: 'হাসিখুশি ও আনন্দ',

    greenFlagsTitle: 'সুপার গ্রিন ফ্ল্যাগ ও শক্তি',
    greenFlagsSub: 'যে বিশেষ গুণগুলো এই সম্পর্ককে অত্যন্ত স্বস্তিদায়ক করে তোলে',
    growthEdgesTitle: 'গ্রোথ এজ ও মিষ্টি ত্রুটি',
    growthEdgesSub: 'ছোটখাটো ভুল বোঝাবুঝি দূর করে সম্পর্ক আরও নিবিড় করার উপায়',
    theFix: 'সমাধান:',
    timelineTitle: 'রিলেশনশিপ মাইলস্টোন টাইমলাইন',
    timelineSub: 'সময়ের সাথে সম্পর্কের গভীরতা ও ভালোবাসার ভবিষ্যৎ পূর্বাভাস',
    anchorLabel: 'প্রস্তাবিত রিচুয়াল:',

    storyModalTitle: '৯:১৬ স্টোরি কার্ড জেনারেটর',
    storyModalSub: 'ইনস্টাগ্রাম, টিকটক বা ফেসবুক স্টোরির জন্য আল্ট্রা হাই-রেজোলিউশন ভাইরাল কার্ড',
    downloadStoryBtn: 'স্টোরি কার্ড ডাউনলোড (১০৮০x১৯২০)',
    shareStoryBtn: 'সোশ্যালে সরাসরি শেয়ার করুন',
    storyTheme: 'কার্ডের থিম',
    generatingImage: 'কার্ড তৈরি হচ্ছে...',

    themeMidnight: 'মিডনাইট ভেলভেট (ডার্ক লাক্সারি)',
    themeRoseGold: 'রোজ গোল্ড ও শ্যাম্পেন (উজ্জ্বল প্রিমিয়াম)',
    themeLavender: 'ল্যাভেন্ডার ড্রিম (সফট পার্পল)',

    pwaInstallTitle: 'লাভম্যাচ অ্যাপ ইনস্টল করুন',
    pwaInstallDesc: 'হোমস্ক্রিনে যোগ করে অ্যাপের মতো অফলাইনে যেকোনো সময় দ্রুত ব্যবহার করুন।',
    pwaIOSGuideTitle: 'আইফোন / আইপ্যাডে ইনস্টল করুন',
    pwaIOSGuideDesc: 'সাফারির Share বাটনে ক্লিক করে নিচে "Add to Home Screen" অপশনে ট্যাপ করুন।',
    closeBtn: 'বন্ধ করুন',
    footerMadeWith: 'ভালোবাসা দিয়ে তৈরি',
    footerBy: 'কারিগর',
  },
};
