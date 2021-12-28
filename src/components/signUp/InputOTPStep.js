import React, { useState } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import OTPInput from 'react-native-otp';

const InputOTPStep = ({ phoneNumber }) => {
  const [otp, setOTP] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={{ maxWidth: 250, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>
        Vui lòng nhập mã OTP mà chúng tôi đã gửi cho bạn
      </Text>
      <OTPInput tintColor="#0068ff" offTintColor="#BBBCBE" otpLength={6} value={otp} onChange={(otp) => setOTP(otp)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default InputOTPStep;
