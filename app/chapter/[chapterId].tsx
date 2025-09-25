
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import CodeEditor from '../../components/CodeEditor';

const chapterData = {
  '1': {
    title: 'What is Programming?',
    duration: '15 min',
    sections: [
      {
        type: 'text',
        title: 'Learning Objectives',
        content: 'By the end of this chapter, you will understand:\n• What programming is and why it\'s useful\n• How computers execute programs\n• The basic components of a program\n• Different types of programming languages'
      },
      {
        type: 'text',
        title: 'What is Programming?',
        content: 'Programming is the process of creating instructions for computers to follow. Think of it like writing a recipe - you provide step-by-step directions that the computer can understand and execute.\n\nJust as a recipe tells you how to make a cake, a computer program tells the computer how to perform specific tasks, like calculating numbers, displaying information, or playing games.'
      },
      {
        type: 'visual',
        title: 'How Programs Work',
        content: 'Programs are written in special languages that computers can understand. Here\'s the basic flow:\n\n1. **Write Code**: You write instructions in a programming language\n2. **Compile/Interpret**: The computer translates your code\n3. **Execute**: The computer follows your instructions\n4. **Output**: The computer produces results'
      },
      {
        type: 'code',
        title: 'Your First Program',
        content: 'Let\'s look at a simple "Hello World" program in different languages:',
        language: 'Python',
        code: 'print("Hello, World!")\nprint("Welcome to programming!")\n\n# This program displays text on the screen\n# The print() function shows text to the user'
      },
      {
        type: 'text',
        title: 'Types of Programming Languages',
        content: '**High-Level Languages** (easier for humans):\n• Python - great for beginners\n• Java - used for large applications\n• JavaScript - powers websites\n\n**Low-Level Languages** (closer to computer hardware):\n• Assembly - direct hardware control\n• C - system programming\n\nWe\'ll start with high-level languages because they\'re more beginner-friendly!'
      },
      {
        type: 'interactive',
        title: 'Try It Yourself',
        content: 'Modify the code below to display your own message:',
        language: 'Python',
        code: 'print("Hello, World!")\n# Change the message above to something personal!'
      }
    ]
  },
  '2': {
    title: 'Variables and Data Types',
    duration: '20 min',
    sections: [
      {
        type: 'text',
        title: 'Learning Objectives',
        content: 'In this chapter, you will learn:\n• What variables are and how to use them\n• Different types of data (numbers, text, etc.)\n• How to store and retrieve information\n• Best practices for naming variables'
      },
      {
        type: 'text',
        title: 'What are Variables?',
        content: 'Variables are like labeled boxes that store information. Just like you might have a box labeled "Photos" that contains your pictures, variables have names and contain data.\n\nFor example:\n• A variable named "age" might contain the number 25\n• A variable named "name" might contain the text "Alice"\n• A variable named "isStudent" might contain true or false'
      },
      {
        type: 'code',
        title: 'Creating Variables',
        content: 'Here\'s how to create variables in Python:',
        language: 'Python',
        code: '# Creating variables\nname = "Alice"\nage = 25\nheight = 5.6\nis_student = True\n\n# Using variables\nprint("Name:", name)\nprint("Age:", age)\nprint("Height:", height, "feet")\nprint("Is student:", is_student)'
      },
      {
        type: 'text',
        title: 'Data Types',
        content: '**String**: Text data enclosed in quotes\n• "Hello", "Python", "123 Main St"\n\n**Integer**: Whole numbers\n• 42, -17, 0, 1000\n\n**Float**: Decimal numbers\n• 3.14, -2.5, 0.0\n\n**Boolean**: True or False values\n• True, False'
      },
      {
        type: 'interactive',
        title: 'Practice with Variables',
        content: 'Create variables for your information:',
        language: 'Python',
        code: '# Create variables about yourself\nmy_name = "Your Name Here"\nmy_age = 0\nmy_favorite_color = "blue"\n\n# Print your information\nprint("My name is", my_name)\nprint("I am", my_age, "years old")\nprint("My favorite color is", my_favorite_color)'
      }
    ]
  }
};

export default function ChapterScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const [currentSection, setCurrentSection] = useState(0);

  const chapter = chapterData[chapterId as keyof typeof chapterData];

  if (!chapter) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.heading}>Chapter not found</Text>
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
        <Text style={[commonStyles.heading, { flex: 1 }]}>Chapter</Text>
      </View>

      <LinearGradient
        colors={colors.gradient}
        style={{
          borderRadius: borderRadius.md,
          padding: spacing.lg,
          marginBottom: spacing.md,
        }}
      >
        <Text style={[commonStyles.heading, { color: colors.background, marginBottom: spacing.xs }]}>
          {chapter.title}
        </Text>
        <View style={commonStyles.row}>
          <Icon name="time" size={16} color={colors.background} />
          <Text style={[commonStyles.body, { color: colors.background, marginLeft: spacing.xs }]}>
            {chapter.duration}
          </Text>
        </View>
      </LinearGradient>

      {/* Progress */}
      <View style={{
        backgroundColor: colors.backgroundAlt,
        height: 4,
        borderRadius: 2,
        marginBottom: spacing.lg,
      }}>
        <View style={{
          backgroundColor: colors.primary,
          height: 4,
          borderRadius: 2,
          width: `${((currentSection + 1) / chapter.sections.length) * 100}%`,
        }} />
      </View>
    </View>
  );

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'text':
        return (
          <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
            <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
              {section.title}
            </Text>
            <Text style={commonStyles.body}>
              {section.content}
            </Text>
          </View>
        );

      case 'visual':
        return (
          <View style={[commonStyles.card, { marginBottom: spacing.md }]}>
            <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
              <Icon name="eye" size={20} color={colors.primary} />
              <Text style={[commonStyles.subheading, { marginLeft: spacing.sm, marginBottom: 0 }]}>
                {section.title}
              </Text>
            </View>
            <Text style={commonStyles.body}>
              {section.content}
            </Text>
          </View>
        );

      case 'code':
        return (
          <View style={{ marginBottom: spacing.md }}>
            <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
              {section.title}
            </Text>
            <Text style={[commonStyles.body, { marginBottom: spacing.md }]}>
              {section.content}
            </Text>
            <CodeEditor
              language={section.language}
              initialCode={section.code}
              readOnly={true}
            />
          </View>
        );

      case 'interactive':
        return (
          <View style={{ marginBottom: spacing.md }}>
            <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
              <Icon name="code-slash" size={20} color={colors.success} />
              <Text style={[commonStyles.subheading, { marginLeft: spacing.sm, marginBottom: 0 }]}>
                {section.title}
              </Text>
            </View>
            <Text style={[commonStyles.body, { marginBottom: spacing.md }]}>
              {section.content}
            </Text>
            <CodeEditor
              language={section.language}
              initialCode={section.code}
              onCodeChange={(code) => console.log('Code changed:', code)}
              onRun={(code) => console.log('Running code:', code)}
            />
          </View>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentSection < chapter.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Chapter completed, navigate to quiz
      router.push(`/quiz/${chapterId}`);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: spacing.md }}>
          {renderHeader()}
          
          <Text style={[commonStyles.caption, { marginBottom: spacing.md }]}>
            Section {currentSection + 1} of {chapter.sections.length}
          </Text>
          
          {renderSection(chapter.sections[currentSection])}
          
          {/* Navigation */}
          <View style={[commonStyles.rowBetween, { marginTop: spacing.lg }]}>
            <TouchableOpacity
              style={{
                backgroundColor: currentSection === 0 ? colors.backgroundAlt : colors.backgroundAlt,
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.lg,
                borderRadius: borderRadius.md,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: currentSection === 0 ? 0.5 : 1,
              }}
              onPress={handlePrevious}
              disabled={currentSection === 0}
            >
              <Icon name="chevron-back" size={16} color={colors.text} />
              <Text style={[commonStyles.buttonTextSecondary, { marginLeft: spacing.xs }]}>
                Previous
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.lg,
                borderRadius: borderRadius.md,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={handleNext}
            >
              <Text style={[commonStyles.buttonTextPrimary, { marginRight: spacing.xs }]}>
                {currentSection < chapter.sections.length - 1 ? 'Next' : 'Take Quiz'}
              </Text>
              <Icon name="chevron-forward" size={16} color={colors.background} />
            </TouchableOpacity>
          </View>
          
          <View style={{ height: spacing.xl }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
