import React, { useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView , FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createIconSet } from "react-native-vector-icons";
import { KeyboardAvoidingViewBase } from "react-native";

export function Chat({ route, navigation }) {

    const [sentImage, setSentImage] = useState(null);
    const [chatText, setChatText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const flatlistRef = useRef(null);
    const scrollToBottom = ()=>{
        flatlistRef.current.scrollToEnd({animated:true});
    };


    async function sendRequest() {
        const form = new FormData();
        var userJsonText = await AsyncStorage.getItem('user');
        var userJSObject = JSON.parse(userJsonText);
        form.append('id1', userJSObject.id);
        form.append('id2', route.params.id);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var responseText = request.responseText;
                var responseArray = JSON.parse(responseText);
                setChatHistory(responseArray);
            }
        };
        request.open("POST", "http://localhost/chatApp/load_chat.php", true);
        request.send(form);
    }

    // call function once immediately upon page load 
    const call = () => { sendRequest(); }
    useEffect(call, []);

    // call function every 2000 millisenconds after first execution
    function start() {
        setInterval(sendRequest, 2000);
    }
    useEffect(start, []);

    async function saveChat() {
        var userJsonText = await AsyncStorage.getItem('user');
        var fromUserObject = JSON.parse(userJsonText);

        var requestObject = {
            from_user_id: fromUserObject.id,
            to_user_id: route.params.id,
            message: chatText,
        };
        var image = null;


        const form = new FormData();
        form.append("requestJSON", JSON.stringify(requestObject));
        form.append("image", image);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {

            }
        };
        request.open("POST", "http://localhost/chatApp/save_chat.php", true);
        request.send(form);
    }

    const ui = (
        <SafeAreaView style={styles.main}>
            <View style={styles.topBox}>

        <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.backIcon}>
                <Icon name="arrow-back-outline" size={30}  />
                </TouchableOpacity>
                <View style={styles.view1}>
                    <Text style={styles.text1}>{route.params.fname} {route.params.lname}</Text>
                    <Text style={styles.text2}>{route.params.status == "1" ? "Online" : "Offline"}</Text>
                </View>

                <Pressable onPress={() => { navigation.navigate("Profile",chatUser) }}>
                    <Image source={{ uri: "http://localhost/chatApp/" + route.params.pic }} style={styles.user} />
                    <View style={route.params.status != "2" ? styles.statusOnline : styles.statusOffline}></View>
                </Pressable>

            </View>

            <FlatList
            ref={flatlistRef}
                data={chatHistory}
                renderItem={chatItem}
                style={styles.chatList}
                scrollEnabled={true}
                contentContainerStyle={styles.chatListBox}
                showsVerticalScrollIndicator={false} 
                />

<KeyboardAvoidingView style={{width:"100%"}} behavior={"position"}>
                <Pressable onPress={scrollToBottom} style={{width:30,height:30,backgroundColor:"rgba(0,0,0,0.5)",position:"absolute",zIndex:10,bottom:110,left:26,borderRadius:100,justifyContent:"center",alignItems:"center",}}>
                    <Icon name="chevron-down" size={24} color={"white"}/>
                </Pressable>

                
            <View style={styles.bottomBoxKeyUp}>
                <View style={styles.bottomBox2}>

                    <TouchableOpacity onPress={selectImage}><Icon name="attach" size={28} color={"black"} /></TouchableOpacity>
                    <Icon name="happy-outline" size={26} style={""} color={"black"} />

                    <View style={styles.sentMsgBox}>
                        <TextInput style={styles.msgSentInput} placeholder={"Type your message"} onChangeText={setChatText} value={chatText} />
                        <TouchableOpacity style={styles.sentIcon} onPress={() => { saveChat(); setChatText(''); }}>
                            <Icon name="send" size={22} color={"#5A02FF"} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            </KeyboardAvoidingView>

        </SafeAreaView>

    );

    const chatUser = {"id":route.params.id}

    async function selectImage() {
    
        // Alert.alert("Message","Done");
        const options = {
            mediaType: 'photo',
        };

        const result = await new launchImageLibrary(options);

        if (result.didCancel) {
            // Alert.alert('Message','No Image');
        } else {
            const imageObject = {
                uri: result.assets[0].uri.replace("file://", ""),
                name: 'sentImage.png',
                type: 'image/png',
            };

            saveChatImage(imageObject);
          
        }

    }



    async function saveChatImage(imageObject) {
        var userJson = await AsyncStorage.getItem('user');
        var fromUserObj = JSON.parse(userJson);

        var saveImageObject = {
            from_user_id: fromUserObj.id,
            to_user_id: route.params.id,
            message: null,
        };
        var image = imageObject;


        const form = new FormData();
        form.append("requestJSON", JSON.stringify(saveImageObject));
        form.append("image", image);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {

            }
        };
        request.open("POST", "http://localhost/chatApp/save_chat.php", true);
        request.send(form);
    }


    return ui;
}

function chatItem({ item }) {
    const itemUI = (
        <View style={item.side == 'right' ? styles.chatViewRight : styles.chatViewLeft}>
            {item.type == "text" ?
                <View>
                    <View style={item.side == 'right' ? styles.messageTextRight : styles.messageTextLeft}>
                        <Text style={item.side == 'right' ? styles.msgTextRight : styles.msgTextLeft}>{item.msg}</Text>
                    </View>

                    <View style={item.side == 'right' ? styles.chatView1 : styles.chatView2}>
                        <Text style={styles.timeText}>{item.time}</Text>
                        {item.side == 'right' ? (<Icon name={item.status == 'seen' ? "checkmark-done-sharp" : "checkmark"} size={15} color={item.status == 'seen' ? '#07aef5' : 'gray'} style={styles.chatItemIcon} />) : null}
                    </View>
                </View>
                :
                <View style={item.side == 'right' ? styles.messageImageRight : styles.messageImageLeft}>
                    <Image source={{ uri: "http://localhost/chatApp/" + item.image }} style={styles.messageImage} />

                    <View style={item.side == 'right' ? styles.imageTimeBoxRight : styles.imageTimeBoxLeft}>
                        <Text style={item.side == 'right' ? styles.imageTimeTextRight : styles.imageTimeTextLeft}>{item.time}</Text>
                        {item.side == 'right' ? (<Icon name={item.status == 'seen' ? "checkmark-done-sharp" : "checkmark"} size={15} color={item.status == 'seen' ? '#FFFFFF' : '#FFFFFF'} style={styles.chatItemImageIcon} />) : null}
                    </View>
                </View>
            }

        </View>
    );
    return itemUI;
}

const styles = StyleSheet.create(
    {
        bottomBox2: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            top: 24,
        },
        sentMsgBox: {
            justifyContent: "center",
        },
        sentIcon: {
            position: "absolute",
            alignSelf: "flex-end",
            paddingEnd: 12,
        },
        msgSentInput: {
            width: 294,
            height: 44,
            borderWidth: 0.5,
            borderRadius: 12,
            borderColor: "#D8D8D8",
            fontFamily: "Arial",
            paddingStart: 15,
            paddingEnd: 10,
            fontSize: 16,
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
            height: 110,
            position: "absolute",
            bottom: 0,
            backgroundColor: "white",
            alignItems: "center",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.11,
            shadowRadius: 0.3,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
        },

        bottomBoxKeyUp: {
            width: "100%",
            height: 90,
            position: "absolute",
            bottom: 0,
            backgroundColor: "white",
            alignItems: "center",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.11,
            shadowRadius: 0.3,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
        },

        imageTimeTextRight: {
            fontFamily: "Avenir",
            fontSize: 12,
            color: "white",
            fontWeight: "700",
        },
        imageTimeTextLeft: {
            fontFamily: "Avenir",
            fontSize: 12,
            color: "black",
            fontWeight: "600",
            paddingStart: 5,
        },
        chatItemImageIcon: {
            paddingStart: 8,
            paddingEnd: 6,
        },
        imageTimeBoxRight: {
            height: 34,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
        },
        imageTimeBoxLeft: {
            height: 34,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
        },
        messageImageLeft: {
            backgroundColor: 'white',
            paddingTop: 4,
            paddingHorizontal: 4,
            borderRadius: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 0,
            borderWidth: 0.5,
            borderColor: "#D8D8D8",
        },
        messageImageRight: {
            backgroundColor: '#742BFF',
            paddingTop: 4,
            paddingHorizontal: 4,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 10,
            borderWidth: 0.5,
            borderColor: "#D8D8D8",
        },
        messageImage: {
            width: 150,
            height: 150,
            borderRadius: 10,
        },

        timeText: {
            fontFamily: "Avenir",
            fontSize: 12,
            color: "#5D5D5D",
            fontWeight: "500",
        },
        chatItemIcon: {
            paddingStart: 8,
        },
        chatView1: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
            justifyContent: "flex-end",
        },
        chatView2: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
            justifyContent: "flex-start",
        },
        msgTextLeft: {
            fontFamily: "Avenir",
            fontSize: 16,
            color: "black",
            fontWeight: "500",
        },
        msgTextRight: {
            fontFamily: "Avenir",
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
        },
        messageTextLeft: {
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingStart: 16,
            paddingEnd: 20,
            borderRadius: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 0,
            borderWidth: 0.5,
            borderColor: "#D8D8D8",
        },
        messageTextRight: {
            backgroundColor: '#742BFF',
            paddingVertical: 12,
            paddingStart: 20,
            paddingEnd: 16,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 10,
            borderWidth: 0.5,
            borderColor: "#D8D8D8",
        },
        chatViewLeft: {
            alignSelf: 'flex-start',
            marginStart: 10,
            marginBottom: 15,
        },
        chatViewRight: {
            alignSelf: 'flex-end',
            marginEnd: 10,
            marginBottom: 15,
        },
        chatList: {
            width: "100%",
            paddingTop: 20,
            marginTop: 5,
            paddingStart: 8,
            paddingEnd: 8,
        },
        chatListBox: {
            paddingBottom: 150,
        },

        main: {
            flex: 1,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
        },
        topBox: {
            width: "100%",
            height: 94,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1.5 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 0,
            flexDirection: "row",
        },

        text1: {
            fontSize: 20,
            fontWeight: "600",
            fontFamily: "Saira",
            color: "black",
        },
        text2: {
            fontSize: 14,
            fontWeight: "600",
            fontFamily: "Avenir",
            color: "#A5A5A5",
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

        user: {
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: "#F8F8F8",
            borderWidth: 1,
            borderColor: "#C4C4C4",

        },

        view1: {
            width: "70%",
            alignItems: "center",
        },
        backIcon: {
            width: "10%",
            start: 5,
        },
    }
);