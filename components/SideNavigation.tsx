
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';
import { router } from 'expo-router';

interface SideNavigationProps {
  isVisible: boolean;
  onClose: () => void;
  userAvatar?: {
    type: 'emoji' | 'custom';
    value: string;
    name: string;
  };
  userName?: string;
}

const navigationItems = [
  { id: 'home', title: 'Home', icon: 'home', route: '/(tabs)' },
  { id: 'learn', title: 'Learn', icon: 'book', route: '/(tabs)/learn' },
  { id: 'practice', title: 'Practice', icon: 'code-slash', route: '/(tabs)/practice' },
  { id: 'profile', title: 'Profile', icon: 'person', route: '/(tabs)/profile' },
  { id: 'achievements', title: 'Achievements', icon: 'trophy', route: '/achievements' },
  { id: 'progress', title: 'Progress', icon: 'trending-up', route: '/progress' },
  { id: 'settings', title: 'Settings', icon: 'settings', route: '/profile/settings' },
];

const supportItems = [
  { id: 'help', title: 'Help & Support', icon: 'help-circle' },
  { id: 'feedback', title: 'Send Feedback', icon: 'chatbubble' },
  { id: 'about', title: 'About', icon: 'information-circle' },
];

export default function SideNavigation({ 
  isVisible, 
  onClose, 
  userAvatar, 
  userName = 'User' 
}: SideNavigationProps) {

  const handleNavigation = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const renderUserHeader = () => (
    <LinearGradient
      colors={['#1a2a6c', '#3a4a8c']}
      style={{
        padding: spacing.lg,
        marginBottom: spacing.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          backgroundColor: colors.background,
          borderRadius: borderRadius.full,
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.md,
        }}>
          {userAvatar?.type === 'emoji' ? (
            <Text style={{ fontSize: 24 }}>
              {userAvatar.value}
            </Text>
          ) : (
            <Text style={[commonStyles.heading, { color: colors.primary, marginBottom: 0 }]}>
              {userName.split(' ').map(n => n[0]).join('')}
            </Text>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.subheading, { 
            color: colors.background, 
            marginBottom: spacing.xs 
          }]}>
            {userName}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
              borderRadius: borderRadius.full,
              alignSelf: 'flex-start',
            }}
            onPress={() => handleNavigation('/(tabs)/profile')}
          >
            <Text style={[commonStyles.caption, { color: colors.background }]}>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );

  const renderNavigationItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        marginHorizontal: spacing.md,
        marginBottom: spacing.xs,
      }}
      onPress={() => item.route ? handleNavigation(item.route) : console.log(item.title)}
    >
      <Icon name={item.icon as any} size={20} color={colors.text} />
      <Text style={[commonStyles.body, { marginLeft: spacing.md, flex: 1 }]}>
        {item.title}
      </Text>
      <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Sidebar */}
        <View style={{
          width: '80%',
          backgroundColor: colors.background,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 10,
        }}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LinearGradient
                  colors={['#4facfe', '#00f2fe']}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.sm,
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colors.background,
                  }}>
                    NL
                  </Text>
                </LinearGradient>
                <Text style={[commonStyles.subheading, { marginBottom: 0 }]}>
                  Nova Learning Hub
                </Text>
              </View>
              
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }}>
              {renderUserHeader()}

              {/* Navigation Items */}
              <View style={{ marginBottom: spacing.lg }}>
                <Text style={[commonStyles.caption, { 
                  paddingHorizontal: spacing.lg,
                  marginBottom: spacing.md,
                  color: colors.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }]}>
                  Navigation
                </Text>
                {navigationItems.map(renderNavigationItem)}
              </View>

              {/* Support Items */}
              <View style={{ 
                borderTopWidth: 1, 
                borderTopColor: colors.border,
                paddingTop: spacing.md,
              }}>
                <Text style={[commonStyles.caption, { 
                  paddingHorizontal: spacing.lg,
                  marginBottom: spacing.md,
                  color: colors.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }]}>
                  Support
                </Text>
                {supportItems.map(renderNavigationItem)}
              </View>

              {/* App Info */}
              <View style={{
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.lg,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                marginTop: spacing.lg,
              }}>
                <Text style={[commonStyles.caption, { 
                  color: colors.textSecondary,
                  textAlign: 'center',
                }]}>
                  Nova Code Academy v1.0.0
                </Text>
                <Text style={[commonStyles.caption, { 
                  color: colors.textSecondary,
                  textAlign: 'center',
                  marginTop: spacing.xs,
                }]}>
                  🇪🇹 Made with ❤️ in Ethiopia
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>

        {/* Overlay */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={onClose}
          activeOpacity={1}
        />
      </View>
    </Modal>
  );
}
