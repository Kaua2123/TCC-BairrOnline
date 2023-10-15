import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'; // Importe a tela "Home" aqui
import HomeUsu from './screens/HomeUsu';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} /> 
        <Tab.Screen name="HomeUsu" component={HomeUsu}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;