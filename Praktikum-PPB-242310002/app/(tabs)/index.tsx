import { StyleSheet, TouchableOpacity } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../useAuth';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/signin');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.headerPlaceholder}>
          <ThemedText type="title">ðŸ“š</ThemedText>
        </ThemedView>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{user ? user.username : 'Discover Books'}</ThemedText>
        {!user && <HelloWave />}
      </ThemedView>
      {!user ? (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Login Required</ThemedText>
          <ThemedText>Please sign in to continue</ThemedText>
          <Link href="/signin" style={styles.linkButton}>
            <ThemedText type="link">Sign In</ThemedText>
          </Link>
        </ThemedView>
      ) : (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Welcome!</ThemedText>
          <ThemedText>You are logged in.</ThemedText>
          <Link href="/book-details" style={styles.linkButton}>
            <ThemedText type="link">View Book Details</ThemedText>
          </Link>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    marginTop: 8,
  },
  signOutButton: {
    backgroundColor: '#c0392b',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

