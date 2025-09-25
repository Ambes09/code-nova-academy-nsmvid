
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  xpReward: number;
  category: 'learning' | 'practice' | 'streak' | 'social' | 'milestone';
  condition: {
    type: 'course_complete' | 'quiz_score' | 'exercise_complete' | 'streak_days' | 'total_xp' | 'badges_earned';
    value: number;
    courseId?: string;
  };
}

export const achievements: Achievement[] = [
  // Learning Achievements
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first programming lesson',
    icon: 'footsteps',
    color: '#2563eb',
    xpReward: 50,
    category: 'learning',
    condition: { type: 'course_complete', value: 1 }
  },
  {
    id: 'quick_learner',
    title: 'Quick Learner',
    description: 'Complete 3 lessons in one day',
    icon: 'flash',
    color: '#f59e0b',
    xpReward: 75,
    category: 'learning',
    condition: { type: 'course_complete', value: 3 }
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Complete your first course',
    icon: 'school',
    color: '#8b5cf6',
    xpReward: 200,
    category: 'learning',
    condition: { type: 'course_complete', value: 1 }
  },
  {
    id: 'course_master',
    title: 'Course Master',
    description: 'Complete 5 courses',
    icon: 'trophy',
    color: '#f59e0b',
    xpReward: 500,
    category: 'milestone',
    condition: { type: 'course_complete', value: 5 }
  },

  // Practice Achievements
  {
    id: 'problem_solver',
    title: 'Problem Solver',
    description: 'Complete your first coding exercise',
    icon: 'bulb',
    color: '#10b981',
    xpReward: 75,
    category: 'practice',
    condition: { type: 'exercise_complete', value: 1 }
  },
  {
    id: 'bug_hunter',
    title: 'Bug Hunter',
    description: 'Successfully fix a broken piece of code',
    icon: 'bug',
    color: '#ef4444',
    xpReward: 100,
    category: 'practice',
    condition: { type: 'exercise_complete', value: 1 }
  },
  {
    id: 'code_warrior',
    title: 'Code Warrior',
    description: 'Complete 10 coding exercises',
    icon: 'shield',
    color: '#8b5cf6',
    xpReward: 300,
    category: 'practice',
    condition: { type: 'exercise_complete', value: 10 }
  },

  // Quiz Achievements
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Complete your first chapter quiz',
    icon: 'school',
    color: '#2563eb',
    xpReward: 50,
    category: 'learning',
    condition: { type: 'quiz_score', value: 1 }
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Score 100% on a quiz',
    icon: 'star',
    color: '#f59e0b',
    xpReward: 100,
    category: 'learning',
    condition: { type: 'quiz_score', value: 100 }
  },
  {
    id: 'quiz_champion',
    title: 'Quiz Champion',
    description: 'Score 100% on 5 quizzes',
    icon: 'medal',
    color: '#f59e0b',
    xpReward: 250,
    category: 'learning',
    condition: { type: 'quiz_score', value: 5 }
  },

  // Streak Achievements
  {
    id: 'consistent_learner',
    title: 'Consistent Learner',
    description: 'Maintain a 3-day learning streak',
    icon: 'flame',
    color: '#ef4444',
    xpReward: 100,
    category: 'streak',
    condition: { type: 'streak_days', value: 3 }
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: 'flame',
    color: '#ef4444',
    xpReward: 200,
    category: 'streak',
    condition: { type: 'streak_days', value: 7 }
  },
  {
    id: 'dedication_champion',
    title: 'Dedication Champion',
    description: 'Maintain a 30-day learning streak',
    icon: 'flame',
    color: '#ef4444',
    xpReward: 1000,
    category: 'streak',
    condition: { type: 'streak_days', value: 30 }
  },

  // Milestone Achievements
  {
    id: 'rising_star',
    title: 'Rising Star',
    description: 'Earn 500 XP',
    icon: 'star',
    color: '#f59e0b',
    xpReward: 100,
    category: 'milestone',
    condition: { type: 'total_xp', value: 500 }
  },
  {
    id: 'coding_enthusiast',
    title: 'Coding Enthusiast',
    description: 'Earn 1000 XP',
    icon: 'heart',
    color: '#ef4444',
    xpReward: 200,
    category: 'milestone',
    condition: { type: 'total_xp', value: 1000 }
  },
  {
    id: 'programming_expert',
    title: 'Programming Expert',
    description: 'Earn 5000 XP',
    icon: 'trophy',
    color: '#f59e0b',
    xpReward: 500,
    category: 'milestone',
    condition: { type: 'total_xp', value: 5000 }
  },

  // Badge Collection Achievements
  {
    id: 'badge_collector',
    title: 'Badge Collector',
    description: 'Earn 5 different badges',
    icon: 'ribbon',
    color: '#8b5cf6',
    xpReward: 150,
    category: 'milestone',
    condition: { type: 'badges_earned', value: 5 }
  },
  {
    id: 'achievement_hunter',
    title: 'Achievement Hunter',
    description: 'Earn 10 different badges',
    icon: 'trophy',
    color: '#f59e0b',
    xpReward: 300,
    category: 'milestone',
    condition: { type: 'badges_earned', value: 10 }
  }
];

export const getAchievementsByCategory = (category: Achievement['category']) => {
  return achievements.filter(achievement => achievement.category === category);
};

export const findAchievementById = (id: string) => {
  return achievements.find(achievement => achievement.id === id);
};
