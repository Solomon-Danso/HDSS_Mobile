import { View, ImageBackground, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const InitialLoad = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Main");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
    <StatusBar style="light" />
    <ImageBackground
      source={require('../assets/images/school1.jpeg')}
      style={{ width, height, resizeMode: "cover" }}
    >
     
    </ImageBackground>
  </View>
  );
};

export default InitialLoad;
