/* eslint-disable prettier/prettier */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './screens/Home';
import AddPost from './screens/post/AddPost';
import SignIn from './screens/SignIn';
import Search from './screens/search/Search';
import Chat from './screens/message/Chat';
import Message from './screens/message/Message';
import ChatOption from './screens/message/ChatOption';

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: Home,
      SignIn: SignIn,
      AddPost: AddPost,
<<<<<<< HEAD
      SignUp: SignUp,
    },
    {
      initialRouteName: 'SignUp',
=======
      Search: Search,
      Chat: Chat,
      Message: Message,
      ChatOption: ChatOption
    },
    {
      initialRouteName: 'Chat',
>>>>>>> 0596f4b4c26d6d9d79e1f69ea2945752c00dfe13
    },
  ),
);
