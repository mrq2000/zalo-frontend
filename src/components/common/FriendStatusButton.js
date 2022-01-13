import React from 'react';
import { Button, Text, Icon } from 'react-native-elements';

import friendRequestStatus from '../../enums/friendRequestStatus';

const FriendStatusButton = ({ meSend, meRecive }) => {
  if (meRecive?.status == friendRequestStatus.ACCEPTED) {
    return <Text style={{ color: '#0000008a' }}>Bạn Bè</Text>;
  }

  if (meRecive?.status == friendRequestStatus.REQUEST) {
    return <Button titleStyle={{ fontSize: 12 }} title="Chấp nhận" />;
  }

  if (meSend?.status == friendRequestStatus.ACCEPTED) {
    return <Text style={{ color: '#0000008a' }}>Bạn Bè</Text>;
  }

  if (meSend?.status == friendRequestStatus.REQUEST) {
    return <Button titleStyle={{ fontSize: 12 }} title="Hủy yêu cầu kết bạn" />;
  }

  return <Icon name="user-plus" type="font-awesome" color="#0000008a" />;
};

export default FriendStatusButton;
