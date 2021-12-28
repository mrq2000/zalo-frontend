import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { FlatList, View, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';

import { api } from '../../helpers/api';
import PostItem from '../../components/post/PostItem';
import useMe from '../../data/useMe';
import { useNavigation } from '@react-navigation/core';
import PrivateRoute from '../../components/layout/PrivateScreen';
import SearchBar from '../../components/layout/SearchBar';
import { DEFAULT_AVATAR } from '../../env';

const COUNT = 12;

const PostList = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'posts',
    async ({ pageParam = '' }) => {
      const response = await api.get('/posts', {
        params: {
          count: 12,
          last_id: pageParam,
        },
      });

      return response.data.data;
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
    if (data) {
      let newPosts = [];
      data.pages.forEach((page) => {
        newPosts = [...newPosts, ...page];
      });

      setPosts(newPosts);
    }
  }, [data]);

  const { data: me } = useMe();

  return (
    <PrivateRoute>
      <SearchBar />

      <FlatList
        style={{ flexGrow: 0 }}
        data={posts}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddPost');
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                marginBottom: 15,
                padding: 10,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                marginTop: 10,
                flexDirection: 'row',
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  borderColor: 'gray',
                  marginRight: 10,
                }}
                resizeMode="cover"
                source={{ uri: me?.avatar_url || DEFAULT_AVATAR }}
              />

              <Text style={{ color: '#888' }}>Hôm nay của bạn thế nào ?</Text>
            </View>
          </TouchableOpacity>
        }
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
        ListFooterComponent={() => (
          <View>
            {isFetching && hasNextPage && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} />}
            {data && !hasNextPage && (
              <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                <Text style={{ textAlign: 'center', color: '#626262', fontSize: 16 }}>
                  Bạn đã xem hết bài viết kết bạn để xem nhiêu bài viết hơn
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </PrivateRoute>
  );
};

export default PostList;
