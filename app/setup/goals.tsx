
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const learningGoals = [
  {
    id: 'career-change',
    title: 'Career Change',
    description: 'Become professional developer',
    icon: 'briefcase',
    color: colors.primary,
  },
  {
    id: 'skill-enhancement',
    title: 'Skill Enhancement',
    description: 'Improve existing skills',
    icon: 'trending-up',
    color: colors.success,
  },
  {
    id: 'personal-project',
    title: 'Personal Project',
    description: 'Build specific application',
    icon: 'construct',
    color: colors.warning,
  },
  {
    id: 'academic',
    title: 'Academic',
    description: 'School/university requirements',
    icon: 'school',
    color: colors.secondary,
  },
];

export default function GoalsSetupScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleContinue = async () => {
    if (selectedGoal) {
      try {
        const goal = learningGoals.find(g => g.id === selectedGoal);
        await AsyncStorage.setItem('userGoal', JSON.stringify(goal));
        router.push('/setup/terms');
      } catch (error) {
        console.log('Error saving goal:', error);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#1a2a6c', '#3a4a8c']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            marginBottom: spacing.xl,
          }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: borderRadius.full,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
              }}
            >
              <Icon name="chevron-back" size={20} color={colors.background} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text style={[commonStyles.body, {
                color: colors.background,
                opacity: 0.8,
              }]}>
                Step 2 of 3
              </Text>
              <Text style={[commonStyles.heading, {
                color: colors.background,
                fontSize: 24,
              }]}>
                What&apos;s your learning goal?
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={{
            marginHorizontal: spacing.lg,
            marginBottom: spacing.xl,
          }}>
            <View style={{
              height: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
            }}>
              <View style={{
                height: 4,
                backgroundColor: colors.background,
                borderRadius: 2,
                width: '66%',
              }} />
            </View>
          </View>

          {/* Content */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: spacing.lg }}>
              <Text style={[commonStyles.body, {
                color: colors.background,
                textAlign: 'center',
                opacity: 0.9,
                marginBottom: spacing.xl,
                fontSize: 16,
              }]}>
                This helps us personalize your learning experience
              </Text>

              {/* Goals List */}
              <View style={{ marginBottom: spacing.xl }}>
                {learningGoals.map((goal) => (
                  <TouchableOpacity
                    key={goal.id}
                    style={{
                      backgroundColor: selectedGoal === goal.id 
                        ? colors.background 
                        : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: borderRadius.lg,
                      padding: spacing.lg,
                      marginBottom: spacing.md,
                      borderWidth: selectedGoal === goal.id ? 3 : 0,
                      borderColor: goal.color,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => handleGoalSelect(goal.id)}
                  >
                    <View style={{
                      backgroundColor: selectedGoal === goal.id ? goal.color : colors.background,
                      borderRadius: borderRadius.full,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: spacing.md,
                    }}>
                      <Icon 
                        name={goal.icon as any} 
                        size={24} 
                        color={selectedGoal === goal.id ? colors.background : goal.color} 
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.subheading, {
                        color: selectedGoal === goal.id ? colors.text : colors.background,
                        marginBottom: spacing.xs,
                      }]}>
                        {goal.title}
                      </Text>
                      <Text style={[commonStyles.body, {
                        color: selectedGoal === goal.id ? colors.textSecondary : colors.background,
                        opacity: 0.8,
                      }]}>
                        {goal.description}
                      </Text>
                    </View>

                    {selectedGoal === goal.id && (
                      <View style={{
                        backgroundColor: goal.color,
                        borderRadius: borderRadius.full,
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon name="checkmark" size={16} color={colors.background} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Continue Button */}
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
            <TouchableOpacity
              style={{
                opacity: selectedGoal ? 1 : 0.5,
              }}
              onPress={handleContinue}
              disabled={!selectedGoal}
            >
              <LinearGradient
                colors={selectedGoal ? [colors.primary, colors.secondary] : [colors.grey, colors.grey]}
                style={{
                  paddingVertical: spacing.lg,
                  borderRadius: borderRadius.lg,
                  alignItems: 'center',
                }}
              >
                <Text style={[commonStyles.buttonText, {
                  color: colors.background,
                  fontSize: 18,
                  fontWeight: '600',
                }]}>
                  Continue
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
