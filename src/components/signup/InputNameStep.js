import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const HEADER_BACKGROUND_COLOR = '#0068ff';

const NameStep = ({ previousStep }) => {
  const [nameInputFocused, setnameInputFocused] = useState(false);
  const [name, setName] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <Icon name="angle-left" type="font-awesome" size={28} color="#fff" onPress={() => previousStep()} />
        </View>

        <Text style={styles.title}>Tạo tài khoản</Text>
      </View>
      <View style={[styles.content]}>
        <Text style={styles.info}>Tên hiển thị</Text>

        <TextInput
          keyboardType="default"
          style={[styles.textInput, nameInputFocused && styles.textInputFocused]}
          placeholder="Tên của bạn"
          autoFocus
          value={name}
          onChangeText={setName}
          onFocus={() => setnameInputFocused(true)}
          onBlur={() => setnameInputFocused(false)}
        />

        <Text style={styles.normalText}>Lưu ý khi đặt tên</Text>
        <View style={styles.row}>
          <View style={styles.bullet}>
            <Text>{'\u2022' + ' '}</Text>
          </View>
          <View style={styles.bulletText}>
            <Text>
              <Text style={styles.normalText}>
                không vi phạm <Text style={styles.setColorBlue}>qui định đặt tên của ứng dụng</Text>
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.bullet}>
            <Text>{'\u2022' + ' '}</Text>
          </View>
          <View style={styles.bulletText}>
            <Text>
              <Text style={styles.listText}>Nên sử dụng tên thật để bạn bè dễ nhận ra bạn</Text>
            </Text>
          </View>
        </View>
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
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 200,
  },
  row: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
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
  backIcon: {
    left: 15,
    top: 0,
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
  },
  content: {
    padding: 10,
    marginTop: 20,
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
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default NameStep;
