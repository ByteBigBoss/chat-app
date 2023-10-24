import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export function Message({ navigation }) {

    const [favoriteFriends, setFavoriteFriends] = useState([]);

    async function loadFavoriteList (){

        const userJSONText = await AsyncStorage.getItem("user");
        const form = new FormData();
        form.append("userJSONText",userJSONText);

        var request = new XMLHttpRequest();
        request.onreadystatechange=function(){
            if(request.readyState==4&&request.status==200){
                setFavoriteFriends(JSON.parse(request.responseText));
            }
        };
        request.open("POST","http://localhost/chatApp/favorite_users.php",true);
        request.send(form);

    }

    const callFriends = ()=>{loadFavoriteList();}
    useEffect(callFriends,[]);


    const [items, setItems] = useState([
        {
            "id":1,
            "pic": "/Users/sandaruwan/Documents/ReactNativeProjects/MyChatApp/images/user.jpeg",
            "name": "Sahan Perera",
            "msg": "Hello",
            "time": "07:24 PM",
            "count": "1",
            "status": "Online",
        },
    ]);

    async function loadUserList (text){

        const userJSONText = await AsyncStorage.getItem("user");
        const form = new FormData();
        form.append("userJSONText",userJSONText);
        form.append("text",text);

        var request = new XMLHttpRequest();
        request.onreadystatechange=function(){
            if(request.readyState==4&&request.status==200){
                setItems(JSON.parse(request.responseText));
            }
        };
        request.open("POST","http://localhost/chatApp/load_users.php",true);
        request.send(form);

    }

    function callUserList (){
        loadUserList("");
    }
    useEffect(callUserList,[]);


    //    // call function once immediately upon page load 
    // const call =()=>{callUserList();}
    // useEffect(call,[]);

    // // call function every 2000 millisenconds after first execution
    // function start(){
    //     setInterval(callUserList,2000);
    // }
    // useEffect(start,[]);


    const ui = (
        <SafeAreaView style={styles.main}>

            <View style={styles.topBox}>
                <Text style={styles.screenTitle}>Message</Text>

                <View style={styles.view1}>
                    <TextInput style={styles.searchInput} placeholder={'Find Peoples'} onChangeText={(text)=>{loadUserList(text)}}/>
                    <Icon name='search' size={20} style={styles.searchIcon} />
                </View>
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
                        style={favoriteFriends==""?styles.list2Change:styles.list2}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>

            <View style={styles.bottomBox}>
                <Pressable style={styles.view2} onPress={moments = () => {navigation.navigate("Moments")}}>
                    <Icon name="rocket-outline" size={21} style={styles.bottomIcon1} color={"#6E6E6E"} />
                    <Text style={styles.bottomText}>Moments</Text>
                </Pressable>

                <Pressable style={styles.view2}>
                    <Icon name="chatbubbles" size={21} style={styles.bottomIcon1} color={"#5A02FF"} />
                    <Text style={styles.bottomSelectText}>Message</Text>
                </Pressable>

                <Pressable style={styles.view2} onPress={myProfile = () => {navigation.navigate("MyProfile")}}>
                    <Icon name="person-outline" size={21} style={styles.bottomIcon1} color={"#6E6E6E"} />
                    <Text style={styles.bottomText}>My Profile</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );

    function friendListUI({ item }) {
        const ui = (
            <Pressable onPress={friendPack}>
                <View>
                    <Image source={{ uri: "http://localhost/chatApp/"+item.profile }} style={styles.favoriteFriends} />
                    <View style={item.status != "2" ? styles.statusOnline : styles.statusOffline}></View>
                </View>
            </Pressable>
        );


        function friendPack (){
            const friendObj = {"fname":item.fname,"lname":item.lname,"id":item.userID,"pic":item.profile,"status":item.status};
            navigation.navigate("Chat",friendObj);
            // Alert.alert("Message",item.userID);
        }

        return ui;
    }



    function itemUI({ item }) {

        const ui = (
            <Pressable onPress={pack}>
                <View style={styles.item}>
                    <Image source={{ uri: "http://localhost/chatApp/"+item.pic }} style={styles.itemImage} />
                    <View style={styles.itemView1}>
                        <Text style={styles.itemText1}>{item.fname} {item.lname}</Text>
                        <Text style={styles.itemText2} numberOfLines={1} ellipsizeMode={"tail"}>{item.msg}</Text>
                    </View>
                    <View style={styles.itemView2}>
                        {item.time != "none" ? <Text style={item.count != "0" ? styles.itemText3 : styles.itemText3Change}>{item.time}</Text> : ""}
                        {item.count != "0" ? <View style={styles.countShape}><Text style={styles.itemText4}>{item.count}</Text></View> : ""}
                    </View>
                </View>
            </Pressable>
        );

        return ui;

        function pack (){
            var obj = {"fname":item.fname,"lname":item.lname,"id":item.id,"pic":item.pic,"status":item.status};
            navigation.navigate("Chat",obj);
        }
    }

    return ui;
}

const styles = StyleSheet.create(
    {
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
            flexDirection:"row",
            justifyContent:"center",
            gap:78,
            borderTopWidth:0.3,
            borderColor:"#D6D6D6",
        },

        main: {
            flex: 1,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
        },
        topBox: {
            width: "100%",
            height: 208,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1.5 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            paddingTop: 44,
        },

        screenTitle: {
            fontSize: 34,
            fontWeight: "bold",
            fontFamily: "Saira",
            color: "black",
        },

        searchInput: {
            width: 382,
            height: 50,
            borderStyle: "solid",
            borderWidth: 0.5,
            borderRadius: 20,
            borderColor: "#D8D8D8",
            paddingStart: 20,
            fontSize: 18,
            fontFamily: "Avenir",
            fontWeight: '500',
        },

        searchIcon: {
            position: "absolute",
            alignSelf: "flex-end",
            paddingRight: 20,
            color: "#5A02FF",
        },
        view1: {
            justifyContent: "center",
            marginTop: 30,
        },

        item: {
            flexDirection: "row",
            paddingVertical: 15,
            justifyContent: "center",
            height: 100,
            alignItems: "center",
        },
        itemImage: {
            width: 60,
            height: 60,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#C4C4C4",
        },
        itemView1: {
            marginLeft: 14,
            width: "56%",
        },
        itemView2: {
            alignItems: "flex-end",
            width: "20%",
        },
        itemText1: {
            fontSize: 20,
            fontFamily: "Saira",
            fontWeight: "600",
            color: "black",
        },
        itemText2: {
            fontSize: 17,
            fontFamily: "Maven Pro",
            fontWeight: "500",
            color: "#AFAFAF",
            marginTop: 5,

        },
        itemText3: {
            fontSize: 14,
            fontFamily: "Arial",
            fontWeight: "300",
            color: "#8D8D8D",
        },
        itemText3Change: {
            fontSize: 14,
            fontFamily: "Arial",
            fontWeight: "300",
            color: "#8D8D8D",
            marginBottom: 40,
        },
        itemText4: {
            fontSize: 16,
            fontFamily: "Saira",
            fontWeight: "bold",
            color: "white",
        },
        countShape: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 0.5,
            paddingBottom: 0.5,
            backgroundColor: "#5A02FF",
            borderRadius: 50,
            marginTop: 14,
        },

        favoriteFriends: {
            width: 59,
            height: 59,
            borderRadius: 50,
            backgroundColor: "#F8F8F8",
            borderWidth: 2,
            borderColor: "#D8D8D8",
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
        list2Change:{
            top:-40,
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
    }
);