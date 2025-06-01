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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Header from './components/header.tsx'

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const noDataComp= ()=>{
  return(
    <View style={styles.nodatacom}>
      <Text style={{color:"white", padding: 40, alignItems:"center", fontWeight:"bold", fontSize: 20, textAlignVertical:"center"}}>لا يوجد مهام
         قم بإضافة مهامك اليومية للاستمتاع بإدارتها وتنظيم يومك</Text>
    </View>
  )
}

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
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
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
            data={mytasks}
            renderItem={(task)=>{
              return(
                <TouchableOpacity style={styles.tasksBody} onLongPress={createAlert}>
                   <BouncyCheckbox
                    isChecked={task.item.isDone ? true : false}
                    disabled={false}
                    onPress={()=> {console.log("item with id "+task.item.id+" pressed")}}
                    fillColor="green"
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
  }
});

export default App;
