
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'drag-drop' | 'fix-bug' | 'project' | 'review';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  language: string;
  isCompleted: boolean;
  isLocked: boolean;
  xpReward: number;
}

const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Variable Declaration',
    description: 'Practice declaring and using variables in different programming languages',
    type: 'drag-drop',
    difficulty: 'Easy',
    estimatedTime: '5 min',
    language: 'Java',
    isCompleted: true,
    isLocked: false,
    xpReward: 25,
  },
  {
    id: '2',
    title: 'Fix the Loop',
    description: 'Debug a broken for loop that should count from 1 to 10',
    type: 'fix-bug',
    difficulty: 'Easy',
    estimatedTime: '8 min',
    language: 'Java',
    isCompleted: false,
    isLocked: false,
    xpReward: 35,
  },
  {
    id: '3',
    title: 'Simple Calculator',
    description: 'Build a basic calculator that can add, subtract, multiply, and divide',
    type: 'project',
    difficulty: 'Medium',
    estimatedTime: '20 min',
    language: 'Python',
    isCompleted: false,
    isLocked: true,
    xpReward: 75,
  },
  {
    id: '4',
    title: 'Code Review Challenge',
    description: 'Review and improve a piece of code written by another student',
    type: 'review',
    difficulty: 'Medium',
    estimatedTime: '15 min',
    language: 'C++',
    isCompleted: false,
    isLocked: true,
    xpReward: 50,
  },
  {
    id: '5',
    title: 'Array Manipulation',
    description: 'Practice working with arrays and lists',
    type: 'drag-drop',
    difficulty: 'Medium',
    estimatedTime: '12 min',
    language: 'Python',
    isCompleted: false,
    isLocked: true,
    xpReward: 40,
  },
  {
    id: '6',
    title: 'Function Creation',
    description: 'Create and use functions to solve problems',
    type: 'project',
    difficulty: 'Hard',
    estimatedTime: '30 min',
    language: 'Java',
    isCompleted: false,
    isLocked: true,
    xpReward: 100,
  },
];

const practiceStats = {
  exercisesCompleted: 1,
  totalExercises: exercises.length,
  streakDays: 3,
  totalTime: '5 min',
  totalXP: 25,
  weeklyGoal: 5,
  weeklyProgress: 1,
};

export default function PracticeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filters = ['All', 'Easy', 'Medium', 'Hard', 'Completed', 'Available'];

  const getFilteredExercises = () => {
    switch (selectedFilter) {
      case 'Easy':
        return exercises.filter(ex => ex.difficulty === 'Easy');
      case 'Medium':
        return exercises.filter(ex => ex.difficulty === 'Medium');
      case 'Hard':
        return exercises.filter(ex => ex.difficulty === 'Hard');
      case 'Completed':
        return exercises.filter(ex => ex.isCompleted);
      case 'Available':
        return exercises.filter(ex => !ex.isLocked && !ex.isCompleted);
      default:
        return exercises;
    }
  };

  const getExerciseTypeIcon = (type: string) => {
    switch (type) {
      case 'drag-drop': return 'move';
      case 'fix-bug': return 'bug';
      case 'project': return 'construct';
      case 'review': return 'eye';
      default: return 'code-slash';
    }
  };

  const getExerciseTypeLabel = (type: string) => {
    switch (type) {
      case 'drag-drop': return 'Drag & Drop';
      case 'fix-bug': return 'Fix Bug';
      case 'project': return 'Project';
      case 'review': return 'Code Review';
      default: return 'Exercise';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return colors.success;
      case 'Medium': return colors.warning;
      case 'Hard': return colors.error;
      default: return colors.textLight;
    }
  };

  const renderStatsCard = () => (
    <LinearGradient
      colors={colors.gradient}
      style={{
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        marginBottom: spacing.md,
      }}
    >
      <Text style={[commonStyles.heading, { color: colors.background, marginBottom: spacing.md }]}>
        Practice Stats
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ width: '50%', alignItems: 'center', marginBottom: spacing.md }}>
          <Text style={[commonStyles.title, { color: colors.background, fontSize: 24, marginBottom: 0 }]}>
            {practiceStats.exercisesCompleted}
          </Text>
          <Text style={[commonStyles.caption, { color: colors.background }]}>
            Exercises Done
          </Text>
        </View>
        <View style={{ width: '50%', alignItems: 'center', marginBottom: spacing.md }}>
          <Text style={[commonStyles.title, { color: colors.background, fontSize: 24, marginBottom: 0 }]}>
            {practiceStats.streakDays}
          </Text>
          <Text style={[commonStyles.caption, { color: colors.background }]}>
            Day Streak
          </Text>
        </View>
        <View style={{ width: '50%', alignItems: 'center' }}>
          <Text style={[commonStyles.title, { color: colors.background, fontSize: 24, marginBottom: 0 }]}>
            {practiceStats.totalXP}
          </Text>
          <Text style={[commonStyles.caption, { color: colors.background }]}>
            Total XP
          </Text>
        </View>
        <View style={{ width: '50%', alignItems: 'center' }}>
          <Text style={[commonStyles.title, { color: colors.background, fontSize: 24, marginBottom: 0 }]}>
            {practiceStats.weeklyProgress}/{practiceStats.weeklyGoal}
          </Text>
          <Text style={[commonStyles.caption, { color: colors.background }]}>
            Weekly Goal
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderWeeklyGoal = () => (
    <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
      <View style={[commonStyles.rowBetween, { marginBottom: spacing.md }]}>
        <Text style={commonStyles.subheading}>Weekly Goal</Text>
        <Text style={[commonStyles.caption, { color: colors.primary }]}>
          {practiceStats.weeklyProgress}/{practiceStats.weeklyGoal} exercises
        </Text>
      </View>
      
      <View style={{
        backgroundColor: colors.backgroundAlt,
        height: 8,
        borderRadius: 4,
        marginBottom: spacing.sm,
      }}>
        <View style={{
          backgroundColor: colors.primary,
          height: 8,
          borderRadius: 4,
          width: `${(practiceStats.weeklyProgress / practiceStats.weeklyGoal) * 100}%`,
        }} />
      </View>
      
      <Text style={commonStyles.bodySecondary}>
        Complete {practiceStats.weeklyGoal - practiceStats.weeklyProgress} more exercises to reach your weekly goal!
      </Text>
    </View>
  );

  const renderFilterButtons = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: spacing.md }}
      contentContainerStyle={{ paddingHorizontal: spacing.md }}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={{
            backgroundColor: selectedFilter === filter ? colors.primary : colors.backgroundAlt,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: borderRadius.full,
            marginRight: spacing.sm,
          }}
          onPress={() => setSelectedFilter(filter)}
        >
          <Text style={{
            color: selectedFilter === filter ? colors.background : colors.text,
            fontSize: 14,
            fontFamily: 'Inter_600SemiBold',
          }}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderExercise = (exercise: Exercise) => (
    <TouchableOpacity
      key={exercise.id}
      style={[
        commonStyles.card,
        { 
          marginBottom: spacing.md,
          opacity: exercise.isLocked ? 0.6 : 1,
          borderLeftWidth: 4,
          borderLeftColor: exercise.isCompleted ? colors.success : 
                          exercise.isLocked ? colors.textLight : colors.primary,
        }
      ]}
      onPress={() => {
        if (!exercise.isLocked) {
          router.push(`/exercise/${exercise.id}`);
        }
      }}
      disabled={exercise.isLocked}
    >
      <View style={commonStyles.rowBetween}>
        <View style={{ flex: 1, marginRight: spacing.md }}>
          <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
            <View style={{
              backgroundColor: exercise.isCompleted ? colors.success : 
                             exercise.isLocked ? colors.backgroundAlt : colors.primary,
              borderRadius: borderRadius.sm,
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.sm,
            }}>
              <Icon 
                name={exercise.isCompleted ? "checkmark" : 
                      exercise.isLocked ? "lock-closed" : 
                      getExerciseTypeIcon(exercise.type)} 
                size={16} 
                color={colors.background} 
              />
            </View>
            <View>
              <Text style={commonStyles.subheading}>{exercise.title}</Text>
              <Text style={[commonStyles.caption, { color: getDifficultyColor(exercise.difficulty) }]}>
                {getExerciseTypeLabel(exercise.type)} • {exercise.difficulty}
              </Text>
            </View>
          </View>
          
          <Text style={[commonStyles.bodySecondary, { marginBottom: spacing.sm }]}>
            {exercise.description}
          </Text>
          
          <View style={[commonStyles.rowBetween, { alignItems: 'flex-end' }]}>
            <View style={commonStyles.row}>
              <View style={{
                backgroundColor: colors.backgroundAlt,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                borderRadius: borderRadius.sm,
                marginRight: spacing.sm,
              }}>
                <Text style={[commonStyles.caption, { color: colors.text }]}>
                  {exercise.language}
                </Text>
              </View>
              <View style={commonStyles.row}>
                <Icon name="time" size={12} color={colors.textLight} />
                <Text style={[commonStyles.caption, { marginLeft: spacing.xs }]}>
                  {exercise.estimatedTime}
                </Text>
              </View>
            </View>
            
            <View style={[commonStyles.row, { alignItems: 'center' }]}>
              <Icon name="star" size={12} color={colors.warning} />
              <Text style={[commonStyles.caption, { marginLeft: spacing.xs, color: colors.warning }]}>
                +{exercise.xpReward} XP
              </Text>
            </View>
          </View>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          {exercise.isCompleted ? (
            <View style={{
              backgroundColor: colors.success,
              borderRadius: borderRadius.full,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name="checkmark" size={20} color={colors.background} />
            </View>
          ) : (
            <View style={{
              backgroundColor: exercise.isLocked ? colors.backgroundAlt : colors.primary,
              borderRadius: borderRadius.full,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon 
                name={exercise.isLocked ? "lock-closed" : "play"} 
                size={16} 
                color={exercise.isLocked ? colors.textLight : colors.background} 
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredExercises = getFilteredExercises();

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={commonStyles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingTop: spacing.md }}>
            {renderStatsCard()}
            {renderWeeklyGoal()}
            
            <Text style={[commonStyles.heading, { marginBottom: spacing.md }]}>
              Practice Exercises
            </Text>
            
            {renderFilterButtons()}
            
            {filteredExercises.length === 0 ? (
              <View style={[commonStyles.card, { alignItems: 'center', padding: spacing.xl }]}>
                <Icon name="search" size={48} color={colors.textLight} />
                <Text style={[commonStyles.subheading, { marginTop: spacing.md, marginBottom: spacing.sm }]}>
                  No exercises found
                </Text>
                <Text style={[commonStyles.bodySecondary, { textAlign: 'center' }]}>
                  Try adjusting your filter or check back later for new exercises.
                </Text>
              </View>
            ) : (
              filteredExercises.map(renderExercise)
            )}
            
            <View style={{ height: spacing.xl }} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
