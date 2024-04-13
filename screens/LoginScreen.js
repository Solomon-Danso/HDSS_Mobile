import { View, Text,Dimensions,Image,TextInput,TouchableOpacity  } from 'react-native'
import Reac,{useEffect} from 'react'
import {StatusBar} from "expo-status-bar"
import LottieView from 'lottie-react-native';
import Animated,{FadeIn, FadeInDown, FadeInUp, FadeOut} from 'react-native-reanimated'
import ETO from 'react-native-vector-icons/Entypo';
import { OneButton, TwoButton,Icon } from '../utils/Alerts.';
import { getItem, removeItem, setItem } from '../utils/asyncStorage';




const {width,height} = Dimensions.get('window')


const LoginScreen = () => {
 


      
 
  return (
    <View className="bg-white h-full w-full ">

    <StatusBar style="light"/>
    

        <Image className="h-full w-full absolute " source={require("../assets/images/background.png")}/>
     
<View className="flex-row justify-around w-full absolute">

<Animated.Image entering={FadeInDown.delay(200).duration(3000).springify().damping(4)} style={{width:100, height:100, borderRadius:100}} source={require("../assets/images/HydotLogo.png")}/>
<Animated.Image entering={FadeInUp.delay(500).duration(1000).springify().damping(3)} className="h-[225] w-[95]" source={require("../assets/images/light.png")}/>

</View>

<View className="h-full w-full flex justify-around pt-40 pb-10">


<View className="flex items-center">
<Text style={{color:"#fff", fontSize:30, textAlign:'center', fontWeight:"bold",fontFamily:"open sans, san-serif, helvetica"}} classNam="mb-5">
Sacred Heart International School
</Text>


</View>

<View className="flex items-center mx-4 space-y-4">

<View className="p-5 d-flex flex-row gap-2 rounded-2xl w-full" style={{backgroundColor:"#fef3c7"}}>
<Icon Iconsrc={ETO} name="user"/>
<TextInput placeholder="Enter UserId" placeholderTextColor={'#264C62'}/>
</View>

<View className="mb-3 d-flex flex-row gap-2 p-5 rounded-2xl w-full" style={{backgroundColor:"#E7F0FE"}}>
<Icon Iconsrc={ETO} name="lock"/>
<TextInput secureTextEntry placeholder="Enter Password" placeholderTextColor={'#264C62'}/>
</View>

<View className="w-full">
<TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
<Text className="text-xl font-bold text-white text-center">Login </Text>
</TouchableOpacity>
</View>


<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: '40%', marginRight: 10 }} />
            <Text>OR</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: '40%', marginLeft: 10 }} />
</View>



<View className="w-full" style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:'center'}}>  
<LottieView style={{width:50, height:50}} source={require("../assets/animations/biometric.json")} autoPlay loop/> 

<Text style={{color:"#264C62", fontSize:20, fontWeight:'bold'}}>Use Biometric Instead?</Text>

</View>

</View>


    
</View>



    </View>
  )
}



export default LoginScreen