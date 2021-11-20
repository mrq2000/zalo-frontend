import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const Intro = ({ nextStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Text style={styles.logoText}>Bk-Zalo</Text>
      </View>

      <View style={styles.btnWrapper}>
        <TouchableHighlight underlayColor="#0068ff" style={[styles.btn, styles.btnPrimary]} onPress={() => {}}>
          <Text style={[styles.btnText, styles.btnPrimaryText]}>Đăng nhập</Text>
        </TouchableHighlight>

        <TouchableHighlight underlayColor="#c6c8cc" style={[styles.btn, styles.btnSecondary]} onPress={() => nextStep()}>
          <Text style={[styles.btnText, styles.btnSecondaryText]}>Đăng ký</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // logo
  logoWrapper: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logoText: {
    color: '#0068ff',
    fontSize: 60,
    fontWeight: '700',
    fontFamily: 'Roboto'
  },
  // button
  btnWrapper: {
    flex: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  btn: {
    height: 50,
    width: 250,
    borderRadius: 40,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#0086fe',
  },
  btnSecondary: {
    backgroundColor: '#e9e9e9',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  btnPrimaryText: {
    color: '#ffffff',
  },
});

export default Intro;
