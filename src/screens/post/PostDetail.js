import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import PrivateRoute from '../../components/layout/PrivateScreen';
import { Avatar, Icon } from 'react-native-elements';
import { useMutation, useQueryClient } from 'react-query';
import dayjs from 'dayjs';

import PostItem from '../../components/post/PostItem';

import usePostInfo from '../../data/usePostInfo';
import useMe from '../../data/useMe';
import { getRelativeTimeFromNow } from '../../helpers/date';
import { api } from '../../helpers/api';

const PostDetail = () => {
  const route = useRoute();
  const { data: me } = useMe();
  const postId = route?.params?.postId || 24;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [msgContent, setMsgContent] = useState('');

  const { data, isLoading } = usePostInfo(postId);
  const isMyPost = me?.id == data?.author?.id;

  const { mutate: handleComment, isLoading: loadingAddComment } = useMutation(
    async () => {
      const res = await api.post('/posts/comment', {
        postId,
        described: msgContent,
      });

      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('posts');
        setMsgContent('');
        queryClient.setQueryData(['post-info', postId], (oldData) => {
          const newComment = {
            ...data.data,
            created_at: dayjs(),
            author: {
              ...me,
            },
          };
          return {
            ...oldData,
            postInfo: { ...oldData.postInfo, comment_count: oldData.postInfo.comment_count + 1 },
            comments: [newComment, ...oldData.comments],
          };
        });
      },
      onError: (err) => {
        Alert.alert('Có lỗi xảy ra vui lòng thử lại sau');
      },
    },
  );

  return (
    <PrivateRoute>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 15,
            top: 15,
            zIndex: 10000,
            backgroundColor: '#00b4d8',
            borderRadius: '100%',
            opacity: 0.5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="md-arrow-back-outline" type="ionicon" size={30} color="#fff" />
        </TouchableOpacity>

        {isLoading && <ActivityIndicator style={{ marginTop: 20, flex: 1, display: 'flex' }} />}

        {data && (
          <ScrollView style={{ flex: 1, display: 'flex' }}>
            <PostItem data={data.postInfo} />
            <View style={{ marginVertical: 10, flex: 1, display: 'flex' }}>
              {data?.comments.map((comment) => (
                <View
                  style={{
                    display: 'flex',
                    marginVertical: 10,
                    marginHorizontal: 15,
                    padding: 10,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    flex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (!isMyPost) {
                        navigation.navigate('UserAccount', { userId: comment?.author?.id });
                      }
                    }}
                    style={styles.headerAvatarWrapper}
                  >
                    <Image
                      style={styles.avatar}
                      resizeMode="cover"
                      source={{ uri: comment?.author?.avatar_url || DEFAULT_AVATAR }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (!isMyPost) {
                        navigation.navigate('UserAccount', { userId: comment?.author?.id });
                      }
                    }}
                    style={styles.headerInfoWrapper}
                  >
                    <Text style={styles.userInfo}>
                      <Text style={styles.userName}>{comment?.author?.full_name}</Text>
                    </Text>
                    <Text>{comment?.described}</Text>
                    <Text style={styles.timeInfo}>{getRelativeTimeFromNow(comment.created_at)}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={{ textAlign: 'center', color: '#888', marginBottom: 20 }}>Bạn đã xem hết bình luận</Text>
          </ScrollView>
        )}

        <View style={styles.footerComment}>
          <TextInput
            style={styles.msgContent}
            placeholder="Bình luận"
            blurOnSubmit={true}
            multiline={true}
            maxLength={1000}
            value={msgContent}
            onChangeText={(text) => setMsgContent(text)}
          />

          {(msgContent == null || msgContent == '') && (
            <View style={{ flexDirection: 'row' }}>
              <Icon name="camera-outline" type="ionicon" size={28} color="#555" style={{ marginRight: 5 }} />
              <Icon name="image-outline" type="ionicon" size={28} color="#555" />
            </View>
          )}

          {msgContent != null && msgContent != '' && (
            <View>
              <Icon
                name="send"
                type="ionicon"
                size={24}
                disabled={loadingAddComment}
                color="#0086fe"
                onPress={() => handleComment()}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </PrivateRoute>
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

  footerComment: {
    borderTopColor: '#d9d9d9',
    borderTopWidth: 1,
    backgroundColor: '#f5f5f5',
    elevation: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexShrink: 1,
    paddingBottom: 20,
  },
  msgContent: {
    flex: 100,
    flexShrink: 1,
    fontSize: 18,
    maxHeight: 108,
  },
  messageContainer: {
    flex: 1,
    display: 'flex',
  },
});

export default PostDetail;
