
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import QuizComponent from '../../components/QuizComponent';
import AchievementPopup from '../../components/AchievementPopup';

const quizData = {
  '1': {
    title: 'What is Programming? - Quiz',
    questions: [
      {
        id: '1',
        question: 'What is a computer program?',
        options: [
          'A physical device that stores data',
          'A set of instructions that tells a computer what to do',
          'A type of computer hardware',
          'A programming language'
        ],
        correctAnswer: 1,
        explanation: 'A computer program is a set of instructions written in a programming language that tells a computer what tasks to perform.'
      },
      {
        id: '2',
        question: 'Which of the following is NOT a programming language?',
        options: [
          'Python',
          'Java',
          'HTML',
          'Microsoft Word'
        ],
        correctAnswer: 3,
        explanation: 'Microsoft Word is a word processing application, not a programming language. Python, Java, and HTML are all used in programming.'
      },
      {
        id: '3',
        question: 'What does it mean to "debug" a program?',
        options: [
          'To write new code',
          'To find and fix errors in the code',
          'To run the program',
          'To delete the program'
        ],
        correctAnswer: 1,
        explanation: 'Debugging means finding and fixing errors (bugs) in your code to make the program work correctly.'
      }
    ]
  },
  '2': {
    title: 'Variables and Data Types - Quiz',
    questions: [
      {
        id: '1',
        question: 'What is a variable in programming?',
        options: [
          'A fixed value that never changes',
          'A container that stores data values',
          'A type of programming language',
          'An error in the code'
        ],
        correctAnswer: 1,
        explanation: 'A variable is like a container or box that stores data values. The value can be changed during program execution.'
      },
      {
        id: '2',
        question: 'Which data type would you use to store the text "Hello World"?',
        options: [
          'Integer',
          'Boolean',
          'String',
          'Float'
        ],
        correctAnswer: 2,
        explanation: 'A string data type is used to store text or sequences of characters like "Hello World".'
      },
      {
        id: '3',
        question: 'What value would a boolean variable hold?',
        options: [
          'Numbers only',
          'Text only',
          'True or False only',
          'Any type of data'
        ],
        correctAnswer: 2,
        explanation: 'Boolean variables can only hold two values: True or False. They are used for logical operations and conditions.'
      }
    ]
  }
};

const achievements = [
  {
    id: 'first_quiz',
    title: 'Quiz Master',
    description: 'Complete your first chapter quiz',
    icon: 'school',
    color: colors.primary,
    xpReward: 50
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Score 100% on a quiz',
    icon: 'star',
    color: colors.warning,
    xpReward: 100
  }
];

export default function QuizScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const quiz = quizData[chapterId as keyof typeof quizData];

  if (!quiz) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.heading}>Quiz not found</Text>
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

  const handleQuizComplete = (score: number, answers: number[]) => {
    console.log('Quiz completed with score:', score, 'out of', quiz.questions.length);
    
    // Check for achievements
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    // First quiz achievement
    if (!showAchievement) {
      setCurrentAchievement(achievements[0]);
      setShowAchievement(true);
    }
    
    // Perfect score achievement
    if (percentage === 100) {
      setTimeout(() => {
        setCurrentAchievement(achievements[1]);
        setShowAchievement(true);
      }, 2000);
    }

    // Navigate back after a delay
    setTimeout(() => {
      router.back();
    }, 3000);
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      {/* Header */}
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
      </View>

      <QuizComponent
        questions={quiz.questions}
        onComplete={handleQuizComplete}
        title={quiz.title}
      />

      <AchievementPopup
        achievement={currentAchievement}
        isVisible={showAchievement}
        onClose={() => setShowAchievement(false)}
      />
    </SafeAreaView>
  );
}
