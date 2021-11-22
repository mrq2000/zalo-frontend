/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ListItem, Avatar } from 'react-native-elements';

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert,
  TouchableHighlight,
  Text,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

const list = [
    {
      name: 'Thông tin chính phủ',
      avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
      subtitle: 'Zalo của tổng thông tin chính phủ'
    },
    {
      name: 'Kết quả xổ số',
      avatar_url: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
      subtitle: 'Zalo của kết quả xổ số'
    },
    // more items
  ]

const OfficialAccountSuggest = () => {

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {
            list.map((l, i) => (
                <ListItem containerStyle={styles.listItem} key={i} bottomDivider={false}>
                    <Avatar rounded source={{uri: l.avatar_url}} />
                    <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))
        }
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 10,
  },
  listItem: {
    borderRadius: 10,
  }
});

export default OfficialAccountSuggest;
