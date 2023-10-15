import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';


function Denuncie() {
    
    const navigation = useNavigation();
  return (
    <View>
      <Text>denuncie aqui</Text>

      <Button title='ir pra home' onPress={() => {
        navigation.navigate('Home');
      }}></Button>
    </View>
  );
}

export default Denuncie;