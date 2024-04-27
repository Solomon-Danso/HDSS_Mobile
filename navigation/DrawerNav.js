import React,{useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View,BackHandler, Text, Image,TouchableOpacity} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from "../Pages/HomeScreen"
import NotificationScreen from "../Pages/NotificationScreen"
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import { getItem, removeItem, setItem } from '../utils/asyncStorage';
import DropList from './DropList'; // Importing your DropList component
import InnerDItem from './InnerDItem';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import InnerDropList from './InnerDropList';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../assets/colors/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome, Fontisto, Foundation, Ionicons } from '@expo/vector-icons';
import StraightLink from './StraightLink';
import MultiDropList from './MultiDropList';









const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  const [userInfo, setuserInfo] = useState({});
  const [apiServer, SetApiServer] = useState('');
  const [apiMedia, SetApiMedia] = useState('');

  useEffect(async () => {
    let server = await getItem('apiServer');
    SetApiServer(server);

    let apiMed = await getItem('apiMedia');
    SetApiMedia(apiMed);


  }, []);

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

      Show.Attention("An error has occurred");
      
      window.location.reload()
    }

}

const checkRole = (role) => {
 
  return RoleList.includes(role);
};

 




  return (
    <DrawerContentScrollView {...props} >


<View style={{ marginBottom:10,alignItems: 'center',borderRadius:20, padding: 20, backgroundColor:`${colors.card}`,opacity:0.8}}>
        <Image
          source={{ uri: apiMedia + userInfo?.ProfilePic }}
          style={{ width: 100, height: 100, borderRadius:50}}
        />
        <Text style={{ color: `${colors.maingreen}`, marginTop: 10,fontSize:15 }}>{userInfo?.FullName}</Text>
</View>


<DropList icon="people-group" iconsrc={FontAwesome6} title="Students Mgmt">
       
{checkRole("SuperAdmin") || checkRole('AddStudent') ? (   
  <>
      <InnerDItem 
      label="Add Student"
      handlePress={() => props.navigation.navigate('AddStudent')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('BulkRegistration') ? (   
  <>
      <InnerDItem 
      label="Bulk Registration"
      handlePress={() => props.navigation.navigate('BulkRegistration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Generators') ? (   
  <>
      <InnerDItem 
      label="Generators"
      handlePress={() => props.navigation.navigate('Generators')}
      />
  </>
) : (<></>)
}







{checkRole("SuperAdmin") || checkRole('StudentInfo') ? (   
  <>
      <InnerDItem 
      label="Student Info"
      handlePress={() => props.navigation.navigate('StudentInfo')}
      />
  </>
) : (<></>)
}


{checkRole("SuperAdmin") || checkRole('UpdateStudents') ? (   
  <>
      <InnerDItem 
      label="Update Students"
      handlePress={() => props.navigation.navigate('UpdateStudents')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('DeleteStudents') ? (   
  <>
      <InnerDItem 
      label="Delete Students"
      handlePress={() => props.navigation.navigate('DeleteStudents')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Assessments') ? (   
  <>
      <InnerDItem 
      label="Assessments"
      handlePress={() => props.navigation.navigate('Assessments')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('SchoolFees') ? (   
  <>
      <InnerDItem 
      label="SchoolFees"
      handlePress={() => props.navigation.navigate('SchoolFees')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <>
      <InnerDItem 
      label="Transport"
      handlePress={() => props.navigation.navigate("Transport")}
      />
  </>
) : (<></>)
}


{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <>
      <InnerDItem 
      label="Feeding"
      handlePress={() => props.navigation.navigate("Feeding")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <>
      <InnerDItem 
      label="Attendance"
      handlePress={() => props.navigation.navigate("Attendance")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <>
      <InnerDItem 
      label="Annoucements"
      handlePress={() => props.navigation.navigate("Annoucements")}
      />
  </>
) : (<></>)
}
       
       
</DropList>


<DropList icon="people-line" iconsrc={FontAwesome6} title="Staff Members Mgmt">
       
{checkRole("SuperAdmin") || checkRole('Register') ? (   
  <>
      <InnerDItem 
      label="Register"
      handlePress={() => props.navigation.navigate('Register')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Update ') ? (   
  <>
      <InnerDItem 
      label="Update"
      handlePress={() => props.navigation.navigate('Update')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('View Details') ? (   
  <>
      <InnerDItem 
      label="View Details"
      handlePress={() => props.navigation.navigate('ViewDetails')}
      />
  </>
) : (<></>)
}







{checkRole("SuperAdmin") || checkRole('Delete') ? (   
  <>
      <InnerDItem 
      label="Delete"
      handlePress={() => props.navigation.navigate('Delete')}
      />
  </>
) : (<></>)
}


{checkRole("SuperAdmin") || checkRole('MemberList') ? (   
  <>
      <InnerDItem 
      label="Member List"
      handlePress={() => props.navigation.navigate('MemberList')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('BulkRegistration') ? (   
  <>
      <InnerDItem 
      label="Bulk Registration"
      handlePress={() => props.navigation.navigate('Bulk Registration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('BulkStaffUpload') ? (   
  <>
      <InnerDItem 
      label="Bulk Staff Upload"
      handlePress={() => props.navigation.navigate('BulkStaffUpload')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('GenerateStaffList') ? (   
  <>
      <InnerDItem 
      label="Generate Staff List"
      handlePress={() => props.navigation.navigate('GenerateStaffList')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('LessonNotes') ? (   
  <>
      <InnerDItem 
      label="LessonNotes"
      handlePress={() => props.navigation.navigate("LessonNotes")}
      />
  </>
) : (<></>)
}


{checkRole("SuperAdmin") || checkRole('Assessments') ? (   
  <>
      <InnerDItem 
      label="Assessments"
      handlePress={() => props.navigation.navigate("Assessments")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <>
      <InnerDItem 
      label="Annoucements"
      handlePress={() => props.navigation.navigate("Annoucements")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('AssigntoClassroom') ? (   
  <>
      <InnerDItem 
      label="Assign to Classroom"
      handlePress={() => props.navigation.navigate("AssigntoClassroom")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('AssigntoSubject') ? (   
  <>
      <InnerDItem 
      label="Assign to Subject"
      handlePress={() => props.navigation.navigate("AssigntoSubject")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('AssigntoActivities') ? (   
  <>
      <InnerDItem 
      label="Assign to Activities"
      handlePress={() => props.navigation.navigate("AssigntoActivities")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Salary') ? (   
  <>
      <InnerDItem 
      label="Salary"
      handlePress={() => props.navigation.navigate("Salary")}
      />
  </>
) : (<></>)
}


{checkRole("SuperAdmin") || checkRole('Clocking') ? (   
  <>
      <InnerDItem 
      label="Clocking"
      handlePress={() => props.navigation.navigate("Clocking")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('PersonalChats') ? (   
  <>
      <InnerDItem 
      label="Personal Chats"
      handlePress={() => props.navigation.navigate("PersonalChats")}
      />
  </>
) : (<></>)
}


{checkRole("SuperAdmin") || checkRole('StaffPlatform') ? (   
  <>
      <InnerDItem 
      label="Staff Platform"
      handlePress={() => props.navigation.navigate("StaffPlatform")}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('PTAPlatform') ? (   
  <>
      <InnerDItem 
      label="PTA Platform"
      handlePress={() => props.navigation.navigate("PTAPlatform")}
      />
  </>
) : (<></>)
}




       
       
</DropList>

<MultiDropList icon="cubes-stacked" iconsrc={FontAwesome6} title="Learning System Mgmt">



<InnerDropList title="Class">

{checkRole("SuperAdmin") || checkRole('Register') ? (   
  <>
      <InnerDItem 
      label="Register"
      handlePress={() => props.navigation.navigate('Register')}
      />
  </>
) : (<></>)
}



</InnerDropList>

<InnerDropList title="Discussions">

{checkRole("SuperAdmin") || checkRole('ViewDiscussions') ? (   
  <>
      <InnerDItem 
      label="View Discussions"
      handlePress={() => props.navigation.navigate('ViewDiscussions')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('TeacherChat') ? (   
  <>
      <InnerDItem 
      label="Teacher's Chat"
      handlePress={() => props.navigation.navigate('TeacherChat')}
      />
  </>
) : (<></>)
}


{checkRole("SuperAdmin") || checkRole('StudentChat') ? (   
  <>
      <InnerDItem 
      label="Student's Chat"
      handlePress={() => props.navigation.navigate('StudentChat')}
      />
  </>
) : (<></>)
}




</InnerDropList>

<InnerDropList title="Subjects">

{checkRole("SuperAdmin") || checkRole('SubjectList') ? (   
  <>
      <InnerDItem 
      label="Subject List"
      handlePress={() => props.navigation.navigate('SubjectList')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('SubjectTeachers') ? (   
  <>
      <InnerDItem 
      label="Subject Teachers"
      handlePress={() => props.navigation.navigate('SubjectTeachers')}
      />
  </>
) : (<></>)
}



</InnerDropList>


<InnerDropList title="Announcement">

{checkRole("SuperAdmin") || checkRole('StudentAnnoucement') ? (   
  <>
      <InnerDItem 
      label="Student"
      handlePress={() => props.navigation.navigate('StudentAnnoucement')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('StaffAnnoucement') ? (   
  <>
      <InnerDItem 
      label="Staff"
      handlePress={() => props.navigation.navigate('StaffAnnoucement')}
      />
  </>
) : (<></>)
}



</InnerDropList>

<InnerDropList title="Assignment">

{checkRole("SuperAdmin") || checkRole('UploadAssignment') ? (   
  <>
      <InnerDItem 
      label="Upload Assignment"
      handlePress={() => props.navigation.navigate('UploadAssignment')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('ViewAssignment') ? (   
  <>
      <InnerDItem 
      label="View Assignment"
      handlePress={() => props.navigation.navigate('ViewAssignment')}
      />
  </>
) : (<></>)
}




</InnerDropList>


</MultiDropList>


<MultiDropList icon="text-document" iconsrc={Entypo} title="Lesson Notes">

<InnerDropList title="Create Notes">

{checkRole("SuperAdmin") || checkRole('UploadLessonNotes') ? (   
  <>
      <InnerDItem 
      label="Upload Lesson Notes"
      handlePress={() => props.navigation.navigate('UploadLessonNotes')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('TypeLessonNotes') ? (   
  <>
      <InnerDItem 
      label="Type Lesson Notes"
      handlePress={() => props.navigation.navigate('TypeLessonNotes')}
      />
  </>
) : (<></>)
}



</InnerDropList>


<InnerDropList title="View Notes">

{checkRole("SuperAdmin") || checkRole('ViewLessonNotesFile') ? (   
  <>
      <InnerDItem 
      label="View Lesson Notes File"
      handlePress={() => props.navigation.navigate('ViewLessonNotesFile')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('ViewTypedLessonNotes') ? (   
  <>
      <InnerDItem 
      label="View Typed Lesson Notes"
      handlePress={() => props.navigation.navigate('ViewTypedLessonNotes')}
      />
  </>
) : (<></>)
}



</InnerDropList>


<InnerDropList title="Update Notes">

{checkRole("SuperAdmin") || checkRole('UpdateLessonNotesFile') ? (   
  <>
      <InnerDItem 
      label="Update Lesson Notes File"
      handlePress={() => props.navigation.navigate('UpdateLessonNotesFile')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('UpdateTypedLessonNote') ? (   
  <>
      <InnerDItem 
      label="Update Typed Lesson Notes"
      handlePress={() => props.navigation.navigate('UpdateTypedLessonNote')}
      />
  </>
) : (<></>)
}



</InnerDropList>

<InnerDropList title="Delete Notes">

{checkRole("SuperAdmin") || checkRole('DeleteLessonNotesFile') ? (   
  <>
      <InnerDItem 
      label="Delete Lesson Notes File"
      handlePress={() => props.navigation.navigate('DeleteLessonNotesFile')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('DeleteTypedLessonNote') ? (   
  <>
      <InnerDItem 
      label="Delete Typed Lesson Notes"
      handlePress={() => props.navigation.navigate('DeleteTypedLessonNote')}
      />
  </>
) : (<></>)
}



</InnerDropList>





</MultiDropList>

<DropList icon="bus-alt" iconsrc={FontAwesome5} title="Transport">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>



<DropList icon="attach-money" iconsrc={MaterialIcons} title="Accounting">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="graph" iconsrc={Octicons} title="Reports">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="human-capacity-increase" iconsrc={MaterialCommunityIcons} title="Human Resource">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="persons" iconsrc={Fontisto} title="Administration">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="clipboard-check-multiple" iconsrc={MaterialCommunityIcons} title="Academic Boards">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="add-user" iconsrc={Entypo} title="Registrar">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="money-bill-alt" iconsrc={FontAwesome5} title="Bursary">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="soccer-ball-o" iconsrc={FontAwesome} title="Sports Coordination">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="library-outline" iconsrc={Ionicons} title="Library">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="house-chimney-crack" iconsrc={FontAwesome6} title="Domestics">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="book-education" iconsrc={MaterialCommunityIcons} title="Special Education">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="campaign" iconsrc={MaterialIcons} title="Marketing">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="event-available" iconsrc={MaterialIcons} title="Event Planners">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="persons" iconsrc={Fontisto} title="Counseling">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="fast-food-sharp" iconsrc={Ionicons} title="Kitchen">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="health-and-safety" iconsrc={MaterialIcons} title="Health N Safety">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>

<DropList icon="computer" iconsrc={FontAwesome6} title="System Management">
       
{checkRole("SuperAdmin") || checkRole('BusAdministration') ? (   
  <>
      <InnerDItem 
      label="Bus Administration"
      handlePress={() => props.navigation.navigate('BusAdministration')}
      />
  </>
) : (<></>)
}

{checkRole("SuperAdmin") || checkRole('Pickup') ? (   
  <>
      <InnerDItem 
      label="Pickup"
      handlePress={() => props.navigation.navigate('Pickup')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Departure') ? (   
  <>
      <InnerDItem 
      label="Departure"
      handlePress={() => props.navigation.navigate('Departure')}
      />
  </>
) : (<></>)
}



{checkRole("SuperAdmin") || checkRole('Arrivals') ? (   
  <>
      <InnerDItem 
      label="Arrivals"
      handlePress={() => props.navigation.navigate('Arrivals')}
      />
  </>
) : (<></>)
}

    
       
</DropList>


{/*Student Links, Only Student Can see it  */}

<StraightLink 
icon="globe" 
iconsrc={FontAwesome} 
title="TimeTable"
handlePress={() => props.navigation.navigate('TimeTable')}
/>

<StraightLink 
icon="book" 
iconsrc={FontAwesome} 
title="Lesson"
handlePress={() => props.navigation.navigate('Lesson')}
/>

<StraightLink 
icon="calendar-days" 
iconsrc={FontAwesome6} 
title="Event"
handlePress={() => props.navigation.navigate('Event')}
/>


<StraightLink 
icon="campaign" 
iconsrc={MaterialIcons} 
title="Announcements"
handlePress={() => props.navigation.navigate('Announcements')}
/>

<StraightLink 
icon="chatbubble-ellipses-sharp" 
iconsrc={Ionicons} 
title="Discussions"
handlePress={() => props.navigation.navigate('Discussions')}
/>

<StraightLink 
icon="assignment" 
iconsrc={MaterialIcons} 
title="Assignments"
handlePress={() => props.navigation.navigate('Assignments')}
/>

<StraightLink 
icon="quiz" 
iconsrc={MaterialIcons} 
title="Tests & Quizzes"
handlePress={() => props.navigation.navigate('Tests&Quizzes')}
/>

<StraightLink 
icon="calendar-days" 
iconsrc={FontAwesome6} 
title="GradeBook"
handlePress={() => props.navigation.navigate('GradeBook')}
/>

<StraightLink 
icon="google-classroom" 
iconsrc={MaterialCommunityIcons} 
title="Classroom"
handlePress={() => props.navigation.navigate('Classroom')}
/>

<StraightLink 
icon="clipboard-notes" 
iconsrc={Foundation} 
title="Notes"
handlePress={() => props.navigation.navigate('Notes')}
/>

<StraightLink 
icon="report" 
iconsrc={Octicons} 
title="Reports"
handlePress={() => props.navigation.navigate('Reports')}
/>

<StraightLink 
icon="attach-money" 
iconsrc={MaterialIcons} 
title="Payments"
handlePress={() => props.navigation.navigate('Payments')}
/>








  
  <TouchableOpacity
  style={styles.button}
  onPress={() => BackHandler.exitApp()}
 >
<Text >Logout </Text>
</TouchableOpacity>
  

<View style={{marginBottom:40}}>

</View>


    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
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
  position: 'absolute',
  bottom: 0,
  }

})

export default function App() {
  return (
    <Drawer.Navigator

      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: "#26293C", // Set the header background color to black
        },
        headerTintColor: 'white', // Set the text color of header titles to white
        drawerStyle: {
          backgroundColor: "#26293C",
          height:"90%",
          borderTopRightRadius:30,
          borderBottomRightRadius:30,
  
        },

      })}
>

      <Drawer.Screen name="Dashboard" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
      <Drawer.Screen name="AddStudent" component={NotificationScreen} />
    
    
    
    
    
    
    </Drawer.Navigator>
  );
}
