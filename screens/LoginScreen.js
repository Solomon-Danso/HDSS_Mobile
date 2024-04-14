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



const {width,height} = Dimensions.get('window')


const LoginScreen = () => {
 
  const [SchoolData, SetSchoolData] = useState({})
  const [apiServer, SetApiServer] = useState("")
  const [apiMedia, SetApiMedia] = useState("")
  const [userId, setuserId] = useState("");
  const [userPassword, setuserPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  
  const Login = async () => {

    setLoading(true)
   
      try {
        const formData = new FormData();
  
        formData.append("UserId",userId )
        formData.append("Password",userPassword )
  
  
  
    
        const response = await fetch(apiServer+"LogIn", {
          method: "POST",
          body: formData
        });
  
        const data = await response.json();
    
        if (response.ok) {
          setLoading(false)
         
          setItem("userInfo",data.message)
          setItem('isLogin',"1")
          navigation.navigate("Dashboard")

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

  
  const DeviceAuth = async () => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access the dashboard',
    });

    if (result.success) {
      // Authentication successful, navigate to the dashboard
      navigation.navigate('Dashboard');
    } else {
      // Authentication failed or canceled
      console.log('Authentication failed or canceled');
    }
  } catch (error) {
    // An error occurred during authentication
    console.error('Authentication error:', error);
  }
};




useEffect(async ()=>{
let server = await getItem("apiServer")
SetApiServer(server)

let apiMed = await getItem("apiMedia")
SetApiMedia(apiMed)


},[])


useEffect(()=>{
fetch(apiServer+"ViewSchoolData")
.then(res=>res.json())
.then(data=>SetSchoolData(data))
.catch(error=>console.log("School data error "))
},[apiServer,apiMedia])

const imageUrl = apiMedia + SchoolData.CompanyLogo;
 
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

<Animated.Image entering={FadeInDown.delay(200).duration(3000).springify().damping(4)} style={{width:100, height:100, borderRadius:100,marginTop:30}}  source={{ uri:imageUrl }}/>
<Animated.Image entering={FadeInUp.delay(500).duration(1000).springify().damping(3)} className="h-[225] w-[95]" source={require("../assets/images/light.png")}/>

</View>

<View className="h-full w-full flex justify-around pt-40 pb-10">


<View className="flex items-center">
<Text style={{color:"#fff", fontSize:30, textAlign:'center', fontWeight:"bold",fontFamily:"open sans, san-serif, helvetica"}} classNam="mb-5">
{SchoolData.CompanyName}
</Text>


</View>

<View className="flex items-center mx-4 space-y-4">

<View className="p-5 d-flex flex-row gap-2 rounded-2xl w-full" style={{backgroundColor:"#fef3c7"}}>
<Icon Iconsrc={ETO} name="user"/>
<TextInput
    onChangeText={text => setuserId(text)}
    placeholder="Enter User Id"
    placeholderTextColor={'#264C62'}
  />
  </View>

<View className="mb-3 d-flex flex-row gap-2 p-5 rounded-2xl w-full" style={{backgroundColor:"#E7F0FE"}}>
<Icon Iconsrc={ETO} name="lock"/>
<TextInput
    secureTextEntry
    onChangeText={text => setuserPassword(text)}
    placeholder="Enter Password"
    placeholderTextColor={'#264C62'}
  />

</View>

<View className="w-full">
<TouchableOpacity
 className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
 onPress={Login}
 >
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

<TouchableOpacity onPress={DeviceAuth}>
<Text style={{color:"#264C62", fontSize:20, fontWeight:'bold'}}>Use Biometric Instead?</Text>
</TouchableOpacity>

</View>


</View>


    
</View>



    </View>
  )
}



export default LoginScreen