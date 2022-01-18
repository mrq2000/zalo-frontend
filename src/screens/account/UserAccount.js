/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StyleSheet, View, Text, ImageBackground, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

import { api } from '../../helpers/api';
import { Avatar, Icon } from 'react-native-elements';

import useUserFullInfo from '../../data/useUserFullInfo';
import { DEFAULT_AVATAR } from '../../env';
import PostItem from '../../components/post/PostItem';
import FriendStatusButton from '../../components/common/FriendStatusButton';
import PrivateRoute from '../../components/layout/PrivateScreen';

const COUNT = 12;

const UserAccount = () => {
  const route = useRoute();
  const userId = route.params?.userId || 5;

  const { data, isLoading } = useUserFullInfo(userId);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const { data: postsData, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['userPost', userId],
    async ({ pageParam = '' }) => {
      const response = await api.get(`/users/${userId}/posts`, {
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

  useEffect(() => {
    if (postsData) {
      let newPosts = [];
      postsData.pages.forEach((page) => {
        newPosts = [...newPosts, ...page];
      });

      setPosts(newPosts);
    }
  }, [postsData]);

  if (!userId) return <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} />;

  return (
    <PrivateRoute>
      <TouchableOpacity
        style={{ position: 'absolute', left: 15, top: 15, zIndex: 10000, backgroundColor: '#00b4d8', borderRadius: '100%', opacity: 0.5 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="md-arrow-back-outline" type="ionicon" size={30} color="#fff" />
      </TouchableOpacity>

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
                  <ImageBackground
                    style={styles.coverImage}
                    source={require('../../assets/black-pink.jpg')}
                  />
                  <Avatar
                    rounded
                    size={120}
                    containerStyle={styles.avatar}
                    source={{ uri: data?.avatar_url || DEFAULT_AVATAR }}
                  />
                </View>
                
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
                  {data?.full_name}
                </Text>
            
                <View style={{ marginVertical: 10, display: 'flex', alignItems: 'center', flex: 1, width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
                  {!isLoading && 
                  (
                    <View style={{ marginRight: 10 }}>
                      <FriendStatusButton 
                        friendId={data?.id}
                        meRecive={data?.friendStatus?.sender_id == userId ? data?.friendStatus : null}
                        meSend={data?.friendStatus?.receiver_id == userId ? data?.friendStatus : null} />
                    </View>
                  )}

                  <TouchableOpacity
                    style={{ backgroundColor: '#00b4d8', borderRadius: '100%', padding: 5 }}
                    onPress={() => navigation.navigate('Chat', { friendId: userId })}
                  >
                    <Icon name="chatbubbles-outline" type="ionicon" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
              </>
            )}
            ListFooterComponent={() => (
              <View>
                {isFetching && hasNextPage && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} />}
                {data && !hasNextPage && (
                  <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                    <Text style={{ textAlign: 'center', color: '#626262', fontSize: 16 }}>
                      Bạn đã xem hết bài viết của {data?.full_name}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </PrivateRoute>
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

export default UserAccount;
