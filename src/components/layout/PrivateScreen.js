import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { Text } from 'react-native';

import useMe from '../../data/useMe';

const PrivateRoute = ({ children }) => {
  const { error, isLoading } = useMe();
  const navigation = useNavigation();

  if (isLoading) return <Text>Loading....</Text>;
  if (error) {
    navigation.navigate('SignIn');
  }

  return <>{children}</>;
};

export default PrivateRoute;
