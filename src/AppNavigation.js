import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { useQueryClient } from 'react-query';

import AddPost from './screens/post/AddPost';
import ImageBrowser from './screens/post/ImageBrowserScreen';
import PostList from './screens/post/PostList';
import PostDetail from './screens/post/PostDetail';

import SignIn from './screens/auth/SignIn';
import SignUp from './screens/auth/SignUp';
import AuthIntro from './screens/auth/AuthIntro';

import Message from './screens/message/Message';
import Chat from './screens/message/Chat';

import Notification from './screens/notification';

import Account from './screens/account/Account';
import UserAccount from './screens/account/UserAccount';

import Search from './screens/search/Search';

import useTabBarBadge from './stores/useTabBarBadge';
import useSocket from './stores/useSocket';
import dayjs from 'dayjs';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeNavigator = () => {
  const { message, postList, account, setTabBarBadge, notification } = useTabBarBadge();
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const TABS = [
    { label: 'Tin nhắn', icon: 'commenting-o', component: Message, name: 'Message', tabBarBadge: message.length },
    { label: 'Nhật ký', icon: 'home', component: PostList, name: 'PostList', tabBarBadge: postList },
    { label: 'Thông báo', icon: 'bell-o', component: Notification, name: 'Notification', tabBarBadge: notification },
    { label: 'Cá nhân', icon: 'user-o', component: Account, name: 'Account', tabBarBadge: account },
  ];

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', async (senderId, data) => {
        const newMessage = [...message];
        if (!message.includes(senderId)) {
          newMessage.push(senderId);
        }
        setTabBarBadge({ message: newMessage });
        const newData = {
          ...data,
          created_at: dayjs(),
        };
        if (queryClient.getQueryData(['message friends', senderId])) {
          queryClient.setQueryData(['message friends', senderId], (oldData) => {
            if (oldData) {
              return {
                ...oldData,
                pages: [
                  {
                    messages: [newData],
                  },
                  ...oldData.pages,
                ],
              };
            }

            return oldData;
          });
        }

        if (queryClient.getQueryData('message list')) {
          queryClient.setQueryData('message list', (oldData) => {
            const newMessageList = [...oldData].filter((data) => data.friendId != senderId);
            newMessageList.unshift({
              friendId: senderId,
              ...newData,
            });

            return newMessageList;
          });
        }
      });

      socket.on('acceptFriendRequest', async (senderId) => {
        setTabBarBadge({ notification: notification + 1 });
        queryClient.invalidateQueries('notifications');
        queryClient.invalidateQueries('posts');
      });

      socket.on('newFriendRequest', async (senderId) => {
        setTabBarBadge({ notification: notification + 1 });
        queryClient.invalidateQueries('notifications');
        queryClient.invalidateQueries('posts');
      });
    }
  }, [socket]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="PostList"
      activeColor="#1C86EE"
      inactiveColor="#607B8B"
      barStyle={{ backgroundColor: '#fff' }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name={tab.icon} type="font-awesome" color={focused ? '#1C86EE' : '#607B8B'} />
            ),
            tabBarLabel: tab.label,
            tabBarBadge: tab.tabBarBadge || false,
          }}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="UserAccount" component={UserAccount} />

        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="AddPost" component={AddPost} />

        <Stack.Screen
          name="ImageBrowser"
          component={ImageBrowser}
          headerShown={true}
          options={{
            title: 'Selected 0 files',
            headerShown: true,
          }}
        />

        <Stack.Screen name="AuthIntro" component={AuthIntro} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
