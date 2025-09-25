
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface CodeEditorProps {
  language: string;
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ 
  language, 
  initialCode = '', 
  onCodeChange, 
  onRun,
  readOnly = false 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Output for ${language} code:\n${getSimulatedOutput(code, language)}`);
      setIsRunning(false);
      onRun?.(code);
    }, 1000);
  };

  const getSimulatedOutput = (code: string, lang: string) => {
    // Simple simulation based on language
    switch (lang.toLowerCase()) {
      case 'python':
        if (code.includes('print')) {
          return 'Hello, World!\n42\nCode executed successfully!';
        }
        return 'Code executed successfully!';
      case 'java':
        if (code.includes('System.out.println')) {
          return 'Hello, World!\nCode compiled and executed successfully!';
        }
        return 'Code compiled and executed successfully!';
      case 'html':
        return 'HTML rendered successfully! Check the preview above.';
      case 'css':
        return 'CSS styles applied successfully!';
      default:
        return 'Code executed successfully!';
    }
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python': return '#3776ab';
      case 'java': return '#f89820';
      case 'html': return '#e34f26';
      case 'css': return '#1572b6';
      case 'javascript': return '#f7df1e';
      case 'c++': return '#00599c';
      default: return colors.primary;
    }
  };

  return (
    <View style={[commonStyles.card, { padding: 0 }]}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}>
        <View style={commonStyles.row}>
          <View style={{
            backgroundColor: getLanguageColor(language),
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            borderRadius: borderRadius.sm,
            marginRight: spacing.sm,
          }}>
            <Text style={[commonStyles.caption, { color: colors.background }]}>
              {language.toUpperCase()}
            </Text>
          </View>
          <Text style={commonStyles.subheading}>Code Editor</Text>
        </View>
        
        {!readOnly && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.success,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: borderRadius.sm,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={handleRun}
            disabled={isRunning}
          >
            <Icon 
              name={isRunning ? "hourglass" : "play"} 
              size={16} 
              color={colors.background} 
            />
            <Text style={[commonStyles.caption, { 
              color: colors.background, 
              marginLeft: spacing.xs,
              fontFamily: 'Inter_600SemiBold',
            }]}>
              {isRunning ? 'Running...' : 'Run'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Code Input */}
      <View style={{ padding: spacing.md }}>
        <TextInput
          style={{
            backgroundColor: colors.backgroundAlt,
            borderRadius: borderRadius.sm,
            padding: spacing.md,
            fontFamily: 'monospace',
            fontSize: 14,
            minHeight: 200,
            textAlignVertical: 'top',
            color: colors.text,
          }}
          value={code}
          onChangeText={handleCodeChange}
          multiline
          placeholder={`Write your ${language} code here...`}
          placeholderTextColor={colors.textLight}
          editable={!readOnly}
        />
      </View>

      {/* Output */}
      {output && (
        <View style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          padding: spacing.md,
        }}>
          <Text style={[commonStyles.subheading, { marginBottom: spacing.sm }]}>
            Output:
          </Text>
          <View style={{
            backgroundColor: colors.backgroundAlt,
            borderRadius: borderRadius.sm,
            padding: spacing.md,
          }}>
            <Text style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: colors.text,
            }}>
              {output}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
