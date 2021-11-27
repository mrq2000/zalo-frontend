import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import ChatItem from '../../components/chat/ChatItem';
import { conversation } from './fake-data-chat';

const userId = 1;

const Chat = () => {
  const [msgContent, setMsgContent] = useState('');
  const listMsgRef = useRef();

  /**
   * Render từng tin nhắn
   * @param {*} param0
   * @returns
   */
  const renderChatItem = ({ item, index }) => {
    // có hiển thị ngày hay không
    let showDate = false;
    if (index == 0) {
      showDate = true;
    } else {
      let second = (item.created.getTime() - conversation[index - 1].created.getTime()) / 1000;
      if (second > 30 * 60) {
        showDate = true;
      }
    }

    if (item.sender.id == userId) {
      return <ChatItem type={1} showDate={showDate} msgData={item} />;
    } else {
      let showAvatar = true;
      if (!showDate && index > 0 && conversation[index - 1].sender.id == item.sender.id) {
        showAvatar = false;
      }

      return <ChatItem type={2} showDate={showDate} showAvatar={showAvatar} msgData={item} />;
    }
  };

  /**
   * Xử lý việc gửi tin nhắn
   */
  const sendMessage = () => {
    let msg = {
      message_id: conversation.length + 1,
      message: msgContent,
      unread: 0,
      created: new Date(),
      sender: {
        id: 1,
        username: 'Hieu Pham',
        avatar: 'https://i.pinimg.com/736x/f2/7a/8f/f27a8f4a15b15e22da019d255a600e26.jpg',
      },
    };
    conversation.push(msg);
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
          <Text style={styles.partnerUsername}>Phạm Trung Hiếu</Text>
          <Text style={styles.partnerLastVisited}>Truy cập 10 phút trước</Text>
        </View>
        <View style={styles.flexSpace} />
        <View style={styles.btnOption}>
          <Icon name="menu" type="ionicon" size={24} color="#fff" />
        </View>
      </LinearGradient>
      <View style={styles.body}>
        {/* <ScrollView contentContainerStyle={{}}>
          <View>
          </View>
        </ScrollView> */}
        <FlatList
          data={conversation}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.message_id.toString()}
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
          inverted
          ref={listMsgRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            {
              listMsgRef.current.scrollToEnd({ animated: true });
            }
          }}
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
});

export default Chat;
