import React, { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/core';
import { StyleSheet, View, TextInput, Text, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import ChatItem from '../../components/chat/ChatItem';
import useMe from '../../data/useMe';
import useMessageFriend from '../../data/useMessageFriend';
import useUserInfo from '../../data/useUserInfo';
import dayjs from 'dayjs';

const Chat = () => {
  const [msgContent, setMsgContent] = useState('');
  const [messages, setMessages] = useState([]);
  const listMsgRef = useRef();
  const route = useRoute();

  const { data: me } = useMe();

  const friendId = route.params?.friendId;
  const { data, isFetching } = useMessageFriend(friendId || 2);
  const { data: friendInfo } = useUserInfo(friendId || 2);
  const userId = me?.id;

  useEffect(() => {
    if (data) {
      let newMessages = [];
      data.pages.forEach(({ messages: item }) => {
        const newItem = [...item];
        newItem.reverse();
        newMessages = [...newItem, ...newMessages];
      });
      setMessages(newMessages);
    }
  }, [data]);

  const renderChatItem = ({ item: message, index }) => {
    // có hiển thị ngày hay không
    let showDate = false;
    if (index == 0) {
      showDate = true;
    } else {
      let minDff = dayjs(message.created_at).diff(messages[index - 1].created_at, 'minute', true);
      if (minDff > 10) {
        showDate = true;
      }
    }

    if (message.sender_id == userId) {
      return <ChatItem type={1} showDate={showDate} msgData={message} />;
    } else {
      let showAvatar = true;
      if (!showDate && index > 0 && messages[index - 1]?.sender_id == message?.sender_id) {
        showAvatar = false;
      }

      return (
        <ChatItem
          type={2}
          showDate={showDate}
          showAvatar={showAvatar}
          msgData={message}
          avartar_url={friendInfo?.avartar_url}
        />
      );
    }
  };

  /**
   * Xử lý việc gửi tin nhắn
   */
  const sendMessage = () => {
    setMessages([
      ...messages,
      {
        id: 213,
        sender_id: userId,
        content: msgContent,
        created_at: dayjs(),
      },
    ]);
    setMsgContent('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <LinearGradient colors={['#257afe', '#109afb', '#01b8f9']} start={[0, 1]} end={[1, 0]} style={styles.header}>
        <View style={styles.btnBack}>
          <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#fff" />
        </View>
        <View style={styles.partnerInfoWrapper}>
          <Text style={styles.partnerUsername}>{friendInfo?.full_name}</Text>
          <Text style={styles.partnerLastVisited}>Truy cập 10 phút trước</Text>
        </View>
        <View style={styles.flexSpace} />
        <View style={styles.btnOption}>
          <Icon name="menu" type="ionicon" size={24} color="#fff" />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <FlatList
          style={styles.messageContainer}
          data={messages}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id.toString()}
          ref={listMsgRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            {
              listMsgRef.current.scrollToEnd({ animated: true });
            }
          }}
          ListHeaderComponent={() => <View style={{ marginTop: 10 }}>{isFetching && <ActivityIndicator />}</View>}
          ListFooterComponent={() => <View style={{ paddingBottom: 20 }}></View>}
        />
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.msgContent}
          placeholder="Tin nhắn"
          blurOnSubmit={true}
          multiline={true}
          maxLength={1000}
          value={msgContent}
          onChangeText={(text) => setMsgContent(text)}
        />

        {(msgContent == null || msgContent == '') && (
          <View style={{ flexDirection: 'row' }}>
            <Icon name="camera-outline" type="ionicon" size={28} color="#555" style={{ marginRight: 5 }} />
            <Icon name="image-outline" type="ionicon" size={28} color="#555" />
          </View>
        )}

        {msgContent != null && msgContent != '' && (
          <View>
            <Icon name="send" type="ionicon" size={24} color="#0086fe" onPress={() => sendMessage()} />
          </View>
        )}
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
  },
  partnerInfoWrapper: {
    paddingHorizontal: 15,
  },
  partnerUsername: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  partnerLastVisited: {
    fontSize: 12,
    color: '#e9e9e9',
  },
  body: {
    backgroundColor: '#e0e8f1',
    // paddingVertical: 15,
    flex: 10,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlignVertical: 'top',
    fontSize: 18,
  },
  footer: {
    borderTopColor: '#d9d9d9',
    borderTopWidth: 1,
    backgroundColor: '#f5f5f5',
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  msgContent: {
    flex: 1,
    flexShrink: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    lineHeight: 27,
    maxHeight: 108,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
});

export default Chat;
