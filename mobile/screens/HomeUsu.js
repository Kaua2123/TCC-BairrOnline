import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';


function HomeUsu() {
    
    const navigation = useNavigation();
  return (
    <View>
      <Text>home do usuario teste de rotas kkkxddxd9x</Text>

      <Button title='ir pra home' onPress={() => {
        navigation.navigate('Home');
      }}></Button>
    </View>
  );
}

export default HomeUsu;