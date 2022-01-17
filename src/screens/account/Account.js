/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { api } from '../../helpers/api';
import { StyleSheet, View, Text, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { Button, Avatar } from 'react-native-elements';

import useMe from '../../data/useMe';
import { DEFAULT_AVATAR } from '../../env';
import PostItem from '../../components/post/PostItem';

const COUNT = 12;

const Account = () => {
  const { data } = useMe();
  const [posts, setPosts] = useState([]);

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
