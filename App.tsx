import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
//import checkbox component
import BouncyCheckbox from "react-native-bouncy-checkbox";
//import Header component from components folder
import Header from './components/header.tsx'
import Icon from '@react-native-vector-icons/ionicons';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

//component well be show and tells the user to add tasks when the tasks array is empty
const noDataComp= ()=>{
  
  return(
    <View style={styles.nodatacom}>
      <Text style={{color:"white", padding: 40, alignItems:"center", fontWeight:"bold", fontSize: 20, textAlignVertical:"center"}}>لا يوجد مهام
         قم بإضافة مهامك اليومية للاستمتاع بإدارتها وتنظيم يومك</Text>
    </View>
  )
}

//assigin task’s types
type tasksType={
  id: string,
  title: string,
  isDone: boolean
}

const mytasks:tasksType[] = [
  {
    id: "1",
    title: "الذهاب الى العمل",
    isDone: false
  },
  {
    id: "2",
    title: "البدء بالعمل وتجهيز المكتب بتشغيل اللابتوب وهاتف العمل",
    isDone: false
  },
  {
    id: "3",
    title: "الانتهاء من العمل والذهاب للمنزل",
    isDone: false
  }
];

function App(): React.JSX.Element {

  
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
//build Alert that will pupub specified buttons when user long-press on a task 
  const createAlert= ()=>{
    Alert.alert("تحرير المهمة", "أختر ماذا تريد أن تفعل مع مهمتك",
      [
        {
          text: "إلغاء",
          style: "cancel"
        },
        {
          text: "تعديل",
          onPress: ()=> console.log("Edit Button Pressed"),
        },
        {
          text: "حذف المهمة",
          onPress: ()=> console.log("Delete Button pressed"),
        },
        
      ],
      {
        cancelable: true
      }
    )
  }

  return (
      <SafeAreaProvider>
        <SafeAreaView>
          <Header></Header>
          <FlatList
            style={{paddingBottom: 80}}
            data={mytasks}
            renderItem={(task)=>{
              return(
                <TouchableOpacity style={styles.tasksBody} onLongPress={createAlert}>
                   <BouncyCheckbox
                    isChecked={task.item.isDone ? true : false}
                    disabled={false}
//onpress runs change task status function
                    onPress={()=> {console.log("item with id "+task.item.id+" pressed")}}
//when task is completed the checkbox color will be green
                    fillColor="green"
//when task isn’t completed the checkbox color will be #757575
                    unFillColor="#757575"
                    size={25}
                    iconStyle={{ marginLeft: 8 }}/>
                  <Text style={styles.taskTitle}>{task.item.title}</Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item.id}
            ListEmptyComponent={noDataComp}
            >
          </FlatList>
{/* //floating action button */}
          <TouchableOpacity onPress={()=> console.log('FAB button pressed')} style={styles.addButtonContainer}>
            <Icon name='add' size={40} color={'white'}></Icon>
          </TouchableOpacity>
          
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  nodatacom:{
    backgroundColor: "red",
    alignItems: "center",
    marginTop: 250,
    borderRadius: 20
  },
  tasksBody:{
    height: "auto",
    width: "auto",
    flexDirection: "row",
    margin: 13,
    overflow: 'hidden',
    borderRadius: 50,
    borderColor: "blue",
    backgroundColor: "pink",
  },
  taskTitle: {
    fontSize: 18,
    paddingRight: 20,
    margin: 10
  },
  addButtonContainer:{
    position: 'absolute',
    left: 30,
    top: 700,
    
    borderRadius: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.3
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default App;
