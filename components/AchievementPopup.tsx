
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  xpReward: number;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function AchievementPopup({ achievement, isVisible, onClose }: AchievementPopupProps) {
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible && achievement) {
      // Animate in
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
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

      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      // Reset animations
      slideAnim.setValue(-200);
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [isVisible, achievement]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!isVisible || !achievement) {
    return null;
  }

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 100,
    }}>
      <Animated.View
        style={{
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
          ],
          opacity: opacityAnim,
          width: '90%',
          maxWidth: 350,
        }}
      >
        <TouchableOpacity onPress={handleClose} activeOpacity={0.9}>
          <LinearGradient
            colors={[achievement.color, colors.primary]}
            style={{
              borderRadius: borderRadius.lg,
              padding: spacing.lg,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            {/* Achievement Icon */}
            <View style={{
              backgroundColor: colors.background,
              borderRadius: borderRadius.full,
              width: 80,
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.md,
            }}>
              <Icon name={achievement.icon as any} size={40} color={achievement.color} />
            </View>

            {/* Achievement Unlocked Text */}
            <Text style={[commonStyles.caption, { 
              color: colors.background, 
              marginBottom: spacing.xs,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }]}>
              Achievement Unlocked!
            </Text>

            {/* Achievement Title */}
            <Text style={[commonStyles.heading, { 
              color: colors.background, 
              textAlign: 'center',
              marginBottom: spacing.sm,
            }]}>
              {achievement.title}
            </Text>

            {/* Achievement Description */}
            <Text style={[commonStyles.body, { 
              color: colors.background, 
              textAlign: 'center',
              opacity: 0.9,
              marginBottom: spacing.md,
            }]}>
              {achievement.description}
            </Text>

            {/* XP Reward */}
            <View style={{
              backgroundColor: colors.background,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: borderRadius.full,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Icon name="star" size={16} color={colors.warning} />
              <Text style={[commonStyles.subheading, { 
                color: achievement.color,
                marginLeft: spacing.xs,
                marginBottom: 0,
              }]}>
                +{achievement.xpReward} XP
              </Text>
            </View>

            {/* Close hint */}
            <Text style={[commonStyles.caption, { 
              color: colors.background, 
              opacity: 0.7,
              marginTop: spacing.md,
            }]}>
              Tap to close
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
