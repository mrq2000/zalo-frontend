import React, { useState, useEffect, partneref } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';

const ChatOption = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <LinearGradient colors={['#257afe', '#109afb', '#01b8f9']} start={[0, 1]} end={[1, 0]} style={styles.header}>
        <View style={styles.btnBack}>
          <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>Tùy chọn</Text>
      </LinearGradient>
      <View style={styles.body}>
        <View style={styles.partnerInfoWrapper}>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatar}
              resizeMode="cover"
              source={{ uri: 'https://i.pinimg.com/736x/f2/7a/8f/f27a8f4a15b15e22da019d255a600e26.jpg' }}
            />
          </View>
          <Text style={styles.txtPartnerName}>Phạm Trung Hiếu</Text>
        </View>
        <View style={styles.toolbarWrapper}>
          <View style={styles.toolbarBtnWrapper}>
            <Icon style={styles.toolbarBtn} name="person-outline" type="ionicon" size={24} color="#000" />
            <Text>Trang cá nhân</Text>
          </View>
        </View>
        <View style={styles.optionWrapper}>
          <View style={styles.option}>
            <Icon style={styles.optionIcon} name="block" type="material" size={30} color="#8b8e93" />
            <Text style={styles.optionText}>Chặn</Text>
          </View>
          <View style={styles.option}>
            <Icon style={styles.optionIcon} name="delete-outline" type="material" size={30} color="#f00" />
            <Text style={[styles.optionText, { color: '#f00' }]}>Xóa lịch sử trò chuyện</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  flexSpace: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0068ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 6,
    minHeight: 50,
  },
  headerTitle: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 15,
  },
  body: {
    backgroundColor: '#e5e5e5',
    flex: 1,
  },
  // partner info
  partnerInfoWrapper: {
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  txtPartnerName: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '700',
  },
  // toolbar
  toolbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
    borderBottomWidth: 10,
  },
  toolbarBtnWrapper: {
    alignItems: 'center',
  },
  toolbarBtn: {
    backgroundColor: '#e5e5e5',
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  // option
  optionWrapper: {
    backgroundColor: '#fff',
    borderColor: '#e5e5e5',
    borderBottomWidth: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
  },
});

export default ChatOption;
