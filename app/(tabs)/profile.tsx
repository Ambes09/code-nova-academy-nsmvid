
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import ProgressRing from '../../components/ProgressRing';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const defaultUserStats = {
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
  const [userStats, setUserStats] = useState(defaultUserStats);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const avatar = await AsyncStorage.getItem('userAvatar');
      
      if (name) {
        setUserName(name);
        setUserStats(prev => ({ ...prev, name }));
      }
      
      if (avatar) {
        setUserAvatar(JSON.parse(avatar));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

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
          {/* Avatar */}
          <View style={{
            backgroundColor: colors.background,
            borderRadius: borderRadius.full,
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.md,
            borderWidth: 3,
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }}>
            {userAvatar?.type === 'emoji' ? (
              <Text style={{ fontSize: 32 }}>
                {userAvatar.value}
              </Text>
            ) : userAvatar?.type === 'custom' ? (
              <Image
                source={{ uri: userAvatar.value }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                }}
              />
            ) : (
              <Text style={[commonStyles.heading, { color: colors.primary, marginBottom: 0, fontSize: 24 }]}>
                {userStats.name.split(' ').map(n => n[0]).join('')}
              </Text>
            )}
          </View>
          
          <Text style={[commonStyles.heading, { color: colors.background, marginBottom: spacing.xs }]}>
            {userStats.name}
          </Text>
          
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.xs,
            borderRadius: borderRadius.full,
            alignSelf: 'flex-start',
            marginBottom: spacing.sm,
          }}>
            <Text style={[commonStyles.caption, { color: colors.background, fontWeight: '600' }]}>
              Level {userStats.level}
            </Text>
          </View>
          
          <Text style={[commonStyles.body, { color: colors.background, opacity: 0.9 }]}>
            Joined {userStats.joinDate}
          </Text>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <ProgressRing 
            progress={(userStats.xp / userStats.xpToNextLevel) * 100} 
            size={70} 
            strokeWidth={8} 
            color={colors.background} 
          />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.sm, fontWeight: '600' }]}>
            {userStats.xp}/{userStats.xpToNextLevel} XP
          </Text>
          <Text style={[commonStyles.caption, { color: colors.background, opacity: 0.8 }]}>
            to Level {userStats.level + 1}
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={{
        flexDirection: 'row',
        marginTop: spacing.lg,
        paddingTop: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: spacing.sm,
          }}
          onPress={() => router.push('/profile/settings')}
        >
          <Icon name="settings" size={20} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            Settings
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: spacing.sm,
          }}
          onPress={() => console.log('View achievements')}
        >
          <Icon name="trophy" size={20} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            Achievements
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: spacing.sm,
          }}
          onPress={() => console.log('Share progress')}
        >
          <Icon name="share" size={20} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const renderStatsGrid = () => (
    <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>Learning Stats</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ width: '50%', paddingRight: spacing.sm, marginBottom: spacing.md }}>
          <View style={{
            backgroundColor: colors.primary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
          }}>
            <Icon name="time" size={20} color={colors.background} />
            <Text style={[commonStyles.title, { fontSize: 18, marginBottom: 0, color: colors.background, marginTop: spacing.xs }]}>
              {userStats.totalLearningTime}
            </Text>
            <Text style={[commonStyles.caption, { color: colors.background, opacity: 0.9 }]}>
              Learning Time
            </Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingLeft: spacing.sm, marginBottom: spacing.md }}>
          <View style={{
            backgroundColor: colors.success,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
          }}>
            <Icon name="school" size={20} color={colors.background} />
            <Text style={[commonStyles.title, { fontSize: 18, marginBottom: 0, color: colors.background, marginTop: spacing.xs }]}>
              {userStats.coursesCompleted}
            </Text>
            <Text style={[commonStyles.caption, { color: colors.background, opacity: 0.9 }]}>
              Courses Done
            </Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingRight: spacing.sm }}>
          <View style={{
            backgroundColor: colors.warning,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
          }}>
            <Icon name="flame" size={20} color={colors.background} />
            <Text style={[commonStyles.title, { fontSize: 18, marginBottom: 0, color: colors.background, marginTop: spacing.xs }]}>
              {userStats.currentStreak}
            </Text>
            <Text style={[commonStyles.caption, { color: colors.background, opacity: 0.9 }]}>
              Day Streak
            </Text>
          </View>
        </View>
        <View style={{ width: '50%', paddingLeft: spacing.sm }}>
          <View style={{
            backgroundColor: colors.secondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
          }}>
            <Icon name="trophy" size={20} color={colors.background} />
            <Text style={[commonStyles.title, { fontSize: 18, marginBottom: 0, color: colors.background, marginTop: spacing.xs }]}>
              {badges.filter(b => b.isEarned).length}
            </Text>
            <Text style={[commonStyles.caption, { color: colors.background, opacity: 0.9 }]}>
              Badges Earned
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCurrentProgress = () => (
    <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
      <View style={[commonStyles.rowBetween, { marginBottom: spacing.md }]}>
        <Text style={commonStyles.subheading}>Current Progress</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/learn')}>
          <Text style={[commonStyles.caption, { color: colors.primary }]}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{
        backgroundColor: colors.backgroundAlt,
        borderRadius: borderRadius.md,
        padding: spacing.md,
      }}>
        <View style={[commonStyles.rowBetween, { marginBottom: spacing.sm }]}>
          <Text style={[commonStyles.body, { fontWeight: '600' }]}>
            Basic Programming Concepts
          </Text>
          <Text style={[commonStyles.caption, { color: colors.primary }]}>
            25% Complete
          </Text>
        </View>
        
        <View style={{
          height: 6,
          backgroundColor: colors.grey,
          borderRadius: 3,
          marginBottom: spacing.md,
        }}>
          <View style={{
            height: 6,
            backgroundColor: colors.primary,
            borderRadius: 3,
            width: '25%',
          }} />
        </View>
        
        <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
          <Icon name="book" size={16} color={colors.textSecondary} />
          <Text style={[commonStyles.caption, { marginLeft: spacing.xs, color: colors.textSecondary }]}>
            Chapter 3 of 12 • What is Programming?
          </Text>
        </View>
        
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            borderRadius: borderRadius.md,
            alignItems: 'center',
          }}
          onPress={() => router.push('/course/1')}
        >
          <Text style={[commonStyles.buttonText, { color: colors.background }]}>
            Continue Learning
          </Text>
        </TouchableOpacity>
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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.md }}>
          {renderProfileHeader()}
          {renderStatsGrid()}
          {renderCurrentProgress()}
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
    </View>
  );
}
