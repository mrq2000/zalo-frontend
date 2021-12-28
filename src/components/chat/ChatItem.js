import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { DEFAULT_AVATAR } from '../../env';
import { getRelativeTimeFromNow } from '../../helpers/date';

const ChatItem = ({ type, showDate, showAvatar, msgData, avatar_url, isLoading }) => {
  switch (type) {
    case 1:
      return (
        <View>
          {showDate && <Text style={styles.txtTimeFullDisplay}>{getRelativeTimeFromNow(msgData.created_at)}</Text>}
          <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
            {isLoading && <ActivityIndicator size="small" />}
            <View style={[styles.msgWrapper, styles.sentMsg, isLoading && styles.isLoadingSend]}>
              <Text style={styles.msgContent}>{msgData?.content}</Text>
            </View>
          </View>
        </View>
      );
    case 2:
      return (
        <View>
          {showDate && <Text style={styles.txtTimeFullDisplay}>{getRelativeTimeFromNow(msgData.created_at)}</Text>}
          <View style={styles.container}>
            <View style={styles.avatarWrapper}>
              {showAvatar && (
                <Image style={styles.avatar} resizeMode="cover" source={{ uri: avatar_url || DEFAULT_AVATAR }} />
              )}
            </View>
            <View style={[styles.msgWrapper, styles.receivedMsg]}>
              <Text style={styles.msgContent}>{msgData?.content}</Text>
            </View>
          </View>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  msgWrapper: {
    maxWidth: '70%',
    minWidth: 80,
    borderRadius: 10,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  sentMsg: {
    backgroundColor: '#d4f1ff',
    borderColor: '#ccdce4',
    borderWidth: 1,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  receivedMsg: {
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  msgContent: {
    fontSize: 16,
  },
  msgCreatedTime: {
    color: '#888',
    marginTop: 3,
  },
  container: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  avatarWrapper: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 5,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  txtTimeFullDisplay: {
    backgroundColor: '#b4b9bd',
    color: '#fff',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 15,
    alignSelf: 'center',
  },
  flexSpace: {
    flex: 1,
  },
  isLoadingSend: {
    opacity: 0.6,
    marginLeft: 10,
  },
});

export default ChatItem;
