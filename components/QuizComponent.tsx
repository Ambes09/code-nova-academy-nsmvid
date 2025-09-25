
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number, answers: number[]) => void;
  title: string;
}

export default function QuizComponent({ questions, onComplete, title }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!showExplanation) {
      setShowExplanation(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      // Quiz completed
      const score = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      setQuizCompleted(true);
      onComplete(score, selectedAnswers);
    }
  };

  const getScorePercentage = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((score / questions.length) * 100);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    const selectedAnswer = selectedAnswers[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    return (
      <View>
        {/* Progress Bar */}
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
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }} />
        </View>

        {/* Question Counter */}
        <Text style={[commonStyles.caption, { marginBottom: spacing.md }]}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>

        {/* Question */}
        <Text style={[commonStyles.heading, { marginBottom: spacing.lg }]}>
          {question.question}
        </Text>

        {/* Options */}
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          
          let backgroundColor = colors.backgroundAlt;
          let borderColor = colors.border;
          let textColor = colors.text;

          if (showExplanation) {
            if (isCorrectOption) {
              backgroundColor = colors.success;
              borderColor = colors.success;
              textColor = colors.background;
            } else if (isSelected && !isCorrectOption) {
              backgroundColor = colors.error;
              borderColor = colors.error;
              textColor = colors.background;
            }
          } else if (isSelected) {
            backgroundColor = colors.primary;
            borderColor = colors.primary;
            textColor = colors.background;
          }

          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor,
                borderWidth: 2,
                borderColor,
                borderRadius: borderRadius.md,
                padding: spacing.md,
                marginBottom: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => handleAnswerSelect(index)}
              disabled={showExplanation}
            >
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: textColor === colors.background ? colors.background : colors.border,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
              }}>
                <Text style={{
                  color: textColor === colors.background ? colors.primary : colors.textLight,
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 12,
                }}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[commonStyles.body, { color: textColor, flex: 1 }]}>
                {option}
              </Text>
              {showExplanation && isCorrectOption && (
                <Icon name="checkmark-circle" size={20} color={colors.background} />
              )}
              {showExplanation && isSelected && !isCorrectOption && (
                <Icon name="close-circle" size={20} color={colors.background} />
              )}
            </TouchableOpacity>
          );
        })}

        {/* Explanation */}
        {showExplanation && (
          <View style={[commonStyles.card, { 
            backgroundColor: isCorrect ? colors.success : colors.error,
            marginTop: spacing.md,
          }]}>
            <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
              <Icon 
                name={isCorrect ? "checkmark-circle" : "close-circle"} 
                size={20} 
                color={colors.background} 
              />
              <Text style={[commonStyles.subheading, { 
                color: colors.background, 
                marginLeft: spacing.sm,
                marginBottom: 0,
              }]}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </Text>
            </View>
            <Text style={[commonStyles.body, { color: colors.background }]}>
              {question.explanation}
            </Text>
          </View>
        )}

        {/* Next Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingVertical: spacing.md,
            borderRadius: borderRadius.md,
            alignItems: 'center',
            marginTop: spacing.lg,
          }}
          onPress={handleNext}
          disabled={selectedAnswer === undefined}
        >
          <Text style={[commonStyles.buttonTextPrimary]}>
            {!showExplanation ? 'Check Answer' : 
             currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderResults = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = getScorePercentage();

    return (
      <View style={{ alignItems: 'center' }}>
        <LinearGradient
          colors={colors.gradient}
          style={{
            borderRadius: borderRadius.md,
            padding: spacing.lg,
            alignItems: 'center',
            marginBottom: spacing.lg,
            width: '100%',
          }}
        >
          <Icon name="trophy" size={48} color={colors.background} />
          <Text style={[commonStyles.heading, { 
            color: colors.background, 
            marginTop: spacing.md,
            marginBottom: spacing.sm,
          }]}>
            Quiz Complete!
          </Text>
          <Text style={[commonStyles.title, { 
            color: colors.background, 
            fontSize: 36,
            marginBottom: 0,
          }]}>
            {percentage}%
          </Text>
          <Text style={[commonStyles.body, { color: colors.background }]}>
            {score} out of {questions.length} correct
          </Text>
        </LinearGradient>

        <Text style={[commonStyles.body, { textAlign: 'center', marginBottom: spacing.lg }]}>
          {percentage >= 80 ? 
            "Excellent work! You've mastered this topic." :
            percentage >= 60 ?
            "Good job! Review the explanations to improve." :
            "Keep practicing! Review the material and try again."
          }
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
      <View style={{ paddingTop: spacing.md }}>
        <Text style={[commonStyles.heading, { marginBottom: spacing.lg }]}>
          {title}
        </Text>
        
        {quizCompleted ? renderResults() : renderQuestion()}
        
        <View style={{ height: spacing.xl }} />
      </View>
    </ScrollView>
  );
}
