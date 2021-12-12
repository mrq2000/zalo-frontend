import React from 'react';
import { StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';

import ImageGridLayout from './ImageGridLayout';
import LikePost from './LikePost';

const PostItem = ({ data }) => {
  return (
    <View style={styles.postItemWrapper}>
      <StatusBar barStyle="default" />

      <View style={styles.header}>
        <View style={styles.headerAvatarWrapper}>
          <Image style={styles.avatar} resizeMode="cover" source={require('../../assets/anh1.jpg')} />
        </View>
        <View style={styles.headerInfoWrapper}>
          <Text style={styles.userInfo}>
            <Text style={styles.userName}>{data?.author?.full_name}</Text>
          </Text>
          <Text style={styles.timeInfo}>Thứ hai lúc 12:30</Text>
        </View>

        <View style={styles.flexSpace} />

        <View style={styles.headerOptionWrapper}>
          <Icon name="dots-three-horizontal" type="entypo" size={20} color="#888" onPress={() => {}} />
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
          <Icon name="comment-processing-outline" type="material-community" size={26} color="#888" onPress={() => {}} />
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
  // header chứa avatar, tên, hành động, thời gian... bài viết
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
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 6,
  },
  seeLikes: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 14,
    color: '#888',
  },
});

export default PostItem;
