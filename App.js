import React from 'react';
import HomeContainer from './src/containers/HomeContainer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { STYLES } from './src/constants';
import DayItemDetailsScreen from './src/components/DayItemDetailsScreen';
import AddItemForm from './src/components/AddItemForm';
import { ConfigureStore } from './src/store';

const store = ConfigureStore();
export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </PaperProvider>
  );
}


const MainStack = createStackNavigator(
  {
    Home: HomeContainer,
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
