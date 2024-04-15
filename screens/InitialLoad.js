import { View, Text,Dimensions,Image,TextInput,TouchableOpacity, SafeAreaView,Button, Alert, TouchableHighlight  } from 'react-native'
import Reac,{useEffect,useState} from 'react'
import {StatusBar} from "expo-status-bar"
import LottieView from 'lottie-react-native';
import Animated,{FadeIn, FadeInDown, FadeInUp, FadeOut} from 'react-native-reanimated'
import ETO from 'react-native-vector-icons/Entypo';
import { OneButton, TwoButton,Icon } from '../utils/Alerts.';
import { getItem, removeItem, setItem } from '../utils/asyncStorage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from "expo-local-authentication"


const InitialLoad = () => {
const navigation = useNavigation()


setTimeout(()=>{
navigation.navigate("Main")
},5000)



  return (
    <View>
        <StatusBar style="light"/>
        <Image style={{ width: "100%", height: "100%", objectFit: "cover" }} source={require("../assets/images/school1.jpeg")} />
    </View>
  )
}

export default InitialLoad