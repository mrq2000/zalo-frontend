import React, { useState, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';

import ChatItem from '../../components/chat/ChatItem';
import useMe from '../../data/useMe';
import useMessageFriend from '../../data/useMessageFriend';
import useUserInfo from '../../data/useUserInfo';
import dayjs from 'dayjs';
import useSocket from '../../stores/useSocket';
import PrivateRoute from '../../components/layout/PrivateScreen';
import useTabBarBadge from '../../stores/useTabBarBadge';

const Chat = () => {
  const route = useRoute();
  const { data: me } = useMe();
  const { socket } = useSocket();
  const navigation = useNavigation();
  const { setTabBarBadge, message } = useTabBarBadge();

  const [msgContent, setMsgContent] = useState('');
  const [messages, setMessages] = useState([]);
  const queryClient = useQueryClient();
  const [idsLoading, setIdsLoading] = useState([]);

  const friendId = route.params?.friendId;
  const { data, isFetching, fetchNextPage, hasNextPage } = useMessageFriend(friendId);
  const { data: friendInfo } = useUserInfo(friendId);
  const meId = me?.id;

  useEffect(() => {
    const newMessageTabBarBadge = [...message];
    setTabBarBadge({ message: newMessageTabBarBadge.filter((id) => id != friendId) });
  }, []);

  useEffect(() => {
    if (data) {
      let newMessages = [];
      data.pages.forEach(({ messages: item }) => {
        const newItem = [...item];
        newItem;
        newMessages = [...newMessages, ...newItem];
      });
      setMessages(newMessages);
    }
  }, [data]);

  const renderChatItem = ({ item: message, index }) => {
    // có hiển thị ngày hay không
    let showDate = false;
    if (index == messages.length - 1) {
      showDate = true;
    } else {
      let minDff = dayjs(message.created_at).diff(messages[index + 1].created_at, 'minute', true);
      if (minDff > 5) {
        showDate = true;
      }
    }

    if (message.sender_id == meId) {
      return <ChatItem type={1} showDate={showDate} msgData={message} isLoading={idsLoading.includes(message.id)} />;
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
          avatar_url={friendInfo?.avatar_url}
        />
      );
    }
  };

  /**
   * Xử lý việc gửi tin nhắn
   */

  const sendMessage = () => {
    if (socket) {
      const currentId = uuidv4();
      const newIdsLoading = [...idsLoading];
      newIdsLoading.push(currentId);
      setIdsLoading(newIdsLoading);
      const createdAt = dayjs();

      queryClient.setQueryData(['message friends', friendId], (oldData) => {
        return {
          ...oldData,
          pages: [
            {
              messages: [
                {
                  id: currentId,
                  content: msgContent,
                  sender_id: meId,
                  created_at: createdAt,
                },
              ],
            },
            ...oldData.pages,
          ],
        };
      });

      socket.emit('newMessage', { receiver_id: friendId, message: msgContent }, (isSuccess) => {
        if (isSuccess) {
          const newIdsLoading = [...idsLoading];
          newIdsLoading.filter((id) => id !== currentId);
          setIdsLoading(newIdsLoading);
        }
        if (queryClient.getQueryData('message list')) {
          queryClient.setQueryData('message list', (oldData) => {
            const newMessageList = [...oldData].filter((data) => data.friendId != friendId);
            newMessageList.unshift({
              friendId,
              content: msgContent,
              sender_id: meId,
              created_at: createdAt,
            });

            return newMessageList;
          });
        }
      });

      setMsgContent('');
    } else {
      Alert.alert('Không kết nối được server chat vui lòng thử lại sau!');
    }
  };

  return (
    <PrivateRoute>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LinearGradient colors={['#257afe', '#109afb', '#01b8f9']} start={[0, 1]} end={[1, 0]} style={styles.header}>
          <View style={styles.btnBack}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="md-arrow-back-outline" type="ionicon" size={24} color="#fff" />
            </TouchableOpacity>
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
          <View style={styles.messageContainer}>
            <FlatList
              data={messages}
              renderItem={renderChatItem}
              keyExtractor={(item) => item.id?.toString()}
              ListFooterComponent={() => (
                <View style={{ marginTop: 10 }}>
                  {isFetching && hasNextPage && <ActivityIndicator />}
                  {data && !hasNextPage && (
                    <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                      <Text style={{ textAlign: 'center', color: '#626262', fontSize: 16 }}>
                        Bạn đã xem hết tin nhắn
                      </Text>
                    </View>
                  )}
                </View>
              )}
              inverted
              onEndReached={({ distanceFromEnd }) => {
                if (distanceFromEnd >= 0) {
                  fetchNextPage();
                }
              }}
              onEndReachedThreshold={0.7}
            />
          </View>
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
      </KeyboardAvoidingView>
    </PrivateRoute>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexShrink: 1,
    paddingBottom: 20,
  },
  msgContent: {
    flex: 100,
    flexShrink: 1,
    fontSize: 18,
    maxHeight: 108,
  },
  messageContainer: {
    flex: 1,
    display: 'flex',
  },
});

export default Chat;
