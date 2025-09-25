
import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import TopLogoBar from '../../components/TopLogoBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const avatar = await AsyncStorage.getItem('userAvatar');
      const name = await AsyncStorage.getItem('userName');
      
      if (avatar) {
        setUserAvatar(JSON.parse(avatar));
      }
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  return (
    <>
      <TopLogoBar
        notificationCount={3}
        userAvatar={userAvatar}
        userName={userName}
        onMenuPress={() => console.log('Menu pressed')}
        onSearchPress={() => console.log('Search pressed')}
        onNotificationPress={() => console.log('Notifications pressed')}
        onProfilePress={() => console.log('Profile pressed')}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface || colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === 'ios' ? 20 : 8,
            paddingTop: 8,
            height: Platform.OS === 'ios' ? 90 : 70,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight || colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: 'Learn',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="practice"
          options={{
            title: 'Practice',
            tabBarIcon: ({ color, size }) => (
              <Icon name="code-slash" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
