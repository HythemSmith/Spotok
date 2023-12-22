import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlaybackTest = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://drive.google.com/uc?id=10xjbyLKoj0MTX-noR13S7nbNRauS6Si7' }, // Replace with your audio URL
        { shouldPlay: true }
      );
      setSound(sound);
    } catch (error) {
      console.error('Error loading audio', error);
    }
  }

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Play Audio" onPress={playSound} />
    </View>
  );
};

export default AudioPlaybackTest;
