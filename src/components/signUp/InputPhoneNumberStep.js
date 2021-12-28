import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { api } from '../../helpers/api';

const HEADER_BACKGROUND_COLOR = '#0068ff';

const InputPhoneNumberStep = ({ phoneNumber, setPhoneNumber, setUserDuplicate, setCurrentStep }) => {
  const [disableBtn, setDisableBtn] = useState(true);

  const [phoneNumberInputFocused, setPhoneNumberInputFocused] = useState(false);

  const { mutate: handleSignup, isLoading } = useMutation(
    async () => {
      const res = await api.get('/users/info/phonenumber', {
        params: {
          phonenumber: phoneNumber,
        },
      });

      return res.data;
    },
    {
      onSuccess: (data) => {
        setUserDuplicate(data);
        setCurrentStep('duplicatePhone');
      },
      onError: async (err) => {
        const errorData = err?.response?.data;
        if (errorData?.code === 995) {
          setCurrentStep('inputOTPsss');
        } else {
          Alert.alert('Đăng bài thất bại', 'Vui lòng thử lại sau!');
        }
      },
    },
  );

  useEffect(() => {
    if (phoneNumber) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [phoneNumber]);

  return (
    <>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Vui lòng nhập số điện thoại</Text>
        </View>

        <TextInput
          keyboardType="numeric"
          style={[styles.textInput, phoneNumberInputFocused && styles.textInputFocused]}
          placeholder="Số điện thoại"
          autoFocus
          defaultValue={phoneNumber}
          onChangeText={(val) => setPhoneNumber(val)}
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
    </>
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
