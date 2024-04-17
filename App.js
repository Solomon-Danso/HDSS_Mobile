import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert,BackHandler } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import NetInfo from '@react-native-community/netinfo';

const CHECK_INTERVAL = 30000; // 30 seconds


export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const checkInternetConnection = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please check your internet connection and try again. ",
          [{ text: "OK" }]
        );
      }
      if(state.isConnected){
        setAttemptCount(0)
      }
    };

    const interval = setInterval(() => {
      checkInternetConnection();
      setAttemptCount(prevCount => prevCount + 1);
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (attemptCount >5 && !isConnected) {
      Alert.alert(
        "No Internet Connection",
        "The app will now close. Please turn on your data to continue.",
       
      );
      BackHandler.exitApp()
    }
  }, [attemptCount, isConnected]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
