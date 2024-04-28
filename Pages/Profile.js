import { View, Text,StyleSheet,Image,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import { colors } from '../assets/colors/Colors';
import { getItem } from '../utils/asyncStorage';
import { Icon, IconSmall, OneButton } from '../utils/Alerts.';
import ETO from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';


const Profile = () => {


  const [SchoolData, SetSchoolData] = useState({})
  const [apiServer, SetApiServer] = useState('');
  const [apiMedia, SetApiMedia] = useState('');
  const [userInfo, setuserInfo] = useState({});
  const [theStudent, setTheStudent] = useState([])


  function formatDate(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
   
   
  

   
  
    const formattedDate = `${weekday}, ${day}${daySuffix} ${month}`;
  
    return formattedDate;
  }
  
  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }


  function formatDateNew(dateString) {
    const date = new Date(dateString); // Convert the string to a Date object
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
   
    const formattedDate = `${weekday}, ${day}${daySuffix} ${month}`;
  
    return formattedDate;
}





  
const [sysDate, setSysDate] = useState("")

  
  useEffect(()=>{
 const date = new Date();
 setSysDate(formatDate(date))
  },[])

 


  useEffect(async () => {
    let server = await getItem('apiServer');
    SetApiServer(server);

    let apiMed = await getItem('apiMedia');
    SetApiMedia(apiMed);

    



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





  useEffect(()=>{
  fetch(apiServer+"ViewSchoolData")
  .then(res=>res.json())
  .then(data=>SetSchoolData(data))
  .catch(error=>console.error(error))
  },[])


  const [RoleList, setRoleList] = useState([])
 
  useEffect(()=>{
    handleRoles()
  
  },[userInfo])

 

  
  const handleRoles = async () => {
   
   
    try {
      const formData = new FormData();

      const CompanyId = userInfo.CompanyId;
      const UserId = userInfo.UserId;
    
      formData.append("CompanyId",CompanyId)
      formData.append("UserId",UserId)

  
      const response = await fetch(apiServer+"ViewUserDetailedRole", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
  
      if (response.ok) {
        
       
        setRoleList(data)
        
      } else {
      
      }
    } catch (error) {


      
      window.location.reload()
    }

}

const checkRole = (role) => {
 
  return RoleList.includes(role);
};


function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  
  return age;
}



const CompanyId = userInfo.CompanyId;
const UserId = userInfo.UserId;
 

useEffect(()=>{
if(CompanyId!==undefined && UserId!==undefined){
  LoadStudent()
}

},[CompanyId,UserId ])


const LoadStudent = async () => {

    

  if(CompanyId!==undefined && UserId!==undefined){


    try {
      const formData = new FormData();

      formData.append("CompanyId", userInfo.CompanyId);
  formData.append("SenderId", userInfo.UserId);

const url = `ViewStudent/${UserId}/${CompanyId}/${UserId}`
  
      const response = await fetch(apiServer+url, {
        method: "GET",
      
      });

      const data = await response.json();
  
      if (response.ok) {
        

        setTheStudent(data)


        
      } else {
       OneButton(data.message);
      }
    } catch (error) {

     OneButton(error.message);
    }
    
  } else{
    OneButton("CompanyId is undefined")
  }
  


}





  return (
    <View style={{flex:1, backgroundColor:"#26293C", paddingTop:25}}>
      
    <View style={styles.fixedTop}>
<Image style={{height:70, width:70}} source={{ uri:apiMedia+SchoolData.CompanyLogo }}  />
<Text style={styles.name}>{SchoolData.CompanyName}</Text>
    </View>

<ScrollView style={{ flex: 1 }}>
<Text style={{color:"white", fontSize:13, padding:10}}>{sysDate}</Text>


{checkRole('Student') ? (   
  <>

<View style={{marginTop:20, display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

<View style={styles.ProfileImgDiv}>
<Image style={styles.ProfileImgUser} source={{ uri:apiMedia+theStudent?.ProfilePic }}  />
</View>

{
  !checkRole('Student') ?(
  <>
  <TouchableOpacity
  
  style={styles.button}
 >
<Text >Edit </Text>
</TouchableOpacity>
  </>):(<></>)
}

</View>      

<Text style={styles.name}> {theStudent?.LastName}, {theStudent?.FirstName} {theStudent?.OtherName}</Text>
<Text style={{color:"aqua", fontSize:15}}> {theStudent.Level},  {theStudent.Role}, {theStudent.Gender} </Text>

<View style={styles.card}>

<View style={{display:"flex",flexDirection:"row", justifyContent:"space-between",padding:12 }}>
  <Text style={{color:"white", fontSize:18, fontWeight:"bold"}}>Academic</Text>
  <IconSmall Iconsrc={FontAwesome5} name="user-graduate"/>
</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Student no:</Text>
<Text style={styles.content}>{theStudent.StudentId}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Admitted:</Text>
<Text style={styles.content}>{formatDateNew(theStudent.created_at)}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Session:</Text>
<Text style={styles.content}>{theStudent.TheAcademicTerm}, {theStudent.TheAcademicYear}</Text>

</View>




</View>



<View style={styles.card}>

<View style={{display:"flex",flexDirection:"row", justifyContent:"space-between",padding:12 }}>
  <Text style={{color:"white", fontSize:18, fontWeight:"bold"}}>Contact</Text>
  <IconSmall Iconsrc={AntDesign} name="contacts"/>
</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.content}> {theStudent.Email}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>

<Text style={styles.content}> {theStudent.PhoneNumber} </Text>

</View>



</View>


<View style={styles.card}>

<View style={{display:"flex",flexDirection:"row", justifyContent:"space-between",padding:12 }}>
  <Text style={{color:"white", fontSize:18, fontWeight:"bold"}}>Personal Information</Text>
  <IconSmall Iconsrc={FontAwesome6} name="person-circle-question"/>
</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>DOB:</Text>
<Text style={styles.content}>{formatDateNew(theStudent.DateOfBirth)}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Age:</Text>
<Text style={styles.content}>{calculateAge(theStudent.DateOfBirth)} {calculateAge(theStudent.DateOfBirth)>1?<>years</>:<>year</>} old</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Religion:</Text>
<Text style={styles.content}>{theStudent.Religion}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>HomeTown:</Text>
<Text style={styles.content}>{theStudent.HomeTown}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Location:</Text>
<Text style={styles.content}>{theStudent.Location}</Text>

</View>



</View>




<View style={styles.card}>

<View style={{display:"flex",flexDirection:"row", justifyContent:"space-between",padding:12 }}>
  <Text style={{color:"white", fontSize:18, fontWeight:"bold"}}>Emergency</Text>
  <IconSmall Iconsrc={MaterialCommunityIcons} name="car-emergency"/>
</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.content}> {theStudent.EmergencyContactName}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>

<Text style={styles.content}> {theStudent.EmergencyPhoneNumber} </Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>

<Text style={styles.content}> {theStudent.EmergencyAlternatePhoneNumber} </Text>

</View>



</View>




<View style={styles.card}>

<View style={{display:"flex",flexDirection:"row", justifyContent:"space-between",padding:12 }}>
  <Text style={{color:"white", fontSize:18, fontWeight:"bold"}}>Parent Information</Text>
  <IconSmall Iconsrc={Octicons} name="people"/>
</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Father's Name:</Text>
<Text style={styles.content}>{theStudent.FathersName}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Father's Occupation:</Text>
<Text style={styles.content}>{theStudent.FatherOccupation}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Mother's Name:</Text>
<Text style={styles.content}>{theStudent.MothersName}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Mother's Occupation:</Text>
<Text style={styles.content}>{theStudent.MotherOccupation}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Guardian's Name:</Text>
<Text style={styles.content}>{theStudent.GuardiansName}</Text>

</View>

<View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:1}}>
<Text style={styles.label}>Guardian's Occupation:</Text>
<Text style={styles.content}>{theStudent.GuardianOccupation}</Text>

</View>


</View>






  </>
) : (<></>)
}





<View style={{marginBottom:100}}>

</View>


</ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({

  card: {

    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: '#2D334A',
    height:"auto",
    marginBottom:10,
  },



  fixedTop:{
backgroundColor: `${colors.card}`,
display:"flex",
flexDirection: "row",
gap:10, 
alignItems:"center",

position: "fixed", // Set position to "fixed"
top: 0, // Align the container to the top of the screen
zIndex: 999, // Set a high zIndex value
width: '100%'

  },

name:{
  fontSize: 18,
  fontFamily:"OpenSans-Bold",
  color:"white"

}, 

label:{
  color:"white",
   fontSize:16,
   paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 5,
  fontFamily:"OpenSans-Medium"
},

content:{
  color:"white",
   fontSize:16,
   paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 5,
  fontFamily:"PlayfairDisplay-Regular"
},


profileDivLeft:{
  position: "relative",
  padding: 0,
  flex: 1,
  fontFamily: "OpenSans, NotoSans, sans-serif",
},

ProfileSectionCard:{

  fontFamily: "OpenSans, NotoSans, sans-serif",
  borderRadius: 10,
  width: 100,
  padding: 10,
  height: "max-content",
  boxShadow: "0 1.5px 5px rgb(0 0 0 / 0.1)",
  border: "0.5px solid rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  overflow: "hidden",
  padding: 0,
  marginTop: 20

},

ProfileIfoContainer:{
  position: "absolute",
  bottom: 0,
  paddingLeft: "5%",
  paddingRight: "2%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
},

ProfileImgUser:{
  width: 80,
  height: 80,
  color: "black",
  border: "4px solid white",
  backgroundColor: "white",
  borderRadius: 50,

},

ProfileImgDiv:{
  width: 87,
  height: 87,
  color: "black",
  border: "4px solid white",
  backgroundColor: "white",
  borderRadius: 50,
  alignItems:"center",
  justifyContent: "center",

},

ProfileInfoSub:{
  alignSelf: "flex-end",
  paddingBottom: "10px",
  paddingLeft: "10px",
  flex: 1,
},

ProfileName:{
  fontSize: "25px",
  fontFamily: "OpenSans, NotoSans, sans-serif"
 
},

ProfileType:{
  fontSize: "13px",
  color: "aqua",
  marginTop: "2px",
  fontFamily: "OpenSans, NotoSans, sans-serif",

},

ProfileCoverContainer:{
  height: "250px",
  display: "flex",
  overflow: "hidden",
  position: "relative",
  marginTop: "20px",
  fontFamily: "OpenSans, NotoSans, sans-serif",
  width:"100%"
},

ProfileCoverImg:{
  width: "100%",
  height: "60%",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  objectFit: "cover",
  position: "absolute",
  overflow: "hidden",

},

button:{
  
  width: 70,
  padding: 4,
  borderWidth: 1,

borderRadius: 15,
border: 2 ,
backgroundColor:"white", 
color: "black",
textAlign: "center",
display: "flex",
alignItems: "center",
alignContent: "center",
justifyContent: "center",
height:40,
fontSize:30,
}



})







export default Profile