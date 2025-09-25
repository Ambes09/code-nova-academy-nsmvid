
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import DragDropExercise from '../../components/DragDropExercise';
import CodeEditor from '../../components/CodeEditor';
import AchievementPopup from '../../components/AchievementPopup';

const exerciseData = {
  '1': {
    type: 'drag-drop',
    title: 'Variable Declaration',
    description: 'Arrange the code blocks to properly declare and use variables.',
    codeBlocks: [
      { id: '1', code: 'int age = 25;', isCorrect: true },
      { id: '2', code: 'String name = "John";', isCorrect: true },
      { id: '3', code: 'System.out.println("Name: " + name);', isCorrect: true },
      { id: '4', code: 'System.out.println("Age: " + age);', isCorrect: true },
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  '2': {
    type: 'code-editor',
    title: 'Fix the Loop',
    description: 'Debug the broken for loop that should count from 1 to 10.',
    language: 'Java',
    initialCode: `public class Main {
    public static void main(String[] args) {
        // Fix this loop to count from 1 to 10
        for (int i = 0; i < 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}`,
    solution: `public class Main {
    public static void main(String[] args) {
        // Fixed loop to count from 1 to 10
        for (int i = 1; i <= 10; i++) {
            System.out.println("Count: " + i);
        }
    }
}`
  }
};

const achievements = [
  {
    id: 'first_exercise',
    title: 'Problem Solver',
    description: 'Complete your first coding exercise',
    icon: 'bulb',
    color: colors.success,
    xpReward: 75
  },
  {
    id: 'code_fixer',
    title: 'Bug Hunter',
    description: 'Successfully fix a broken piece of code',
    icon: 'bug',
    color: colors.error,
    xpReward: 100
  }
];

export default function ExerciseScreen() {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const exercise = exerciseData[exerciseId as keyof typeof exerciseData];

  if (!exercise) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.heading}>Exercise not found</Text>
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

  const handleExerciseComplete = (isCorrect: boolean) => {
    console.log('Exercise completed:', isCorrect);
    
    if (isCorrect) {
      // Show achievement
      const achievement = exercise.type === 'drag-drop' ? 
        achievements[0] : achievements[1];
      
      setCurrentAchievement(achievement);
      setShowAchievement(true);

      // Navigate back after delay
      setTimeout(() => {
        router.back();
      }, 3000);
    }
  };

  const renderHeader = () => (
    <View style={[commonStyles.row, { 
      paddingHorizontal: spacing.md, 
      paddingTop: spacing.md,
      marginBottom: spacing.md,
    }]}>
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
      <Text style={[commonStyles.heading, { flex: 1 }]}>Exercise</Text>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      {renderHeader()}

      {exercise.type === 'drag-drop' ? (
        <DragDropExercise
          title={exercise.title}
          description={exercise.description}
          codeBlocks={exercise.codeBlocks}
          correctOrder={exercise.correctOrder}
          onComplete={handleExerciseComplete}
        />
      ) : (
        <View style={commonStyles.content}>
          <View style={{ paddingTop: spacing.md }}>
            <Text style={[commonStyles.heading, { marginBottom: spacing.sm }]}>
              {exercise.title}
            </Text>
            
            <Text style={[commonStyles.body, { marginBottom: spacing.lg }]}>
              {exercise.description}
            </Text>

            <CodeEditor
              language={exercise.language}
              initialCode={exercise.initialCode}
              onCodeChange={(code) => console.log('Code changed:', code)}
              onRun={(code) => {
                // Simple check if code contains the fix
                const isFixed = code.includes('i <= 10') && code.includes('i = 1');
                handleExerciseComplete(isFixed);
              }}
            />
          </View>
        </View>
      )}

      <AchievementPopup
        achievement={currentAchievement}
        isVisible={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
    </SafeAreaView>
  );
}
