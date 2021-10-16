import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './screens/Home';
import SignIn from './screens/SignIn';

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: Home,
      SignIn: SignIn,
    },
    {
      initialRouteName: 'SignIn',
    },
  ),
);
