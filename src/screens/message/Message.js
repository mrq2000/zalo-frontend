import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, StatusBar, Dimensions, SafeAreaView, Text } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import MessageItem from '../../components/message/MessageItem';
import { fakeDatas } from './fake-data-message';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const Message = (data) => {
  const renderMsgItem = ({ item }) => <MessageItem data={item} />;

  const renderFindMoreFriendWrapper = () => (
    <View style={styles.findMoreFriendWrapper}>
      <Text style={styles.txtFMF}>Dễ dàng tìm kiếm và trò chuyện với bạn bè</Text>
      <Button type="solid" titleStyle={styles.btnFMFTitle} buttonStyle={styles.btnFMF} title="Tìm thêm bạn" />
    </View>
  );

  return (
    <SafeAreaView style={styles.msgWrapper}>
      <StatusBar barStyle="default" />
      <FlatList
        data={fakeDatas}
        renderItem={renderMsgItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFindMoreFriendWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  msgWrapper: {
    flex: 1,
  },
  flexSpace: {
    flex: 1,
  },
  findMoreFriendWrapper: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  // FMF: Find more friend
  txtFMF: {
    color: '#888',
  },
  btnFMF: {
    marginTop: 10,
    backgroundColor: '#0086fe',
    color: '#f00',
    borderRadius: 100,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  btnFMFTitle: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#fff',
  },
});

export default Message;
