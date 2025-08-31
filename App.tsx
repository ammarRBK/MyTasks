import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  TextInput,
  Platform,
  LayoutAnimation,
  UIManager
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

const hardData= [
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

  //Enable layout animation on Android
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
//tasks state for conditional styling
  const [mytasks, setMytasks]= useState<tasksType[]>(hardData)
//show Modal state
  const [showModal, setShowModal]= useState(false);
//new task title state
  const [newTTitle, onChangeNewTTitle]= useState("");
//build Alert that will pupub specified buttons when user long-press on a task 
  const createAlert= (taskId: string)=>{
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
          onPress: ()=> deleteTask(taskId),
          style: 'destructive'
        },
        
      ],
      {
        cancelable: true
      }
    )
  }

// add new task method
  const addTask= () =>{
    let newTaskTitle= newTTitle;
    //check if the new task title is not empty string
    if(newTaskTitle !== ""){
      //new task object
      let newTask= {
        id: Math.random().toString(36).substring(2, 10),
        title: newTaskTitle,
        isDone: false
      }
      // push the new task to mytasks array
      mytasks.push(newTask);
      //empty the task input
      onChangeNewTTitle('');
      //close the modal
      setShowModal(!showModal);
    }
    console.log("Please write something in task title")
  }

  const changeTaskStatus= (taskId: string) =>{
//loop over tasks
    const updatedTasks = mytasks.map(task =>
//check if task id is same as the task id comes from the user and change the task status if is the same
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    );
//update tasks array
    setMytasks(updatedTasks);
  }

  const deleteTask = (taskId: string) => {
    // Animate the layout change
    LayoutAnimation.configureNext({
      duration: 250,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    //delete task from tasks array
    const updatedTasks = mytasks.filter(task => task.id !== taskId);
    setMytasks(updatedTasks);
  };

  return (
      <SafeAreaProvider>
        <SafeAreaView>
          <Header></Header>
          <FlatList
            style={{paddingBottom: 80}}
            data={mytasks}
            extraData={mytasks} //Important for animation to trigger
            renderItem={(task)=>{
              return(
                <View style={styles.taskWrapper}>
                  <TouchableOpacity style={styles.tasksBody} onLongPress={()=>createAlert(task.item.id)}>
                    <BouncyCheckbox
                      isChecked={task.item.isDone ? true : false}
                      disabled={false}
//onpress runs change task status method
                      onPress={()=> {
                        changeTaskStatus(task.item.id)
                        console.log("item with id "+task.item.id+" pressed")
                      }}
//when task is completed the checkbox color will be green
                      fillColor="green"
//when task isn’t completed the checkbox color will be #757575
                      unFillColor="#757575"
                      size={20}
                      iconStyle={{marginLeft: 8}}/>
                    <Text style={[styles.taskTitle, task.item.isDone && styles.taskDoneStyle]}>{task.item.title}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
            keyExtractor={item => item.id}
            ListEmptyComponent={noDataComp}
            >
          </FlatList>

{/* modal component           */}
           <Modal
        //if true the modal will bee visible
            visible= {showModal}
            animationType='slide'
      //modal background to fit whole screeen
            transparent={false}
      //callback will be run when user press on hardware backbutton 
            onRequestClose={()=> setShowModal(!showModal)}
            statusBarTranslucent= {true}
          >
            <View style={styles.modalStyle}>
              <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={{fontSize: 20, marginTop: 20}}>
                      إضافة مهمة جديدة
                    </Text>
                    <Icon name='close' onPress={()=> setShowModal(!showModal)} size={24} color={'black'} style={{position: "absolute", right: 170, top: '45%'}}></Icon>
                  </View>

                  <TextInput
                  placeholder='اكتب مهمتك الجديدة هنا'
                  style= {styles.addTaskInput}
                  //new task title state and vlue will change immedietly if user wrote something in add task text input box
                  onChangeText={onChangeNewTTitle}></TextInput>
                  {/* submit the new task button will be disabled and conditionaly styled if add task box still empty  */}
                  <TouchableOpacity disabled={newTTitle == ""} onPress={addTask} style={[styles.addTaskButton, newTTitle=="" && styles.addTaskButtonDisabled]}>
                    <Text style={{color: 'white', textAlign: "center", fontSize: 18}}>
                      إضافة المهمة
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>     
          </Modal>
{/* add task button will pop up a modal */}
          <TouchableOpacity onPress={()=> setShowModal(!showModal)} style={styles.addButtonContainer}>
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
  taskWrapper: {
    overflow: 'hidden',
  },
  tasksBody:{
    height: "auto",
    width: "auto",
    flexDirection: "row",
    margin: 13,
    overflow: 'hidden',
    borderRadius: 50,
    borderColor: "blue",
    borderWidth: 2,
    backgroundColor: "pink",
  },
  taskTitle: {
    fontSize: 18,
    margin: 10
  },
  taskDoneStyle:{
    textDecorationLine: 'line-through',
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
  modalHeader:{
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  modalStyle:{
   justifyContent: "center",
   flex: 1,
   alignItems: "center",
   backgroundColor: "rgba(0, 0, 0, 0);"
  },
  modalContent:{
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    textAlign: "center",
    height: 400,
    width: 300
  },
  addTaskInput: {
    color: "black",
    marginTop: 90,
    borderRadius: 20,
    borderBlockColor: "red",
    borderWidth: 2,
    width: 250,
    textAlign: "center"
  },
  addTaskButton:{
    marginTop: 30,
    paddingTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    height: 50,
    alignItems: "center",
    backgroundColor: "green"
  },
  addTaskButtonDisabled:{
    backgroundColor: '#aaa',
    opacity: 0.6,
  }
});

export default App;
