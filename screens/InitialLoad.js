import { View, ImageBackground, Dimensions, Alert, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";

const { width, height } = Dimensions.get('window');

const InitialLoad = () => {
  const navigation = useNavigation();


  useEffect(() => {
    const timer = setTimeout( async () => {
      
      const state = await NetInfo.fetch();
    
    if (!state.isConnected) {
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection and try again. ",
        [{ text: "OK",onPress: () => BackHandler.exitApp() }]
      );
    }else{
      navigation.navigate("Main");
    }
      
     
    }, 5000);
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
