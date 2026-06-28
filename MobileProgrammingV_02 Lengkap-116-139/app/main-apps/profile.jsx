import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { GET_USER_BY_USERNAME } from '../../components/hooks/API';
import { color_list } from '../../components/styles/styleAppLatihan';

let CameraView = null;
let useCameraPermissions = null;
if (Platform.OS !== 'web') {
  const CameraModule = require('expo-camera');
  CameraView = CameraModule.CameraView;
  useCameraPermissions = CameraModule.useCameraPermissions;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [avatarUri, setAvatarUri] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const permissionHook = useCameraPermissions?.();
  const permission = permissionHook?.[0];
  const requestPermission = permissionHook?.[1];

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    const userDataString = await AsyncStorage.getItem('userData');
    if (!userDataString) {
      Alert.alert('Error', 'Not signed in');
      router.back();
      return;
    }
    const parsed = JSON.parse(userDataString);
    setUsername(parsed.username);
    const response = await GET_USER_BY_USERNAME(parsed.username);
    if (response.data) {
      setProfileData(response.data);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert('Change Avatar', 'Choose an option', [
      { text: 'Take Photo', onPress: handleOpenCamera },
      { text: 'Choose from Gallery', onPress: pickImageFromGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleOpenCamera = async () => {
    if (Platform.OS === 'web') return;
    if (!permission) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permission is required');
        return;
      }
    }
    if (!permission?.granted) {
      Alert.alert('Permission Denied', 'Camera permission is required');
      return;
    }
    setIsCameraVisible(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setAvatarUri(photo.uri);
        setIsCameraVisible(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery permission is required');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.length > 0) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleCancel = () => {
    loadProfile();
    setIsEditing(false);
  };

  const updateField = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const updateNameField = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      name: { ...prev.name, [field]: value },
    }));
  };

  const updateAddressField = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  if (!profileData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        {isEditing ? (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.headerButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={[styles.headerButton, { color: color_list.green }]}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.headerButton}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={showImagePickerOptions}>
            <View style={styles.avatarContainer}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatar} resizeMode="cover" />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarInitials}>
                    {profileData?.name?.firstname?.charAt(0).toUpperCase()}
                    {profileData?.name?.lastname?.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.editIcon}>
                <FontAwesome name="edit" size={20} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
          {!isEditing && (
            <>
              <Text style={styles.name}>
                {profileData.name?.firstname} {profileData.name?.lastname}
              </Text>
              <Text style={styles.username}>@{username}</Text>
            </>
          )}
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>First Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.name?.firstname}
                onChangeText={(text) => updateNameField('firstname', text)}
              />
            ) : (
              <Text style={styles.value}>{profileData.name?.firstname}</Text>
            )}
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Last Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.name?.lastname}
                onChangeText={(text) => updateNameField('lastname', text)}
              />
            ) : (
              <Text style={styles.value}>{profileData.name?.lastname}</Text>
            )}
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.email}
                onChangeText={(text) => updateField('email', text)}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.value}>{profileData.email}</Text>
            )}
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.phone}
                onChangeText={(text) => updateField('phone', text)}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{profileData.phone}</Text>
            )}
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Street</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.address?.street}
                onChangeText={(text) => updateAddressField('street', text)}
              />
            ) : (
              <Text style={styles.value}>{profileData.address?.street}</Text>
            )}
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={String(profileData.address?.number || '')}
                onChangeText={(text) => updateAddressField('number', text)}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.value}>{profileData.address?.number}</Text>
            )}
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>City</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.address?.city}
                onChangeText={(text) => updateAddressField('city', text)}
              />
            ) : (
              <Text style={styles.value}>{profileData.address?.city}</Text>
            )}
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Zipcode</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.address?.zipcode}
                onChangeText={(text) => updateAddressField('zipcode', text)}
              />
            ) : (
              <Text style={styles.value}>{profileData.address?.zipcode}</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {Platform.OS !== 'web' && (
        <Modal visible={isCameraVisible} animationType="slide">
          <View style={styles.cameraContainer}>
            {CameraView && (
              <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing="front"
                mode="picture"
              >
                <View style={styles.cameraControls}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setIsCameraVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={takePicture}
                  >
                    <View style={styles.captureButtonInner} />
                  </TouchableOpacity>
                  <View style={{ width: 80 }} />
                </View>
              </CameraView>
            )}
          </View>
        </Modal>
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
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerButton: { fontSize: 16, fontWeight: '600', color: '#333' },
  scrollContent: { paddingBottom: 40 },
  avatarSection: { alignItems: 'center', paddingVertical: 30 },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  avatar: { width: '100%', height: '100%' },
  avatarPlaceholder: {
    backgroundColor: color_list.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: color_list.green,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 12, color: '#333' },
  username: { fontSize: 14, color: 'gray', marginTop: 4 },
  formCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 12,
  },
  fieldRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cameraContainer: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1 },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#999',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});