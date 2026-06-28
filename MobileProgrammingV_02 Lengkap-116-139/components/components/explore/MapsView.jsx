import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { color_list } from '../../styles/styleAppLatihan';

const MapsView = ({ curent_location, markersAddress = [] }) => {
  const cameraPosition = {
    latitude: curent_location?.latitude || 37.78825,
    longitude: curent_location?.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.mapFallback}>
        <Ionicons name="map-outline" size={80} color={color_list.green} />
        <Text style={styles.mapFallbackText}>Map View Unavailable</Text>
        <Text style={styles.mapFallbackSubtext}>
          Maps are only available on Android and iOS devices
        </Text>
        <Text style={styles.mapFallbackHint}>
          Please run this app on a mobile device or emulator
        </Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={cameraPosition}
      showsUserLocation
      showsCompass
    >
      {markersAddress.map((marker, index) => (
        <Marker
          key={marker.id || index}
          coordinate={marker.coordinate}
          title={marker.title}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color_list.cream,
    padding: 20,
  },
  mapFallbackText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color_list.green,
    marginTop: 15,
  },
  mapFallbackSubtext: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 8,
  },
  mapFallbackHint: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default MapsView;