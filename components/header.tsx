import React from "react";
import { Text, View, StyleSheet  } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

const Header= () =>{
    
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.textHeader}>Hello from header component</Text>
            <Text>
                <Icon name="menu" size={20} color={"white"}/>
            </Text>
        </View>
    )
}

const styles= StyleSheet.create({
    headerContainer:{
        backgroundColor: "lightblue",
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    },
    textHeader:{
        color: "white",
        marginLeft: 50
    }
})

export default Header; 