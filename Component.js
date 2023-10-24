import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView, FlatList, Image, Alert ,TextInput} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

function AddText (){
    const [createIn,setCreateIn] = useState(null);

    const ui = (
        <Icon name="text" size={24} color={"black"} onPress={CreateTextInput}/>

    );

    function CreateTextInput(){
        const ui = (
            <TextInput style={styles.createInput}/>
        );
        setCreateIn(ui);
        return ui;
    }

    return ui;
}

const styles = StyleSheet.create(
    {
        createInput:{
            backgroundColor:"black",
            width:398,
            height:100,
        },
    }
);