import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable, Image, useWindowDimensions, Animated, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export function EditProfile({ route, navigation }) {
    const [slogan, setSlogan] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [coverImage, setCoverImage] = useState(route.params.cover);
    const [profileImage, setProfileImage] = useState(route.params.pic);

    const ui = (
        <SafeAreaView style={styles.main}>

            <View style={styles.topBox}>
                <TouchableOpacity style={styles.boxTop1} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelEdit} >Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxTop2} onPress={() => navigation.navigate("MyProfile")}>
                    <Text style={styles.SaveEdit} >Save</Text>
                </TouchableOpacity>
            </View>

        <KeyboardAvoidingView  style={{ width: "100%",}} behavior={"height"}>
            <ScrollView style={{ width: "100%",}} contentContainerStyle={{alignItems:"center"}}>

                <View style={styles.box1}>
                    <Pressable style={styles.coverBox} onPress={selectCoverImage}>
                        <Icon name="cloud-upload-outline" size={48} color={"#4C444F"} style={styles.coverReUploadIcon} />
                        <Image source={{ uri: "http://localhost/chatApp/" + coverImage }} style={styles.myCoverImage} />
                    </Pressable>

                    <Pressable style={styles.profileBox} onPress={selectProfileImage}>
                        <Icon name="camera-outline" size={48} color={"#4C444F"} style={styles.ProfileReUploadIcon} />
                        <Image source={{ uri: "http://localhost/chatApp/" +  profileImage}} style={styles.myProfileImage} />
                        <View style={styles.myNameBox}>
                            <Text style={styles.profileText1}>{route.params.fname} {route.params.lname}</Text>
                            <Text style={styles.profileText2}>{route.params.slogan}</Text>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.box2}>
                    <View style={styles.bioBox1}>
                        <Icon name="phone-portrait-outline" size={20} color={"#0093FF"} />
                        <Text style={styles.bioText1}>{route.params.code} {route.params.mobile}</Text>
                    </View>

                    <View style={styles.bioBox2}>
                        <Icon name="flag-outline" size={20} color={"#4602FF"} />
                        <Text style={styles.bioText2}>{route.params.country}</Text>
                    </View>
                </View>

                <View style={styles.editTitleBox}>
                    <Text style={styles.editTitle}>Edit Details</Text>
                    <Text style={styles.editSubTitle}>Update your display details</Text>
                </View>

                <View style={styles.view3}>
                    <View>
                        <Text style={styles.inputText1}>First Name</Text>
                        <TextInput style={styles.input1} placeholder={"First Name"} autoCorrect={false} onChangeText={setFirstName} />
                    </View>
                    <View>
                        <Text style={styles.inputText2}>Last Name</Text>
                        <TextInput style={styles.input2} placeholder={"Last Name"} autoCorrect={false} onChangeText={setLastName} />
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.inputText3}>Your Slogan</Text>
                    <TextInput style={styles.input3} placeholder={"Your Slogan"} autoCorrect={false} onChangeText={setSlogan} />
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );

    async function selectCoverImage() {

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
                name: 'cover.png',
                type: 'image/png',
            };

            setCoverImage(imageObject);
        }

    }

    async function selectProfileImage() {
        const options = {
            mediaType: 'photo',
        };

        const result = await launchImageLibrary(options);

        if (result.didCancel) {
            // Alert.alert('Message','No Image');
        } else {
            const imageObject = {
                uri: result.assets[0].uri.replace("file://", ""),
                name: 'profile.png',
                type: 'image/png',
            };

    setProfileImage(imageObject);
         
              
        }
    }

    return ui;
}



const styles = StyleSheet.create(
    {
        input3: {
            width: 382,
            height: 50,
            borderStyle: "solid",
            borderWidth: 0.5,
            borderColor: "#D8D8D8",
            fontFamily: "Avenir",
            fontSize: 18,
            fontWeight: "500",
            backgroundColor: "#FFFFFF",
            borderRadius: 9,
            paddingStart: 15,
        },

        inputText1: {
            fontSize: 16,
            fontWeight: "500",
            fontFamily: "Avenir",
            color: "#4602FF",
            paddingBottom: 10,
            marginLeft: 4,
        },
        inputText2: {
            fontSize: 16,
            fontWeight: "500",
            fontFamily: "Avenir",
            color: "#4602FF",
            marginLeft: 16,
            paddingBottom: 10,
        },
        inputText3: {
            fontSize: 16,
            fontWeight: "500",
            fontFamily: "Avenir",
            color: "#4602FF",
            marginLeft: 4,
            paddingBottom: 10,
        },
        view3: {
            flexDirection: "row",
            marginTop: 30,
        },
        input1: {
            width: 186,
            height: 50,
            borderStyle: "solid",
            borderWidth: 0.5,
            borderColor: "#D8D8D8",
            fontFamily: "Avenir",
            fontSize: 18,
            fontWeight: "500",
            backgroundColor: "#FFFFFF",
            borderRadius: 9,
            paddingStart: 15,
        },
        input2: {
            width: 186,
            height: 50,
            borderStyle: "solid",
            borderWidth: 0.5,
            borderColor: "#D8D8D8",
            fontFamily: "Avenir",
            fontSize: 18,
            fontWeight: "500",
            backgroundColor: "#FFFFFF",
            borderRadius: 9,
            paddingStart: 15,
            marginLeft: 10,
        },

        editTitleBox: {
            width: "100%",
            paddingTop: 20,
            paddingStart: 24,
            paddingBottom: 16,
            borderBottomWidth: 0.5,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            borderColor: "#D6D6D6",
        },
        editTitle: {
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "Saira",
            color: "black",
        },
        editSubTitle: {
            fontSize: 16,
            fontWeight: "500",
            fontFamily: "Saira",
            color: "#6E6E6E",
        },

        ProfileReUploadIcon: {
            position: "absolute",
            zIndex: 5,
            alignSelf: "center",
            marginLeft: 56,
        },
        coverReUploadIcon: {
            position: "absolute",
            zIndex: 5,
            alignSelf: "center",
            marginTop: 48,
        },
        topBox: {
            width: "100%",
            height: 76,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
        },
        cancelEdit: {
            fontSize: 18,
            fontWeight: "500",
            fontFamily: "Avenir",
            color: "#FF3100",
            paddingStart: 30,
        },
        SaveEdit: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Saira",
            color: "#4602FF",
            paddingEnd: 38,
        },
        boxTop1: {
            width: "50%",
            alignItems: "flex-start",
        },
        boxTop2: {
            width: "50%",
            alignItems: "flex-end",
        },
        main: {
            flex: 1,
            alignItems: "center",
            backgroundColor: "#FFFFFF",
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
            color: "#4602FF",
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
            opacity: 0.5,
            backgroundColor:"white",

        },

        coverBox: {
            width: "100%",
            backgroundColor: "#FFFFFF",
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
            opacity: 0.5,
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

    }
);