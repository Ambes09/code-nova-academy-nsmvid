
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const defaultAvatars = [
  { id: '1', emoji: '👨‍💻', name: 'Developer' },
  { id: '2', emoji: '👩‍💻', name: 'Coder' },
  { id: '3', emoji: '🧑‍🎓', name: 'Student' },
  { id: '4', emoji: '👨‍🏫', name: 'Teacher' },
  { id: '5', emoji: '👩‍🔬', name: 'Scientist' },
  { id: '6', emoji: '🧑‍💼', name: 'Professional' },
  { id: '7', emoji: '👨‍🎨', name: 'Creative' },
  { id: '8', emoji: '👩‍🚀', name: 'Explorer' },
  { id: '9', emoji: '🧑‍🔧', name: 'Builder' },
  { id: '10', emoji: '👨‍⚕️', name: 'Helper' },
];

export default function AvatarSetupScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserName();
    startAnimation();
  }, []);

  const loadUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      console.log('Error loading user name:', error);
    }
  };

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    setCustomAvatar(null);
  };

  const handleCustomAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCustomAvatar(result.assets[0].uri);
        setSelectedAvatar(null);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const handleContinue = async () => {
    try {
      if (selectedAvatar) {
        const avatar = defaultAvatars.find(a => a.id === selectedAvatar);
        await AsyncStorage.setItem('userAvatar', JSON.stringify({
          type: 'emoji',
          value: avatar?.emoji,
          name: avatar?.name,
        }));
      } else if (customAvatar) {
        await AsyncStorage.setItem('userAvatar', JSON.stringify({
          type: 'custom',
          value: customAvatar,
          name: 'Custom',
        }));
      }
      router.push('/setup/goals');
    } catch (error) {
      console.log('Error saving avatar:', error);
    }
  };

  const canContinue = selectedAvatar || customAvatar;

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
                Step 1 of 3
              </Text>
              <Text style={[commonStyles.heading, {
                color: colors.background,
                fontSize: 24,
              }]}>
                Choose your avatar
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
                width: '33%',
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
                Hi {userName}! Pick an avatar that represents you
              </Text>

              {/* Avatar Grid */}
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginBottom: spacing.xl,
              }}>
                {defaultAvatars.map((avatar) => (
                  <TouchableOpacity
                    key={avatar.id}
                    style={{
                      width: '30%',
                      aspectRatio: 1,
                      backgroundColor: selectedAvatar === avatar.id 
                        ? colors.background 
                        : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: borderRadius.lg,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: spacing.md,
                      borderWidth: selectedAvatar === avatar.id ? 3 : 0,
                      borderColor: colors.primary,
                    }}
                    onPress={() => handleAvatarSelect(avatar.id)}
                  >
                    <Text style={{ fontSize: 40, marginBottom: spacing.xs }}>
                      {avatar.emoji}
                    </Text>
                    <Text style={[commonStyles.caption, {
                      color: selectedAvatar === avatar.id ? colors.text : colors.background,
                      textAlign: 'center',
                    }]}>
                      {avatar.name}
                    </Text>
                  </TouchableOpacity>
                ))}

                {/* Custom Avatar Option */}
                <TouchableOpacity
                  style={{
                    width: '30%',
                    aspectRatio: 1,
                    backgroundColor: customAvatar 
                      ? colors.background 
                      : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: borderRadius.lg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing.md,
                    borderWidth: customAvatar ? 3 : 2,
                    borderColor: customAvatar ? colors.primary : 'rgba(255, 255, 255, 0.3)',
                    borderStyle: customAvatar ? 'solid' : 'dashed',
                  }}
                  onPress={handleCustomAvatar}
                >
                  {customAvatar ? (
                    <Image
                      source={{ uri: customAvatar }}
                      style={{
                        width: '80%',
                        height: '80%',
                        borderRadius: borderRadius.md,
                      }}
                    />
                  ) : (
                    <>
                      <Icon name="camera" size={24} color={colors.background} />
                      <Text style={[commonStyles.caption, {
                        color: colors.background,
                        textAlign: 'center',
                        marginTop: spacing.xs,
                      }]}>
                        Upload
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Continue Button */}
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
            <TouchableOpacity
              style={{
                opacity: canContinue ? 1 : 0.5,
              }}
              onPress={handleContinue}
              disabled={!canContinue}
            >
              <LinearGradient
                colors={canContinue ? [colors.primary, colors.secondary] : [colors.grey, colors.grey]}
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
