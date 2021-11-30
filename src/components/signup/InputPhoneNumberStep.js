import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';

import useStoreStatusStyle from '../../stores/useStoreStatusStyle';
import { api, setToken } from '../../helpers/api';

const HEADER_BACKGROUND_COLOR = '#0068ff';

const InputPhoneNumberStep = ({ previousStep }) => {
  const navigation = useNavigation();
  const setStatusBarStyles = useStoreStatusStyle((state) => state.setStyles);
  const resetStatusBarStyles = useStoreStatusStyle((state) => state.reset);

  const [disableBtn, setDisableBtn] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumberInputFocused, setPhoneNumberInputFocused] = useState(false);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

  const { mutate: handleSignup, isLoading } = useMutation(
    async () => {
      const res = await api.post('/sign-up', {
        phoneNumber,
        password,
      });

      return res.data;
    },
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          setToken(data.accessToken);
          navigation.navigate('Home');
        }
      },
      onError: (err) => {
        setErrorMessage(err?.response?.data?.message || 'Có lỗi xảy ra');
      },
    },
  );

  useEffect(() => {
    if (phoneNumber && password) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [phoneNumber, password]);

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
    <View>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <Icon name="angle-left" type="font-awesome" size={28} color="#fff" onPress={() => previousStep()} />
        </View>

        <Text style={styles.title}>Đăng Ký</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Vui lòng nhập số điện thoại</Text>
        </View>

        <TextInput
          keyboardType="numeric"
          style={[styles.textInput, phoneNumberInputFocused && styles.textInputFocused]}
          placeholder="Số điện thoại"
          autoFocus
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          onFocus={() => setPhoneNumberInputFocused(true)}
          onBlur={() => setPhoneNumberInputFocused(false)}
        />

        <View style={styles.btnContainer}>
          <Button
            title="Đăng Ký"
            type="solid"
            disabled={disableBtn || isLoading}
            buttonStyle={styles.submitBtn}
            titleStyle={{ fontSize: 14, fontWeight: '500' }}
            onPress={handleSignup}
          />
        </View>
      </View>
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
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
  },
  content: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  infoContainer: {
    backgroundColor: '#f9fafe',
    margin: -10,
    marginBottom: 15,
  },
  info: {
    fontSize: 12.5,
    padding: 10,
  },
  textInput: {
    height: 40,
    borderBottomColor: '#e2e4e7',
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 18,
    paddingBottom: 5,
  },
  textInputFocused: {
    borderBottomColor: '#8edee6',
    borderBottomWidth: 2,
  },
  getOldPassTitle: {
    marginTop: 20,
  },
  submitBtn: {
    borderRadius: 100,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  btnContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default InputPhoneNumberStep;
