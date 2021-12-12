import React from 'react';
import { useQuery } from 'react-query';
import { FlatList, View, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';

import { api } from '../../helpers/api';
import PostItem from '../../components/post/PostItem';
import useMe from '../../data/useMe';
import { useNavigation } from '@react-navigation/core';

const PostList = () => {
  const navigation = useNavigation();
  const { data, error, isLoading } = useQuery(
    ['posts'],
    async () => {
      const response = await api.get('/posts', {
        params: {
          count: 12,
        },
      });

      return response.data;
    },
    {
      cacheTime: 300000,
      staleTime: 300000,
    },
  );

  const { data: me } = useMe();

  if (error) return <Text>Something error</Text>;

  return (
    <>
      <FlatList
        style={{ flexGrow: 0 }}
        data={data ? data.data : []}
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
                source={require('../../assets/defaultAvatar.jpeg')}
              />

              <Text style={{ color: '#888' }}>Hôm nay của bạn thế nào ?</Text>
            </View>
          </TouchableOpacity>
        }
        renderItem={({ item, index, separators }) => (
          <View key={item.id} style={{ backgroundColor: '#fff', marginBottom: 15 }}>
            <PostItem key={index} data={item} />
          </View>
        )}
      />

      {isLoading && <ActivityIndicator style={{ marginTop: 20, marginBottom: 20 }} />}
    </>
  );
};

export default PostList;
