import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'; // Importe a tela "Home" aqui
import HomeUsu from './screens/HomeUsu';
import Denuncie from './screens/Denuncie';
import VerDen from './screens/VerDen';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {backgroundColor: 'black', border: 'none'},
        tabBarActiveBackgroundColor: 'white',
        tabBarActiveTintColor: '#338bb0',
        tabBarInactiveTintColor: 'white',
      }}>
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({focused, size}) => (
          
          <Icon name='home' size={25} color={focused ? '#338bb0' : 'white'}/>
        )}} /> 
        {/* <Tab.Screen name="HomeUsu" component={HomeUsu}></Tab.Screen> */}
        <Tab.Screen name="Denuncie aqui" component={Denuncie}></Tab.Screen>
        <Tab.Screen name="Ver Denúncias" component={VerDen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;