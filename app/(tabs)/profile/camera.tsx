import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useUserStore } from '@/store/useUserStore';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const { setUser, user } = useUserStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermissionResponse, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    if (!mediaPermissionResponse?.granted) {
      void requestMediaPermission();
    }
  }, []);

  if (!permission) {
    return <ThemedView />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>
          We need your permission to show the camera
        </ThemedText>
        <Button onPress={requestPermission} title="grant permission" />
      </ThemedView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await MediaLibrary.createAssetAsync(photo.uri);
      setUser({
        ...user,
        avatarUri: photo.uri,
      });
      alert('Saved!');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(ref) => {
          cameraRef.current = ref;
        }}
      >
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <ThemedText style={styles.text}>Flip Camera</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <ThemedText style={styles.text}>Take photo</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </CameraView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  button: {
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
