
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import ProgressRing from '../../components/ProgressRing';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isEarned: boolean;
  earnedDate?: string;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first programming lesson',
    icon: 'footsteps',
    color: colors.primary,
    isEarned: true,
    earnedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Quick Learner',
    description: 'Complete 3 lessons in one day',
    icon: 'flash',
    color: colors.warning,
    isEarned: true,
    earnedDate: '2024-01-16',
  },
  {
    id: '3',
    name: 'Problem Solver',
    description: 'Complete your first coding exercise',
    icon: 'bulb',
    color: colors.success,
    isEarned: false,
  },
  {
    id: '4',
    name: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: 'flame',
    color: colors.error,
    isEarned: false,
  },
  {
    id: '5',
    name: 'Code Explorer',
    description: 'Try exercises in 3 different languages',
    icon: 'globe',
    color: colors.secondary,
    isEarned: false,
  },
  {
    id: '6',
    name: 'Perfectionist',
    description: 'Score 100% on 5 quizzes',
    icon: 'star',
    color: '#f59e0b',
    isEarned: false,
  },
];

const userStats = {
  name: 'Alex Johnson',
  level: 2,
  xp: 250,
  xpToNextLevel: 500,
  joinDate: 'January 2024',
  totalLearningTime: '8 hours',
  coursesCompleted: 0,
  exercisesCompleted: 1,
  currentStreak: 7,
  longestStreak: 7,
};

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('badges');

  const renderProfileHeader = () => (
    <LinearGradient
      colors={colors.gradient}
      style={{
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        marginBottom: spacing.md,
      }}
    >
      <View style={commonStyles.rowBetween}>
        <View style={{ flex: 1 }}>
          <View style={{
            backgroundColor: colors.background,
            borderRadius: borderRadius.full,
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.md,
          }}>
            <Text style={[commonStyles.heading, { color: colors.primary, marginBottom: 0 }]}>
              {userStats.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <Text style={[commonStyles.heading, { color: colors.background, marginBottom: spacing.xs }]}>
            {userStats.name}
          </Text>
          <Text style={[commonStyles.body, { color: colors.background, opacity: 0.9 }]}>
            Level {userStats.level} • Joined {userStats.joinDate}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ProgressRing 
            progress={(userStats.xp / userStats.xpToNextLevel) * 100} 
            size={60} 
            strokeWidth={6} 
            color={colors.background} 
          />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            {userStats.xp}/{userStats.xpToNextLevel} XP
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderStatsGrid = () => (
    <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>Learning Stats</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ width: '50%', paddingRight: spacing.sm, marginBottom: spacing.md }}>
          <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 0 }]}>
            {userStats.totalLearningTime}
          </Text>
          <Text style={commonStyles.caption}>Total Learning Time</Text>
        </View>
        <View style={{ width: '50%', paddingLeft: spacing.sm, marginBottom: spacing.md }}>
          <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 0 }]}>
            {userStats.coursesCompleted}
          </Text>
          <Text style={commonStyles.caption}>Courses Completed</Text>
        </View>
        <View style={{ width: '50%', paddingRight: spacing.sm }}>
          <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 0 }]}>
            {userStats.currentStreak}
          </Text>
          <Text style={commonStyles.caption}>Current Streak</Text>
        </View>
        <View style={{ width: '50%', paddingLeft: spacing.sm }}>
          <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 0 }]}>
            {userStats.exercisesCompleted}
          </Text>
          <Text style={commonStyles.caption}>Exercises Done</Text>
        </View>
      </View>
    </View>
  );

  const renderTabButtons = () => (
    <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: selectedTab === 'badges' ? colors.primary : colors.backgroundAlt,
          paddingVertical: spacing.md,
          borderRadius: borderRadius.md,
          marginRight: spacing.sm,
          alignItems: 'center',
        }}
        onPress={() => setSelectedTab('badges')}
      >
        <Text style={{
          color: selectedTab === 'badges' ? colors.background : colors.text,
          fontFamily: 'Inter_600SemiBold',
        }}>
          Badges
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: selectedTab === 'achievements' ? colors.primary : colors.backgroundAlt,
          paddingVertical: spacing.md,
          borderRadius: borderRadius.md,
          marginLeft: spacing.sm,
          alignItems: 'center',
        }}
        onPress={() => setSelectedTab('achievements')}
      >
        <Text style={{
          color: selectedTab === 'achievements' ? colors.background : colors.text,
          fontFamily: 'Inter_600SemiBold',
        }}>
          Achievements
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBadge = (badge: Badge) => (
    <View
      key={badge.id}
      style={[
        commonStyles.card,
        { 
          marginBottom: spacing.md,
          opacity: badge.isEarned ? 1 : 0.5,
        }
      ]}
    >
      <View style={commonStyles.row}>
        <View style={{
          backgroundColor: badge.isEarned ? badge.color : colors.backgroundAlt,
          borderRadius: borderRadius.full,
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.md,
        }}>
          <Icon 
            name={badge.icon as any} 
            size={24} 
            color={badge.isEarned ? colors.background : colors.textLight} 
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={commonStyles.rowBetween}>
            <Text style={commonStyles.subheading}>{badge.name}</Text>
            {badge.isEarned && (
              <Icon name="checkmark-circle" size={20} color={colors.success} />
            )}
          </View>
          <Text style={[commonStyles.bodySecondary, { marginBottom: spacing.xs }]}>
            {badge.description}
          </Text>
          {badge.isEarned && badge.earnedDate && (
            <Text style={commonStyles.caption}>
              Earned on {new Date(badge.earnedDate).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={commonStyles.card}>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>Recent Achievements</Text>
      <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
        <Icon name="trophy" size={20} color={colors.warning} />
        <Text style={[commonStyles.body, { marginLeft: spacing.sm }]}>
          Completed first programming lesson
        </Text>
      </View>
      <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
        <Icon name="flash" size={20} color={colors.primary} />
        <Text style={[commonStyles.body, { marginLeft: spacing.sm }]}>
          Reached 7-day learning streak
        </Text>
      </View>
      <View style={commonStyles.row}>
        <Icon name="star" size={20} color={colors.success} />
        <Text style={[commonStyles.body, { marginLeft: spacing.sm }]}>
          Earned first badge
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.md }}>
          {renderProfileHeader()}
          {renderStatsGrid()}
          {renderTabButtons()}
          
          {selectedTab === 'badges' ? (
            <View>
              <Text style={[commonStyles.heading, { marginBottom: spacing.md }]}>
                Badges ({badges.filter(b => b.isEarned).length}/{badges.length})
              </Text>
              {badges.map(renderBadge)}
            </View>
          ) : (
            <View>
              <Text style={[commonStyles.heading, { marginBottom: spacing.md }]}>
                Recent Achievements
              </Text>
              {renderAchievements()}
            </View>
          )}
          
          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
