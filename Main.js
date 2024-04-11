import React, { Component } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Page1 from './components/Page1';
import AddGame from './components/AddGame';
import ShowGames from './components/showgames';
import ShowAllGames from './components/Showallgames';
import Screen1 from './components/Screen1';



const Tab = createBottomTabNavigator();

class Main extends Component {
  render() {
    return (
      <>
        <StatusBar animated={true} backgroundColor="#5856D6" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              display: 'flex',
              position: 'absolute',
              bottom: 20,
              left: 25,
              right: 25,
              elevation: 5,
              backgroundColor: '#5856D6',
              borderRadius: 30,
              height: 60,
            },
            tabBarShowLabel: false,
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Dashboard"
            component={Screen1}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    top: Platform.OS === 'ios' ? 10 : 0,
                  }}
                >
                  <Icon
                    name="home"
                    size={30}
                    color={focused ? 'white' : '#9594e5'}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="History"
            component={Page1}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    top: Platform.OS === 'ios' ? 10 : 0,
                  }}
                >
                  <Icon
                    name="user"
                    size={30}
                    color={focused ? 'white' : '#9594e5'}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Create"
            component={AddGame}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    top: Platform.OS === 'ios' ? -10 : -20,
                    width: Platform.OS === 'ios' ? 50 : 60,
                    height: Platform.OS === 'ios' ? 50 : 60,
                    borderRadius: Platform.OS === 'ios' ? 25 : 30,
                    backgroundColor: 'white',
                  }}
                >
                  <Icon
                    name="pluscircleo"
                    size={Platform.OS === 'ios' ? 50 : 60}
                    color={focused ? '#ff4162' : '#ff748c'}
                  />
                </View>
              ),
              tabBarIconStyle: {},
            }}
          />
          <Tab.Screen
            name="Statistics"
            component={ShowGames}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    top: Platform.OS === 'ios' ? 10 : 0,
                  }}
                >
                  <Icon
                    name="pushpino"
                    size={30}
                    color={focused ? 'white' : '#9594e5'}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="About"
            component={ShowAllGames }
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    top: Platform.OS === 'ios' ? 10 : 0,
                  }}
                >
                  <Icon
                    name="folderopen"
                    size={30}
                    color={focused ? 'white' : '#9594e5'}
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  }
}

export default Main;
