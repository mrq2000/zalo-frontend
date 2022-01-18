import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Button, Text } from 'react-native-elements';
import { useQueryClient } from 'react-query';

import friendRequestStatus from '../../enums/friendRequestStatus';
import useSocket from '../../stores/useSocket';

const FriendStatusButton = ({ meSend, meRecive, friendId }) => {
  const { socket } = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const client = useQueryClient();

  const resetPage = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    client.invalidateQueries(['user-full-info', friendId]);
  };

  const handleAcceptRequest = () => {
    setIsLoading(true);
    socket.emit('acceptFriendRequest', friendId, (status) => {
      if (!status) {
        console.log(status);
      } else {
        resetPage();
      }
      setIsLoading(false);
    });
  };

  const handleAddFriend = () => {
    setIsLoading(true);
    socket.emit('newFriendRequest', friendId, (status) => {
      if (!status) {
        console.log(status);
      } else {
        resetPage();
      }
      setIsLoading(false);
    });
  };

  if (meRecive?.status == friendRequestStatus.ACCEPTED) {
    return <Text style={{ color: '#0000008a' }}>Bạn Bè</Text>;
  }

  if (meRecive?.status == friendRequestStatus.REQUEST) {
    return (
      <Button
        titleStyle={{ fontSize: 12 }}
        title="Chấp nhận"
        disabled={isLoading}
        onPress={() => handleAcceptRequest()}
      />
    );
  }

  if (meSend?.status == friendRequestStatus.ACCEPTED) {
    return <Text style={{ color: '#0000008a' }}>Bạn Bè</Text>;
  }

  if (meSend?.status == friendRequestStatus.REQUEST) {
    return <Button titleStyle={{ fontSize: 12 }} title="Hủy yêu cầu kết bạn" />;
  }

  return (
    <TouchableOpacity onPress={handleAddFriend} disabled={isLoading}>
      <Icon name="user-plus" type="font-awesome" color="#0000008a" />
    </TouchableOpacity>
  );
};

export default FriendStatusButton;
