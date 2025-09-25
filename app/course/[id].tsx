
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import ProgressRing from '../../components/ProgressRing';

interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  hasQuiz: boolean;
  hasExercise: boolean;
}

const courseData = {
  '1': {
    name: 'Basic Programming Concepts',
    description: 'Learn variables, data types, and basic programming structures',
    duration: '12 hours',
    modules: 4,
    chapters: 12,
    progress: 25,
    difficulty: 'Beginner',
    instructor: 'Nova Code Academy',
    learningObjectives: [
      'Understand what programming is and how it works',
      'Learn about variables and different data types',
      'Master basic operations and expressions',
      'Use conditional statements to make decisions',
      'Implement loops for repetitive tasks'
    ],
    chapters: [
      {
        id: '1',
        title: 'What is Programming?',
        description: 'Introduction to programming and how computers work',
        duration: '15 min',
        isCompleted: true,
        isLocked: false,
        hasQuiz: true,
        hasExercise: false,
      },
      {
        id: '2',
        title: 'Variables and Data Types',
        description: 'Learn about storing and using data in programs',
        duration: '20 min',
        isCompleted: true,
        isLocked: false,
        hasQuiz: true,
        hasExercise: true,
      },
      {
        id: '3',
        title: 'Basic Operations',
        description: 'Mathematical and logical operations in programming',
        duration: '18 min',
        isCompleted: true,
        isLocked: false,
        hasQuiz: true,
        hasExercise: false,
      },
      {
        id: '4',
        title: 'Conditional Statements',
        description: 'Making decisions in your code with if/else',
        duration: '25 min',
        isCompleted: false,
        isLocked: false,
        hasQuiz: true,
        hasExercise: true,
      },
      {
        id: '5',
        title: 'Loops and Repetition',
        description: 'Repeating code efficiently with loops',
        duration: '30 min',
        isCompleted: false,
        isLocked: true,
        hasQuiz: true,
        hasExercise: true,
      },
      {
        id: '6',
        title: 'Functions and Methods',
        description: 'Organizing code into reusable functions',
        duration: '35 min',
        isCompleted: false,
        isLocked: true,
        hasQuiz: true,
        hasExercise: true,
      },
    ] as Chapter[],
  },
  '2': {
    name: 'Algorithm Thinking',
    description: 'Develop logical thinking and problem-solving skills',
    duration: '15 hours',
    modules: 5,
    chapters: 15,
    progress: 0,
    difficulty: 'Beginner',
    instructor: 'Nova Code Academy',
    learningObjectives: [
      'Understand algorithmic thinking',
      'Learn problem decomposition',
      'Master flowchart creation',
      'Practice pseudocode writing',
      'Solve complex problems step by step'
    ],
    chapters: [
      {
        id: '1',
        title: 'What is an Algorithm?',
        description: 'Understanding algorithms and their importance',
        duration: '20 min',
        isCompleted: false,
        isLocked: false,
        hasQuiz: true,
        hasExercise: false,
      },
      {
        id: '2',
        title: 'Problem Decomposition',
        description: 'Breaking down complex problems into smaller parts',
        duration: '25 min',
        isCompleted: false,
        isLocked: true,
        hasQuiz: true,
        hasExercise: true,
      },
    ] as Chapter[],
  },
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = courseData[id as keyof typeof courseData];

  if (!course) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.heading}>Course not found</Text>
          <TouchableOpacity
            style={[commonStyles.card, { marginTop: spacing.md }]}
            onPress={() => router.back()}
          >
            <Text style={commonStyles.body}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderHeader = () => (
    <View>
      <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: colors.backgroundAlt,
            borderRadius: borderRadius.full,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
          }}
        >
          <Icon name="chevron-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.heading, { flex: 1 }]}>Course Details</Text>
      </View>

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
              {course.name}
            </Text>
            <Text style={[commonStyles.body, { color: colors.background, opacity: 0.9, marginBottom: spacing.md }]}>
              {course.description}
            </Text>
            <View style={commonStyles.row}>
              <View style={[commonStyles.row, { marginRight: spacing.lg }]}>
                <Icon name="time" size={16} color={colors.background} />
                <Text style={[commonStyles.caption, { color: colors.background, marginLeft: spacing.xs }]}>
                  {course.duration}
                </Text>
              </View>
              <View style={commonStyles.row}>
                <Icon name="book" size={16} color={colors.background} />
                <Text style={[commonStyles.caption, { color: colors.background, marginLeft: spacing.xs }]}>
                  {course.chapters.length} chapters
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <ProgressRing progress={course.progress} size={60} strokeWidth={6} color={colors.background} />
            <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
              {course.progress}% Complete
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderCourseInfo = () => (
    <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
        Course Information
      </Text>
      
      <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
        <Icon name="person" size={16} color={colors.textLight} />
        <Text style={[commonStyles.body, { marginLeft: spacing.sm }]}>
          Instructor: {course.instructor}
        </Text>
      </View>
      
      <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
        <Icon name="bar-chart" size={16} color={colors.textLight} />
        <Text style={[commonStyles.body, { marginLeft: spacing.sm }]}>
          Difficulty: {course.difficulty}
        </Text>
      </View>
      
      <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
        <Icon name="library" size={16} color={colors.textLight} />
        <Text style={[commonStyles.body, { marginLeft: spacing.sm }]}>
          {course.modules} modules • {course.chapters.length} chapters
        </Text>
      </View>

      <Text style={[commonStyles.subheading, { marginBottom: spacing.sm }]}>
        Learning Objectives:
      </Text>
      {course.learningObjectives.map((objective, index) => (
        <View key={index} style={[commonStyles.row, { marginBottom: spacing.xs }]}>
          <Icon name="checkmark-circle" size={14} color={colors.success} />
          <Text style={[commonStyles.bodySecondary, { marginLeft: spacing.sm, flex: 1 }]}>
            {objective}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderChapter = (chapter: Chapter, index: number) => (
    <TouchableOpacity
      key={chapter.id}
      style={[
        commonStyles.card,
        { 
          marginBottom: spacing.md,
          opacity: chapter.isLocked ? 0.6 : 1,
          borderLeftWidth: 4,
          borderLeftColor: chapter.isCompleted ? colors.success : 
                          chapter.isLocked ? colors.textLight : colors.primary,
        }
      ]}
      onPress={() => {
        if (!chapter.isLocked) {
          router.push(`/chapter/${chapter.id}`);
        }
      }}
      disabled={chapter.isLocked}
    >
      <View style={commonStyles.rowBetween}>
        <View style={{ flex: 1, marginRight: spacing.md }}>
          <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
            <View style={{
              backgroundColor: chapter.isCompleted ? colors.success : 
                             chapter.isLocked ? colors.backgroundAlt : colors.primary,
              borderRadius: borderRadius.sm,
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.sm,
            }}>
              <Text style={{
                color: colors.background,
                fontSize: 12,
                fontFamily: 'Inter_600SemiBold',
              }}>
                {chapter.isCompleted ? '✓' : chapter.isLocked ? '🔒' : index + 1}
              </Text>
            </View>
            <View>
              <Text style={commonStyles.subheading}>{chapter.title}</Text>
              <View style={commonStyles.row}>
                <Icon name="time" size={12} color={colors.textLight} />
                <Text style={[commonStyles.caption, { marginLeft: spacing.xs }]}>
                  {chapter.duration}
                </Text>
              </View>
            </View>
          </View>
          
          <Text style={[commonStyles.bodySecondary, { marginBottom: spacing.sm }]}>
            {chapter.description}
          </Text>

          {/* Chapter features */}
          <View style={commonStyles.row}>
            {chapter.hasQuiz && (
              <View style={{
                backgroundColor: colors.primary,
                paddingHorizontal: spacing.xs,
                paddingVertical: 2,
                borderRadius: borderRadius.sm,
                marginRight: spacing.xs,
              }}>
                <Text style={[commonStyles.caption, { color: colors.background, fontSize: 10 }]}>
                  QUIZ
                </Text>
              </View>
            )}
            {chapter.hasExercise && (
              <View style={{
                backgroundColor: colors.success,
                paddingHorizontal: spacing.xs,
                paddingVertical: 2,
                borderRadius: borderRadius.sm,
                marginRight: spacing.xs,
              }}>
                <Text style={[commonStyles.caption, { color: colors.background, fontSize: 10 }]}>
                  EXERCISE
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={{ alignItems: 'center' }}>
          {chapter.isCompleted ? (
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
              backgroundColor: chapter.isLocked ? colors.backgroundAlt : colors.primary,
              borderRadius: borderRadius.full,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon 
                name={chapter.isLocked ? "lock-closed" : "play"} 
                size={16} 
                color={chapter.isLocked ? colors.textLight : colors.background} 
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.md }}>
          {renderHeader()}
          {renderCourseInfo()}
          
          <Text style={[commonStyles.heading, { marginBottom: spacing.md }]}>
            Chapters
          </Text>
          
          {course.chapters.map(renderChapter)}
          
          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
