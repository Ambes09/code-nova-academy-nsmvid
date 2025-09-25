
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import ProgressRing from '../../components/ProgressRing';

interface LearningTrack {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalCourses: number;
  completedCourses: number;
  icon: string;
  color: string;
}

const learningTracks: LearningTrack[] = [
  {
    id: '1',
    name: 'Programming Fundamentals',
    description: 'Master the basics of programming logic and thinking',
    progress: 25,
    totalCourses: 3,
    completedCourses: 0,
    icon: 'bulb',
    color: colors.primary,
  },
  {
    id: '2',
    name: 'Web Development',
    description: 'Build beautiful websites with HTML, CSS, and more',
    progress: 0,
    totalCourses: 3,
    completedCourses: 0,
    icon: 'globe',
    color: colors.secondary,
  },
  {
    id: '3',
    name: 'Programming Languages',
    description: 'Learn popular programming languages',
    progress: 0,
    totalCourses: 3,
    completedCourses: 0,
    icon: 'code-slash',
    color: '#10b981',
  },
  {
    id: '4',
    name: 'Developer Tools',
    description: 'Master essential development tools and workflows',
    progress: 0,
    totalCourses: 3,
    completedCourses: 0,
    icon: 'construct',
    color: '#f59e0b',
  },
];

export default function HomeScreen() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalBadges, setTotalBadges] = useState(2);

  const renderWelcomeCard = () => (
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
          <Text style={[commonStyles.heading, { color: colors.background, marginBottom: spacing.xs }]}>
            Welcome back! 👋
          </Text>
          <Text style={[commonStyles.body, { color: colors.background, opacity: 0.9 }]}>
            Ready to continue your coding journey?
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ProgressRing progress={25} size={60} strokeWidth={6} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            Overall Progress
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderStatsCard = () => (
    <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>Your Stats</Text>
      <View style={commonStyles.rowBetween}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={{
            backgroundColor: colors.primary,
            borderRadius: borderRadius.full,
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}>
            <Icon name="flame" size={24} color={colors.background} />
          </View>
          <Text style={[commonStyles.subheading, { fontSize: 20, marginBottom: 0 }]}>{currentStreak}</Text>
          <Text style={commonStyles.caption}>Day Streak</Text>
        </View>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={{
            backgroundColor: colors.secondary,
            borderRadius: borderRadius.full,
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}>
            <Icon name="trophy" size={24} color={colors.background} />
          </View>
          <Text style={[commonStyles.subheading, { fontSize: 20, marginBottom: 0 }]}>{totalBadges}</Text>
          <Text style={commonStyles.caption}>Badges Earned</Text>
        </View>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={{
            backgroundColor: colors.success,
            borderRadius: borderRadius.full,
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}>
            <Icon name="checkmark-circle" size={24} color={colors.background} />
          </View>
          <Text style={[commonStyles.subheading, { fontSize: 20, marginBottom: 0 }]}>0</Text>
          <Text style={commonStyles.caption}>Courses Done</Text>
        </View>
      </View>
    </View>
  );

  const renderLearningTrack = (track: LearningTrack) => (
    <TouchableOpacity
      key={track.id}
      style={[commonStyles.card, { marginBottom: spacing.md }]}
      onPress={() => console.log('Navigate to track:', track.name)}
    >
      <View style={commonStyles.rowBetween}>
        <View style={{ flex: 1, marginRight: spacing.md }}>
          <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
            <View style={{
              backgroundColor: track.color,
              borderRadius: borderRadius.sm,
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.sm,
            }}>
              <Icon name={track.icon as any} size={18} color={colors.background} />
            </View>
            <Text style={commonStyles.subheading}>{track.name}</Text>
          </View>
          <Text style={[commonStyles.bodySecondary, { marginBottom: spacing.sm }]}>
            {track.description}
          </Text>
          <View style={commonStyles.row}>
            <Text style={commonStyles.caption}>
              {track.completedCourses}/{track.totalCourses} courses completed
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ProgressRing 
            progress={track.progress} 
            size={50} 
            strokeWidth={4} 
            color={track.color} 
          />
          <Text style={[commonStyles.caption, { marginTop: spacing.xs }]}>
            {track.progress}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.md }}>
          {renderWelcomeCard()}
          {renderStatsCard()}
          
          <Text style={[commonStyles.heading, { marginBottom: spacing.md }]}>
            Learning Tracks
          </Text>
          
          {learningTracks.map(renderLearningTrack)}
          
          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
