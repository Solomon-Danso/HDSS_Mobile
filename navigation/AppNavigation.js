import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import { getItem, removeItem } from '../utils/asyncStorage';
import SetUpScreen from '../screens/SetUpScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [Onboarded, setOnboarded] = useState(null);
  const [mySetup, setMySetup] = useState(null);

  useEffect(()=>{

    TheOnboard()
    TheSetUp()
    StorageViewer()
    //StorageDestroyer()

  },[])



  const StorageDestroyer = async ()=>{
    await removeItem("apiServer")
   await removeItem("apiMedia")
  await removeItem('isSetUp')
  await removeItem('onboarded')
    
      }

  const StorageViewer = async () =>{
    console.log("apiServer",await getItem("apiServer"))
    console.log("apiMedia",await getItem("apiMedia"))
    console.log("setUp",await getItem('isSetUp'))
    console.log("Onboard",await getItem('onboarded'))
   
  }

  const TheOnboard =async () =>{
    let onboard = await getItem("onboarded");
   
    if(onboard ==="1"){
      setOnboarded(true)
    }
    else{
      setOnboarded(false)
    }
   
    console.log(onboard)
   

  }

  
  const TheSetUp =async () =>{
    let setup =await getItem("isSetUp");
   
    if(setup ==="1"){
      setMySetup(true)
    }
    else{
      setMySetup(false)
    }

   

  }


  if (Onboarded === null || mySetup === null) {
    return null;
  }

 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Onboarded?'Home':"OnBoarding"}>
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
     

      {
        mySetup?<Stack.Screen name="Home" component={LoginScreen}/>: <Stack.Screen name="Home" component={SetUpScreen}
    />
      }

<Stack.Screen name="Login" component={LoginScreen}/>
     
   
    

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
