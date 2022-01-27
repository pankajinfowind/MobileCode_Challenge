import React,{Component} from 'react';
import { View, Text, Image } from 'react-native'
import DebitCardScreen from '../DebitCardScreen'
import HomeScreen from '../HomeScreen'
import PaymentsScreen from '../PaymentsScreen'

import ProfileScreen from '../ProfileScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
class TabNavigation extends Component {

    render() {
  
      return (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}
            options={{
                headerShown:false,
                tabBarLabel: 'Home',
                
                tabBarIcon: ({ focused, route }) => {
                    
                    return (
                        <Image source={require('../../assets/images/Home/Home.png')} >
                        </Image>
                    )
                }
              }}
            />
            <Tab.Screen name="Debit Card" component={DebitCardScreen}
            options={{
              headerShown:false,
              tabBarLabel: 'Debit Card',
              tabBarLabelStyle:{color:'green'},
              tabBarIcon: ({ focused, route }) => {
                  // const image = focused ? require('../../../assets/images/TabBarIcon/ic_studio_selected.png')
                  //     : require('../../../assets/images/TabBarIcon/ic_studio_unselected.png')
                  return (
                      <Image source={require('../../assets/images/pay/pay.png')} >
                      </Image>
                  )
              }
            }}
            
            />
            <Tab.Screen name="Payments" component={PaymentsScreen} 
            options={{
                headerShown:false,
                tabBarLabel: 'Payments',
                
                tabBarIcon: ({ focused, route }) => {
                    
                    return (
                        <Image source={require('../../assets/images/payment/payment.png')} >
                        </Image>
                    )
                }
              }}
            />
            <Tab.Screen name="Credits" component={CreditScreen} 
            options={{
                headerShown:false,
                tabBarLabel: 'Credits',
                
                tabBarIcon: ({ focused, route }) => {
                    
                    return (
                        <Image source={require('../../assets/images/Credit/Credit.png')} >
                        </Image>
                    )
                }
              }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                headerShown:false,
                tabBarLabel: 'Profile',
                
                tabBarIcon: ({ focused, route }) => {
                    
                    return (
                        <Image source={require('../../assets/images/userProfile/user.png')} >
                        </Image>
                    )
                }
              }}
            />
          </Tab.Navigator>
      )
    }
  }
  export default TabNavigation;

  import CreditScreen from '../CreditScreen'
  // import SpendingLimit from '../SpendingLimit';
  // const HomeStack = createStackNavigator();

  // function HomeStackScreen() {
  //   return (
  //     <HomeStack.Navigator>
  //      <HomeStack.Screen name="Debit Card" component={DebitCardScreen} /> 
  //      <HomeStack.Screen name="SpendingLimit" component={SpendingLimit} />
  //     </HomeStack.Navigator>
  //    );
  //  }
   