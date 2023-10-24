import React, { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View ,Keyboard} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";


export function PostMoment({ navigation }) {

    const [create, setCreate] = useState(null);
    const [selectImage, setSelectImage] = useState(null);
    const [title,setTitle] = useState('');
    const [descriptionText,setDescriptionText] = useState('');
    const [imageText,setImageText] = useState('');

    async function postMoment(){
        var userJsonText = await AsyncStorage.getItem('user');
        var fromUserObject = JSON.parse(userJsonText);

        const form = new FormData();
        form.append("userJSONText",JSON.stringify(fromUserObject));
        form.append("title",title);
        form.append("description",descriptionText);

        if(selectImage!=null){
            form.append("image",selectImage);
        }else{
            form.append("image",null);
        }

        if(imageText!=null){
            form.append("imageText",imageText);
        }else{
            form.append("imageText",null);
        }

        var request = new XMLHttpRequest();
        request.onreadystatechange=function(){
            if(request.readyState==4&&request.status==200){
                navigation.navigate("Moments");
            }
        };
        request.open("POST","http://localhost/chatApp/post_moment.php",true);
        request.send(form);
    }


    const [isKeyboardVisible,setKeyboardVisible] = useState(false);

    useEffect(()=>{
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',()=>{
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',()=>{
            setKeyboardVisible(false);
            
        });
        return ()=>{
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    },[]);

    const mainUI = (
        <SafeAreaView style={styles.main}>



            <View style={styles.topBox}>
                <TouchableOpacity style={styles.box1} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelPost} >Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box2} onPress={postMoment}>
                    <Text style={styles.publishPost}>Post</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior={"padding"}>
                <ScrollView style={{ flex: 1, }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                    <View style={styles.view1}>
                        <View style={styles.inputNameBox}>
                            <Text style={styles.inputName}>Title</Text>
                        </View>
                        <TextInput placeholder="Type Here" style={styles.titleInput} multiline={true} numberOfLines={2} maxLength={90} onChangeText={setTitle}/>
                    </View>

                    <View style={styles.view2}>
                        <View style={styles.inputNameBox}>
                            <Text style={styles.inputName}>Description</Text>
                        </View>
                        <TextInput placeholder="Type Here" style={styles.descriptionInput} multiline={true} onChangeText={setDescriptionText}/>
                    </View>

                    <Pressable style={styles.addBox1}>
                        {selectImage != null ? <View>
                            <Image source={selectImage} style={styles.addImageBox} />
                            {create != null ? <TextInput style={styles.createInput} multiline={true} onChangeText={setImageText}/> : ""}
                        </View>
                            : <View style={styles.addBox2}>
                                <Text style={styles.addBoxText}>{create != null ? "" : "Add Something to show…"}</Text>
                                {create != null ? <TextInput style={styles.createInput} multiline={true} onChangeText={setImageText}/> : ""}
                            </View>}
                    </Pressable>

                </ScrollView>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior={"position"} >
                <View style={isKeyboardVisible==true?styles.actionBox:styles.actionBox2}>
                    <Icon name="text" size={24} color={"black"} onPress={() => { if (create != null) { setCreate(null) } else { setCreate("Create") } }} />
                    <Pressable style={styles.solidBG}></Pressable>
                    <Icon name="camera-outline" size={24} color={"black"} />
                    <Icon name="images-outline" size={24} color={"black"} onPress={SelectImage} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );


    async function SelectImage() {

        // Alert.alert("Message","Done");
        const options = {
            mediaType: 'photo',
        };

        const result = await launchImageLibrary(options);

        if (result.didCancel) {
            // Alert.alert('Message','No Image');
        } else {
            const imageObject = {
                uri: result.assets[0].uri.replace("file://", ""),
                name: 'sentImage.png',
                type: 'image/png',
            };

            setSelectImage(imageObject);
        }

    }
    return mainUI;
}

const styles = StyleSheet.create(
    {
        createInput: {
            backgroundColor: "rgba(0,0,0,0.5)",
            width: 398,
            height: 200,
            position: "absolute",
            bottom: 100,
            zIndex: 10,
            // borderBottomRightRadius:10,
            // borderBottomLeftRadius:10,
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
            paddingTop: 30,
            paddingHorizontal: 30,
            paddingBottom: 40,
            fontSize: 40,
        },

        actionBox: {
            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            borderRadius: 35,
            gap: 30,
            paddingHorizontal: 30,
            paddingVertical: 16,
            position: "absolute",
            alignSelf: "center",
            bottom: 20,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
        },
        actionBox2:{
            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            borderRadius: 35,
            gap: 30,
            paddingHorizontal: 30,
            paddingVertical: 16,
            position: "absolute",
            alignSelf: "center",
            bottom: 60,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
        },
        solidBG: {
            width: 24,
            height: 24,
            borderRadius: 50,
            backgroundColor: "blue",
            borderWidth: 1,
            borderColor: "#C4C4C4",
        },
        addBoxText: {
            fontSize: 16,
            fontWeight: "500",
            fontFamily: "Saira",
            color: "#4602FF",
        },
        addBox2: {
            width: 398,
            height: 398,
            borderRadius: 10,
            backgroundColor: "#F7F7F7",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        addBox1: {
            width: 398,
            height: 398,
            borderRadius: 10,
            backgroundColor: "#F7F7F7",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
        },
        addImageBox: {
            width: 398,
            height: 398,
            borderRadius: 10,
            backgroundColor: "#F7F7F7",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
            justifyContent: "center",
            alignItems: "center",
        },

        view1: {
            marginTop: 40,
        },
        view2: {
            marginTop: 40,
        },
        titleInput: {
            width: 398,
            height: 104,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: "#9E62FF",
            fontSize: 16,
            fontWeight: "600",
            fontFamily: "Saira",
            color: "black",
            paddingTop: 34,
            paddingHorizontal: 16,
            paddingBottom: 20,
        },
        descriptionInput: {
            width: 398,
            height: 150,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#9E62FF",
            fontSize: 15,
            fontWeight: "500",
            fontFamily: "Saira",
            color: "black",
            paddingTop: 34,
            paddingHorizontal: 16,
            paddingBottom: 20,
        },
        inputNameBox: {
            backgroundColor: "#FFFFFF",
            borderColor: "#9E62FF",
            borderWidth: 0.5,
            borderRadius: 10,
            position: "absolute",
            top: -18,
            start: 16,
            zIndex: 5,
        },
        inputName: {
            paddingVertical: 7,
            paddingHorizontal: 16,
            color: "#6C00FF",
            fontFamily: "Avenir",
            fontSize: 16,
            fontWeight: "500",
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
            height: 76,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16,
            shadowRadius: 0,
        },
        cancelPost: {
            fontSize: 18,
            fontWeight: "500",
            fontFamily: "Avenir",
            color: "#FF3100",
            paddingStart: 30,
        },
        publishPost: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Saira",
            color: "#4602FF",
            paddingEnd: 38,
        },
        box1: {
            width: "50%",
            alignItems: "flex-start",
        },
        box2: {
            width: "50%",
            alignItems: "flex-end",
        },
        main: {
            flex: 1,
            alignItems: "center",
            backgroundColor: "#FFFFFF",

        },
        container: {
            alignItems: "center",
        },
    }
);