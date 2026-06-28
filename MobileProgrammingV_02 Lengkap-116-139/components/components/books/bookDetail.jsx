import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ListBooks from '../../constants/listBooks';
import { color_list } from '../../styles/styleAppLatihan';

let Speech = null;
if (Platform.OS !== 'web') {
  Speech = require('expo-speech');
}

export default function BookDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = params?.id;
  const book = ListBooks.find((b) => String(b.id) === String(id));

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const storyWords = book?.story ? book.story.split(' ') : [];

  useEffect(() => {
    return () => {
      if (Platform.OS !== 'web' && Speech) {
        Speech.stop();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (Platform.OS === 'web' || !Speech || !book?.story) return;

    if (isSpeaking) {
      if (isPaused) {
        Speech.resume();
        setIsPaused(false);
      } else {
        Speech.pause();
        setIsPaused(true);
      }
      return;
    }

    Speech.speak(book.story, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
      onStart: () => {
        setIsSpeaking(true);
        setIsPaused(false);
      },
      onPause: () => setIsPaused(true),
      onResume: () => setIsPaused(false),
      onDone: () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setHighlightedIndex(-1);
      },
      onStopped: () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setHighlightedIndex(-1);
      },
      onBoundary: (event) => {
        if (event.charIndex !== undefined) {
          const spokenText = book.story.substring(0, event.charIndex + event.charLength);
          const wordCount = spokenText.split(' ').length - 1;
          setHighlightedIndex(wordCount);
        }
      },
    });
  };

  const handleStop = () => {
    if (Platform.OS !== 'web' && Speech) {
      Speech.stop();
    }
  };

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Book not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const playIcon = isSpeaking && !isPaused ? 'pause' : 'play';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{book.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Text style={styles.sectionTitle}>Synopsis</Text>
        <Text style={styles.sinopsis}>{book.sinopsis}</Text>
        <Text style={styles.sectionTitle}>Story</Text>
        <View style={styles.storyContainer}>
          {storyWords.map((word, index) => (
            <Text
              key={index}
              style={[
                styles.word,
                index === highlightedIndex && styles.highlightedWord,
              ]}
            >
              {word}{' '}
            </Text>
          ))}
        </View>
      </ScrollView>

      {Platform.OS !== 'web' && (
        <View style={styles.ttsBar}>
          <TouchableOpacity onPress={handleSpeak} style={styles.ttsButton}>
            <Ionicons name={playIcon} size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStop} style={[styles.ttsButton, styles.stopButton]}>
            <Ionicons name="stop" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.ttsStatus}>
            {isSpeaking ? (isPaused ? 'Paused' : 'Reading...') : 'Tap play to listen'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color_list.cream },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  content: { padding: 20, paddingBottom: 120 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  author: { fontSize: 16, color: 'gray', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: color_list.green },
  sinopsis: { fontSize: 15, color: '#555', lineHeight: 22 },
  storyContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  word: { fontSize: 16, color: '#333', lineHeight: 24 },
  highlightedWord: { backgroundColor: color_list.green, color: 'white', borderRadius: 4, overflow: 'hidden' },
  ttsBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ttsButton: {
    backgroundColor: color_list.green,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stopButton: { backgroundColor: '#d9534f' },
  ttsStatus: { color: 'white', fontSize: 14, flex: 1 },
  errorText: { fontSize: 18, textAlign: 'center', marginTop: 50 },
  backLink: { color: 'blue', textAlign: 'center', marginTop: 20 },
});