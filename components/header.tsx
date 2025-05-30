import React from "react";
import { Text, View, StyleSheet  } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

const Header= () =>{
    
    return (
        <View style={styles.headerContainer}>
            <Text>
                <Icon name="menu" size={20} color={"white"}/>
            </Text>
            <Text style={styles.textHeader}>مهامي اليومية</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    headerContainer:{
        backgroundColor: "#40b1ff",
        flexDirection: "row",
        height: 45,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    },
    textHeader:{
        color: "white",
        alignItems: "flex-start",
        fontWeight: "bold",
        fontSize: 15
    }
})

export default Header; 