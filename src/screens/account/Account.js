/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

import { api } from '../../helpers/api';
import { StyleSheet, View, Text, ImageBackground, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

import useMe from '../../data/useMe';
import { DEFAULT_AVATAR } from '../../env';
import PostItem from '../../components/post/PostItem';
import EditFullName from '../../components/common/EditFullName';
import { clearToken } from '../../helpers/storage';

const COUNT = 12;

const Account = () => {
  const { data } = useMe();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [posts, setPosts] = useState([]);
  const [isEditName, setIsEditName] = useState(false);

  const { data: postsData, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'my-posts',
    async ({ pageParam = '' }) => {
      const response = await api.get('/my-posts', {
        params: {
          count: COUNT,
          last_id: pageParam,
        },
      });

      return response.data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length !== COUNT) {
          return false;
        } else {
          return lastPage[lastPage.length - 1].id;
        }
      },
    },
  );

  const { mutate: handleChangeAvatar, isLoading: isChangeAvatar } = useMutation(async(file) => {
    const formData = new FormData();
    formData.append('mainAvatar', {
      name: file.name,
      type: file.type,
      uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
    });
  
    const res = await api.post('/me/update-avatar', formData);
    return res.data;
  }, {
    onSuccess: ({ url }) => {
      queryClient.invalidateQueries('posts');
      queryClient.setQueryData('me', (oldData) => {
        return {
          ...oldData,
          avatar_url: url,
        };
      });
    },
    onError: (err) => {
      console.log(err);
      Alert.alert('Có lỗi xảy ra vui lòng thử lại sau');
    },
  })

  useEffect(() => {
    if (postsData) {
      let newPosts = [];
      postsData.pages.forEach((page) => {
        newPosts = [...newPosts, ...page];
      });

      setPosts(newPosts);
    }
  }, [postsData]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          style={{ flexGrow: 0, width: '100%' }}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View key={item.id} style={{ backgroundColor: '#fff', marginBottom: 15 }}>
              <PostItem key={index} data={item} />
            </View>
          )}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd >= 0) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.7}
          ListHeaderComponent={() => (
            <>
              <View style={styles.cover}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 15,
                    top: 15,
                    zIndex: 10000,
                    backgroundColor: 'red',
                    borderRadius: '100%',
                    opacity: 0.5,
                    padding: 2
                  }}
                  onPress={() => {
                    Alert.alert(
                      "Đăng xuất",
                      "Bạn có chắc chắn muốn đăng xuất",
                      [
                        {
                          text: "Hủy bỏ",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "Xác nhận", onPress: () => {
                          clearToken();
                          navigation.navigate('SignIn');
                        } }
                      ]
                    );
                  }}
                >
                  <Icon name="log-out-outline" type="ionicon" size={30} color="#fff" />
                </TouchableOpacity>

                <ImageBackground
                  style={styles.coverImage}
                  source={require('../../assets/black-pink.jpg')}
                />

                <Avatar
                  rounded
                  size={120}
                  containerStyle={[styles.avatar, { opacity: isChangeAvatar ? 0.8 : 1 }]}
                  source={{ uri: data?.avatar_url || DEFAULT_AVATAR }}
                  disabled={isChangeAvatar}
                  onPress={() => navigation.navigate('ImageBrowser', { max: 1, handleCallback: (photo) => handleChangeAvatar(photo[0]) })}
                />
              </View>

              <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20  }}>
                {isEditName 
                  ? <EditFullName dafaultFullName={data?.full_name} setIsEditName={setIsEditName} />
                  : <>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginRight: 5}}>
                        {data?.full_name}
                      </Text>

                      <Icon name="create-outline" type="ionicon" size={24} color="black" onPress={() => setIsEditName(true)} />
                    </>
                  }
              </View>
            </>
          )}
          ListFooterComponent={() => (
            <View>
              {isFetching && hasNextPage && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} />}
              {data && !hasNextPage && (
                <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                  <Text style={{ textAlign: 'center', color: '#626262', fontSize: 16 }}>
                    Bạn đã xem hết bài viết của bạn
                  </Text>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    height: 200,
    display: 'flex',
    alignItems: 'center',
    zIndex: 100,
    marginBottom: 25,
    position: 'relative',
  },
  coverImage: {
    height: 200,
    width: '100%',
  },
  avatar: {
    marginTop: -100,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: '#00b4d8'
  },
  body: {
    flex: 1,
    width: '100%',
  },
  form: {
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  label: {
    color: '#666',
    flex: 1,
    textAlignVertical: 'center',
    padding: 5,
  },
  input: {
    flex: 3,
    height: 40,
    fontWeight: '600'
  },
  inputWrapper: {
    flex: 3,
  },
  button: {
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
  }
});

export default Account;
