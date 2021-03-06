import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import useMe from '../../data/useMe';
import useStoreStatusStyle, { HEADER_BACKGROUND_COLOR } from '../../stores/useStoreStatusStyle';

const PrivateRoute = ({ children }) => {
  const { error, isLoading } = useMe();
  const navigation = useNavigation();
  const setStatusBarStyles = useStoreStatusStyle((state) => state.setStyles);
  const resetStatusBarStyles = useStoreStatusStyle((state) => state.reset);

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

  if (isLoading) return <ActivityIndicator style={{ marginTop: 20 }} />;
  if (error) {
    navigation.navigate('AuthIntro');
  }

  return <>{children}</>;
};

export default PrivateRoute;
