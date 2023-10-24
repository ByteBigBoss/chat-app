import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, useWindowDimensions, SafeAreaView, ScrollView, StyleSheet, Text, FlatList, Pressable, Image, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { Icons, Like } from "./momentComponents";
import { FavoriteFriends, BookMark, SavedBookMark } from "./ProfileComponent";

export function Test({ route, navigation }) {

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute,
    });
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Moments' },
        { key: 'second', title: 'My Friends' },
        { key: 'third', title: 'Notifiacations' },
        { key: 'fourth', title: 'Saved' },
    ]);

    const [user, setUser] = useState('');
    const [favourite, setFavorite] = useState("heart-outline");
    const [items, setItems] = useState([]);
    const [SecondRouteData, setSecondRouteData] = useState([]);
    const [friendCount, setFriendCount] = useState([]);
    const [thirdRouteData, setThirdRouteData] = useState([
        {
            "id": 1,
            "user": "/Users/sandaruwan/Documents/ReactNativeProjects/MyChatApp/images/user2.jpeg",
            "name": "Sahan Perera",
            "time": "1h ago",
            "mode": "like",
            "moment": "/Users/sandaruwan/Documents/ReactNativeProjects/MyChatApp/images/notifyPic1.jpeg",
        },
        {
            "id": 2,
            "user": "/Users/sandaruwan/Documents/ReactNativeProjects/MyChatApp/images/friend2.jpeg",
            "name": "Imesha Sewmini",
            "time": "4h ago",
            "mode": "like",
            "moment": "/Users/sandaruwan/Documents/ReactNativeProjects/MyChatApp/images/notifyPic2.jpeg",
        },
        {
            "id": 4,
            "user": "/Users/sandaruwan/Documents/ReactNativeProjects/MyChatApp/images/user2.jpeg",
            "name": "Sahan Perera",
            "time": "5h ago",
            "mode": "Friend Request",
            "moment": "none",
        },
        {
            "id": 3,
            "user": "/Users/sandaruwan/Documents/ReactNativeProjects/MyChatApp/images/user5.jpeg",
            "name": "Nuwan Perera",
            "time": "12h ago",
            "mode": "Friend Request",
            "moment": "none",
        },
    ]);


    async function checkUser() {
        const userJSONText = await AsyncStorage.getItem("user");
        const form = new FormData();
        form.append("userJSONText", userJSONText);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                setUser(JSON.parse(request.responseText));
            }
        };
        request.open("POST", "http://localhost/chatApp/preview_user.php", true);
        request.send(form);
    }
    const callCheckUser = () => { checkUser(); };
    useEffect(callCheckUser, []);


    async function loadMoments() {
        const userJSONText = await AsyncStorage.getItem("user");
        const result = JSON.parse(userJSONText);
        const form = new FormData();
        form.append("findUserID", result.id);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                setItems(JSON.parse(request.responseText));
            }
        };
        request.open("POST", "http://localhost/chatApp/load_moments.php", true);
        request.send(form);
    }
    function startMomentList() {
        loadMoments("");
    }
    useEffect(startMomentList, []);


    // First Route
    function FirstRoute() {
        return (
            <ScrollView style={styles.container1} showsVerticalScrollIndicator={false}>
                <Pressable style={styles.view1} onPress={() => { navigation.navigate("PostMoment") }}>
                    <Icon name='add' size={34} color={"black"} />
                    <Text style={styles.text1}>Update your Moments</Text>
                </Pressable>
                <FlatList
                    data={items}
                    renderItem={itemUI}
                    showsVerticalScrollIndicator={false}
                    style={styles.list2}
                    scrollEnabled={false}
                    contentContainerStyle={styles.list2Box} />

            </ScrollView>
        );
    }


    // second route start
    async function loadFriendList(text) {
        const userJSONText = await AsyncStorage.getItem("user");
        const form = new FormData();
        form.append("userJSONText", userJSONText);
        // form.append("text",text);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                const JSObject = JSON.parse(request.responseText);
                setSecondRouteData(JSObject.array);
                setFriendCount(JSObject.count);
            }
        };
        request.open("POST", "http://localhost/chatApp/load_friends.php", true);
        request.send(form);

    }
    function callFriendList() {
        loadFriendList("");
    }
    useEffect(callFriendList, []);


    function SecondRoute({ item }) {
        return (
            <ScrollView style={Route2Styles.container1}>
                <View style={Route2Styles.box2}>
                    <Text style={Route2Styles.text1}>{friendCount} Friends</Text>
                </View>
                <FlatList
                    data={SecondRouteData}
                    renderItem={secondItem}
                    showsVerticalScrollIndicator={false}
                    style={Route2Styles.list1}
                    scrollEnabled={false}
                    contentContainerStyle={Route2Styles.list1Box}
                    numColumns={2}
                    columnWrapperStyle={Route2Styles.list1Gap} />
            </ScrollView>
        );
    }
    // Second Route end


    // Third Route start 
    function ThirdRoute() {
        return (
            <ScrollView style={Route3Styles.container1}>
                <FlatList
                    data={thirdRouteData}
                    renderItem={ThirdItem}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </ScrollView>
        );
    }


    function FourthRoute() {
        return (
            <ScrollView style={Route4Styles.container1} showsVerticalScrollIndicator={false}>
                <FlatList
                    data={items}
                    renderItem={SavedItemUI}
                    showsVerticalScrollIndicator={false}
                    style={Route4Styles.list2}
                    scrollEnabled={false}
                    contentContainerStyle={Route4Styles.list2Box} />
            </ScrollView>
        );
    }

    const mainUI = (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

     
                <View style={mystyles.topBox}>
                    <Text style={mystyles.screenTitle}>My Profile</Text>
                    <View style={mystyles.iconBox}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Settings", user) }}><Icon name='md-cog' size={26} /></TouchableOpacity>
                        <TouchableOpacity onPress={go = () => { navigation.navigate("EditProfile", user) }}><Icon name='pencil-sharp' size={26} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("SignIn", user) }}><Icon name='log-out-outline' size={26} /></TouchableOpacity>
                    </View>
                </View>

                <View style={mystyles.box1}>
                    <View style={mystyles.coverBox}>
                        <Image source={{ uri: "http://localhost/chatApp/" + user.cover }} style={mystyles.myCoverImage} />
                    </View>

                    <View style={mystyles.profileBox}>
                        <Image source={{ uri: "http://localhost/chatApp/" + user.pic }} style={mystyles.myProfileImage} />
                        <View style={mystyles.myNameBox}>
                            <Text style={mystyles.profileText1}>{user.fname} {user.lname}</Text>
                            <Text style={mystyles.profileText2}>{user.slogan}</Text>
                        </View>
                    </View>
                </View>

                <View style={mystyles.box2}>
                    <View style={mystyles.bioBox1}>
                        <Icon name="phone-portrait-outline" size={20} color={"#0093FF"} />
                        <Text style={mystyles.bioText1}>{user.code} {user.mobile}</Text>
                    </View>

                    <View style={mystyles.bioBox2}>
                        <Icon name="flag-outline" size={20} color={"#6E6E6E"} />
                        <Text style={mystyles.bioText2}>{user.country}</Text>
                    </View>
                </View>

                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    onSwipeStart={() => { }}
                    onSwipeEnd={() => { }}
                    lazy={true}
                />

                <View style={{ width: "100%" }}>
                    <View style={{ width: 84, height: 6, borderRadius: 3, backgroundColor: "#FFCE00", position: "absolute", start: 21, zIndex: 5 }}></View>
                    <View style={{ flexDirection: "row", gap: 30, justifyContent: "center", height: 40, alignItems: "flex-end", }}>


                        <Text style={{ fontFamily: "Saira", fontSize: 15, color: "black", fontWeight: "600", }}>Moments</Text>
                        <Text style={{ fontFamily: "Saira", fontSize: 15, color: "#6E6E6E", fontWeight: "600" }}>My Friends</Text>
                        <Text style={{ fontFamily: "Saira", fontSize: 15, color: "#6E6E6E", fontWeight: "600" }}>Notifications</Text>
                        <Text style={{ fontFamily: "Saira", fontSize: 15, color: "#6E6E6E", fontWeight: "600" }}>Saved</Text>
                    </View>
                </View>

                <View style={mystyles.bottomBox}>
                    <Pressable style={mystyles.view2} onPress={moments = () => { navigation.navigate("Moments") }}>
                        <Icon name="rocket-outline" size={21} style={mystyles.bottomIcon1} color={"#6E6E6E"} />
                        <Text style={mystyles.bottomText}>Moments</Text>
                    </Pressable>

                    <Pressable style={mystyles.view2} onPress={message = () => { navigation.navigate("Message") }}>
                        <Icon name="chatbubbles-outline" size={21} style={mystyles.bottomIcon1} color={"#6E6E6E"} />
                        <Text style={mystyles.bottomText}>Message</Text>
                    </Pressable>

                    <Pressable style={mystyles.view2}>
                        <Icon name="person" size={21} style={mystyles.bottomIcon1} color={"#5A02FF"} />
                        <Text style={mystyles.bottomSelectText}>My Profile</Text>
                    </Pressable>
                </View>

        </SafeAreaView>
    );

    return mainUI;
}

// FIRST ROUTE ITEM
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
                        <BookMark />
                    </View>
                </View>

                <View style={styles.box1}>
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


                <Icons />


            </View>
        </Pressable>
    );

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
// First Route End

// SECOND ROUTE ITEM
function secondItem({ item }) {
    const ui = (

        <Pressable >
            <View style={Route2Styles.item}>
                <View style={Route2Styles.itemBox1}>
                    <Image source={{ uri: "http://localhost/chatApp/" + item.pic }} style={Route2Styles.favoriteFriends} />
                    <View style={item.status != "2" ? Route2Styles.statusOnline : Route2Styles.statusOffline}></View>
                </View>
                <View style={Route2Styles.box3}>
                    <Text style={Route2Styles.itemText1}>{item.fname} {item.lname}</Text>
                </View>
                <FavoriteFriends />
            </View>
        </Pressable>
    );
    return ui;
}
// Second Route End

// THIRD ROUTE
function ThirdItem({ item }) {
    const ui = (
        <Pressable>
            {item.mode == "like" && item.moment != "none" ?
                <View style={Route3Styles.box1}>
                    <Image source={{ uri: `${item.user}` }} style={Route3Styles.userImage1} />
                    <View style={Route3Styles.box2}>
                        <Text style={Route3Styles.text1}>{item.name}</Text>
                        <Text style={Route3Styles.text2}>{item.time}</Text>
                    </View>
                    <View style={Route3Styles.box3}>
                        <Like />
                        <Image source={{ uri: `${item.moment}` }} style={Route3Styles.momentImage} />
                    </View>
                </View>
                :
                <View style={Route3Styles.box4}>
                    <View style={Route3Styles.box8}>
                        <Image source={{ uri: `${item.user}` }} style={Route3Styles.userImage2} />
                        <View style={Route3Styles.box5}>
                            <Text style={Route3Styles.text3}>{item.name}</Text>
                            <Text style={Route3Styles.text4}>{item.mode}</Text>
                        </View>
                    </View>
                    <View style={Route3Styles.box6}>
                        <Text style={Route3Styles.text5}>{item.time}</Text>
                    </View>
                    <View style={Route3Styles.box7}>
                        <Pressable style={Route3Styles.button1}><Text style={Route3Styles.buttonText}>Reject</Text></Pressable>
                        <Pressable style={Route3Styles.button2}><Text style={Route3Styles.buttonText}>Accept</Text></Pressable>
                    </View>
                </View>
            }
        </Pressable>
    );
    return ui;
}
// THIRD ROUTE END

// FOURTH ROUTE
function SavedItemUI({ item }) {

    const ui = (
        <Pressable>
            <View style={Route4Styles.item}>

                <View style={Route4Styles.momentView1}>
                    <Image source={{ uri: `${item.user}` }} style={Route4Styles.momentUser} />
                    <View style={Route4Styles.momentView2}>
                        <Text style={Route4Styles.momentText1}>{item.name}</Text>
                        <Text style={Route4Styles.momentText2}>{item.uploaded}</Text>
                    </View>
                    <View style={Route4Styles.bookMarkIconBox}>
                        <SavedBookMark />
                    </View>
                </View>

                <View style={Route4Styles.box1}>
                    <Text style={Route4Styles.titleText}>{item.title}</Text>
                    <Text style={Route4Styles.descriptionText}>{item.description}</Text>
                </View>

                {item.mode == 'multiple' && item.images != "noImage" ?
                    <FlatList
                        data={item.images}
                        renderItem={mulltiImageUI}
                        horizontal={true}
                        contentContainerStyle={Route4Styles.mediaList1}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={Route4Styles.medialist1Box}
                    />
                    : item.mode == 'single' && item.images != 'noImage' ?
                        <Image source={require("./images/moment6.jpeg")} style={Route4Styles.singleImage} />
                        : ""}

                <View style={item.mode != 'none' ? Route4Styles.momentStatus : Route4Styles.momentStatusNoneImage}>
                    <Text style={Route4Styles.momentStatusText}>{item.like}</Text>
                    <Text style={Route4Styles.momentStatusText}>•</Text>
                    <Text style={Route4Styles.momentStatusText}>{item.dislike}</Text>
                    <Text style={Route4Styles.momentStatusText}>•</Text>
                    <Text style={Route4Styles.momentStatusText}>{item.shares}</Text>
                </View>

                <Icons />


            </View>
        </Pressable>
    );
    function mulltiImageUI({ item }) {

        const ui = (
            <Pressable>
                <Image source={{ uri: `${item.image}` }} style={Route4Styles.groupImages} />
            </Pressable>
        );
        return ui;
    }
    // FOURTH ROUTE END

    return ui;
}



const Route4Styles = StyleSheet.create(
    {

        // moment route
        container1: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 16,
            paddingTop: 30,
        },


        // moment items
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
        },
        titleText: {
            fontSize: 18,
            fontFamily: "Saira",
            fontWeight: "600",
            color: "black",
            maxHeight: 60,
        },
        descriptionText: {
            fontSize: 14,
            fontFamily: "Saira",
            fontWeight: "500",
            color: "#3B3B3B",
            marginTop: 2,
            height: 45,
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
        bookMarkIcon: {

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
            paddingBottom: 14,
        },
        item: {
            alignItems: "center",
            backgroundColor: "#F7F7F7",
            borderRadius: 10,
            marginBottom: 16,
        },

        list2: {
            paddingBottom: 40,
            paddingTop: 0,
        },

    }
);


const Route3Styles = StyleSheet.create(
    {
        container1: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 16,
            paddingTop: 30,
        },
        box1: {
            width: "100%",
            height: 80,
            backgroundColor: "#F7F7F7",
            marginBottom: 8,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            paddingStart: 18,
        },
        userImage1: {
            width: 44,
            height: 44,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#C4C4C4",
        },
        userImage2: {
            width: 44,
            height: 44,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#C4C4C4",
        },
        box2: {
            paddingStart: 16,
        },
        text1: {
            fontFamily: "Saira",
            fontSize: 15,
            fontWeight: "600",
            color: "black",
        },
        text2: {
            fontFamily: "Saira",
            fontSize: 12,
            fontWeight: "500",
            color: "#8B8B8B",
            paddingTop: 2,
        },
        text3: {
            fontFamily: "Saira",
            fontSize: 15,
            fontWeight: "600",
            color: "black",
        },
        text4: {
            fontFamily: "Saira",
            fontSize: 12,
            fontWeight: "500",
            color: "#007FFF",
            paddingTop: 2,
        },
        text5: {
            fontFamily: "Saira",
            fontSize: 12,
            fontWeight: "500",
            color: "#8B8B8B",
        },
        momentImage: {
            width: 60,
            height: 60,
            borderRadius: 6,
            marginStart: 30,
        },
        box3: {
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            end: 10,
        },
        box4: {
            width: "100%",
            height: 130,
            backgroundColor: "#F7F7F7",
            marginBottom: 8,
            borderRadius: 10,
            alignItems: "center",
            paddingStart: 18,
        },
        box5: {
            paddingStart: 16,
        },
        box6: {
            position: "absolute",
            end: 20,
            top: 20,
        },
        box7: {
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            gap: 18,
        },
        button1: {
            width: 172,
            height: 34,
            borderRadius: 10,
            backgroundColor: "#ED006D",
            justifyContent: "center",
            alignItems: "center",
        },
        button2: {
            width: 172,
            height: 34,
            borderRadius: 10,
            backgroundColor: "#378BED",
            justifyContent: "center",
            alignItems: "center",
        },
        box8: {
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 18,
        },
        buttonText: {
            fontFamily: "Saira",
            fontSize: 17,
            fontWeight: "bold",
            color: "white",
        },
    }
);


const Route2Styles = StyleSheet.create(
    {
        // MyFriends route

        itemText1: {
            fontFamily: "Saira",
            fontSize: 14,
            fontWeight: "600",
            color: "#656565",
        },
        box3: {
            width: "100%",
            alignItems: "center",
            paddingTop: 8,
        },

        itemBox1: {
            alignItems: "center",
            marginTop: 20,
        },

        item: {
            width: 194,
            height: 184,
            backgroundColor: "#F7F7F7",
            marginTop: 10,
            borderRadius: 10,
        },

        box2: {
            width: "100%",
            alignItems: "center",
        },
        container1: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 16,
            paddingTop: 30,
        },
        text1: {
            fontFamily: "Avenir",
            fontSize: 16,
            color: "#6A6A6A",
            fontWeight: "500",
        },

        list1: {
        },
        list1Box: {
            width: "100%",
            alignItems: "center",
            paddingTop: 20,

        },
        list1Gap: {
            columnGap: 10,
        },


        favoriteFriends: {
            width: 70,
            height: 70,
            borderRadius: 50,
            backgroundColor: "#F8F8F8",
            borderWidth: 2,
            borderColor: "#D8D8D8",
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
            end: 64,
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
            end: 64,
        },
    }
);


const styles = StyleSheet.create(
    {

        // moment route
        container1: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 16,
            paddingTop: 30,
        },
        view1: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: "#F7F7F7",
            height: 80,
            borderRadius: 10,
            paddingStart: 23,
        },
        text1: {
            fontFamily: "Saira",
            fontWeight: "600",
            fontSize: 18,
            color: "#656565",
            paddingStart: 20,
        },


        // moment items
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
        },
        descriptionText: {
            fontSize: 14,
            fontFamily: "Saira",
            fontWeight: "500",
            color: "#3B3B3B",
            marginTop: 2,
            height: 45,
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
        bookMarkIcon: {

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
            paddingBottom: 14,
        },
        item: {
            alignItems: "center",
            backgroundColor: "#F7F7F7",
            borderRadius: 10,
            marginBottom: 16,
        },

        list2: {
            paddingBottom: 60,
            paddingTop: 16,
        },

    }
);

const mystyles = StyleSheet.create(
    {
        selectStatusBar: {
            width: 84,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#FFCE00",
        },
        selectTabText: {
            fontFamily: "Saira",
            fontSize: 15,
            fontWeight: "600",
            color: "#6E6E6E",
            paddingTop: 14,
        },
        tabText: {
            fontFamily: "Saira",
            fontSize: 15,
            fontWeight: "600",
            color: "#6E6E6E",
            paddingTop: 20,
        },
        tabBox: {
            flexDirection: "row",
            gap: 30,
        },

        box2: {
            width: "100%",
            paddingStart: 30,
            paddingTop: 18,
            paddingBottom: 30,
            borderBottomWidth: 0.3,
            borderColor: "#D6D6D6"
        },
        bioText1: {
            fontFamily: "Saira",
            fontSize: 14,
            fontWeight: "600",
            color: "#0093FF",
            paddingStart: 8,
        },
        bioText2: {
            fontFamily: "Saira",
            fontSize: 14,
            fontWeight: "600",
            color: "#6E6E6E",
            paddingStart: 8,
        },
        bioBox1: {
            flexDirection: "row",
            alignItems: "center",
        },
        bioBox2: {
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 12,
        },

        box1: {
            width: "100%",
            height: 220,
        },
        profileText1: {
            fontFamily: "Saira",
            fontSize: 20,
            fontWeight: "600",
            color: "black",
        },
        profileText2: {
            fontFamily: "Saira",
            fontSize: 16,
            fontWeight: "500",
            color: "#6E6E6E",
        },
        profileBox: {
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            paddingStart: 30,
        },
        myNameBox: {
            alignSelf: "flex-end",
            paddingBottom: 6,
            paddingStart: 16,
        },
        myProfileImage: {
            width: 100,
            height: 100,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#DDDDDD",
        },

        coverBox: {
            width: "100%",
            backgroundColor: "white",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1.5 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
        },
        myCoverImage: {
            width: "100%",
            height: 140,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,

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
        },
        screenTitle: {
            fontSize: 34,
            fontWeight: "bold",
            fontFamily: "Saira",
            color: "black",
            width: "50%",
            paddingStart: 30,
        },

        main: {
            flex: 1,
            alignItems: "center",
            backgroundColor: "#FFFFFF",
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
    }
);