import { View, Linking, SafeAreaView, Alert,StyleSheet, Text,Dimensions,Image,TextInput,TouchableOpacity  } from 'react-native'
import React,{useEffect,useState} from 'react'
import {StatusBar} from "expo-status-bar"
import LottieView from 'lottie-react-native';
import Animated,{FadeIn, FadeInDown, FadeInUp, FadeOut} from 'react-native-reanimated'
import FA5 from 'react-native-vector-icons/FontAwesome5';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { OneButton, TwoButton,Icon } from '../../utils/Alerts.';
import Spinner from 'react-native-loading-spinner-overlay';
import { getItem, removeItem, setItem } from '../../utils/asyncStorage';
import { useNavigation } from '@react-navigation/native';


const SetupScreen = () => {
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
            navigation.navigate("Login")
  
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
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style="light"/>
      <View style={styles.header}>
      <Image style={styles.lottie} source={require("../../assets/images/school2.jpeg")}/>
       
      </View>

      { loading && <Spinner
        visible={true}
        textContent="Processing Data..."
        /> 
  }

      <View style={styles.card}>

<View style={{display:"flex", alignItems:"center", justifyContent:"center",marginBottom:25}}>
<Animated.Image entering={FadeInDown.delay(200).duration(3000).springify().damping(4)} style={{width:100, height:100, borderRadius:20,marginTop:10}}  source={require("../../assets/images/HydotLogo.png")}/>
<Text style={styles.headerText}>Setup Page</Text>
         
</View>

<View style={styles.theInput}>

<TextInput
    onChangeText={text => setCompanyId(text)}
    placeholder="Enter Company Id"
    placeholderTextColor={'#264C62'}
  />
  <Icon Iconsrc={FA5} name="school"/>
</View>

<View style={styles.theInput}>

<TextInput
    onChangeText={text => setApiId(text)}
    placeholder="Enter API Id"
    placeholderTextColor={'#264C62'}
  />

 <Icon Iconsrc={MCI} name="api"/>

</View>

<TouchableOpacity
  onPress={register}
  style={styles.button}
 >
<Text >Register </Text>
</TouchableOpacity>

<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginTop:40 }} >
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: '40%', marginRight: 10 }} />
            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: '40%', marginLeft: 10 }} />
</View>


<View className="w-full" style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:'center',marginTop:20}}>  


  <TouchableOpacity onPress={() => Linking.openURL('https://hydottech.com')}>
    <Text style={{color: "aqua", fontSize: 20, fontWeight: 'bold', justifyContent:"center", alignItems:'center'}}>Powered by Hydot Tech</Text>
  </TouchableOpacity>



</View>


     
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

export default SetupScreen;
