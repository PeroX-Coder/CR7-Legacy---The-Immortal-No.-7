import { Milestone, MentalityPrinciple, DailyChallenge } from '../types';

export const MILESTONES: Milestone[] = [
  {
    id: '2003-debut',
    year: 2003,
    title: 'The Inception: International Debut',
    subtitle: 'Passing of the Torch in Chaves',
    category: 'debut',
    description: 'On August 20, 2003, an 18-year-old Cristiano Ronaldo with blonde frosted tips and lightning footwork stepped onto the pitch for the Seleção against Kazakhstan. Replacing the iconic Luís Figo at half-time wearing #17, he dazzled the stadium with sheer speed and audacity.',
    achievement: 'First Senior Portugal Cap (Age 18)',
    statsHighlight: '45 Mins · 4 Dribbles · Replaced Luís Figo',
    opponent: 'Portugal 1–0 Kazakhstan (Estádio Municipal de Chaves)',
    details: [
      'Handed debut by Brazilian coach Luiz Felipe Scolari.',
      'Just six days after his historic Manchester United transfer.',
      'Wore shirt #17 before inheriting the immortal #7 in 2008.',
      'Instantly won Man of the Match praises from local press.'
    ],
    quote: '"I saw in his eyes something different. Not just talent, but an obsession to conquer the world." — Luiz Felipe Scolari',
    badge: 'DEBUT',
    imageTheme: 'from-amber-600/30 to-red-950/50'
  },
  {
    id: '2004-euro',
    year: 2004,
    title: 'Euro 2004: Tears in Lisbon',
    subtitle: 'First Major Tournament & First Goal',
    category: 'tournament',
    description: 'Euro 2004 on home soil announced Ronaldo to the global stage. He scored his first international goal with a soaring header in the tournament opener against Greece, added another in the semi-final against Netherlands, and was selected for the UEFA Team of the Tournament.',
    achievement: 'UEFA Euro 2004 Team of the Tournament & Silver Medal',
    statsHighlight: '2 Goals · 2 Assists · 6 Matches Played',
    opponent: 'Host Nation Run to Final',
    details: [
      'Scored first senior goal on June 12, 2004 vs Greece (90+3\').',
      'Bullet header vs Netherlands in the 2–1 semi-final in Lisbon.',
      'Youngest player ever featured in a European Championship final at the time (19 years old).',
      'The heartbreak in the final became the catalyst for two decades of relentless hunger.'
    ],
    quote: '"Those tears in 2004 didn\'t break me. They forged the fire that never went out."',
    badge: 'BREAKTHROUGH',
    imageTheme: 'from-red-600/30 to-emerald-950/50'
  },
  {
    id: '2006-worldcup',
    year: 2006,
    title: 'World Cup 2006: The World Takes Notice',
    subtitle: 'A Historic Semi-Final Run in Germany',
    category: 'tournament',
    description: 'In Germany 2006, Ronaldo played his inaugural FIFA World Cup. Against Iran in Frankfurt, he buried a textbook penalty to become Portugal\'s youngest World Cup goalscorer ever (21 years, 132 days), helping guide Portugal to the semi-finals for the first time in 40 years.',
    achievement: 'FIFA World Cup 4th Place & Youngest World Cup Goal',
    statsHighlight: '6 Matches · 1 Goal · 26 Dribbles Completed',
    opponent: 'Semi-Finalist Finish in Germany',
    details: [
      'Coolly dispatched decisive winning penalty shootout kick against England in the quarter-final.',
      'Defended fearlessly and proved he could withstand immense global media scrutiny.',
      'Formed an iconic attacking trio alongside Deco and Pauleta under Scolari.',
      'Earned nomination for the Best Young Player Award.'
    ],
    quote: '"Pressure is a privilege. When you wear this shirt, you welcome the weight of ten million people."',
    badge: 'WORLD STAGE',
    imageTheme: 'from-yellow-600/30 to-red-950/50'
  },
  {
    id: '2016-euro-glory',
    year: 2016,
    title: 'Euro 2016: The Crown of Europe',
    subtitle: 'Parisian Triumph & Unbreakable Spirit',
    category: 'trophy',
    description: 'The defining chapter of Portuguese football history. Ronaldo dragged Portugal through the group stage with a clutch double vs Hungary and a soaring header against Wales in the semi-final. When an early injury forced him off in the final against France, he stood beside Fernando Santos commanding his brothers to an immortal 1–0 extra-time glory.',
    achievement: 'UEFA European Champions (Portugal\'s 1st Senior Trophy)',
    statsHighlight: '3 Goals · 3 Assists · Silver Boot · Captain & Leader',
    opponent: 'Portugal 1–0 France (AET, Stade de France)',
    details: [
      'Unstoppable leap (2.88m reach) to power past Wales in the semi-final.',
      'Tore off his captain armband in tears at minute 24, but returned bandaged to roar orders from the technical area.',
      'Éder\'s 109th-minute laser strike delivered Portugal\'s first ever major international silverware.',
      'Ronaldo lifted the Henri Delaunay trophy high into the Paris sky as national icon.'
    ],
    quote: '"No one believed in us. But I told Éder he would score, and we fought until our last drop of sweat for Portugal!"',
    badge: 'CHAMPIONS',
    imageTheme: 'from-emerald-500/30 to-yellow-950/50'
  },
  {
    id: '2019-nations-league',
    year: 2019,
    title: '2019: Inaugural Nations League Glory',
    subtitle: 'Lifting Gold on Home Soil in Porto',
    category: 'trophy',
    description: 'The inaugural UEFA Nations League Finals arrived in Portugal. At Estádio do Dragão, Ronaldo delivered one of the most electric hat-tricks in international history against Switzerland in the semi-final (free-kick, volley, finish), leading Portugal into the final where they defeated the Netherlands 1–0.',
    achievement: 'UEFA Nations League Champions (Inaugural Winners)',
    statsHighlight: '3 Goals in 2 Finals Matches · Tournament Top Scorer',
    opponent: 'Portugal 1–0 Netherlands (Estádio do Dragão, Porto)',
    details: [
      'Stunning 88th and 90th-minute strikes to secure a 3–1 semi-final comeback hat-trick.',
      'Second major trophy in three years for Portugal under his captaincy.',
      'Won the Alipay Top Scorer Trophy of the Nations League Finals.',
      'Cemented Portugal as the dominant European football power of the late 2010s.'
    ],
    quote: '"To win in front of our people in Porto was magical. Portugal showed the world that small nations can possess the biggest hearts."',
    badge: '2ND TROPHY',
    imageTheme: 'from-amber-500/30 to-red-950/50'
  },
  {
    id: '2025-nations-league',
    year: 2025,
    title: '2025: Second Nations League Crown',
    subtitle: 'Defying Time as the Eternal Maestro',
    category: 'trophy',
    description: 'At age 40, Ronaldo wrote yet another impossible chapter. Inspiring a golden new generation featuring Bernardo Silva, Bruno Fernandes, and Rafael Leão, the captain spearheaded Portugal\'s campaign, scoring critical group and knockout goals to hoist Portugal\'s second UEFA Nations League title.',
    achievement: 'Two-Time UEFA Nations League Champion',
    statsHighlight: '3rd Senior Trophy · Over 135+ International Goals Milestone',
    opponent: 'Continental Mastery Confirmed',
    details: [
      'Proved sports science and iron discipline can outrun age.',
      'Anchored locker-room cohesion as mentor, captain, and tactical talisman.',
      'Celebrated his iconic "SIUUU" alongside teammates who grew up watching him in 2004.',
      'Solidified Portugal\'s golden era with three major trophies in 9 years.'
    ],
    quote: '"Age is just a number when your mind is relentless and your soul belongs to Portugal."',
    badge: 'IMMORTAL',
    imageTheme: 'from-red-600/30 to-yellow-600/50'
  },
  {
    id: '2026-farewell',
    year: 2026,
    title: '2026: The Eternal Farewell',
    subtitle: 'Sixth World Cup & All-Time World Record',
    category: 'farewell',
    description: 'The final bow of international football\'s ultimate titan. Taking part in his record-setting sixth FIFA World Cup tournament across four decades, Cristiano Ronaldo concluded his legendary journey with Portugal as the all-time leading international goalscorer in men\'s football history.',
    achievement: 'All-Time Leading International Goalscorer (146 Goals / 234 Caps)',
    statsHighlight: '234 Caps · 146 Goals · 6 World Cups · Eternal Legacy',
    opponent: 'The Ultimate International Swan Song',
    details: [
      'Sole male footballer in history to compete in six separate FIFA World Cups (2006, 2010, 2014, 2018, 2022, 2026).',
      'Staggering record of 146 goals scored for one nation, eclipsing every international striker in history.',
      'Standing ovations across stadiums worldwide in tribute to two decades of greatness.',
      'The #7 shirt passed on, but the legacy etched permanently into the fabric of Portugal.'
    ],
    quote: '"I gave everything for this flag. Through victories and pain, it was the greatest privilege of my life to lead my nation."',
    badge: 'LEGACY',
    imageTheme: 'from-amber-600/30 to-emerald-950/50'
  }
];

export const MENTALITY_PRINCIPLES: MentalityPrinciple[] = [
  {
    id: 'discipline',
    number: '01',
    title: 'DISCIPLINE',
    subtitle: 'The Non-Negotiable Standard',
    quote: '"Your love makes me strong, your hate makes me unstoppable."',
    description: 'Discipline is doing what must be done when nobody is watching, when you are exhausted, and when temptation urges you to slow down. Ronaldo\'s training routine—cold plunge therapies, regimented sleep cycles, and daily core conditioning—never fluctuated across 23 professional years.',
    actionRule: 'Control your mornings, control your fuel, and never negotiate with your comfort zone.',
    keyHabits: [
      '5 daily 90-minute polyphasic sleep intervals & pristine recovery',
      'Zero refined sugar and alcohol during active competition',
      'Arriving 1 hour before scheduled training; leaving 1 hour after'
    ],
    icon: 'ShieldCheck'
  },
  {
    id: 'consistency',
    number: '02',
    title: 'CONSISTENCY',
    subtitle: 'Greatness is Repetition',
    quote: '"Talent without working hard is nothing."',
    description: 'Anyone can have one brilliant week or one inspired season. The immortal distinction between good players and legendary ones is unrelenting consistency across 1,200 matches. Showing up every single matchday with identical hunger.',
    actionRule: 'Build systems that outlast fleeting motivation. Repeat the fundamentals relentlessly.',
    keyHabits: [
      'Scoring 10+ international goals in multiple separate calendar years',
      'Over 20 consecutive seasons performing at top international tier',
      'Daily mobility and stretching routines maintained without exception'
    ],
    icon: 'Repeat'
  },
  {
    id: 'sacrifice',
    number: '03',
    title: 'SACRIFICE',
    subtitle: 'Willingness to Endure Pain',
    quote: '"If you think you\'re perfect already, then you never will be."',
    description: 'Leaving Madeira alone as a 12-year-old child to live in a Lisbon boarding academy, enduring intense homesickness, and playing through grueling knee tendonitis during the 2014 World Cup to fight for his country. True sacrifice is paying the price before the reward arrives.',
    actionRule: 'Embrace immediate discomfort for delayed historical mastery.',
    keyHabits: [
      'Enduring grueling ice baths at 3:00 AM after away matches',
      'Living thousands of miles away from family at age 12 to pursue football',
      'Subordinating personal comfort to national team duty every single window'
    ],
    icon: 'Flame'
  },
  {
    id: 'confidence',
    number: '04',
    title: 'CONFIDENCE',
    subtitle: 'Supreme Self-Belief Under Fire',
    quote: '"In my mind, I am always the best. If you don\'t believe it yourself, no one will."',
    description: 'Standing over an 88th-minute free-kick against Spain in Sochi 2018, staring down David de Gea with the world watching, pulling up his shorts, exhaling deeply, and curling the ball into the top postage stamp. Confidence isn\'t arrogance—it is earned through 100,000 previous repetitions.',
    actionRule: 'Train so ruthlessly in private that public pressure feels natural.',
    keyHabits: [
      'Pre-kick visualization and calm breath control under intense spotlight',
      'Turning hostility from opposing crowds into explosive physical power',
      'Demanding the ball in the 90th minute when everyone else hesitates'
    ],
    icon: 'Sparkles'
  },
  {
    id: 'ambition',
    number: '05',
    title: 'RELENTLESS AMBITION',
    subtitle: 'The Hunger That Never Dies',
    quote: '"I don\'t chase records. Records chase me."',
    description: 'After winning Euro 2016, five Champions Leagues, and 5 Ballon d\'Ors, most athletes become complacent. Ronaldo instead set his eyes on breaking Ali Daei\'s all-time international scoring record (109 goals), surpassing it at 111, and pushing the bar beyond 146 goals for Portugal.',
    actionRule: 'Never let yesterday\'s victory soften tomorrow\'s fight.',
    keyHabits: [
      'Breaking the men\'s all-time international scoring world record (146 goals)',
      'Aiming for 1,000 career goals well past age 40',
      'Refusing to settle as long as the jersey can still be worn'
    ],
    icon: 'Trophy'
  }
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'challenge-1',
    title: 'The Cold Focus Protocol',
    category: 'recovery',
    duration: '10 Mins',
    challenge: 'Take a 2-minute cold shower without flinching, followed by 8 minutes of silent visualization of your biggest upcoming goal.',
    ronaldoInsight: '"Cold water shocks the nervous system into pure alert mode. It teaches your brain that you dictate your comfort, not the environment."'
  },
  {
    id: 'challenge-2',
    title: 'The 100 Extra Core Reps',
    category: 'physical',
    duration: '15 Mins',
    challenge: 'Complete 100 controlled core exercises (planks, crunches, leg raises) beyond whatever workout you had planned for today.',
    ronaldoInsight: '"A strong core is the engine of balance, jumping power, and deceleration. I never went to bed without my daily core routine."'
  },
  {
    id: 'challenge-3',
    title: 'Silence the Critics Mindset',
    category: 'focus',
    duration: 'All Day',
    challenge: 'Identify one criticism or doubt someone has directed at your abilities. Convert that doubt into 2 hours of deep, uninterrupted creative work.',
    ronaldoInsight: '"Whistles and doubt were my fuel. When an entire stadium booed, it made me run twice as fast."'
  },
  {
    id: 'challenge-4',
    title: 'Zero Sugar & High Hydration',
    category: 'grit',
    duration: '24 Hours',
    challenge: 'Drink 3 liters of pure water and consume zero processed sugar or soda for a full 24 hours ("Agua, não Coca-Cola!").',
    ronaldoInsight: '"Your body is your only vehicle. You cannot expect Ferrari performance if you feed it low-grade fuel."'
  },
  {
    id: 'challenge-5',
    title: 'The Clutch Breath Reset',
    category: 'focus',
    duration: '5 Mins',
    challenge: 'Practice the CR7 Pre-Free-Kick routine: 5 measured deep breaths with eyes locked on your target, exhaling doubts completely.',
    ronaldoInsight: '"In high-stress moments, heart rate determines outcome. Controlled exhalations slow time down."'
  },
  {
    id: 'challenge-6',
    title: 'The First to Arrive, Last to Leave',
    category: 'grit',
    duration: 'Workday',
    challenge: 'Show up 15 minutes before your first meeting or study block, and stay 15 minutes after everyone logs off to review tomorrow\'s attack.',
    ronaldoInsight: '"When Carlos Queiroz and Alex Ferguson arrived at Carrington at 7:30 AM, I was already in the gym."'
  }
];

export const INTERNATIONAL_STATS = {
  caps: 234,
  goals: 146,
  worldCups: 6,
  euroTitles: 1,
  nationsLeagueTitles: 2,
  hatTricks: 10,
  assists: 45,
  freeKickGoals: 11,
  headerGoals: 31,
  penaltyGoals: 21,
  historicYearSpan: '2003 – 2026',
  nationalTeam: 'Portugal (Seleção das Quinas)',
  records: [
    'All-Time Leading International Goalscorer in Football History (146 Goals)',
    'Most International Caps in Men’s Football History (234 Caps)',
    'Only Male Player to Score in 5 Different FIFA World Cups',
    'Most UEFA European Championship Appearances (6 Tournaments)',
    'All-Time Leading Scorer in UEFA European Championship History (14 Goals)'
  ]
};

export const CLUB_STATS_COMPARISON = {
  appearances: 1040,
  goals: 785,
  championsLeagueTitles: 5,
  ballonDors: 5,
  domesticLeagueTitles: 7,
  fifaClubWorldCups: 4
};
