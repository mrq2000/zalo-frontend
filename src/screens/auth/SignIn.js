import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InputPhoneNumberStep from '../../components/signIn/InputPhoneNumberStep';
import useStoreStatusStyle, { HEADER_BACKGROUND_COLOR } from '../../stores/useStoreStatusStyle';

const SignIn = () => {
  const resetStatusBarStyles = useStoreStatusStyle((state) => state.reset);
  const setStatusBarStyles = useStoreStatusStyle((state) => state.setStyles);

  useEffect(() => {
    setStatusBarStyles({
      statusBarStyle: {
        barStyle: 'light-content',
      },
      viewStyle: {
        backgroundColor: HEADER_BACKGROUND_COLOR,
      },
    });

    return () => resetStatusBarStyles();
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <InputPhoneNumberStep />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignIn;
