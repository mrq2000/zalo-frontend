import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useInfiniteQuery } from 'react-query';

import SearchBar from '../../components/layout/SearchBar';
import FriendRequestItem from '../../components/notification/FriendRequestItem';
import notificationEnum from '../../enums/notification';
import { api } from '../../helpers/api';

const COUNT = 12;

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const {
    data: notificationData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'notifications',
    async ({ pageParam = '' }) => {
      const response = await api.get('/notifications', {
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
    if (notificationData) {
      let newNotifications = [];
      notificationData.pages.forEach((page) => {
        newNotifications = [...newNotifications, ...page];
      });

      setNotifications(newNotifications);
    }
  }, [notificationData]);

  const renderItem = (item) => {
    if (item.status == notificationEnum.FRIEND_REQUEST) {
      return <FriendRequestItem data={item} />
    }
    return <></>;
  }

  return (
    <View>
      <SearchBar />

      <FlatList
        style={{ flexGrow: 0 }}
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={item.id} style={{ backgroundColor: '#fff', marginBottom: 15 }}>
            {renderItem(item)}
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
            {notificationData && !hasNextPage && (
              <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                <Text style={{ textAlign: 'center', color: '#626262', fontSize: 16 }}>Bạn đã xem hết thông báo</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Notification;
