import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import { api } from '../../helpers/api';
import likePostType from '../../enums/likePostType';

const LikePost = ({ postId, isLikedDefault, likeNumDefault }) => {
  const [isLiked, setIsLiked] = useState(isLikedDefault);
  const [likeNum, setLikeNum] = useState(likeNumDefault);

  const { mutate: handleLike } = useMutation(
    async () => {
      setIsLiked(!isLiked);
      setLikeNum(isLiked ? likeNum - 1 : likeNum + 1);
      const res = await api.post(`/posts/${postId}/like`, {
        type: isLiked ? likePostType.UNLIKE : likePostType.LIKE,
        postId,
      });
      return res.data;
    },
    {
      onSuccess: () => {
        // console.log(22222);
      },
      onError: (e) => {
        Alert.alert('Like bài viết không thành công, vui lòng thử lại sau');
      },
    },
  );

  return (
    <View style={styles.footerActionWrapper}>
      {isLiked ? (
        <Icon name="heart" type="material-community" size={28} color="#f00" onPress={handleLike} />
      ) : (
        <Icon name="heart-outline" type="material-community" size={28} color="#888" onPress={handleLike} />
      )}
      <Text style={styles.actionNum}>{likeNum}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerActionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionNum: {
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
});

export default LikePost;
