import { View, Text, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ETO from 'react-native-vector-icons/Entypo';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../assets/colors/Colors';
import { useNavigation } from '@react-navigation/native';


export const Icon = ({Iconsrc, name,color}) => {

  return (
    <View style={styles.navIcon}>
      <Iconsrc
        name={name}
        size={30}
        color={color}
      />
    </View>
  );
};




const Dashboard = () => {

const navigation = useNavigation()

  const [selectedButton, setSelectedButton] = useState(null);
      

      const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);

        switch(buttonName){

          case "Menu":
            navigation.navigate("OnBoarding")
            break;

          default:
            navigation.navigate("Dashboard")


        }
       
    };




  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"#26293C"}}>
       <View style={{ flex: 1, marginTop:20 }}>
        <Text>Home Section</Text>
      </View>



      

      <View style={styles.menuContainer}>
      
      <TouchableOpacity style={styles.menuButton} onPress={()=>handleButtonClick("Menu")}>
      <Icon Iconsrc={MI} name="menu-open" color={selectedButton === "Menu" ? `${colors.maingreen}` : `${colors.icon}`}/>
      <Text style={{color: selectedButton === "Menu" ? `${colors.maingreen}` : `${colors.icon}`,}}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={()=>handleButtonClick("Class")}>
      <Icon Iconsrc={MCI} name="google-classroom"/>
      <Text style={{color: selectedButton === "Class" ? `${colors.maingreen}` : `${colors.icon}`,}}>Class</Text>
      </TouchableOpacity>


      </View>
   
   
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

  menuContainer:{
  backgroundColor: "#2D334A",
borderRight: 0.5,
display: "flex",
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
padding: 10,
position: "fixed",
bottom: 0,
left: 0,
width: "100%",
height: "auto",
zIndex: 1
  },

menuButton:{
display:"flex",
flexDirection: "column",
alignItems: "center",

  },

navText:{
color: "#CFD4EC",
fontSize: 15
},

navIcon:{
  borderRadius: 100,
  height: 24,
  width: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color:"#CFD4EC",

}




})



export default Dashboard