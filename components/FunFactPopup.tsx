
import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, Animated, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface FunFact {
  id: string;
  title: string;
  fact: string;
  category: 'programming' | 'history' | 'technology' | 'science';
  icon: string;
}

interface FunFactPopupProps {
  funFact: FunFact | null;
  isVisible: boolean;
  onClose: () => void;
}

const funFacts: FunFact[] = [
  {
    id: '1',
    title: 'Programming History',
    fact: 'The first computer bug was an actual bug! In 1947, Grace Hopper found a moth stuck in a computer relay.',
    category: 'history',
    icon: 'bug'
  },
  {
    id: '2',
    title: 'Code Fact',
    fact: 'The average programmer writes about 10-15 lines of code per day that make it into the final product.',
    category: 'programming',
    icon: 'code-slash'
  },
  {
    id: '3',
    title: 'Tech Trivia',
    fact: 'The term "debugging" was coined by Admiral Grace Hopper when she literally removed a bug from a computer.',
    category: 'technology',
    icon: 'construct'
  },
  {
    id: '4',
    title: 'Programming Languages',
    fact: 'Python was named after the British comedy group "Monty Python\'s Flying Circus", not the snake!',
    category: 'programming',
    icon: 'logo-python'
  },
  {
    id: '5',
    title: 'Internet History',
    fact: 'The first website ever created is still online! It was created by Tim Berners-Lee in 1991.',
    category: 'history',
    icon: 'globe'
  }
];

export default function FunFactPopup({ funFact, isVisible, onClose }: FunFactPopupProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [scaleAnim, opacityAnim, onClose]);

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'programming': return colors.primary;
      case 'history': return colors.secondary;
      case 'technology': return colors.success;
      case 'science': return colors.warning;
      default: return colors.primary;
    }
  }, []);

  useEffect(() => {
    if (isVisible && funFact) {
      // Animate in
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [isVisible, funFact, opacityAnim, scaleAnim]);

  if (!isVisible || !funFact) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.md,
      }}>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            width: '100%',
            maxWidth: 350,
          }}
        >
          <LinearGradient
            colors={[getCategoryColor(funFact.category), colors.primary]}
            style={{
              borderRadius: borderRadius.lg,
              padding: spacing.lg,
              alignItems: 'center',
            }}
          >
            {/* Fun Fact Icon */}
            <View style={{
              backgroundColor: colors.background,
              borderRadius: borderRadius.full,
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.md,
            }}>
              <Icon name={funFact.icon as any} size={28} color={getCategoryColor(funFact.category)} />
            </View>

            {/* Fun Fact Label */}
            <Text style={[commonStyles.caption, { 
              color: colors.background, 
              marginBottom: spacing.xs,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }]}>
              💡 Fun Fact
            </Text>

            {/* Fun Fact Title */}
            <Text style={[commonStyles.subheading, { 
              color: colors.background, 
              textAlign: 'center',
              marginBottom: spacing.md,
            }]}>
              {funFact.title}
            </Text>

            {/* Fun Fact Content */}
            <Text style={[commonStyles.body, { 
              color: colors.background, 
              textAlign: 'center',
              opacity: 0.95,
              lineHeight: 22,
              marginBottom: spacing.lg,
            }]}>
              {funFact.fact}
            </Text>

            {/* Close Button */}
            <TouchableOpacity
              style={{
                backgroundColor: colors.background,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
                borderRadius: borderRadius.full,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={handleClose}
            >
              <Text style={[commonStyles.buttonTextSecondary, { 
                color: getCategoryColor(funFact.category),
                marginRight: spacing.xs,
              }]}>
                Got it!
              </Text>
              <Icon name="checkmark" size={16} color={getCategoryColor(funFact.category)} />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
}

export { funFacts };
export type { FunFact };
