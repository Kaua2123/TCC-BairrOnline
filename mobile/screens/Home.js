import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';


function Home() {
    
    const navigation = useNavigation();
  return (
    <View>
      <Text>home aqui</Text>
    </View>
  );
}

export default Home;