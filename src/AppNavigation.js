import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "./screens/Home";

export default createAppContainer(
  createSwitchNavigator(
    {

      Home: Home,
    },
    {
      initialRouteName: "Home",
    }
  )
);
