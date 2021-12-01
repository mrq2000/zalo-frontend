import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

const DuplicatePhoneStep = ({ userDuplicate, setCurrentStep }) => {
  return (
    <>
      <View style={[styles.content]}>
        <Text style={styles.info}>
          Đã tồn tại một tài khoản zalo được gắn với số điện thoại {userDuplicate?.phonenumber}
        </Text>
        <View>
          <Image
            source={{
              uri:
                userDuplicate?.avatar_url ||
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
            }}
            style={{ width: 100, height: 100, borderRadius: 200 / 2 }}
          />
        </View>
        <View style={styles.childcontent}>
          <Text style={styles.setBold}>{userDuplicate?.full_name}</Text>
          <Text>{userDuplicate?.phonenumber}</Text>
        </View>
        <View style={styles.childcontent}>
          <Text>
            Nếu <Text style={styles.setBold}>{userDuplicate?.full_name}</Text> là tài khoản của bạn
          </Text>
          <Text
            style={[styles.hyperlinkStyle, styles.setColorBlue]}
            onPress={() => {
              Linking.openURL('#');
            }}
          >
            Đăng nhập tại đây
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Đăng Ký với số điện thoại khác"
            type="solid"
            buttonStyle={styles.submitBtn}
            titleStyle={{ fontSize: 14, fontWeight: '500' }}
            onPress={() => setCurrentStep('inputPhoneNumber')}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  setColorBlue: {
    color: '#2196f3',
  },
  setBold: {
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  childcontent: {
    marginTop: 20,
    alignItems: 'center',
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
    fontSize: 18,
    padding: 10,
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
});

export default DuplicatePhoneStep;
