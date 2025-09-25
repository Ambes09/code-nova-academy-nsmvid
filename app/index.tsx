
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GetStartedScreen() {
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    checkSetupStatus();
    startAnimations();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const setupComplete = await AsyncStorage.getItem('setupComplete');
      if (setupComplete === 'true') {
        setHasCompletedSetup(true);
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.log('Error checking setup status:', error);
    }
  };

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    // Validate name (2-50 characters)
    const trimmedName = name.trim();
    setIsValidName(trimmedName.length >= 2 && trimmedName.length <= 50);
  }, [name]);

  const handleGetStarted = async () => {
    if (isValidName) {
      try {
        await AsyncStorage.setItem('userName', name.trim());
        router.push('/setup/avatar');
      } catch (error) {
        console.log('Error saving name:', error);
      }
    }
  };

  if (hasCompletedSetup) {
    return null; // Will redirect to tabs
  }

  return (
    <LinearGradient
      colors={['#1a2a6c', '#3a4a8c']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: spacing.lg }}>
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Logo */}
          <View style={{
            marginBottom: spacing.xl,
            alignItems: 'center',
          }}>
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.lg,
              }}
            >
              <Text style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: colors.background,
              }}>
                NL
              </Text>
            </LinearGradient>

            <Text style={[commonStyles.heading, {
              color: colors.background,
              textAlign: 'center',
              fontSize: 28,
              fontWeight: '600',
              marginBottom: spacing.sm,
            }]}>
              Nova Learning Hub
            </Text>

            <Text style={[commonStyles.body, {
              color: colors.background,
              textAlign: 'center',
              opacity: 0.8,
              fontSize: 16,
            }]}>
              🇪🇹 Proudly Made in Ethiopia
            </Text>
          </View>

          {/* Main Section */}
          <View style={{
            width: '100%',
            alignItems: 'center',
          }}>
            <Text style={[commonStyles.heading, {
              color: colors.background,
              textAlign: 'center',
              fontSize: 24,
              marginBottom: spacing.xl,
            }]}>
              What can we call you?
            </Text>

            {/* Name Input */}
            <View style={{
              width: '100%',
              marginBottom: spacing.lg,
            }}>
              <TextInput
                style={{
                  backgroundColor: colors.background,
                  borderRadius: borderRadius.lg,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  fontSize: 18,
                  color: colors.text,
                  textAlign: 'center',
                  borderWidth: 2,
                  borderColor: isValidName ? colors.success : colors.grey,
                }}
                placeholder="Enter your name"
                placeholderTextColor={colors.grey}
                value={name}
                onChangeText={setName}
                maxLength={50}
                autoCapitalize="words"
                autoCorrect={false}
              />
              
              {/* Validation feedback */}
              <View style={{
                marginTop: spacing.sm,
                alignItems: 'center',
              }}>
                <Text style={{
                  color: colors.background,
                  opacity: 0.7,
                  fontSize: 14,
                }}>
                  {name.length > 0 && name.length < 2 
                    ? 'Name must be at least 2 characters'
                    : name.length > 50
                    ? 'Name must be less than 50 characters'
                    : isValidName
                    ? '✓ Looks good!'
                    : 'Enter your name to continue'
                  }
                </Text>
              </View>
            </View>

            {/* Get Started Button */}
            <TouchableOpacity
              style={{
                width: '100%',
                opacity: isValidName ? 1 : 0.5,
              }}
              onPress={handleGetStarted}
              disabled={!isValidName}
            >
              <LinearGradient
                colors={isValidName ? [colors.primary, colors.secondary] : [colors.grey, colors.grey]}
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
                  Get Started
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
