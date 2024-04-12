import { View, Alert,StyleSheet, Text,Dimensions,Image,TextInput,TouchableOpacity  } from 'react-native'
import React,{useEffect,useState} from 'react'
import {StatusBar} from "expo-status-bar"
import LottieView from 'lottie-react-native';
import Animated,{FadeIn, FadeInDown, FadeInUp, FadeOut} from 'react-native-reanimated'
import FA5 from 'react-native-vector-icons/FontAwesome5';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { OneButton, TwoButton,Icon } from '../utils/Alerts.';
import Spinner from 'react-native-loading-spinner-overlay';
import { getItem, removeItem, setItem } from '../utils/asyncStorage';
import { useNavigation } from '@react-navigation/native';


const {width,height} = Dimensions.get('window')
const SetUpScreen = () => {
  const navigation = useNavigation();

  const [companyId, setCompanyId] = useState("")
  const [apiId, setApiId] = useState("")
  const [loading, setLoading] = useState(false);

  



  const register = async () => {

    setLoading(true)
   
      try {
        const formData = new FormData();
  
        formData.append("CompanyId",companyId )
        formData.append("id",apiId )
  
  
  
    
        const response = await fetch("https://api.hydottech.com/api/ViewClientApiServerURL", {
          method: "POST",
          body: formData
        });
  
        const data = await response.json();
    
        if (response.ok) {
          setLoading(false)
         
          setItem("apiServer",data.ApiServerURL)
          setItem("apiMedia",data.ApiMediaURL)
          setItem('isSetUp',"1")
          navigation.navigate("Home")

          OneButton("Operation is successful")
          
        } else {
          setLoading(false)
          OneButton(data.message);
        }
      } catch (error) {
        setLoading(false)
        OneButton("An error has occurred");
      }
  
  }

  useEffect(()=>{
console.log("apiServer",getItem("apiServer"))
console.log("apiMedia",getItem("apiMedia"))
console.log("setUp",getItem('isSetUp'))



  },[])




  return (
    <View className="bg-white h-full w-full ">

    <StatusBar style="light"/>

  <Image className="h-full w-full absolute " source={require("../assets/images/background.png")}/>
  
  { loading && <Spinner
        visible={true}
        textContent="Processing Data..."
        /> 
  }


<View className="flex-row justify-around w-full absolute">


<Animated.Image entering={FadeInDown.delay(200).duration(3000).springify().damping(4)} style={{width:100, height:100, borderRadius:100}} source={require("../assets/images/HydotLogo.png")}/>
<Animated.Image entering={FadeInUp.delay(500).duration(1000).springify().damping(3)} className="h-[225] w-[95]" source={require("../assets/images/light.png")}/>


</View>


<View className="h-full w-full flex justify-around pt-40 pb-10">



<View className="flex items-center">

<Text style={{color:"#fff", fontSize:30, textAlign:'center', fontWeight:"bold",fontFamily:"open sans, san-serif, helvetica"}} classNam="mb-5">
Setup 
</Text>

</View>

<View className="flex items-center mx-4 space-y-4">

<View className=" p-5 d-flex flex-row gap-2 rounded-2xl w-full" style={{backgroundColor:"#fef3c7"}}>

<Icon Iconsrc={FA5} name="school"/>
<TextInput
    onChangeText={text => setCompanyId(text)}
    placeholder="Enter Company Id"
    placeholderTextColor={'#264C62'}
  />
</View>

<View className="mb-3 d-flex flex-row gap-2 p-5 rounded-2xl w-full" style={{backgroundColor:"#E7F0FE"}}>
<Icon Iconsrc={MCI} name="api"/>
<TextInput
    onChangeText={text => setApiId(text)}
    placeholder="Enter API Id"
    placeholderTextColor={'#264C62'}
  />
</View>

<View className="w-full">
<TouchableOpacity
    onPress={register}
    className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
    style={{ backgroundColor: '#00BFFF' }}>
    <Text className="text-xl font-bold text-white text-center">Register</Text>
</TouchableOpacity>
</View>



<View className="flex items-center">

<Text style={{color:"#264C62", fontSize:20, textAlign:'center', fontWeight:"bold",fontFamily:"open sans, san-serif, helvetica",fontStyle:"italic"}} classNam="mb-5">
Powered by Hydot Tech
</Text>

</View>



</View>


    
</View>



    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  lottie:{
    width:width*0.95,
    height:width
  },
 


})

export default SetUpScreen