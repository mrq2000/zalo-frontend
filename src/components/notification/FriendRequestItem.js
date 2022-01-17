import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import useUserInfo from '../../data/useUserInfo';
import { DEFAULT_AVATAR } from '../../env';
import { getLocalizedFormat } from '../../helpers/date';

const FriendRequestItem = ({ data }) => {
  const { data: userInfo, isFetching, isError } = useUserInfo(data.content);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('UserAccount', { userId: data.content })}>
      <ListItem containerStyle={styles.listItem} key={data.id} bottomDivider={false}>
        <Avatar rounded source={{ uri: userInfo?.avatar_url || DEFAULT_AVATAR }} />
        <ListItem.Content style={{ display: 'flex', flex: 4 }}>
          <ListItem.Title style={{ fontWeight: 'bold' }}>{userInfo?.full_name}</ListItem.Title>
          <ListItem.Subtitle style={{ color: '#626262' }}>Đã gửi cho bạn lời mời kết bạn</ListItem.Subtitle>
        </ListItem.Content>

        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <ListItem.Subtitle style={{ color: '#626262' }}>{getLocalizedFormat(data.created_at)}</ListItem.Subtitle>
        </View>
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    position: 'relative',
  },
});

export default FriendRequestItem;
