
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import ProgressRing from '../../components/ProgressRing';
import { learningTracks, LearningTrack, Course } from '../../data/courseContent';

export default function LearnScreen() {
  const [selectedTrack, setSelectedTrack] = useState(learningTracks[0]);

  const renderTrackSelector = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: spacing.md }}
      contentContainerStyle={{ paddingHorizontal: spacing.md }}
    >
      {learningTracks.map((track) => (
        <TouchableOpacity
          key={track.id}
          style={{
            backgroundColor: selectedTrack.id === track.id ? colors.primary : colors.backgroundAlt,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: borderRadius.full,
            marginRight: spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setSelectedTrack(track)}
        >
          <Icon 
            name={track.icon as any} 
            size={16} 
            color={selectedTrack.id === track.id ? colors.background : colors.text} 
          />
          <Text style={{
            color: selectedTrack.id === track.id ? colors.background : colors.text,
            fontSize: 14,
            fontFamily: 'Inter_600SemiBold',
            marginLeft: spacing.xs,
          }}>
            {track.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderTrackHeader = () => (
    <LinearGradient
      colors={[selectedTrack.color, colors.primary]}
      style={{
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        marginBottom: spacing.md,
      }}
    >
      <View style={commonStyles.rowBetween}>
        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.heading, { color: colors.background, marginBottom: spacing.xs }]}>
            {selectedTrack.name}
          </Text>
          <Text style={[commonStyles.body, { color: colors.background, opacity: 0.9, marginBottom: spacing.md }]}>
            {selectedTrack.description}
          </Text>
          <View style={commonStyles.row}>
            <View style={[commonStyles.row, { marginRight: spacing.lg }]}>
              <Icon name="book" size={16} color={colors.background} />
              <Text style={[commonStyles.caption, { color: colors.background, marginLeft: spacing.xs }]}>
                {selectedTrack.totalCourses} courses
              </Text>
            </View>
            <View style={commonStyles.row}>
              <Icon name="checkmark-circle" size={16} color={colors.background} />
              <Text style={[commonStyles.caption, { color: colors.background, marginLeft: spacing.xs }]}>
                {selectedTrack.completedCourses} completed
              </Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ProgressRing progress={selectedTrack.progress} size={60} strokeWidth={6} color={colors.background} />
          <Text style={[commonStyles.caption, { color: colors.background, marginTop: spacing.xs }]}>
            {selectedTrack.progress}% Complete
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

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
              <Icon name="link" size={12} color={colors.textLight} />
              <Text style={[commonStyles.caption, { marginLeft: spacing.xs }]}>
                Requires: {course.prerequisites.join(', ')}
              </Text>
            </View>
          )}

          {/* Skills */}
          <View style={[commonStyles.row, { flexWrap: 'wrap' }]}>
            {course.skills.slice(0, 3).map((skill, index) => (
              <View key={index} style={{
                backgroundColor: selectedTrack.color,
                paddingHorizontal: spacing.xs,
                paddingVertical: 2,
                borderRadius: borderRadius.sm,
                marginRight: spacing.xs,
                marginBottom: spacing.xs,
              }}>
                <Text style={[commonStyles.caption, { color: colors.background, fontSize: 10 }]}>
                  {skill}
                </Text>
              </View>
            ))}
            {course.skills.length > 3 && (
              <Text style={[commonStyles.caption, { color: colors.textLight }]}>
                +{course.skills.length - 3} more
              </Text>
            )}
          </View>
          
          {course.progress > 0 && (
            <View style={[commonStyles.row, { marginTop: spacing.sm }]}>
              <View style={{
                backgroundColor: colors.backgroundAlt,
                height: 4,
                borderRadius: 2,
                flex: 1,
                marginRight: spacing.sm,
              }}>
                <View style={{
                  backgroundColor: selectedTrack.color,
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
              color={selectedTrack.color} 
            />
          ) : (
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: course.isLocked ? colors.backgroundAlt : selectedTrack.color,
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

  const renderLearningPath = () => (
    <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
        Recommended Learning Path
      </Text>
      
      <Text style={[commonStyles.bodySecondary, { marginBottom: spacing.md }]}>
        Follow this path to master {selectedTrack.name.toLowerCase()}:
      </Text>

      {selectedTrack.courses.map((course, index) => (
        <View key={course.id} style={[commonStyles.row, { marginBottom: spacing.sm }]}>
          <View style={{
            backgroundColor: course.progress > 0 ? colors.success : 
                           course.isLocked ? colors.backgroundAlt : selectedTrack.color,
            borderRadius: borderRadius.full,
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.sm,
          }}>
            <Text style={{
              color: colors.background,
              fontSize: 12,
              fontFamily: 'Inter_600SemiBold',
            }}>
              {course.progress > 0 ? '✓' : course.isLocked ? '🔒' : index + 1}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.body, { 
              color: course.isLocked ? colors.textLight : colors.text 
            }]}>
              {course.name}
            </Text>
            <Text style={[commonStyles.caption, { color: colors.textLight }]}>
              {course.duration} • {course.difficulty}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.md }}>
          {renderTrackSelector()}
          {renderTrackHeader()}
          {renderLearningPath()}
          
          <Text style={[commonStyles.heading, { marginBottom: spacing.md }]}>
            Courses in {selectedTrack.name}
          </Text>
          
          {selectedTrack.courses.map(renderCourse)}
          
          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
