import React from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

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
    <View >
      <Text>لا يوجد مهام
         قم بإضافة مهامك اليومية للاستمتاع بإدارتها وتنظيم يومك</Text>
    </View>
  )
}

type tasksType={
  id: string,
  title: string
}

const mytasks:tasksType[] = [
  {
    id: "1",
    title: "الذهاب الى العمل"
  },
  {
    id: "2",
    title: "البدء بالعمل وتجهيز المكتب بتشغيل اللابتوب وهاتف العمل"
  },
  {
    id: "3",
    title: "الانتهاء من العمل والذهاب للمنزل"
  }
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
      <SafeAreaProvider>
        <SafeAreaView>
          <Header></Header>
          <FlatList
            data={mytasks}
            renderItem={(task)=>{
              return(
                <TouchableOpacity onPress={()=> {console.log("item with id "+task.item.id+" pressed")}}>
                  <Text>{task.item.title}</Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item.id}
            ListEmptyComponent={noDataComp}>
          </FlatList>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  nodatacom:{
    alignItems: "center",
    flex: 1,
    fontWeight: 'bold',
    fontSize: 45
  }
});

export default App;
