
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface CodeBlock {
  id: string;
  code: string;
  isCorrect: boolean;
}

interface DragDropExerciseProps {
  title: string;
  description: string;
  codeBlocks: CodeBlock[];
  correctOrder: string[];
  onComplete: (isCorrect: boolean) => void;
}

export default function DragDropExercise({ 
  title, 
  description, 
  codeBlocks, 
  correctOrder, 
  onComplete 
}: DragDropExerciseProps) {
  const [availableBlocks, setAvailableBlocks] = useState(codeBlocks);
  const [droppedBlocks, setDroppedBlocks] = useState<CodeBlock[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleBlockSelect = (block: CodeBlock) => {
    if (isCompleted) return;

    // Move block from available to dropped
    setAvailableBlocks(prev => prev.filter(b => b.id !== block.id));
    setDroppedBlocks(prev => [...prev, block]);
  };

  const handleBlockRemove = (block: CodeBlock) => {
    if (isCompleted) return;

    // Move block from dropped back to available
    setDroppedBlocks(prev => prev.filter(b => b.id !== block.id));
    setAvailableBlocks(prev => [...prev, block]);
  };

  const checkAnswer = () => {
    const userOrder = droppedBlocks.map(block => block.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    
    setIsCompleted(true);
    setShowResult(true);
    onComplete(isCorrect);
  };

  const reset = () => {
    setAvailableBlocks(codeBlocks);
    setDroppedBlocks([]);
    setIsCompleted(false);
    setShowResult(false);
  };

  const renderCodeBlock = (block: CodeBlock, isInDropZone: boolean) => {
    const isCorrectPosition = isCompleted && showResult && isInDropZone;
    const userOrder = droppedBlocks.map(b => b.id);
    const correctPosition = correctOrder.indexOf(block.id);
    const userPosition = userOrder.indexOf(block.id);
    const isCorrectlyPlaced = isCorrectPosition && correctPosition === userPosition;

    return (
      <TouchableOpacity
        key={block.id}
        style={{
          backgroundColor: isCompleted && showResult ? 
            (isCorrectlyPlaced ? colors.success : colors.error) : 
            colors.backgroundAlt,
          borderWidth: 2,
          borderColor: isCompleted && showResult ? 
            (isCorrectlyPlaced ? colors.success : colors.error) : 
            colors.border,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          marginBottom: spacing.sm,
          borderStyle: 'dashed',
        }}
        onPress={() => isInDropZone ? handleBlockRemove(block) : handleBlockSelect(block)}
        disabled={isCompleted}
      >
        <View style={commonStyles.rowBetween}>
          <Text style={{
            fontFamily: 'monospace',
            fontSize: 14,
            color: isCompleted && showResult && !isCorrectlyPlaced ? 
              colors.background : colors.text,
            flex: 1,
          }}>
            {block.code}
          </Text>
          {isCompleted && showResult && (
            <Icon 
              name={isCorrectlyPlaced ? "checkmark-circle" : "close-circle"} 
              size={20} 
              color={colors.background} 
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const isCorrect = () => {
    const userOrder = droppedBlocks.map(block => block.id);
    return JSON.stringify(userOrder) === JSON.stringify(correctOrder);
  };

  return (
    <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
      <View style={{ paddingTop: spacing.md }}>
        <Text style={[commonStyles.heading, { marginBottom: spacing.sm }]}>
          {title}
        </Text>
        
        <Text style={[commonStyles.body, { marginBottom: spacing.lg }]}>
          {description}
        </Text>

        {/* Instructions */}
        <View style={[commonStyles.card, { backgroundColor: colors.primary, marginBottom: spacing.lg }]}>
          <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
            <Icon name="information-circle" size={20} color={colors.background} />
            <Text style={[commonStyles.subheading, { 
              color: colors.background, 
              marginLeft: spacing.sm,
              marginBottom: 0,
            }]}>
              Instructions
            </Text>
          </View>
          <Text style={[commonStyles.body, { color: colors.background }]}>
            Drag the code blocks from the available blocks section to the drop zone below in the correct order to create a working program.
          </Text>
        </View>

        {/* Available Blocks */}
        <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
          Available Code Blocks:
        </Text>
        <View style={{ marginBottom: spacing.lg }}>
          {availableBlocks.map(block => renderCodeBlock(block, false))}
          {availableBlocks.length === 0 && (
            <View style={{
              backgroundColor: colors.backgroundAlt,
              borderWidth: 2,
              borderColor: colors.border,
              borderRadius: borderRadius.md,
              padding: spacing.lg,
              alignItems: 'center',
              borderStyle: 'dashed',
            }}>
              <Text style={[commonStyles.bodySecondary]}>
                All blocks have been used
              </Text>
            </View>
          )}
        </View>

        {/* Drop Zone */}
        <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
          Your Program:
        </Text>
        <View style={{
          backgroundColor: colors.surface,
          borderWidth: 2,
          borderColor: colors.primary,
          borderRadius: borderRadius.md,
          padding: spacing.md,
          marginBottom: spacing.lg,
          minHeight: 200,
          borderStyle: droppedBlocks.length === 0 ? 'dashed' : 'solid',
        }}>
          {droppedBlocks.length === 0 ? (
            <View style={{ 
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center',
              opacity: 0.5,
            }}>
              <Icon name="code-slash" size={48} color={colors.textLight} />
              <Text style={[commonStyles.bodySecondary, { marginTop: spacing.md }]}>
                Drop code blocks here
              </Text>
            </View>
          ) : (
            droppedBlocks.map((block, index) => (
              <View key={`${block.id}-${index}`}>
                {renderCodeBlock(block, true)}
              </View>
            ))
          )}
        </View>

        {/* Result */}
        {showResult && (
          <View style={[commonStyles.card, { 
            backgroundColor: isCorrect() ? colors.success : colors.error,
            marginBottom: spacing.lg,
          }]}>
            <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
              <Icon 
                name={isCorrect() ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={colors.background} 
              />
              <Text style={[commonStyles.heading, { 
                color: colors.background, 
                marginLeft: spacing.sm,
                marginBottom: 0,
              }]}>
                {isCorrect() ? 'Correct!' : 'Try Again'}
              </Text>
            </View>
            <Text style={[commonStyles.body, { color: colors.background }]}>
              {isCorrect() ? 
                'Great job! You arranged the code blocks in the correct order.' :
                'The code blocks are not in the correct order. Review the logic and try again.'
              }
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={commonStyles.row}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: borderRadius.md,
              flex: 1,
              alignItems: 'center',
              marginRight: spacing.sm,
            }}
            onPress={checkAnswer}
            disabled={droppedBlocks.length === 0 || isCompleted}
          >
            <Text style={commonStyles.buttonTextPrimary}>
              Check Answer
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.backgroundAlt,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              borderRadius: borderRadius.md,
              flex: 1,
              alignItems: 'center',
              marginLeft: spacing.sm,
              borderWidth: 1,
              borderColor: colors.border,
            }}
            onPress={reset}
          >
            <Text style={commonStyles.buttonTextSecondary}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ height: spacing.xl }} />
      </View>
    </ScrollView>
  );
}
