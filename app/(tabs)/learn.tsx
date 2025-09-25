
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import ProgressRing from '../../components/ProgressRing';

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  modules: number;
  chapters: number;
  progress: number;
  isLocked: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const programmingFundamentalsCourses: Course[] = [
  {
    id: '1',
    name: 'Basic Programming Concepts',
    description: 'Learn variables, data types, and basic programming structures',
    duration: '12 hours',
    modules: 4,
    chapters: 12,
    progress: 25,
    isLocked: false,
    difficulty: 'Beginner',
  },
  {
    id: '2',
    name: 'Algorithm Thinking',
    description: 'Develop logical thinking and problem-solving skills',
    duration: '15 hours',
    modules: 5,
    chapters: 15,
    progress: 0,
    isLocked: true,
    difficulty: 'Beginner',
  },
  {
    id: '3',
    name: 'Problem Solving',
    description: 'Apply programming concepts to solve real-world problems',
    duration: '10 hours',
    modules: 4,
    chapters: 10,
    progress: 0,
    isLocked: true,
    difficulty: 'Beginner',
  },
];

const otherTracks = [
  { name: 'Web Development', courses: 3, icon: 'globe', color: colors.secondary },
  { name: 'Programming Languages', courses: 3, icon: 'code-slash', color: colors.success },
  { name: 'Developer Tools', courses: 3, icon: 'construct', color: colors.warning },
];

export default function LearnScreen() {
  const [selectedTrack, setSelectedTrack] = useState('Programming Fundamentals');

  const renderTrackHeader = () => (
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
            Programming Fundamentals
          </Text>
          <Text style={[commonStyles.body, { color: colors.background, opacity: 0.9, marginBottom: spacing.md }]}>
            Master the basics of programming logic and thinking
          </Text>
          <View style={commonStyles.row}>
            <View style={[commonStyles.row, { marginRight: spacing.lg }]}>
              <Icon name="time" size={16} color={colors.background} />
              <Text style={[commonStyles.caption, { color: colors.background, marginLeft: spacing.xs }]}>
                37 hours total
              </Text>
            </View>
            <View style={commonStyles.row}>
              <Icon name="book" size={16} color={colors.background} />
              <Text style={[commonStyles.caption, { color: colors.background, marginLeft: spacing.xs }]}>
                3 courses
              </Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ProgressRing progress={8} size={60} strokeWidth={6} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            8% Complete
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderCourse = (course: Course) => (
    <TouchableOpacity
      key={course.id}
      style={[
        commonStyles.card,
        { 
          marginBottom: spacing.md,
          opacity: course.isLocked ? 0.6 : 1,
        }
      ]}
      onPress={() => {
        if (!course.isLocked) {
          router.push(`/course/${course.id}`);
        }
      }}
      disabled={course.isLocked}
    >
      <View style={commonStyles.rowBetween}>
        <View style={{ flex: 1, marginRight: spacing.md }}>
          <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
            <Text style={commonStyles.subheading}>{course.name}</Text>
            {course.isLocked && (
              <Icon name="lock-closed" size={16} color={colors.textLight} style={{ marginLeft: spacing.sm }} />
            )}
          </View>
          
          <Text style={[commonStyles.bodySecondary, { marginBottom: spacing.sm }]}>
            {course.description}
          </Text>
          
          <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
            <View style={{
              backgroundColor: colors.backgroundAlt,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
              borderRadius: borderRadius.sm,
              marginRight: spacing.sm,
            }}>
              <Text style={[commonStyles.caption, { color: colors.primary }]}>
                {course.difficulty}
              </Text>
            </View>
            <Text style={commonStyles.caption}>
              {course.duration} • {course.modules} modules • {course.chapters} chapters
            </Text>
          </View>
          
          {course.progress > 0 && (
            <View style={commonStyles.row}>
              <View style={{
                backgroundColor: colors.backgroundAlt,
                height: 4,
                borderRadius: 2,
                flex: 1,
                marginRight: spacing.sm,
              }}>
                <View style={{
                  backgroundColor: colors.primary,
                  height: 4,
                  borderRadius: 2,
                  width: `${course.progress}%`,
                }} />
              </View>
              <Text style={commonStyles.caption}>{course.progress}%</Text>
            </View>
          )}
        </View>
        
        <View style={{ alignItems: 'center' }}>
          {course.progress > 0 ? (
            <ProgressRing 
              progress={course.progress} 
              size={50} 
              strokeWidth={4} 
              color={colors.primary} 
            />
          ) : (
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: course.isLocked ? colors.backgroundAlt : colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon 
                name={course.isLocked ? "lock-closed" : "play"} 
                size={20} 
                color={course.isLocked ? colors.textLight : colors.background} 
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderOtherTrack = (track: any) => (
    <TouchableOpacity
      key={track.name}
      style={[commonStyles.card, { marginBottom: spacing.md }]}
      onPress={() => console.log('Navigate to track:', track.name)}
    >
      <View style={commonStyles.row}>
        <View style={{
          backgroundColor: track.color,
          borderRadius: borderRadius.sm,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.md,
        }}>
          <Icon name={track.icon} size={20} color={colors.background} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={commonStyles.subheading}>{track.name}</Text>
          <Text style={commonStyles.caption}>{track.courses} courses available</Text>
        </View>
        <Icon name="chevron-forward" size={20} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.md }}>
          {renderTrackHeader()}
          
          <Text style={[commonStyles.heading, { marginBottom: spacing.md }]}>
            Courses
          </Text>
          
          {programmingFundamentalsCourses.map(renderCourse)}
          
          <Text style={[commonStyles.heading, { marginTop: spacing.lg, marginBottom: spacing.md }]}>
            Other Learning Tracks
          </Text>
          
          {otherTracks.map(renderOtherTrack)}
          
          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
