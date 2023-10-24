import * as Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState,useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView, FlatList, Image, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Icons() {

    const [like,setLike] = useState ('thumb-up-outline');
    const [dislike,setDislike] = useState ('thumb-down-outline');
    const [share,setShare] = useState ('share-outline');

    const ui = (
        <View style={styles.View1}>
            <View style={styles.View2}>
            
                <Iconss.default name={like} size={24} color={"black"} style={styles.icon1}

                    onPress={() => {
                        if (like==='thumb-up-outline'){
                            setLike('thumb-up');
                            setDislike('thumb-down-outline');

                            // async function likes(){
                            //     const userJSONText = await AsyncStorage.getItem("user");
                            //     const form = new FormData();
                            //     form.append("userJSONText",userJSONText);
                            //     form.append("like",1);
                        
                            //     var request = new XMLHttpRequest();
                            //     request.onreadystatechange=function(){
                            //         if(request.readyState==4&&request.status==200){
                            //             // setFavoriteFriends(JSON.parse(request.responseText));
                            //         }
                            //     };
                            //     request.open("POST","http://localhost/chatApp/moment_actions.php",true);
                            //     request.send(form);
                            // }

                            // const callLike = ()=>{likes();}
                            // useEffect(callLike,[]);

                        }else{

                            setLike('thumb-up-outline');

                            // async function likes(){
                            //     const userJSONText = await AsyncStorage.getItem("user");
                            //     const form = new FormData();
                            //     form.append("userJSONText",userJSONText);
                            //     form.append("like",0);
                        
                            //     var request = new XMLHttpRequest();
                            //     request.onreadystatechange=function(){
                            //         if(request.readyState==4&&request.status==200){
                            //             // setFavoriteFriends(JSON.parse(request.responseText));
                            //         }
                            //     };
                            //     request.open("POST","http://localhost/chatApp/moment_actions.php",true);
                            //     request.send(form);
                            // }

                            // const callLike = ()=>{likes();}
                            // useEffect(callLike,[]);

                        }
                    }}

                />

                <Iconss.default name={dislike} size={24} color={"black"} style={styles.icon2}

                    onPress={() => {
                        if (dislike==='thumb-down-outline'){
                            setDislike('thumb-down');
                            setLike('thumb-up-outline');

                            // async function dislikes(){
                            //     const userJSONText = await AsyncStorage.getItem("user");
                            //     const form = new FormData();
                            //     form.append("userJSONText",userJSONText);
                            //     form.append("dislike",1);
                        
                            //     var request = new XMLHttpRequest();
                            //     request.onreadystatechange=function(){
                            //         if(request.readyState==4&&request.status==200){
                            //             // setFavoriteFriends(JSON.parse(request.responseText));
                            //         }
                            //     };
                            //     request.open("POST","http://localhost/chatApp/moment_actions.php",true);
                            //     request.send(form);
                            // }

                            // const callDislike = ()=>{dislikes();}
                            // useEffect(callDislike,[]);

                        }else{
                            setDislike('thumb-down-outline');

                            // async function dislikes(){
                            //     const userJSONText = await AsyncStorage.getItem("user");
                            //     const form = new FormData();
                            //     form.append("userJSONText",userJSONText);
                            //     form.append("dislike",0);
                        
                            //     var request = new XMLHttpRequest();
                            //     request.onreadystatechange=function(){
                            //         if(request.readyState==4&&request.status==200){
                            //             // setFavoriteFriends(JSON.parse(request.responseText));
                            //         }
                            //     };
                            //     request.open("POST","http://localhost/chatApp/moment_actions.php",true);
                            //     request.send(form);
                            // }

                            // const callDislike = ()=>{dislikes();}
                            // useEffect(callDislike,[]);
                        }
                    }}

                />
            </View>
            <View style={styles.View3}>
                <Iconss.default name={share} size={24} color={"black"} style={styles.icon3}

                    onPress={() => {
                        if (share==='share-outline'){
                      
                        }else{
                          
                        }
                    }}

                />

            </View>
        </View>

    );
    return ui;
}

export function Like(){
    const ui =(
        <Iconss.default name="thumb-up" size={28} color={"black"}/>
    );
    return ui;
}

export function ReciveData(data){
    const [like,setLike] = useState ('thumb-up-outline');
    const [dislike,setDislike] = useState ('thumb-down-outline');
    const [share,setShare] = useState ('share-outline');

    Icons(data);

    // if (like==='thumb-up-outline'){
    //     setLike('thumb-up');
    //     setDislike('thumb-down-outline');


    // }else{

    //     setLike('thumb-up-outline');


    // }

}

const styles = StyleSheet.create(
    {
        View1: {
            flexDirection: "row",
            width: "100%",
            paddingTop: 20,
            paddingBottom: 24,
            justifyContent: 'center',
        },
        View2: {
            width: "50%",
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingStart: 24,
            gap: 24,
        },
        View3: {
            width: "50%",
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingEnd: 24,
        },
    }
);