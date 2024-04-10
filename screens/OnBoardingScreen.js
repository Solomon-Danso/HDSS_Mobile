import { View, Text, StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import React,{useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Onboarding from 'react-native-onboarding-swiper'
import LottieView from 'lottie-react-native';
import {useNavigation} from "@react-navigation/native"
import {setItem} from "../utils/asyncStorage"
const {width,height} = Dimensions.get('window')


const OnBoardingScreen = () => {
  const navigation = useNavigation()

const handleDone = () =>{
  navigation.navigate("Home")
  setItem("onboarded",'1')
}

const doneButton = ({...props}) =>{
  return (
<TouchableOpacity style={styles.doneButton} {...props}>
  <Text>Done</Text>
</TouchableOpacity>
  )

}



  return (
    <View style={styles.container}>
     
    <Onboarding
    onDone={handleDone}
    onSkip={handleDone}
    DoneButtonComponent={doneButton}

    bottomBarHighlight={false}
    containerStyles={{paddingHorizontal:15}}
      pages={[



        
        {
        backgroundColor: '#a7f3d0',
        image: (
          <View>
            <LottieView style={styles.lottie} source={require("../assets/animations/onboard1.json")} autoPlay loop/>
          </View>
        ),
        title: "School Track",
        subtitle: "Streamline Your Administrative Tasks: Assignments, Grades, Virtual Teaching, and Quizzes"      
      },

      {
        backgroundColor: '#fef3c7',
        image: (
          <View>
            <LottieView style={styles.lottie} source={require("../assets/animations/finance.json")} autoPlay loop/>
 
          </View>
        ),
        title: "Finance Master",
        subtitle: "Effortlessly Manage School Fees and Accounts for Financial Clarity"      
      },


      {
        backgroundColor: '#4D394B',
        image: (
          <View >
            <LottieView style={styles.lottie} source={require("../assets/animations/parent.json")} autoPlay loop/>
 
          </View>
        ),
        title: "Parent Connect",
        subtitle: "Stay Informed and Engaged with Your Child's Education Journey"      
      },

       
      {
        backgroundColor: '#264C62',
        image: (
          <View>
            <LottieView style={styles.lottie} source={require("../assets/animations/onboard4.json")} autoPlay loop/>
 
          </View>
        ),
        title: "Library Lynx",
        subtitle: "Access, Organize, and Explore Learning Resources with Ease"      
      },

      {
        backgroundColor: '#3A3B64',
        image: (
          <View >
            <LottieView style={styles.lottie} source={require("../assets/animations/onboard5.json")} autoPlay loop/>
 
          </View>
        ),
        title: "Classroom Compass",
        subtitle: "Navigate the Learning Environment with Tools for Teachers and Students"      
      },

      

      ]}
    />


    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  lottie:{
    width:width*0.9,
    height:width
  },
  doneButton:{
    padding:20,
    backgroundColor:"white",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  }



})

export default OnBoardingScreen