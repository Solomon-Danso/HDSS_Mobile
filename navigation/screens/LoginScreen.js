import { View,BackHandler, Text,Dimensions,StyleSheet,Image,TextInput,TouchableOpacity, SafeAreaView,Button, Alert, TouchableHighlight  } from 'react-native'
import Reac,{useEffect,useState} from 'react'
import {StatusBar} from "expo-status-bar"
import LottieView from 'lottie-react-native';
import Animated,{FadeIn, FadeInDown, FadeInUp, FadeOut} from 'react-native-reanimated'
import ETO from 'react-native-vector-icons/Entypo';
import { OneButton, TwoButton,Icon } from '../../utils/Alerts.';
import { getItem, removeItem, setItem } from '../../utils/asyncStorage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from "expo-local-authentication"
import NetInfo from '@react-native-community/netinfo';


const LoginScreen2 = () => {
  const [SchoolData, SetSchoolData] = useState({});
  const [userInfo, setuserInfo] = useState({});
  const [apiServer, SetApiServer] = useState('');
  const [apiMedia, SetApiMedia] = useState('');
  const [isInitialLogin, setIsInitialLogin] = useState(false)
  const [userId, setuserId] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  


  const Login = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('UserId', userId);
      formData.append('Password', userPassword);

      const response = await fetch(apiServer + 'LogIn', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);

        setItem('userInfo', JSON.stringify(data.message) );
        setItem('isLogin', '1');
        setItem('isInitialLogin', '1');
        navigation.navigate('Dashboard');

        OneButton('Success','Operation is successful');
      } else {
        setLoading(false);
        OneButton(data.message);
      }
    } catch (error) {
      setLoading(false);
      OneButton('An error has occurred');
    }
  };

  const DeviceAuth = async () => {


  try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access the dashboard',
      });

      if (result.success) {
       
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

  useEffect(async () => {
    let server = await getItem('apiServer');
    SetApiServer(server);

    let apiMed = await getItem('apiMedia');
    SetApiMedia(apiMed);

    let initialLogin = await getItem('isInitialLogin');
    setIsInitialLogin(initialLogin==="1")

    const state = await NetInfo.fetch();
    
    if (!state.isConnected) {
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection and try again. ",
        [{ text: "OK",onPress: () => BackHandler.exitApp() }]
      );
    }



  }, []);

  useEffect(() => {
    fetch(apiServer + 'ViewSchoolData')
      .then((res) => res.json())
      .then((data) => SetSchoolData(data))
      .catch((error) => console.log('School data error '));
  }, [apiServer, apiMedia]);

  const imageUrl = apiMedia + SchoolData.CompanyLogo;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getItem('userInfo');
        if (user !== null) {
          setuserInfo(JSON.parse(user));
        }
      } catch (error) {
        console.error('Error fetching user info: ', error);
      }
    };

    fetchData();
  }, []);
  






  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style="light"/>
      <View style={styles.header}>
      <Image style={styles.lottie} source={require("../../assets/images/school3.jpeg")}/>
       
      </View>

      { loading && <Spinner
        visible={true}
        textContent="Processing Data..."
        /> 
  }

      <View style={styles.card}>

      {
  isInitialLogin ?
  (<>
    <View style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <Animated.Image entering={FadeInDown.delay(200).duration(3000).springify().damping(4)} style={{width:100, height:100, borderRadius:20, marginTop:10}}  source={{ uri:imageUrl }}/>
      </View>

      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 25, marginTop: 10,gap:5 }}>
  <Animated.Image entering={FadeInDown.delay(200).duration(3000).springify().damping(4)} style={{ width: 50, height: 50, borderRadius: 100, marginTop: 10 }} source={{ uri: apiMedia + userInfo?.ProfilePic }} />
  <Text style={styles.headerTextSmall}>
    Welcome Back,{"\n"}<Text style={styles.headerText}>{userInfo?.FullName}</Text> 
  </Text>
</View>


   </>
  ) :
  (
    <View style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:25}}>
      <Animated.Image entering={FadeInDown.delay(200).duration(3000).springify().damping(4)} style={{width:100, height:100, borderRadius:20, marginTop:10}}  source={{ uri:imageUrl }}/>
      <Text style={styles.headerText}>{SchoolData.CompanyName}</Text>        
    </View>
  )
}



<View style={styles.theInput}>

<TextInput
    onChangeText={text => setuserId(text)}
    placeholder="Enter User Id"
    placeholderTextColor={'#264C62'}
  />
  <Icon Iconsrc={ETO} name="user"/>

</View>

<View style={styles.theInput}>

<TextInput
    secureTextEntry
    onChangeText={text => setuserPassword(text)}
    placeholder="Enter Password"
    placeholderTextColor={'#264C62'}
  />
 <Icon Iconsrc={ETO} name="lock"/>
</View>

<TouchableOpacity
  onPress={Login}
  style={styles.button}
 >
<Text >Login </Text>
</TouchableOpacity>


{
  isInitialLogin?
  <>
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginTop:40 }} >
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: '40%', marginRight: 10 }} />
            <Text style={styles.headerTextSmall}>OR</Text>
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: '40%', marginLeft: 10 }} />
</View>
  <View className="w-full" style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:'center',marginTop:20}}>  
  <LottieView style={{width:50, height:50}} source={require("../../assets/animations/biometric.json")} autoPlay loop/> 
  
  <TouchableOpacity onPress={DeviceAuth}>
  <Text style={{color:"aqua", fontSize:20, fontWeight:'bold'}}>Use Biometric Instead?</Text>
  </TouchableOpacity>
  
  </View>
  </>
  :<></>
}




     
      </View>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#26293C',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize:25,
    fontWeight:'bold'
  },
  headerTextSmall: {
    textAlign: 'center',
    color: 'white',
    fontSize:15,
    
  },
  card: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    marginTop: '-15%',
    backgroundColor: '#2D334A',
    height:"auto",
    marginBottom:"20%",
  },

  theInput: {
   
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    padding: 7,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom:30,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
   
  },


  lottie:{
    width:"100%",
    height:"100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  button:{
  
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    padding: 7,
    borderWidth: 1,

  border: 30,
  borderRadius: 20,
  border: 2 ,
  backgroundColor:"aqua", 
  color: "white",
  textAlign: "center",
  padding: 10,
  display: "flex",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  height:50,
  fontSize:30,
  }

 
});

export default LoginScreen2;
