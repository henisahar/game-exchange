// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashbord';
import Page1 from './components/Page1';
import Screen1 from './components/Screen1';
import AddGame from './components/AddGame';
import ShowGames from './components/showgames';
import Main from './Main';
import ShowAllGames from './components/Showallgames';
import GameDetails from './components/GameDetails';




const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: 'Signup' }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login', headerLeft: null }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: 'Dashboard', headerLeft: null }}
      />
       <Stack.Screen
        name="Page1"
        component={Page1}
        options={{ title: 'Profile', headerLeft: null }}
      />
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{ title: 'Daa', headerLeft: null }}
      />
      <Stack.Screen
        name="AddGame"
        component={AddGame}
        options={{ title: 'AddGame', headerLeft: null }}
      />
       <Stack.Screen
        name="ShowGames"
        component={ShowGames}
        options={{ title: 'Show My Games', headerLeft: null }}
      />
        <Stack.Screen
        name="ShowAllGames"
        component={ShowAllGames}
        options={{ title: 'e="Show All Games', headerLeft: null }}
      />
        <Stack.Screen
        name="GameDetails"
        component={GameDetails}
        options={{ title: 'Game Details', headerLeft: null }}
      />
       <Stack.Screen name="Main" component={Main} />
   
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
