export type ThemeMode = 'midnight' | 'rosegold' | 'lavender';

export interface ThemeConfig {
  id: ThemeMode;
  nameKey: 'themeMidnight' | 'themeRoseGold' | 'themeLavender';
  dotColor: string;
  glowColor: string;
}

export const AVAILABLE_THEMES: ThemeConfig[] = [
  {
    id: 'midnight',
    nameKey: 'themeMidnight',
    dotColor: '#e11d48', // rose-600
    glowColor: 'rgba(225, 29, 72, 0.4)',
  },
  {
    id: 'rosegold',
    nameKey: 'themeRoseGold',
    dotColor: '#f472b6', // pink-400
    glowColor: 'rgba(244, 114, 182, 0.4)',
  },
  {
    id: 'lavender',
    nameKey: 'themeLavender',
    dotColor: '#a855f7', // purple-500
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
];
