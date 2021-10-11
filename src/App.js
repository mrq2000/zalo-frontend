import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";

import Navigator from "./AppNavigation";

const App = () => {
  return (
    <View style={styles.app}>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  container: {
    flex: 1
  },
});

export default App;
