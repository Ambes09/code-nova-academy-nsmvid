
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import ProgressRing from '../../components/ProgressRing';
import FunFactPopup, { funFacts, FunFact } from '../../components/FunFactPopup';
import { learningTracks } from '../../data/courseContent';

export default function HomeScreen() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalBadges, setTotalBadges] = useState(2);
  const [totalXP, setTotalXP] = useState(275);
  const [showFunFact, setShowFunFact] = useState(false);
  const [currentFunFact, setCurrentFunFact] = useState<FunFact | null>(null);

  // Show random fun fact on app load
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
      setCurrentFunFact(randomFact);
      setShowFunFact(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ width: '50%', alignItems: 'center', marginBottom: spacing.md }}>
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
        <View style={{ width: '50%', alignItems: 'center', marginBottom: spacing.md }}>
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
        <View style={{ width: '50%', alignItems: 'center' }}>
          <View style={{
            backgroundColor: colors.warning,
            borderRadius: borderRadius.full,
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}>
            <Icon name="star" size={24} color={colors.background} />
          </View>
          <Text style={[commonStyles.subheading, { fontSize: 20, marginBottom: 0 }]}>{totalXP}</Text>
          <Text style={commonStyles.caption}>Total XP</Text>
        </View>
        <View style={{ width: '50%', alignItems: 'center' }}>
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

  const renderQuickActions = () => (
    <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>Quick Actions</Text>
      
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            width: '48%',
            marginRight: '2%',
            marginBottom: spacing.sm,
            alignItems: 'center',
          }}
          onPress={() => router.push('/(tabs)/learn')}
        >
          <Icon name="book" size={24} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            Continue Learning
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.success,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            width: '48%',
            marginLeft: '2%',
            marginBottom: spacing.sm,
            alignItems: 'center',
          }}
          onPress={() => router.push('/(tabs)/practice')}
        >
          <Icon name="code-slash" size={24} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            Practice Coding
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.secondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            width: '48%',
            marginRight: '2%',
            alignItems: 'center',
          }}
          onPress={() => {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            setCurrentFunFact(randomFact);
            setShowFunFact(true);
          }}
        >
          <Icon name="bulb" size={24} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            Fun Fact
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.warning,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            width: '48%',
            marginLeft: '2%',
            alignItems: 'center',
          }}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <Icon name="person" size={24} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLearningTrack = (track: any) => (
    <TouchableOpacity
      key={track.id}
      style={[commonStyles.card, { marginBottom: spacing.md }]}
      onPress={() => router.push('/(tabs)/learn')}
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
          {renderQuickActions()}
          
          <Text style={[commonStyles.heading, { marginBottom: spacing.md }]}>
            Learning Tracks
          </Text>
          
          {learningTracks.map(renderLearningTrack)}
          
          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>

      <FunFactPopup
        funFact={currentFunFact}
        isVisible={showFunFact}
        onClose={() => setShowFunFact(false)}
      />
    </SafeAreaView>
  );
}
