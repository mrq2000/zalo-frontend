import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, StatusBar, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
const convertTimeToHHMM = (time) => {
  if(!time) {
    return null;
  }
  let hour = time.getHours();
  let minute = time.getMinutes();
  return `${hour}:${minute}`;
}

const convertTimeToFullDisplay = (time) => {
  if(!time) {
    return null;
  }
  let day = time.getDate();
  day = day < 10 ? `0${day}` : day;

  let month = time.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let year = time.getFullYear();

  let hour = time.getHours();
  let minute = time.getMinutes();

  return `${hour}:${minute}, ${day}/${month}/${year}`;
}
const ChatItem = ({type, showDate, showAvatar, msgData}) => {
  switch(type) {
    case 1: 
      return (
        <View>
          {showDate && <Text style={styles.txtTimeFullDisplay}>{convertTimeToFullDisplay(msgData.created)}</Text>}
          <View style={[styles.msgWrapper, styles.sentMsg]}>
            <Text style={styles.msgContent}>{msgData.message}</Text>
            <Text style={styles.msgCreatedTime}>{convertTimeToHHMM(msgData.created)}</Text>
          </View>
        </View>
        
      );
    case 2: 
    return (
      <View>
        {showDate && <Text style={styles.txtTimeFullDisplay}>{convertTimeToFullDisplay(msgData.created)}</Text>}
        <View style={styles.container}>
          <View style={styles.avatarWrapper}>
          {showAvatar && <Image 
              style={styles.avatar}
              resizeMode='cover'
              source={{ uri: msgData.sender.avatar }}
            />}
          </View>
          <View style={[styles.msgWrapper, styles.receivedMsg]}>
            <Text style={styles.msgContent}>{msgData.message}</Text>
            <Text style={styles.msgCreatedTime}>{convertTimeToHHMM(msgData.created)}</Text>
          </View>
        </View>
      </View>
    );
  }
  

}

const styles = StyleSheet.create({
  msgWrapper: {
    maxWidth: '70%',
    minWidth: 80,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 4,
    borderRadius: 10,
    marginVertical: 2,
  },
  sentMsg: {
    backgroundColor: '#d4f1ff',
    borderColor: '#ccdce4',
    borderWidth: 1,
    alignSelf: 'flex-end',
    marginRight: 10
  },
  receivedMsg: {
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    alignSelf: 'flex-start'
  },
  msgContent: {
    fontSize: 16
  },  
  msgCreatedTime: {
    color: '#888',
    marginTop: 3,
  },
  container: {
    flexDirection: 'row',
    marginLeft: 10
  },  
  avatarWrapper: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 5,
    alignSelf: 'flex-start'
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
    alignSelf: 'center'
  },
  flexSpace: {
    flex: 1
  }, 
});

export default ChatItem;