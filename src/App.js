import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";

import Navigator from "./AppNavigation";

const App = () => {
  return (
    <View>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default App;
