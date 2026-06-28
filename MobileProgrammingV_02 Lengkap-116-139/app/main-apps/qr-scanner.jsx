import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

let CameraView = null;
let useCameraPermissions = null;
if (Platform.OS !== 'web') {
  const CameraModule = require('expo-camera');
  CameraView = CameraModule.CameraView;
  useCameraPermissions = CameraModule.useCameraPermissions;
}

export default function QRScanner() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions?.() ?? [null, null];
  const [scanned, setScanned] = useState(false);

  const handleBarcodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    try {
      const bookId = extractBookId(data);
      if (bookId) {
        router.replace(`/books/${bookId}`);
      } else {
        Alert.alert('Invalid QR Code', 'No valid book ID found');
        setScanned(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to read QR code');
      setScanned(false);
    }
  };

  const extractBookId = (data) => {
    const match = data.match(/(\d+)$/);
    return match ? match[1] : null;
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>QR scanning is only available on the mobile app.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      <View style={styles.overlay}>
        <Ionicons name="close" size={30} color="white" onPress={() => router.back()} style={styles.closeIcon} />
        <Text style={styles.instruction}>Point camera at a QR code</Text>
      </View>
      {scanned && (
        <TouchableOpacity style={styles.rescanButton} onPress={() => setScanned(false)}>
          <Text style={styles.rescanText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeIcon: { marginLeft: 10 },
  instruction: { color: 'white', fontSize: 16, textAlign: 'center', flex: 1 },
  permissionText: { color: 'white', textAlign: 'center', marginTop: 100, fontSize: 16, paddingHorizontal: 20 },
  permissionButton: { backgroundColor: '#006eff', padding: 12, borderRadius: 8, marginTop: 20, alignSelf: 'center' },
  permissionButtonText: { color: 'white', fontWeight: 'bold' },
  backButton: { backgroundColor: 'gray', padding: 12, borderRadius: 8, marginTop: 20, alignSelf: 'center' },
  backButtonText: { color: 'white' },
  rescanButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#006eff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  rescanText: { color: 'white', fontWeight: 'bold' },
});