import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "./screens/Home";
import Intro from "./screens/Intro";

export default createAppContainer(
  createSwitchNavigator(
    {

      Home: Home,
      Intro: Intro
    },
    {
      initialRouteName: "Intro",
    }
  )
);
