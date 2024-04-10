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
  const [isSetUp, setIsSetUp] = useState(false);

  useEffect(() => {
    checkIfAlreadyOnboarded();
    checkIfSetUp();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    if (onboarded === '1') {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  const checkIfSetUp = async () => {
    let setUp = await getItem('isSetUp');
    setIsSetUp(setUp === 'true'); // Assuming 'isSetUp' is stored as a string
   
  };

  if (showOnBoarding === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={showOnBoarding ? 'OnBoarding' : 'Home'}>
        <Stack.Screen name="OnBoarding" options={{ headerShown: false }} component={OnBoardingScreen} />
        
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={isSetUp ? LoginScreen : SetUpScreen} // Use LoginScreen if isSetUp is true, otherwise use SetUpScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
