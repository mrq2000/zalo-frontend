import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const NotificationItem = ({ data }) => {
  return (
    <View>
      <View style={styles.bodyWrapper}>
        <View style={styles.avatarWrapper}>
          <Image style={styles.avatar} resizeMode="cover" source={{ uri: data.user.avatar }} />
        </View>
        <View>
          <Text style={[styles.username]} numberOfLines={1}>
            {data.user.username} {data.activity.content}
          </Text>
          <Text style={styles.msgTime}>{data.activity.created_time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexSpace: {
    flex: 1,
  },
  // avatar, margin vertical 15
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#d9d9d9',
    marginHorizontal: 10,
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
    flexDirection: 'row',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 16,
    flexShrink: 1,
  },
  msgTime: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 12,
    color: '#888',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default NotificationItem;
