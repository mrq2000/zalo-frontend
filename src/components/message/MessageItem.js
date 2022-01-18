import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { getRelativeTimeFromNow } from '../../helpers/date';
import useMe from '../../data/useMe';
import { useNavigation } from '@react-navigation/core';
import useTabBarBadge from '../../stores/useTabBarBadge';
import useUserInfo from '../../data/useUserInfo';
import { DEFAULT_AVATAR } from '../../env';

const MessageItem = ({ data }) => {
  const { data: me } = useMe();
  const { navigate } = useNavigation();
  const { message } = useTabBarBadge();
  const isUnreadMsg = message.includes(data.friendId);
  const { data: friendInfo } = useUserInfo(data.friendId);

  return (
    <TouchableOpacity
      onPress={() => {
        navigate('Chat', { friendId: data.friendId });
      }}
    >
      <View style={[styles.msgItemWrapper]}>
        <View style={styles.avatarWrapper}>
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={{ uri: data?.avatar_url || friendInfo?.avatar_url || DEFAULT_AVATAR }}
          />
        </View>
        <View style={styles.bodyWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={[styles.username, isUnreadMsg && styles.textUnread]} numberOfLines={1}>
              {data.full_name || friendInfo?.full_name || '...'}
            </Text>
            <Text style={styles.msgTime}>{getRelativeTimeFromNow(data.created_at)}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <Text style={[styles.lastMsgContent, isUnreadMsg && styles.textUnread]} numberOfLines={1}>
              {me?.id == data.sender_id && 'Bạn: '}
              {data.content}
            </Text>
            {isUnreadMsg && <Text style={styles.markUnread}>N</Text>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  msgItemWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexSpace: {
    flex: 1,
  },
  // avatar, margin vertical 15
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#d9d9d9',
    marginVertical: 15,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  // body, padding vertical 15
  bodyWrapper: {
    flex: 1,
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingRight: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: '600',
    fontSize: 16,
    flexShrink: 1,
  },
  msgTime: {
    fontWeight: '600',
    fontSize: 12,
    color: '#888',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMsgContent: {
    fontWeight: '600',
    fontSize: 14,
    color: '#888',
  },
  markUnread: {
    fontWeight: '700',
    fontSize: 10,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    color: '#fff',
    backgroundColor: '#f00',
  },
  textUnread: {
    fontWeight: '700',
    color: '#000',
  },
});

export default MessageItem;
