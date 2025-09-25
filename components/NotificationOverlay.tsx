
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface NotificationOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: '1',
    type: 'achievement',
    title: 'New Badge Earned!',
    message: 'You earned the "First Steps" badge for completing your first lesson.',
    time: '2 minutes ago',
    isRead: false,
    icon: 'trophy',
    color: colors.warning,
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Daily Learning Reminder',
    message: 'Don\'t forget to continue your programming journey today!',
    time: '1 hour ago',
    isRead: false,
    icon: 'alarm',
    color: colors.primary,
  },
  {
    id: '3',
    type: 'course',
    title: 'New Course Available',
    message: 'Check out the new "Advanced JavaScript" course in Web Development.',
    time: '3 hours ago',
    isRead: true,
    icon: 'book',
    color: colors.success,
  },
  {
    id: '4',
    type: 'streak',
    title: 'Streak Milestone!',
    message: 'Congratulations! You\'ve maintained a 7-day learning streak.',
    time: '1 day ago',
    isRead: true,
    icon: 'flame',
    color: colors.error,
  },
  {
    id: '5',
    type: 'system',
    title: 'App Update Available',
    message: 'Version 1.1.0 is now available with new features and improvements.',
    time: '2 days ago',
    isRead: true,
    icon: 'download',
    color: colors.secondary,
  },
];

export default function NotificationOverlay({ isVisible, onClose }: NotificationOverlayProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderNotification = (notification: any) => (
    <TouchableOpacity
      key={notification.id}
      style={{
        backgroundColor: notification.isRead ? colors.background : colors.backgroundAlt,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderLeftWidth: 4,
        borderLeftColor: notification.color,
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
      onPress={() => console.log('Open notification:', notification.title)}
    >
      <View style={{
        backgroundColor: notification.color,
        borderRadius: borderRadius.full,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
      }}>
        <Icon name={notification.icon as any} size={20} color={colors.background} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: spacing.xs,
        }}>
          <Text style={[commonStyles.body, { 
            fontWeight: '600', 
            flex: 1,
            color: notification.isRead ? colors.text : colors.text,
          }]}>
            {notification.title}
          </Text>
          {!notification.isRead && (
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 4,
              width: 8,
              height: 8,
            }} />
          )}
        </View>

        <Text style={[commonStyles.body, { 
          color: colors.textSecondary,
          marginBottom: spacing.sm,
          lineHeight: 20,
        }]}>
          {notification.message}
        </Text>

        <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
          {notification.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={onClose}
              style={{ marginRight: spacing.md }}
            >
              <Icon name="chevron-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[commonStyles.heading, { marginBottom: 0 }]}>
              Notifications
            </Text>
            {unreadCount > 0 && (
              <View style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingHorizontal: spacing.sm,
                paddingVertical: 2,
                marginLeft: spacing.sm,
              }}>
                <Text style={[commonStyles.caption, { 
                  color: colors.background,
                  fontWeight: '600',
                }]}>
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => console.log('Mark all as read')}
          >
            <Text style={[commonStyles.caption, { color: colors.primary }]}>
              Mark all read
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <ScrollView style={{ flex: 1, padding: spacing.md }}>
          {notifications.length > 0 ? (
            <>
              {unreadCount > 0 && (
                <>
                  <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
                    New ({unreadCount})
                  </Text>
                  {notifications
                    .filter(n => !n.isRead)
                    .map(renderNotification)}
                  
                  <Text style={[commonStyles.subheading, { 
                    marginTop: spacing.lg,
                    marginBottom: spacing.md,
                  }]}>
                    Earlier
                  </Text>
                </>
              )}
              
              {notifications
                .filter(n => unreadCount === 0 || n.isRead)
                .map(renderNotification)}
            </>
          ) : (
            <View style={{
              alignItems: 'center',
              paddingVertical: spacing.xl,
            }}>
              <Icon name="notifications-off" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.body, { 
                textAlign: 'center', 
                color: colors.textSecondary,
                marginTop: spacing.md,
              }]}>
                No notifications yet
              </Text>
              <Text style={[commonStyles.caption, { 
                textAlign: 'center', 
                color: colors.textSecondary,
                marginTop: spacing.sm,
              }]}>
                We'll notify you about achievements, reminders, and updates
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
