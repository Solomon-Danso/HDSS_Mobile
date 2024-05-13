import { View, Text, Button, DatePickerIOS, StyleSheet, Platform, TextInput, SafeAreaView, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import {colors} from "../../../assets/colors/Colors"
import { StatusBar } from 'expo-status-bar'
const {width,height} = Dimensions.get('window')

const AddStudent = () => {
 
    const [firstName, setFirstname] = useState("")
    const [otherName, setOtherName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("")
    const [hometown, setHometown] = useState("")
    const [location,setLocation] = useState("")
    const [country, setCountry] = useState("")
    const [fatherName, setfatherName] = useState("")
    const [fatherOccupation, setfatherOccupation] = useState("")
    const [motherName, setmotherName] = useState("")
    const [motherOccupation, setmotherOccupation] = useState("")
    const [guardianName, setGuardianName] = useState("")
    const [guardianOccupation, setguardianOccupation] = useState("")
    const [medicalIInformation, setmedicalIInformation] = useState("")
    const [religion, setreligion] = useState("")
    
    const [studentPhoneNumber, setStudentPhoneNumber] = useState("")
    const [studentEmail, setStudentEmail] = useState("")

    const [parentPhoneNumber, setparentPhoneNumber] = useState("")
    const [parentAltphoneNumber, setParentAltphoneNumber] = useState("")
    const [level, setlevel] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [emgCntName, setEmgContName] = useState("")
    const [emgPhone, setEmgPhone] = useState("")
    const [emgAltPhone, setEmgAltPhone] = useState("")
    const [RelWithChild, setRelWithChild] = useState("")
    const [parentDigitalAddress, setParentDigitalAddress] = useState("")
    const [parentEmail, setParentEmail] = useState("")
    const [parentLocation, setParentLocation] = useState("")
    const [parentreligion, setParentReligion] = useState("")
   const [academicTerm, setAcademicTerm] = useState("")
   const [academicYear, setAcademicYear] = useState("")
   const [userInfo, setUserInfo] = useState({});

   const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setDateOfBirth(date);
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
 
 
 
 
 
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="light"/>
 
<ScrollView style={styles.AdmitStudentCard}>
<Text style={styles.MainTitle}>Add Student Form</Text>
<View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: '90%', marginLeft: 10,marginRight: 10,marginBottom:20 }} />

<Text style={styles.HeaderTitle}>Student Information</Text>

<View style={styles.AdmitStudentRole}>

<View style={{margin:5}}>

<Text style={styles.FormLable}>First Name</Text>
<TextInput
onChangeText={text => setFirstname(text)}
placeholderTextColor={'white'}
style={styles.input}


/>

</View>

<View style={{margin:5}}>

<Text style={styles.FormLable}>Other Name</Text>
<TextInput
onChangeText={text => setOtherName(text)}
placeholderTextColor={'white'}
style={styles.input}


/>

</View>

<View style={{margin:5}}>

<Text style={styles.FormLable}>Last Name</Text>
<TextInput
onChangeText={text => setLastname(text)}
placeholderTextColor={'white'}
style={styles.input}


/>

</View>

<View style={{margin:5}}>

<Text style={styles.FormLable}>Date of Birth</Text>
<TextInput
onChangeText={text => setDateOfBirth(text)}
placeholderTextColor={'white'}
style={styles.input}


/>

</View>



</View>





 </ScrollView>





    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
AdmitStudentCard:{
    width: '98%',
  
    padding: 2,
    borderWidth: 1,
    borderColor: `${colors.white}`,
    borderRadius: 15,
    height:"auto",
    marginBottom:"20%"

},

MainTitle:{
fontSize: 18,
color: `${colors.white}`,
fontFamily:"Helvetica",
fontWeight: "700",
  textAlign: "center",
  marginBottom:10,
  padding:10,
},

HeaderTitle:{
    fontSize: 16,
    color: `${colors.white}`,
    fontFamily:"Helvetica",
    fontWeight: "600",
},

AdmitStudentRole:{
display: "flex",
flexDirection: "row",
margin: 10,
padding: 1,
gap:10,
flexWrap: "wrap",
},

FormLable:{
fontSize: 15,
color: `${colors.white}`,
fontFamily:"OpenSans",
},


container: {
    flex: 1,
    backgroundColor: `${colors.body}`,
},

input:{
backgroundColor:`${colors.card}`,
width:width*0.85,
borderTopRightRadius:20,
borderBottomRightRadius:20,
paddingTop:10,
paddingBottom:10,
paddingLeft:10,
borderColor:`${colors.skyBlue}`,
borderWidth: 1,
color:`${colors.powderBlue}`,

} 




})



export default AddStudent