import React, { useEffect, useState } from "react";
import { View, useWindowDimensions, SafeAreaView, ScrollView, StyleSheet, Text, FlatList, Pressable, Image, Alert } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { FavoriteFriends, BookMark, SavedBookMark } from "./ProfileComponent";
import * as Iconss from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icons, Like } from "./momentComponents";

export function Profile({ route, navigation }) {


  const [likeID,setLikeID] = useState(0);
  const [dislikeID,setDislikeID] = useState(0);

  const [like, setLike] = useState('thumb-up-outline');
  const [dislike, setDislike] = useState('thumb-down-outline');
  const [share, setShare] = useState('share-outline');

  const [BarPosition, setBarPosition] = useState(21);
  const [moment, setMoment] = useState("#000000");
  const [myFrinends, setMyFrinends] = useState("#6E6E6E");

  const [user, setUser] = useState('');
  const [favourite, setFavorite] = useState("heart-outline");
  const [items, setItems] = useState([]);
  const [friendCount, setFriendCount] = useState([]);
  const [SecondRouteData, setSecondRouteData] = useState([]);

  // LOAD CLICK USER DETAILS--------------
  async function checkUser() {
    const form = new FormData();
    form.append("profilUserID", route.params.id);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setUser(JSON.parse(request.responseText));
      }
    };
    request.open("POST", "http://localhost/chatApp/loadProfiles.php", true);
    request.send(form);
  }
  const callCheckUser = () => { checkUser(); };
  useEffect(callCheckUser, []);

  // LOAD CLICK USER MOMENTS--------------
  function loadMoments() {
    const form = new FormData();
    form.append("findUserID", route.params.id);

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

  // LOAD CLICK USER FRIENDS--------------
  function loadFriendList(text) {
    const user = { "id": route.params.id };
    const userJSONText = JSON.stringify(user);
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


  const mainUI = (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <View style={mystyles.topBox}>
        <Text style={mystyles.backText} onPress={() => { navigation.goBack() }}>Back</Text>
        <View style={mystyles.statusBox}>
          <View style={mystyles.statusOnline}></View>
          <Text style={mystyles.text2}>Online</Text>
        </View>
        <View style={mystyles.iconBox}>
          <Icon name='chatbubble-ellipses-outline' size={26} onPress={pack} />
        </View>

      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={mystyles.box1}>
          <View style={mystyles.coverBox}>
            <Image source={{ uri: "http://localhost/chatApp/" + user.cover }} style={mystyles.myCoverImage} />
          </View>

          <View style={mystyles.profileBox}>
            <Image source={{ uri: "http://localhost/chatApp/" + user.pic }} style={mystyles.myProfileImage} />
          </View>

        </View>
        <View style={mystyles.myNameBox}>
          <Text style={mystyles.profileText1}>{user.fname} {user.lname}</Text>
          <Text style={mystyles.profileText2}>{user.slogan}</Text>
        </View>

        <View style={mystyles.box2}>
          <View style={mystyles.bioBox1}>
            <Icon name="phone-portrait-outline" size={20} color={"#6E6E6E"} />
            <Text style={mystyles.bioText1}>{user.code} {user.mobile}</Text>
          </View>

          <View style={mystyles.bioBox2}>
            <Icon name="flag-outline" size={20} color={"#6E6E6E"} />
            <Text style={mystyles.bioText2}>{user.country}</Text>
          </View>
          <View style={mystyles.bioBox2}>
            <Icon name="person-add-outline" size={20} color={"#4602FF"} />
            <Text style={mystyles.bioText3}>Add Friend</Text>
          </View>
        </View>

        <View style={{ width: "100%", paddingBottom: 20, backgroundColor: "white" }}>
          <View style={{ width: 84, height: 6, borderRadius: 3, backgroundColor: "#FFCE00", position: "absolute", start: BarPosition, zIndex: 5 }}></View>
          <View style={{ flexDirection: "row", start: 30, gap: 30, justifyContent: "flex-start", height: 40, alignItems: "flex-end", }}>



            <Pressable onPress={goMoment}><Text style={{ fontFamily: "Saira", fontSize: 15, color: moment, fontWeight: "600", }} >Moments</Text></Pressable>
            <Pressable onPress={goMyFriends}><Text style={{ fontFamily: "Saira", fontSize: 15, color: myFrinends, fontWeight: "600" }} >My Friends</Text></Pressable>
          </View>
        </View>


        {moment == "#000000" ?
          <ScrollView style={styles.container1} showsVerticalScrollIndicator={false}>
            <FlatList
              data={items}
              renderItem={itemUI}
              showsVerticalScrollIndicator={false}
              style={styles.list2}
              scrollEnabled={false}
              contentContainerStyle={styles.list2Box} />

          </ScrollView>
          : ""
        }
        {myFrinends == "#000000" ?
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
          : ""}

      </ScrollView>
    </SafeAreaView>
  );

  function pack() {
    const obj = { "fname": user.fname, "lname": user.lname, "id": user.userID, "pic": user.pic, "status": user.status };
    navigation.navigate("Chat", obj);
  }

  function goMoment() {
    if (moment != "#000000") {
      setMoment("#000000");
      setMyFrinends("#6E6E6E");
      setBarPosition(21);
    } else {
      setMoment("#000000");
      setMyFrinends("#000000");
      setBarPosition(21);
    }
  }

  function goMyFriends() {
    if (myFrinends != "#000000") {
      setMoment("#6E6E6E");
      setMyFrinends("#000000");
      setBarPosition(124);
    } else {
      setMoment("#6E6E6E");
      setMyFrinends("#000000");
      setBarPosition(124);
    }
  }

  // ROUTE ONE ITEM
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
{/* 
          <View style={styles.action1}>
            <View style={styles.action2}>
              <Iconss.default name={like} size={24} color={"black"} style={styles.icon1} onPress={requestLike} />
              <Iconss.default name={dislike} size={24} color={"black"} style={styles.icon2} onPress={requestDislike} />
            </View>
            <View style={styles.action3}>
              <Iconss.default name={share} size={24} color={"black"} style={styles.icon3} onPress={requestShare} />
            </View>
          </View> */}
          <Icons/>


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
  // ROUTE ONE ITEMS END

  function requestLike() {
    if (like === 'thumb-up-outline') {
      setLike('thumb-up');
      setDislike('thumb-down-outline');


    } else {

      setLike('thumb-up-outline');



    }
  }

  function requestDislike() {
    if (dislike === 'thumb-down-outline') {
      setDislike('thumb-down');
      setLike('thumb-up-outline');


    } else {
      setDislike('thumb-down-outline');


    }
  }

  function requestShare() {
    if (share === 'share-outline') {

    } else {

    }
  }


  return mainUI;
}




// SECOND ROUTE ITEM
function secondItem({ item }) {
  const ui = (

    <Pressable >
      <View style={Route2Styles.item}>
        <View style={Route2Styles.itemBox1}>
          <Image source={{ uri: "http://localhost/chatApp/" + item.pic }} style={Route2Styles.favoriteFriends} />
          <View style={item.status != "Offline" ? Route2Styles.statusOnline : Route2Styles.statusOffline}></View>
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
// SECOND ROUTE ITEM END


const mystyles = StyleSheet.create(
  {
    statusBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      width: "30%",
    },
    text2: {
      fontFamily: "Avenir",
      fontSize: 14,
      fontWeight: "700",
      color: "#A5A5A5",
    },
    statusOnline: {
      width: 17,
      height: 17,
      borderWidth: 2,
      borderRadius: 50,
      borderColor: "#FFFFFF",
      backgroundColor: "#00E32C",
      bottom: 0,
    },
    statusOffline: {
      width: 16,
      height: 16,
      borderWidth: 2,
      borderRadius: 50,
      borderColor: "#FFFFFF",
      backgroundColor: "#E30060",
      bottom: 0,
    },

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
      paddingTop: 30,
      paddingBottom: 30,
      borderBottomWidth: 0.3,
      borderColor: "#D6D6D6",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 26,
    },
    bioText1: {
      fontFamily: "Saira",
      fontSize: 14,
      fontWeight: "600",
      color: "#6E6E6E",
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
    },
    bioText3: {
      fontFamily: "Saira",
      fontSize: 14,
      fontWeight: "600",
      color: "#4602FF",
      paddingStart: 8,
    },

    box1: {
      width: "100%",
      height: 200,
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
      bottom: 10,
      alignSelf: "center",
    },
    myNameBox: {
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 6,
      paddingStart: 16,
    },
    myProfileImage: {
      width: 100,
      height: 100,
      borderRadius: 100,
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
      width: "35%",
      justifyContent: "flex-end",
      paddingEnd: 24,
    },
    topBox: {
      width: "100%",
      height: 68,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    backText: {
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "Saira",
      color: "#4602FF",
      width: "35%",
      paddingStart: 24,
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
      paddingTop: 10,
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

    // moment route
    container1: {
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 16,
      paddingTop: 0,
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
      paddingTop: 16,
    },

  }
);

