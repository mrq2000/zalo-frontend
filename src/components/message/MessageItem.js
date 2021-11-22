import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, StatusBar, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const MessageItem = ({data}) => {
  
  if(!data || !data.partner || !data.lastmessage) {
    console.log(data);
    return <View style={{ backgroundColor: 'orange', height: 40, width: 40}}></View>
  }
  const isUnreadMsg = (data.lastmessage.unread == 1);
  return (
    <View style={styles.msgItemWrapper}>
      <View style={styles.avatarWrapper}>
          <Image 
            style={styles.avatar}
            resizeMode='cover'
            source={{ uri: data.partner.avatar }}
          />
      </View>
      <View style={styles.bodyWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={[styles.username, isUnreadMsg && styles.textUnread]} numberOfLines={1}>{data.partner.username}</Text>
            <Text style={styles.msgTime}>{data.lastmessage.created}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <Text style={[styles.lastMsgContent, isUnreadMsg && styles.textUnread]} numberOfLines={1}>{data.lastmessage.message}</Text>
            {isUnreadMsg && <Text style={styles.markUnread}>N</Text>}
          </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  msgItemWrapper: {
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
  },
  flexSpace: {
    flex: 1
  },  
  // avatar, margin vertical 15
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#d9d9d9',
    marginVertical: 15,
    marginHorizontal: 10,
    alignSelf: 'flex-start'
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
    paddingRight: 10
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  } ,
  username: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 16,
    flexShrink: 1
  },
  msgTime: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 12,
    color: '#b5b5b5',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },  
  lastMsgContent: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 14,
    color: '#b5b5b5',
  },
  markUnread: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 10,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    color: '#fff',
    backgroundColor: '#f00'
  },
  textUnread: {
    fontWeight: '700',
    color: '#000',
  }
});

export default MessageItem;