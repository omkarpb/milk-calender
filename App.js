import React from 'react';
import HomeScreen from './src/HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import {STYLES} from './src/constants';
import DayItemDetailsScreen from './src/components/DayItemDetailsScreen';
import AddItemForm from './src/components/AddItemForm';

export default function App() {
  return (
    <PaperProvider>
      <AppContainer />
    </PaperProvider>
  );
}


const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    DayItemDetails: DayItemDetailsScreen,
    AddItemForm: AddItemForm
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

// const rootStack = createStackNavigator(
//   {
//     Main: {
//       screen: MainStack,
//     },
//     DayItemDetailsModal: {
//       screen: DayItemDetailsModalScreen,
//     },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//   }
// )
const AppContainer = createAppContainer(MainStack);
