import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './screens/Home';
import AddPost from './screens/post/AddPost';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp.js';

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: Home,
      SignIn: SignIn,
      AddPost: AddPost,
      SignUp:SignUp
    },
    {
      initialRouteName: 'SignUp',
    },
  ),
);
