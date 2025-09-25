
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';
import SimpleBottomSheet from './BottomSheet';
import SearchOverlay from './SearchOverlay';
import SideNavigation from './SideNavigation';
import NotificationOverlay from './NotificationOverlay';

interface TopLogoBarProps {
  title?: string;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  notificationCount?: number;
  userAvatar?: {
    type: 'emoji' | 'custom';
    value: string;
    name: string;
  };
  userName?: string;
}

export default function TopLogoBar({
  title,
  onMenuPress,
  onSearchPress,
  onNotificationPress,
  onProfilePress,
  notificationCount = 0,
  userAvatar,
  userName = 'User',
}: TopLogoBarProps) {
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleProfilePress = () => {
    setShowQuickMenu(true);
    onProfilePress?.();
  };

  const handleSearchPress = () => {
    setShowSearch(true);
    onSearchPress?.();
  };

  const handleMenuPress = () => {
    setShowSideNav(true);
    onMenuPress?.();
  };

  const handleNotificationPress = () => {
    setShowNotifications(true);
    onNotificationPress?.();
  };

  const quickMenuItems = [
    { id: 'profile', title: 'View Profile', icon: 'person', action: () => console.log('View Profile') },
    { id: 'achievements', title: 'Achievements', icon: 'trophy', action: () => console.log('Achievements') },
    { id: 'settings', title: 'Settings', icon: 'settings', action: () => console.log('Settings') },
    { id: 'help', title: 'Help & Support', icon: 'help-circle', action: () => console.log('Help') },
    { id: 'logout', title: 'Logout', icon: 'log-out', action: () => console.log('Logout') },
  ];

  return (
    <>
      <LinearGradient
        colors={['#1a2a6c', '#3a4a8c']}
        style={{
          paddingTop: 0,
        }}
      >
        <SafeAreaView edges={['top']}>
          <View style={{
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing.md,
          }}>
            {/* Left Section */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}
                onPress={handleMenuPress}
              >
                <Icon name="menu" size={24} color={colors.background} />
              </TouchableOpacity>

              {/* Logo and Title */}
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
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

                <View>
                  <Text style={[commonStyles.subheading, {
                    color: colors.background,
                    fontSize: 16,
                    marginBottom: 0,
                  }]}>
                    Nova Learning Hub
                  </Text>
                  {title && (
                    <Text style={[commonStyles.caption, {
                      color: colors.background,
                      opacity: 0.8,
                    }]}>
                      {title}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* Right Section */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.sm,
                }}
                onPress={handleSearchPress}
              >
                <Icon name="search" size={20} color={colors.background} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.sm,
                  position: 'relative',
                }}
                onPress={handleNotificationPress}
              >
                <Icon name="notifications" size={20} color={colors.background} />
                {notificationCount > 0 && (
                  <View style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: colors.error,
                    borderRadius: 8,
                    minWidth: 16,
                    height: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 4,
                  }}>
                    <Text style={{
                      color: colors.background,
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}>
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: colors.background,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                }}
                onPress={handleProfilePress}
              >
                {userAvatar?.type === 'emoji' ? (
                  <Text style={{ fontSize: 20 }}>
                    {userAvatar.value}
                  </Text>
                ) : userAvatar?.type === 'custom' ? (
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon name="person" size={16} color={colors.background} />
                  </View>
                ) : (
                  <Icon name="person" size={16} color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Quick Menu Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={showQuickMenu}
        onClose={() => setShowQuickMenu(false)}
      >
        <View style={{ padding: spacing.md }}>
          <Text style={[commonStyles.heading, {
            textAlign: 'center',
            marginBottom: spacing.lg,
          }]}>
            Quick Menu
          </Text>

          {quickMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.md,
                borderRadius: borderRadius.md,
                marginBottom: spacing.sm,
                backgroundColor: colors.backgroundAlt,
              }}
              onPress={() => {
                item.action();
                setShowQuickMenu(false);
              }}
            >
              <Icon name={item.icon as any} size={20} color={colors.text} />
              <Text style={[commonStyles.body, {
                marginLeft: spacing.md,
                flex: 1,
              }]}>
                {item.title}
              </Text>
              <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </SimpleBottomSheet>

      {/* Search Overlay */}
      <SearchOverlay
        isVisible={showSearch}
        onClose={() => setShowSearch(false)}
      />

      {/* Side Navigation */}
      <SideNavigation
        isVisible={showSideNav}
        onClose={() => setShowSideNav(false)}
        userAvatar={userAvatar}
        userName={userName}
      />

      {/* Notifications Overlay */}
      <NotificationOverlay
        isVisible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}
