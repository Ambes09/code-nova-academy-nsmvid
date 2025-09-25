
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const termsContent = `
NOVA LEARNING HUB - TERMS AND CONDITIONS

Last updated: ${new Date().toLocaleDateString()}

1. ACCEPTANCE OF TERMS
By using Nova Learning Hub ("the App"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the App.

2. DESCRIPTION OF SERVICE
Nova Learning Hub is an educational platform designed to teach programming fundamentals to beginners. The App provides interactive courses, quizzes, and coding exercises.

3. USER ACCOUNTS
- You must provide accurate information when creating an account
- You are responsible for maintaining the security of your account
- You must be at least 13 years old to use this service

4. EDUCATIONAL CONTENT
- All course content is provided for educational purposes only
- Content may be updated or modified without prior notice
- You may not redistribute or sell course materials

5. USER CONDUCT
You agree not to:
- Use the App for any illegal purposes
- Attempt to hack or disrupt the service
- Share your account credentials with others
- Upload inappropriate content

6. PRIVACY POLICY
We respect your privacy and handle your data in accordance with Ethiopian data protection laws. Your personal information is used solely to provide and improve our educational services.

7. INTELLECTUAL PROPERTY
- All content in the App is owned by Nova Learning Hub
- You retain ownership of any code you create during exercises
- You may not copy or distribute our proprietary content

8. LIMITATION OF LIABILITY
Nova Learning Hub is provided "as is" without warranties. We are not liable for any damages arising from your use of the App.

9. GOVERNING LAW
These terms are governed by the laws of Ethiopia. Any disputes will be resolved in Ethiopian courts.

10. CONTACT INFORMATION
For questions about these terms, contact us at:
Email: support@novalearninghub.et
Address: Addis Ababa, Ethiopia

By clicking "I Accept Terms and Conditions" below, you acknowledge that you have read, understood, and agree to be bound by these terms.
`;

export default function TermsSetupScreen() {
  const [hasAccepted, setHasAccepted] = useState(false);
  
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

  const handleAcceptanceToggle = () => {
    setHasAccepted(!hasAccepted);
  };

  const handleCompleteSetup = async () => {
    if (hasAccepted) {
      try {
        await AsyncStorage.setItem('setupComplete', 'true');
        await AsyncStorage.setItem('termsAccepted', 'true');
        router.replace('/(tabs)');
      } catch (error) {
        console.log('Error completing setup:', error);
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
                Step 3 of 3
              </Text>
              <Text style={[commonStyles.heading, {
                color: colors.background,
                fontSize: 24,
              }]}>
                Terms & Conditions
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
                width: '100%',
              }} />
            </View>
          </View>

          {/* Terms Content */}
          <View style={{ 
            flex: 1, 
            marginHorizontal: spacing.lg,
            backgroundColor: colors.background,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
          }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <Text style={[commonStyles.body, {
                color: colors.text,
                lineHeight: 22,
              }]}>
                {termsContent}
              </Text>
            </ScrollView>
          </View>

          {/* Acceptance and Complete Button */}
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
            {/* Acceptance Checkbox */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: spacing.lg,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: spacing.md,
                borderRadius: borderRadius.md,
              }}
              onPress={handleAcceptanceToggle}
            >
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                backgroundColor: hasAccepted ? colors.success : colors.background,
                borderWidth: hasAccepted ? 0 : 2,
                borderColor: colors.background,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
              }}>
                {hasAccepted && (
                  <Icon name="checkmark" size={16} color={colors.background} />
                )}
              </View>
              <Text style={[commonStyles.body, {
                color: colors.background,
                flex: 1,
              }]}>
                I accept the Terms and Conditions
              </Text>
            </TouchableOpacity>

            {/* Complete Setup Button */}
            <TouchableOpacity
              style={{
                opacity: hasAccepted ? 1 : 0.5,
              }}
              onPress={handleCompleteSetup}
              disabled={!hasAccepted}
            >
              <LinearGradient
                colors={hasAccepted ? [colors.success, colors.primary] : [colors.grey, colors.grey]}
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
                  Complete Setup
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
