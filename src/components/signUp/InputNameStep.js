import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

const InputNameStep = () => {
  const [nameInputFocused, setNameInputFocused] = useState(false);
  const [name, setName] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <>
      <View style={[styles.content]}>
        <Text style={styles.info}>Tên hiển thị</Text>

        <TextInput
          keyboardType="default"
          style={[styles.textInput, nameInputFocused && styles.textInputFocused]}
          placeholder="Tên của bạn"
          autoFocus
          value={name}
          onChangeText={setName}
          onFocus={() => setNameInputFocused(true)}
          onBlur={() => setNameInputFocused(false)}
        />

        <TextInput
          style={[styles.textInput, passwordInputFocused && styles.textInputFocused]}
          secureTextEntry
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPasswordInputFocused(true)}
          onBlur={() => setPasswordInputFocused(false)}
        />
      </View>

      <View style={styles.btnContainer}>
        <Button
          title="Tiếp theo"
          type="solid"
          disabled={disableBtn || isLoading}
          buttonStyle={styles.submitBtn}
          titleStyle={{ fontSize: 14, fontWeight: '500' }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bullet: {
    width: 15,
  },
  bulletText: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  listText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
  },
  setColorBlue: {
    color: '#2196f3',
  },
  textInput: {
    height: 40,
    borderBottomColor: '#e2e4e7',
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 18,
    paddingBottom: 5,
  },
  setBold: {
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitBtn: {
    borderRadius: 100,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  btnContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  textInputFocused: {
    borderBottomColor: '#8edee6',
    borderBottomWidth: 2,
  },
});

export default InputNameStep;
