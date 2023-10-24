import React, { useState } from "react";
import { View, useWindowDimensions, SafeAreaView, ScrollView, StyleSheet, Text, FlatList, Pressable, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

export function FavoriteFriends(){
  const [favourite,setFavorite] = useState("heart-outline");
  const [hertFill,setHeartFill] = useState("#894AFF");

    const ui =(
        <View style={Route2Styles.box4}>
        <Icon name="person-circle-outline" size={24} color={"black"}/>
        <Icon name={favourite} size={24} color={hertFill} onPress={
            ()=>{
                if(favourite=="heart-outline"){
                    setFavorite("heart");
                    setHeartFill("#6200FF");
                }else{
                    setFavorite("heart-outline")
                    setHeartFill("#894AFF");
                }
            }
        }/>
        <Icon name="chatbubble-ellipses-outline" size={24} color={"black"}/>
      </View>
    );

    return ui;
}

export function BookMark(){

    const [mark,setMark] = useState("bookmark-outline");
    const [BG,setBG] = useState("#000000");

    const ui = (
        <Icon name={mark} size={24} style={Route2Styles.bookMarkIcon} color={BG} onPress={()=>{
            if(mark=="bookmark-outline"){
                setMark("bookmark");
                setBG("#7600FF");
            }else{
                setMark("bookmark-outline");
                setBG("#000000");
            }
        }}/>
    );
    return ui;
}

export function SavedBookMark(){

    const [mark,setMark] = useState("bookmark");
    const [BG,setBG] = useState("#7600FF");

    const ui = (
        <Icon name={mark} size={24} style={Route2Styles.bookMarkIcon} color={BG} onPress={()=>{
            if(mark=="bookmark"){
                setMark("bookmark-outline");
                setBG("#000000");
            }else{
                setMark("bookmark");
                setBG("#7600FF");
            }
        }}/>
    );
    return ui;
}



const Route2Styles = StyleSheet.create(
    {
      // MyFriends route
      box4:{
        flexDirection:"row",
        justifyContent:"center",
        gap:37,
        paddingTop:18,
      },
      bookMarkIcon:{

      },

    }

);