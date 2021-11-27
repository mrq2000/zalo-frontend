import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View,Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';


const HEADER_BACKGROUND_COLOR = '#0068ff';

const DuplicatePhoneStep = ({ previousStep }) => {
    return (
        <View>
            <View style={styles.header}>
                <View style={styles.backIcon}>
                <Icon name="angle-left" type="font-awesome" size={28} color="#fff" onPress={() => previousStep()} />
                </View>

                <Text style={styles.title}>Xác nhận tài khoản</Text>
            </View>
      <View style={[styles.content]}>
            <Text style={styles.info}>Đã tồn tại một tài khoản zalo được gắn với số điện thoại 0919408976</Text>
            <View>
            <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
            }}
            style={{ width: 100, height: 100, borderRadius: 200 / 2 }}
          />
          </View>
          <View style = {styles.childcontent}>
            <Text>Việt Hoàng</Text>
            <Text>0919408976</Text>
            </View>
            <View style = {styles.childcontent}>

            <Text>Nếu <b>Việt Hoàng</b> là tài khoản của bạn</Text>
            <Text
            style={[styles.hyperlinkStyle,styles.setColorBlue]}
            onPress={() => {
              Linking.openURL('#');
            }}>
            Đăng nhập tại đây
          </Text>
          </View>
          <View style={styles.btnContainer}>
          <Button
            title="Đăng Ký với số điện thoại khác"
            type="solid"
            buttonStyle={styles.submitBtn}
            titleStyle={{ fontSize: 14, fontWeight: '500' }}
          />
        </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      position: 'relative',
    },
    setColorBlue :{
        color: '#2196f3'
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
      marginTop:20,
      alignItems: 'center',
    },
    childcontent:{
        marginTop: 20,
        alignItems: 'center'
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
    getOldPassTitle: {
      marginTop: 20,
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

export default DuplicatePhoneStep;