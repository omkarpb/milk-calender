import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {STYLES} from './src/constants';
import DayItemDetailsModalScreen from './src/components/DayItemDetailsModalScreen';

export default function App() {
  return (
    <AppContainer />
  );
}


const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: STYLES.themeColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
      },
      headerTitleAlign: 'center'
    },
  }
);

const rootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    DayItemDetailsModal: {
      screen: DayItemDetailsModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)
const AppContainer = createAppContainer(rootStack);
