import React,{useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from '../screens/HomeScreen';
import OnBoardingScreen from "../screens/OnBoardingScreen"

const Stack = createNativeStackNavigator();


const AppNavigation = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName="OnBoarding">

    <Stack.Screen name="OnBoarding" options={{headerShown:false}} component={OnBoardingScreen}/>

    <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
    
    
    
    
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNavigation