import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, StatusBar, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

/**
 * Lấy ra tỉ lệ ảnh
 * @param {String} imgUri uri của ảnh
 * @returns tỉ lệ chiều rộng / chiều cao
 */
const getRatio = (imgUri) => {
  try {
    Image.getSize(imgUri, (width, height) => {
      return width / height;
    });
  } catch {}
  return 1.5;
};

const imgUri = 'https://cellphones.com.vn/sforum/wp-content/uploads/2021/09/photo-1-1615870720601745881145.jpg';

const PostItem = (data) => {
  const [isLiked, setLike] = useState(false);
  const [likeNum, setLikeNum] = useState(0);

  /**
   * Xử lý ấn nút Like
   */
  const pressLike = () => {
    if (isLiked) {
      setLike(false);
      setLikeNum(likeNum - 1);
    } else {
      setLike(true);
      setLikeNum(likeNum + 1);
    }
  };

  return (
    <View style={styles.postItemWrapper}>
      <StatusBar barStyle="default" />

      <View style={styles.header}>
        <View style={styles.headerAvatarWrapper}>
          <Image style={styles.avatar} resizeMode="cover" source={require('../../assets/anh1.jpg')} />
        </View>
        <View style={styles.headerInfoWrapper}>
          <Text style={styles.userInfo}>
            <Text style={styles.userName}>Phạm Trung Hiếu</Text>
            <Text style={styles.userAction}> đã thay đổi ảnh đại diện</Text>
          </Text>
          <Text style={styles.timeInfo}>Thứ hai lúc 12:30</Text>
        </View>
        <View style={styles.flexSpace} />
        <View style={styles.headerOptionWrapper}>
          <Icon name="dots-three-horizontal" type="entypo" size={20} color="#888" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyText}>
          Hôm nay trời đẹp quá
          https://cellphones.com.vn/sforum/wp-content/uploads/2021/09/photo-1-1615870720601745881145.jpg
        </Text>
        <Image
          style={{ width: '100%', height: undefined, aspectRatio: getRatio(imgUri) }}
          resizeMode="contain"
          source={{ uri: imgUri }}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.footerActionWrapper}>
          {isLiked ? (
            <Icon name="heart" type="material-community" size={28} color="#f00" onPress={pressLike} />
          ) : (
            <Icon name="heart-outline" type="material-community" size={28} color="#888" onPress={pressLike} />
          )}
          <Text style={styles.actionNum}>{likeNum}</Text>
        </View>
        <View style={styles.footerActionWrapper}>
          <Icon name="comment-processing-outline" type="material-community" size={26} color="#888" onPress={() => {}} />
          <Text style={styles.actionNum}>18</Text>
        </View>
        <View style={styles.flexSpace} />
        {likeNum !== 0 && <Text style={styles.seeLikes}>Xem lượt thích &gt;</Text>}
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
    marginTop: 15,
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
