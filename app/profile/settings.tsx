
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, spacing, borderRadius } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  notifications: {
    achievements: boolean;
    reminders: boolean;
    courseUpdates: boolean;
    weeklyProgress: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: 'small' | 'medium' | 'large';
  };
  learning: {
    dailyGoal: number;
    offlineMode: boolean;
    autoPlay: boolean;
  };
}

const defaultSettings: SettingsState = {
  notifications: {
    achievements: true,
    reminders: true,
    courseUpdates: true,
    weeklyProgress: false,
  },
  appearance: {
    theme: 'light',
    fontSize: 'medium',
  },
  learning: {
    dailyGoal: 30,
    offlineMode: false,
    autoPlay: true,
  },
};

export default function SettingsScreen() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [activeSection, setActiveSection] = useState<string>('account');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('userSettings');
      if (savedSettings) {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings: SettingsState) => {
    try {
      await AsyncStorage.setItem('userSettings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };

  const updateNotificationSetting = (key: keyof SettingsState['notifications'], value: boolean) => {
    const newSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    };
    saveSettings(newSettings);
  };

  const updateLearningSetting = (key: keyof SettingsState['learning'], value: any) => {
    const newSettings = {
      ...settings,
      learning: {
        ...settings.learning,
        [key]: value,
      },
    };
    saveSettings(newSettings);
  };

  const sections = [
    { id: 'account', title: 'Account Settings', icon: 'person' },
    { id: 'preferences', title: 'Preferences', icon: 'settings' },
    { id: 'support', title: 'Support', icon: 'help-circle' },
  ];

  const renderAccountSettings = () => (
    <View>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.lg }]}>
        Account Settings
      </Text>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="person" size={20} color={colors.primary} />
        <View style={styles.settingContent}>
          <Text style={commonStyles.body}>Edit Profile</Text>
          <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
            Update name, email, avatar, learning goal
          </Text>
        </View>
        <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="shield-checkmark" size={20} color={colors.success} />
        <View style={styles.settingContent}>
          <Text style={commonStyles.body}>Security</Text>
          <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
            PIN setup, security questions
          </Text>
        </View>
        <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="download" size={20} color={colors.warning} />
        <View style={styles.settingContent}>
          <Text style={commonStyles.body}>Data Management</Text>
          <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
            Export progress, clear data
          </Text>
        </View>
        <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  const renderPreferences = () => (
    <View>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.lg }]}>
        Preferences
      </Text>

      {/* Appearance */}
      <View style={styles.settingGroup}>
        <Text style={[commonStyles.body, { fontWeight: '600', marginBottom: spacing.md }]}>
          Appearance
        </Text>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="color-palette" size={20} color={colors.primary} />
          <View style={styles.settingContent}>
            <Text style={commonStyles.body}>Theme</Text>
            <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
              Light theme
            </Text>
          </View>
          <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="text" size={20} color={colors.secondary} />
          <View style={styles.settingContent}>
            <Text style={commonStyles.body}>Font Size</Text>
            <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
              Medium
            </Text>
          </View>
          <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={styles.settingGroup}>
        <Text style={[commonStyles.body, { fontWeight: '600', marginBottom: spacing.md }]}>
          Notifications
        </Text>

        <View style={styles.settingItem}>
          <Icon name="trophy" size={20} color={colors.warning} />
          <View style={styles.settingContent}>
            <Text style={commonStyles.body}>Achievements</Text>
            <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
              Get notified when you earn badges
            </Text>
          </View>
          <Switch
            value={settings.notifications.achievements}
            onValueChange={(value) => updateNotificationSetting('achievements', value)}
            trackColor={{ false: colors.grey, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>

        <View style={styles.settingItem}>
          <Icon name="alarm" size={20} color={colors.success} />
          <View style={styles.settingContent}>
            <Text style={commonStyles.body}>Learning Reminders</Text>
            <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
              Daily study reminders
            </Text>
          </View>
          <Switch
            value={settings.notifications.reminders}
            onValueChange={(value) => updateNotificationSetting('reminders', value)}
            trackColor={{ false: colors.grey, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>

        <View style={styles.settingItem}>
          <Icon name="book" size={20} color={colors.primary} />
          <View style={styles.settingContent}>
            <Text style={commonStyles.body}>Course Updates</Text>
            <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
              New content and features
            </Text>
          </View>
          <Switch
            value={settings.notifications.courseUpdates}
            onValueChange={(value) => updateNotificationSetting('courseUpdates', value)}
            trackColor={{ false: colors.grey, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>
      </View>

      {/* Learning */}
      <View style={styles.settingGroup}>
        <Text style={[commonStyles.body, { fontWeight: '600', marginBottom: spacing.md }]}>
          Learning
        </Text>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="target" size={20} color={colors.error} />
          <View style={styles.settingContent}>
            <Text style={commonStyles.body}>Daily Goal</Text>
            <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
              {settings.learning.dailyGoal} minutes per day
            </Text>
          </View>
          <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Icon name="cloud-offline" size={20} color={colors.secondary} />
          <View style={styles.settingContent}>
            <Text style={commonStyles.body}>Offline Mode</Text>
            <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
              Download content for offline learning
            </Text>
          </View>
          <Switch
            value={settings.learning.offlineMode}
            onValueChange={(value) => updateLearningSetting('offlineMode', value)}
            trackColor={{ false: colors.grey, true: colors.primary }}
            thumbColor={colors.background}
          />
        </View>
      </View>
    </View>
  );

  const renderSupport = () => (
    <View>
      <Text style={[commonStyles.subheading, { marginBottom: spacing.lg }]}>
        Support
      </Text>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="help-circle" size={20} color={colors.primary} />
        <View style={styles.settingContent}>
          <Text style={commonStyles.body}>Help Center</Text>
          <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
            FAQ, tutorials, contact support
          </Text>
        </View>
        <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="information-circle" size={20} color={colors.secondary} />
        <View style={styles.settingContent}>
          <Text style={commonStyles.body}>About</Text>
          <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
            Version info, privacy policy, terms
          </Text>
        </View>
        <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="mail" size={20} color={colors.success} />
        <View style={styles.settingContent}>
          <Text style={commonStyles.body}>Contact Us</Text>
          <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
            support@novalearninghub.et
          </Text>
        </View>
        <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <Icon name="code" size={20} color={colors.warning} />
        <View style={styles.settingContent}>
          <Text style={commonStyles.body}>Version</Text>
          <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
            Nova Code Academy v1.0.0
          </Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountSettings();
      case 'preferences':
        return renderPreferences();
      case 'support':
        return renderSupport();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      {/* Header */}
      <View style={[commonStyles.row, { 
        paddingHorizontal: spacing.md, 
        paddingTop: spacing.md,
        marginBottom: spacing.lg,
      }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: colors.backgroundAlt,
            borderRadius: borderRadius.full,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
          }}
        >
          <Icon name="chevron-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.heading, { flex: 1 }]}>Settings</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Section Tabs */}
        <View style={{
          width: 120,
          backgroundColor: colors.backgroundAlt,
          paddingVertical: spacing.md,
        }}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={{
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.sm,
                alignItems: 'center',
                backgroundColor: activeSection === section.id ? colors.primary : 'transparent',
                marginHorizontal: spacing.sm,
                borderRadius: borderRadius.md,
                marginBottom: spacing.sm,
              }}
              onPress={() => setActiveSection(section.id)}
            >
              <Icon 
                name={section.icon as any} 
                size={20} 
                color={activeSection === section.id ? colors.background : colors.text} 
              />
              <Text style={[commonStyles.caption, {
                color: activeSection === section.id ? colors.background : colors.text,
                textAlign: 'center',
                marginTop: spacing.xs,
              }]}>
                {section.title.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView style={{ flex: 1, padding: spacing.lg }}>
          {renderContent()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  settingGroup: {
    marginBottom: spacing.xl,
  },
  settingItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundAlt,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  settingContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
};
