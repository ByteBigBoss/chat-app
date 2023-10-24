import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView, FlatList, Image, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { BookMark } from "./ProfileComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function Moments({ navigation }) {

    const [favoriteFriends, setFavoriteFriends] = useState([]);

    async function loadFavoriteList() {

        const userJSONText = await AsyncStorage.getItem("user");
        const form = new FormData();
        form.append("userJSONText", userJSONText);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                setFavoriteFriends(JSON.parse(request.responseText));
            }
        };
        request.open("POST", "http://localhost/chatApp/favorite_users.php", true);
        request.send(form);

    }

    const callFriends = () => { loadFavoriteList(); }
    useEffect(callFriends, []);

    const [items, setItems] = useState([]);

    async function loadMoments() {
        const userJSON = await AsyncStorage.getItem("user");
        const form = new FormData();
        form.append("userJSON",userJSON);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                setItems(JSON.parse(request.responseText));
            }
        };
        request.open("POST", "http://localhost/chatApp/load_moments.php", true);
        request.send(form);
    }
        // call function once immediately upon page load 
        const call = () => { loadMoments(); }
        useEffect(call, []);
    
        // call function every 5000 millisenconds after first execution
        function start() {
            setInterval(loadMoments, 5000);
        }
        useEffect(start, []);

    const mainUI = (
        <SafeAreaView style={styles.main}>
            <View style={styles.topBox}>
                <Text style={styles.screenTitle}>Moments</Text>
                <TouchableOpacity style={styles.iconBox} onPress={() => { navigation.navigate("PostMoment") }}>
                    <Icon name='add' size={30} color={"#4602FF"} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <FlatList
                        data={favoriteFriends}
                        renderItem={friendListUI}
                        horizontal={true}
                        contentContainerStyle={styles.list1}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={styles.list1Box}
                    />

                    <FlatList
                        data={items}
                        renderItem={itemUI}
                        showsVerticalScrollIndicator={false}
                        style={favoriteFriends == "" ? styles.list2Change : styles.list2}
                        scrollEnabled={false}
                        contentContainerStyle={styles.list2Box}
                    />
                </View>
            </ScrollView>

            <View style={styles.bottomBox}>
                <Pressable style={styles.view2}>
                    <Icon name="rocket" size={21} style={styles.bottomIcon1} color={"#5A02FF"} />
                    <Text style={styles.bottomSelectText}>Moments</Text>
                </Pressable>

                <Pressable style={styles.view2} onPress={message = () => { navigation.navigate("Message") }} >
                    <Icon name="chatbubbles-outline" size={21} style={styles.bottomIcon1} color={"#6E6E6E"} />
                    <Text style={styles.bottomText}>Message</Text>
                </Pressable>

                <Pressable style={styles.view2} onPress={myProfile = () => { navigation.navigate("MyProfile") }}>
                    <Icon name="person-outline" size={21} style={styles.bottomIcon1} color={"#6E6E6E"} />
                    <Text style={styles.bottomText}>My Profile</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );

    function friendListUI({ item }) {
        const ui = (
            <Pressable>
                <View>
                    <Image source={{ uri: "http://localhost/chatApp/" + item.profile }} style={styles.favoriteFriends} />
                    <View style={item.status != "2" ? styles.statusOnline : styles.statusOffline}></View>
                </View>
            </Pressable>
        );

        return ui;
    }


    function itemUI({ item }) {
    
        const ui = (
            <Pressable>
                <View style={styles.item}>
    
                    <View style={styles.momentView1}>
                        <Image source={{ uri: "http://localhost/chatApp/" + item.profile }} style={styles.momentUser} />
                        <View style={styles.momentView2}>
                            <Text style={styles.momentText1}>{item.fname} {item.lname}</Text>
                            <Text style={styles.momentText2}>{item.time}</Text>
                        </View>
                        <View style={styles.bookMarkIconBox}>
                        <TouchableOpacity onPress={requsetBookMark}><Icon name={item.bookMode=="no"?"bookmark-outline":"bookmark"} size={24} style={item.bookMode=="no"?styles.bookMarkIcon:styles.bookMarkIconChange}/></TouchableOpacity>
                        </View>
                    </View>
    
                    <View style={styles.box1} >
                        <Text style={styles.titleText}>{item.title}</Text>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
    
                    {item.mode == 'multiple' ? <FlatList
                        data={item.images}
                        renderItem={mulltiImageUI}
                        horizontal={true}
                        contentContainerStyle={styles.mediaList1}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={styles.medialist1Box}
                    /> : item.mode == "single" ? <Image source={{ uri: "http://localhost/chatApp/" + item.singleImage }} style={styles.singleImage} /> : ""}
                    {/* <View><Text style={{width:"100%",backgroundColor:"red",position:"absolute",zIndex:10,alignSelf:"center",top:190,paddingHorizontal:16,textAlign:"center"}}>Hello</Text></View> */}
                    <View style={item.mode != 'none' ? styles.momentStatus : styles.momentStatusNoneImage}>
                        <Text style={styles.momentStatusText}>{item.like} Likes</Text>
                        <Text style={styles.momentStatusText}>•</Text>
                        <Text style={styles.momentStatusText}>{item.dislike} Dislikes</Text>
                        <Text style={styles.momentStatusText}>•</Text>
                        <Text style={styles.momentStatusText}>{item.share} Shares</Text>
                    </View>

                    <View style={styles.action1}>
                        <View style={styles.action2}>
                            <TouchableOpacity onPress={requestLike} ><Iconss.default name={item.likeMode=="no"?'thumb-up-outline':"thumb-up"} size={24}  style={item.likeMode=="no"?styles.icon1:styles.icon1Change} /></TouchableOpacity>
                            <TouchableOpacity onPress={requestDislike}><Iconss.default name={item.dislikeMode=="no"?'thumb-down-outline':"thumb-down"} size={24} style={item.dislikeMode=="no"?styles.icon2:styles.icon2Change}  /></TouchableOpacity>
                        </View>
                        <View style={styles.action3}>
                            <TouchableOpacity onPress={requestShare}><Iconss.default name={'share-outline'} size={24} style={styles.icon3}  /></TouchableOpacity>
                        </View>
                    </View>
    
                </View>
            </Pressable>
        );
    
    
        async function requestLike() {
            const userJSON = await AsyncStorage.getItem("user");
            const form = new FormData();
            form.append("userJSON",userJSON);
            form.append("momentID",item.momentID);
            form.append("action","like");

            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
              if (request.readyState == 4 && request.status == 200) {
               loadMoments();
              }
            };
            request.open("POST", "http://localhost/chatApp/action_momets.php", true);
            request.send(form);
        }
    
        async function requestDislike() {
            const userJSON = await AsyncStorage.getItem("user");
            const form = new FormData();
            form.append("userJSON",userJSON);
            form.append("momentID",item.momentID);
            form.append("actionD","dislike");

            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
              if (request.readyState == 4 && request.status == 200) {
               loadMoments();
              }
            };
            request.open("POST", "http://localhost/chatApp/action_momets.php", true);
            request.send(form);
        }
    
        function requestShare() {
   
        }

        async function requsetBookMark(){
            const userJSON = await AsyncStorage.getItem("user");
            const form = new FormData();
            form.append("userJSON",userJSON);
            form.append("momentID",item.momentID);
            form.append("actionB","book");

            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
              if (request.readyState == 4 && request.status == 200) {
               loadMoments();
              }
            };
            request.open("POST", "http://localhost/chatApp/action_momets.php", true);
            request.send(form);
        }

        return ui;
    }
    
    function mulltiImageUI({ item }) {
    
        const ui = (
            <Pressable>
                <Image source={{ uri: "http://localhost/chatApp/" + item.image }} style={styles.groupImages} />
            </Pressable>
        );
        return ui;
    }

    return mainUI;
}



const styles = StyleSheet.create(
    {
        icon1:{
            color:"black",
        },
        icon1Change:{
            color:"#752CFF",
        },
        icon2:{
            color:"black",
        },
        icon2Change:{
            color:"#752CFF",
        },
        icon3:{
            color:"black",
        },
        bookMarkIcon: {
            color:"black",
        },
        bookMarkIconChange: {
            color:"#7600FF",
        },

        action1: {
            flexDirection: "row",
            width: "100%",
            paddingTop: 20,
            paddingBottom: 24,
            justifyContent: 'center',
        },
        action2: {
            width: "50%",
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingStart: 24,
            gap: 24,
        },
        action3: {
            width: "50%",
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingEnd: 24,
        },

        momentStatusText: {
            fontSize: 13,
            fontFamily: "Saira",
            fontWeight: "600",
            color: "#606060",
            start: 16,
        },
        momentStatus: {
            flexDirection: "row",
            paddingTop: 17,
            paddingBottom: 16,
            alignItems: "center",
            width: "100%",
            gap: 6,
            borderBottomWidth: 0.5,
            borderColor: "#D6D6D6",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
        },
        momentStatusNoneImage: {
            flexDirection: "row",
            paddingTop: 17,
            paddingBottom: 16,
            alignItems: "center",
            width: "100%",
            gap: 6,
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            borderColor: "#D6D6D6",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            marginTop: 30,
        },
        singleImage: {
            width: 370,
            height: 370,
            borderRadius: 6,
            marginTop: 16,
        },
        groupImages: {
            width: 320,
            height: 320,
            borderRadius: 6,
        },
        mediaList1: {
            alignItems: "center",
            gap: 16,
            flexDirection: "row",
            paddingEnd: 40,
        },
        medialist1Box: {
            paddingTop: 16,
            paddingStart: 16,
            alignSelf: "flex-start",
        },
        box1: {
            paddingTop: 13,
            paddingHorizontal: 16,
            width: "100%",
        },
        titleText: {
            fontSize: 18,
            fontFamily: "Saira",
            fontWeight: "600",
            color: "black",
            maxHeight: 60,
            textAlign: "left",
        },
        descriptionText: {
            fontSize: 14,
            fontFamily: "Saira",
            fontWeight: "500",
            color: "#3B3B3B",
            marginTop: 2,
            maxHeight: 45,
        },
        momentText1: {
            fontSize: 16,
            fontFamily: "Saira",
            fontWeight: "600",
            color: "black",
        },
        momentText2: {
            fontSize: 12,
            fontFamily: "Maven Pro",
            fontWeight: "500",
            color: "#808080",
        },
        momentView2: {
            width: "60%",
            paddingStart: 8,
        },
        bookMarkIconBox: {
            alignItems: "flex-end",
            paddingEnd: 24,
            position: "absolute",
            end: 0,
            paddingTop: 16,
        },

        momentView1: {
            width: "100%",
            flexDirection: "row",
            paddingStart: 16,
            paddingTop: 16,
            alignItems: "center",
        },
        momentUser: {
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#C4C4C4",
        },
        list2Box: {
            paddingHorizontal: 16,
            paddingBottom: 14,
        },
        item: {
            alignItems: "center",
            backgroundColor: "#F7F7F7",
            borderRadius: 10,
            marginBottom: 16,
        },


        view2: {
            alignItems: "center",
        },
        bottomSelectText: {
            fontSize: 12,
            fontFamily: "Saira",
            fontWeight: "600",
            color: "#5A02FF",
        },
        bottomText: {
            fontSize: 12,
            fontFamily: "Saira",
            fontWeight: "600",
            color: "#6E6E6E",
        },
        bottomIcon1: {
            marginTop: 14,
        },
        bottomBox: {
            width: "100%",
            height: 80,
            position: "absolute",
            bottom: 0,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "center",
            gap: 78,
            borderTopWidth: 0.3,
            borderColor: "#D6D6D6",
        },

        main: {
            flex: 1,
            alignItems: "center",
            backgroundColor: "#FFFFFF",
        },
        iconBox: {
            flexDirection: "row",
            gap: 24,
            width: "50%",
            justifyContent: "flex-end",
            paddingEnd: 24,
        },
        topBox: {
            width: "100%",
            height: 104,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1.5 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
        },
        screenTitle: {
            fontSize: 34,
            fontWeight: "bold",
            fontFamily: "Saira",
            color: "black",
            width: "50%",
            paddingStart: 30,
        },
        list1: {
            alignItems: "center",
            gap: 16,
            flexDirection: "row",
            paddingEnd: 40,

        },
        list2: {
            paddingBottom: 40,
        },
        list2Change: {
            top: -40,
        },
        list1Box: {
            paddingVertical: 30,
            paddingStart: 24,
            alignSelf: "flex-start",
        },

        statusOnline: {
            width: 16,
            height: 16,
            borderWidth: 2,
            borderRadius: 50,
            borderColor: "#FFFFFF",
            backgroundColor: "#00E32C",
            position: "absolute",
            alignSelf: "flex-end",
            bottom: 0,
        },
        statusOffline: {
            width: 16,
            height: 16,
            borderWidth: 2,
            borderRadius: 50,
            borderColor: "#FFFFFF",
            backgroundColor: "#E30060",
            position: "absolute",
            alignSelf: "flex-end",
            bottom: 0,
        },
        favoriteFriends: {
            width: 59,
            height: 59,
            borderRadius: 50,
            backgroundColor: "#F8F8F8",
            borderWidth: 2,
            borderColor: "#D8D8D8",
        },


    }
);