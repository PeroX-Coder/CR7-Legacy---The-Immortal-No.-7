export interface Milestone {
  id: string;
  year: number;
  title: string;
  subtitle: string;
  category: 'debut' | 'tournament' | 'trophy' | 'farewell';
  description: string;
  achievement: string;
  statsHighlight: string;
  opponent?: string;
  details: string[];
  quote?: string;
  badge: string;
  imageTheme: string;
}

export interface MentalityPrinciple {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  actionRule: string;
  keyHabits: string[];
  icon: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  category: 'physical' | 'focus' | 'recovery' | 'grit';
  duration: string;
  challenge: string;
  ronaldoInsight: string;
}

export interface GameScore {
  score: number;
  goals: number;
  shots: number;
  accuracy: number;
  maxCombo: number;
  date: string;
}
