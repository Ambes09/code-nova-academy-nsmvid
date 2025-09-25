
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#2563eb',      // Nova Learning blue
  secondary: '#8b5cf6',    // Purple
  accent: '#60a5fa',       // Light blue
  background: '#ffffff',   // White background for light theme
  backgroundAlt: '#f8fafc', // Light gray background
  surface: '#ffffff',      // Card surface
  text: '#1e293b',         // Dark text
  textSecondary: '#64748b', // Secondary text
  textLight: '#94a3b8',    // Light text
  border: '#e2e8f0',       // Border color
  success: '#10b981',      // Success green
  warning: '#f59e0b',      // Warning orange
  error: '#ef4444',        // Error red
  gradient: ['#2563eb', '#8b5cf6'], // Primary gradient
};

export const typography = {
  fontFamily: 'Inter_400Regular',
  fontFamilyBold: 'Inter_600SemiBold',
  fontFamilyExtraBold: 'Inter_800ExtraBold',
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    ...shadows.sm,
  },
  cardLarge: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginVertical: spacing.md,
    ...shadows.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Typography styles
  title: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fontFamilyExtraBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  heading: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fontFamilyBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subheading: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fontFamilyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  body: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily,
    color: colors.text,
    lineHeight: 24,
  },
  bodySecondary: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  caption: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.textLight,
  },
  // Button text styles
  buttonTextPrimary: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamilyBold,
    color: colors.background,
  },
  buttonTextSecondary: {
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamilyBold,
    color: colors.text,
  },
  // Utility styles
  textCenter: {
    textAlign: 'center',
  },
  mb1: { marginBottom: spacing.xs },
  mb2: { marginBottom: spacing.sm },
  mb3: { marginBottom: spacing.md },
  mb4: { marginBottom: spacing.lg },
  mt1: { marginTop: spacing.xs },
  mt2: { marginTop: spacing.sm },
  mt3: { marginTop: spacing.md },
  mt4: { marginTop: spacing.lg },
  px1: { paddingHorizontal: spacing.xs },
  px2: { paddingHorizontal: spacing.sm },
  px3: { paddingHorizontal: spacing.md },
  px4: { paddingHorizontal: spacing.lg },
  py1: { paddingVertical: spacing.xs },
  py2: { paddingVertical: spacing.sm },
  py3: { paddingVertical: spacing.md },
  py4: { paddingVertical: spacing.lg },
});
