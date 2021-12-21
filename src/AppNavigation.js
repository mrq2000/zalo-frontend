import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';

import Home from './screens/Home';
import AddPost from './screens/post/AddPost';
import ImageBrowser from './screens/post/ImageBrowserScreen';

import SignIn from './screens/auth/SignIn';
import SignUp from './screens/auth/SignUp';
import AuthIntro from './screens/auth/AuthIntro';
import PostList from './screens/post/PostList';
import Message from './screens/message/Message';
import Chat from './screens/message/Chat';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TABS = [
  { label: 'Tin nhắn', icon: 'commenting-o', component: Chat, name: 'Message' },
  { label: 'Nhật ký', icon: 'home', component: PostList, name: 'PostList' },
  { label: 'Cá nhân', icon: 'user-o', component: Home, name: 'Account' },
];

const HomeNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Message"
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
        }}
        name={tab.name}
        component={tab.component}
      />
    ))}
  </Tab.Navigator>
);

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
