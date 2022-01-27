import React, { Component } from 'react'
import TabNavigation from './src/BottomTabNavigation/TabNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/storeConfig";

class App extends Component {

  render() {
    return (
      <AppRouteFlow />
    )
  }
}
export default App;


// import CreditScreen from '../CreditScreen'
import SpendingLimit from './src/SpendingLimit';
const AppRoute = createStackNavigator();

function AppRouteFlow() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRoute.Navigator>
          <AppRoute.Screen name="TabBar" component={TabNavigation} options={{ headerShown: false }} />
          <AppRoute.Screen name="SpendingLimit" component={SpendingLimit} options={{ headerShown: false }} />
        </AppRoute.Navigator>
      </NavigationContainer>
    </Provider>
  );
}