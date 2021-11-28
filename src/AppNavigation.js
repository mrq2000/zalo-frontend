/* eslint-disable prettier/prettier */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './screens/Home';
import AddPost from './screens/post/AddPost';
import SignIn from './screens/SignIn';
import Search from './screens/search/Search';
import Account from './screens/account/Account';
import AccountSetting from './screens/account/AccountSetting';

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: Home,
      SignIn: SignIn,
      AddPost: AddPost,
      Search: Search,
      Account: Account,
      AccountSetting: AccountSetting
    },
    {
      initialRouteName: 'Account',
    },
  ),
);
