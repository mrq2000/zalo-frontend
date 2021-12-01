import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import InputPhoneNumberStep from '../../components/signUp/InputPhoneNumberStep';
import DuplicatePhoneStep from '../../components/signUp/DuplicatePhoneStep';
import InputNameStep from '../../components/signUp/InputNameStep';

import useStoreStatusStyle, { HEADER_BACKGROUND_COLOR } from '../../stores/useStoreStatusStyle';

const SignUp = () => {
  const navigation = useNavigation();
  const resetStatusBarStyles = useStoreStatusStyle((state) => state.reset);
  const setStatusBarStyles = useStoreStatusStyle((state) => state.setStyles);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [userDuplicate, setUserDuplicate] = useState();
  const [currentStep, setCurrentStep] = useState('inputPhoneNumber');

  const renderContent = () => {
    switch (currentStep) {
      case 'inputPhoneNumber':
        return (
          <InputPhoneNumberStep
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setUserDuplicate={setUserDuplicate}
            setCurrentStep={setCurrentStep}
          />
        );
      case 'duplicatePhone':
        return <DuplicatePhoneStep userDuplicate={userDuplicate} setCurrentStep={setCurrentStep} />;
      case 'inputName':
        return <InputNameStep />;
      default:
        return (
          <InputPhoneNumberStep
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setUserDuplicate={setUserDuplicate}
            setCurrentStep={setCurrentStep}
          />
        );
    }
  };

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
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <Icon
            name="angle-left"
            type="font-awesome"
            size={28}
            color="#fff"
            onPress={() => navigation.navigate('AuthIntro')}
          />
        </View>

        <Text style={styles.title}>Đăng Ký</Text>
      </View>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: HEADER_BACKGROUND_COLOR,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  backIcon: {
    left: 15,
    top: 0,
    padding: 2,
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
});

export default SignUp;
