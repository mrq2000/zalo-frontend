/* eslint-disable prettier/prettier */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './screens/Home';
import AddPost from './screens/post/AddPost';
import SignIn from './screens/SignIn';
import Search from './screens/search/Search';
import Chat from './screens/message/Chat';
import Message from './screens/message/Message';
import ChatOption from './screens/message/ChatOption';
import Notification  from './screens/notification/Notification';

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: Home,
      SignIn: SignIn,
      AddPost: AddPost,
      Search: Search,
      Chat: Chat,
      Message: Message,
      ChatOption: ChatOption,
      Notification: Notification,
    },
    {
      initialRouteName: 'Notification',
    },
  ),
);
