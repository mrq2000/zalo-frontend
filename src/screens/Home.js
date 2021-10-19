import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrivateScreen from '../components/layout/PrivateScreen';

export default function App() {
  return (
    <PrivateScreen>
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    </PrivateScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
