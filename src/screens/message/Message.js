import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, StatusBar, Dimensions, SafeAreaView} from 'react-native';
import { Icon } from 'react-native-elements';
import MessageItem from '../../components/message/MessageItem';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const fakeDatas = [
  {
    id: "1",
    partner: {
      id: "111",
      username: 'Phạm Trung Hiếu',
      avatar: 'https://cellphones.com.vn/sforum/wp-content/uploads/2021/09/photo-1-1615870720601745881145.jpg'
    },
    lastmessage: {
      message: 'Hôm nay trời đẹp quá',
      created: '21/11',
      unread: 1
    }
  },
  {
    id: "2",
    partner: {
      id: "112",
      username: 'Hieu Pham',
      avatar: 'https://cellphones.com.vn/sforum/wp-content/uploads/2021/09/photo-1-1615870720601745881145.jpg'
    },
    lastmessage: {
      message: 'Hôm nay trời mưa to nhỉ',
      created: '20/11',
      unread: 0
    }
  }
];

const Message = (data) => {
  const renderMsgItem = ({ item }) => (
    <MessageItem data={item} />
  ); 

  return (
    <SafeAreaView style={styles.msgWrapper}>
      <StatusBar barStyle="default" /> 
      <FlatList 
        data={fakeDatas}
        renderItem={renderMsgItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  msgWrapper: {
    flex: 1
  },
  flexSpace: {
    flex: 1
  },  
  
});

export default Message;