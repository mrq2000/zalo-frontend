import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';

import PrivateScreen from '../components/layout/PrivateScreen';
import PostItem from '../components/post/PostItem';

export default function App() {
  const navigation = useNavigation();

  return (
    <PrivateScreen>
      <View style={styles.container}>
        {/* <Text>Home Screen</Text> */}
        <Button
          title="Đăng nhập"
          type="solid"
          buttonStyle={styles.submitBtn}
          titleStyle={{ fontSize: 14, fontWeight: '500' }}
          onPress={() => navigation.navigate('AddPost')}
        />
        <PostItem />
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
