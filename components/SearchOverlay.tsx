
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';
import { learningTracks } from '../data/courseContent';

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const searchableContent = [
  // Courses
  ...learningTracks.flatMap(track => 
    track.courses.map(course => ({
      type: 'course',
      title: course.title,
      description: course.description,
      category: track.name,
      id: course.id,
    }))
  ),
  // Topics
  { type: 'topic', title: 'Variables', description: 'Learn about storing data', category: 'Programming Fundamentals' },
  { type: 'topic', title: 'Functions', description: 'Reusable blocks of code', category: 'Programming Fundamentals' },
  { type: 'topic', title: 'Loops', description: 'Repeating code execution', category: 'Programming Fundamentals' },
  { type: 'topic', title: 'HTML Tags', description: 'Structure web content', category: 'Web Development' },
  { type: 'topic', title: 'CSS Selectors', description: 'Style web elements', category: 'Web Development' },
  { type: 'topic', title: 'Git Commands', description: 'Version control basics', category: 'Developer Tools' },
];

export default function SearchOverlay({ isVisible, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(searchableContent);
  const [recentSearches, setRecentSearches] = useState([
    'Variables', 'HTML basics', 'Python functions', 'CSS styling'
  ]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(searchableContent);
    } else {
      const filtered = searchableContent.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 3)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(searchableContent);
  };

  const renderSearchResult = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: colors.backgroundAlt,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        console.log('Navigate to:', item.title);
        onClose();
      }}
    >
      <View style={{
        backgroundColor: item.type === 'course' ? colors.primary : colors.secondary,
        borderRadius: borderRadius.full,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
      }}>
        <Icon 
          name={item.type === 'course' ? 'book' : 'bulb'} 
          size={20} 
          color={colors.background} 
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[commonStyles.body, { fontWeight: '600', marginBottom: spacing.xs }]}>
          {item.title}
        </Text>
        <Text style={[commonStyles.caption, { color: colors.textSecondary, marginBottom: spacing.xs }]}>
          {item.description}
        </Text>
        <Text style={[commonStyles.caption, { color: colors.primary }]}>
          {item.category}
        </Text>
      </View>

      <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
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
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginRight: spacing.md,
            }}
          >
            <Icon name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.backgroundAlt,
            borderRadius: borderRadius.lg,
            paddingHorizontal: spacing.md,
          }}>
            <Icon name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={{
                flex: 1,
                paddingVertical: spacing.md,
                paddingLeft: spacing.sm,
                fontSize: 16,
                color: colors.text,
              }}
              placeholder="Search courses, topics, exercises..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <Icon name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView style={{ flex: 1, padding: spacing.md }}>
          {searchQuery.trim() === '' && (
            <>
              {/* Recent Searches */}
              <View style={{ marginBottom: spacing.lg }}>
                <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
                  Recent Searches
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {recentSearches.map((search, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: colors.backgroundAlt,
                        paddingHorizontal: spacing.md,
                        paddingVertical: spacing.sm,
                        borderRadius: borderRadius.full,
                        marginRight: spacing.sm,
                        marginBottom: spacing.sm,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => handleSearch(search)}
                    >
                      <Icon name="time" size={14} color={colors.textSecondary} />
                      <Text style={[commonStyles.caption, { marginLeft: spacing.xs }]}>
                        {search}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Popular Topics */}
              <View style={{ marginBottom: spacing.lg }}>
                <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
                  Popular Topics
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {['Variables', 'Functions', 'HTML', 'CSS', 'Python', 'Git'].map((topic, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: colors.primary,
                        paddingHorizontal: spacing.md,
                        paddingVertical: spacing.sm,
                        borderRadius: borderRadius.full,
                        marginRight: spacing.sm,
                        marginBottom: spacing.sm,
                      }}
                      onPress={() => handleSearch(topic)}
                    >
                      <Text style={[commonStyles.caption, { color: colors.background }]}>
                        {topic}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Search Results */}
          <View>
            <Text style={[commonStyles.subheading, { marginBottom: spacing.md }]}>
              {searchQuery.trim() === '' ? 'All Content' : `Results for "${searchQuery}"`}
              {searchQuery.trim() !== '' && (
                <Text style={[commonStyles.caption, { color: colors.textSecondary }]}>
                  {' '}({searchResults.length} found)
                </Text>
              )}
            </Text>
            
            {searchResults.length > 0 ? (
              searchResults.map(renderSearchResult)
            ) : (
              <View style={{
                alignItems: 'center',
                paddingVertical: spacing.xl,
              }}>
                <Icon name="search" size={48} color={colors.textSecondary} />
                <Text style={[commonStyles.body, { 
                  textAlign: 'center', 
                  color: colors.textSecondary,
                  marginTop: spacing.md,
                }]}>
                  No results found for "{searchQuery}"
                </Text>
                <Text style={[commonStyles.caption, { 
                  textAlign: 'center', 
                  color: colors.textSecondary,
                  marginTop: spacing.sm,
                }]}>
                  Try searching for courses, topics, or exercises
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
