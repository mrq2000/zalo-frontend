import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View, Image, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import useMe from '../../data/useMe';
import { DEFAULT_AVATAR } from '../../env';
import { getRelativeTimeFromNow } from '../../helpers/date';

import ImageGridLayout from './ImageGridLayout';
import LikePost from './LikePost';

const PostItem = ({ data }) => {
  const { data: me } = useMe();
  const isMyPost = me?.id == data?.author?.id;
  const navigation = useNavigation();

  return (
    <View style={styles.postItemWrapper}>
      <StatusBar barStyle="default" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (!isMyPost) {
              navigation.navigate('UserAccount', { userId: data?.author?.id });
            }
          }}
          style={styles.headerAvatarWrapper}
        >
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={{ uri: (isMyPost ? me.avatar_url : data?.author?.avatar_url) || DEFAULT_AVATAR }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (!isMyPost) {
              navigation.navigate('UserAccount', { userId: data?.author?.id });
            }
          }}
          style={styles.headerInfoWrapper}
        >
          <Text style={styles.userInfo}>
            <Text style={styles.userName}>{isMyPost ? me.full_name : data?.author?.full_name}</Text>
          </Text>
          <Text style={styles.timeInfo}>{getRelativeTimeFromNow(data.created_at)}</Text>
        </TouchableOpacity>

        <View style={styles.flexSpace} />

        <View style={styles.headerOptionWrapper}>
          {isMyPost && <Icon name="dots-three-horizontal" type="entypo" size={20} color="#888" onPress={() => {}} />}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyText}>{data?.described}</Text>

        {data?.image && <ImageGridLayout data={JSON.parse(data.image)} />}
      </View>

      <View style={styles.footer}>
        <LikePost
          postId={data?.id}
          likeNumDefault={data?.like_count}
          isLikedDefault={data?.meLike?.user_exists == 'true'}
        />

        <View style={styles.footerActionWrapper}>
          <Icon
            name="comment-processing-outline"
            type="material-community"
            size={26}
            color="#888"
            onPress={() => {
              navigation.navigate('PostDetail', { postId: data?.id });
            }}
          />
          <Text style={styles.actionNum}>{data?.comment_count}</Text>
        </View>
        <View style={styles.flexSpace} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postItemWrapper: {
    width: '100%',
    borderColor: '#d9d9d9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 15,
  },
  headerAvatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginRight: 15,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  headerInfoWrapper: {
    marginRight: 15,
    flexShrink: 1,
  },
  userName: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
  },
  headerOptionWrapper: {
    alignSelf: 'flex-start',
  },
  timeInfo: {
    marginTop: 6,
    color: '#888',
    fontSize: 13,
  },
  body: {
    paddingHorizontal: 15,
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
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
  seeLikes: {
    fontWeight: '700',
    fontSize: 14,
    color: '#888',
  },
});

export default PostItem;
