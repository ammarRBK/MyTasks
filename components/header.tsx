import React from "react";
import { Text, View, StyleSheet  } from 'react-native';

const Header= () =>{
    return (
        <View style={styles.headerContainer}>
            <Text>Hello from header component</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    headerContainer:{
        backgroundColor: "#fff"
    }
})

export default Header; 