import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Dimensions, View } from "react-native";
import { clearStore } from "../store/actions/SaveAsync";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import RiskScreen from "../containers/RiskCalculatorScreen";
import ChooseScreen from "../containers/ChooseUserScreen";
import AuthScreen from "../containers/AuthScreen";
import Drawer from "../components/drawer/Drawer";
import CreateUserScreen from "../containers/CreateUserScreen";
import indexScreen from "../containers/indexScreen";
import ChooseIndexUser from "../containers/chooseIndexUser";
import ResultScreen from "../containers/ResultScreen";
// import {AntDesign} from '@expo/vector-icons';
import { AsyncStorage } from "react-native";
import DashboardScreen from "../containers/DashboardScreen";

async function handleSignOut() {
  const dispatch = useDispatch();
  dispatch(clearStore());
  window.location.reload();
}

const HomeNavigator = createStackNavigator({
  Home: {
    screen: RiskScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Result: {
    screen: ResultScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});
const DashboardNavigator = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});
const AuthNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});
const CreateUserNavigator = createStackNavigator({
  userCreate: {
    screen: CreateUserScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});

const chooseUserNavigator = createStackNavigator({
  Change_User: {
    screen: ChooseScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});
const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
    "Change User": chooseUserNavigator,
    "Sign Out": () => {
      handleSignOut();
      return <View></View>;
    }
  },
  {
    contentComponent: Drawer,
    drawerWidth: Math.round(Dimensions.get("window").width * 0.7),
    drawerPosition: "right"
  }
);
const MainNavigator = createSwitchNavigator({
  index: indexScreen,
  auth: AuthNavigator,
  dashboard: DashboardNavigator,
  chooseIndexUserScreen: ChooseIndexUser,
  home: MyDrawerNavigator,
  create: CreateUserNavigator
});

export default createAppContainer(MainNavigator);
