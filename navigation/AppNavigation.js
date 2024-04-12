import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import { getItem, removeItem } from '../utils/asyncStorage';
import SetUpScreen from '../screens/SetUpScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [showOnBoarding, setShowOnboarding] = useState(null);
  const [mySetup, setMySetup] = useState(false);

  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Home'}>
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
     


     <Stack.Screen
      name="Home1"
      component={LoginScreen}
    />
    <Stack.Screen
    name="Home"
    component={SetUpScreen}
  />
    

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
