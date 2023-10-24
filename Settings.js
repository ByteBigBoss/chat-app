import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable, Image, useWindowDimensions, Animated, ScrollView, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export function Settings({ route, navigation }) {

    const [isEnable, setIsEnable] = useState(false);

    function toggleSwitch() {
        setIsEnable(previousState => !previousState);
    }

    const ui = (
        <SafeAreaView style={styles.main}>

            <View style={styles.topBox}>
                <TouchableOpacity style={styles.iconBox}onPress={() => { navigation.goBack() }}>
                    <Icon name='arrow-back' size={26}/>
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Settings</Text>
            </View>
            <ScrollView style={styles.container} contentContainerStyle={styles.containerBox}>

                <View style={styles.box1}>
                    <Image source={{ uri: "http://localhost/chatApp/" + route.params.pic }} style={styles.settProfImage} />
                    <Text style={styles.text1}>{route.params.fname} {route.params.lname}</Text>
                    <Text style={styles.text2}>{route.params.code} {route.params.mobile}</Text>
                </View>

                <View style={styles.optionBox1}>
                    <Pressable style={styles.box2}>
                        <Text style={styles.text3}>Appearance</Text>
                        <Text style={styles.text4}>Change theme of App</Text>
                    </Pressable>

                    <Pressable style={styles.contentBox3}>
                        <Text style={styles.optionText}>Dark Mode</Text>
                        <Switch
                            trackColor={{ false: "#E5E5E5", true: "#6255FF" }}
                            thumbColor={isEnable ? "#ffffff" : "#f4f3f4"}
                            ios_backgroundColor="#E5E5E5"
                            onValueChange={toggleSwitch}
                            value={isEnable}
                            style={styles.switch} />
                    </Pressable>

                    <Pressable style={styles.contentBox2}>
                        <Text style={styles.optionText}>Chat Background</Text>
                        <View style={styles.chatBG}></View>
                    </Pressable>
                </View>

                <View style={styles.optionBox2}>
                    <Pressable style={styles.box2}>
                        <Text style={styles.text5}>General</Text>
                        <Text style={styles.text4}>Take action</Text>
                    </Pressable>

                    <Pressable style={styles.contentBoxWithBoarder} onPress={() => { navigation.navigate("EditProfile") }}>
                        <Text style={styles.optionText}>Change Password</Text>
                    </Pressable>

                    <Pressable style={styles.contentBox2}>
                        <Text style={styles.optionText2}>Log Out</Text>
                        <Icon name='log-out-outline' size={26} style={styles.logOutIcon} />
                    </Pressable>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
    return ui;

}

const styles = StyleSheet.create(
    {
        switch: {
            position: "absolute",
            end: 18,
            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
        },
        chatBG: {
            width: 40,
            height: 40,
            backgroundColor: "purple",
            borderRadius: 10,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1.5 },
            shadowOpacity: 0.16,
            shadowRadius: 1,
            position: "absolute",
            borderWidth: 1,
            borderColor: "#CECECE",
            end: 20,
        },

        text5: {
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "Avenir",
            color: "#00ACA5",
        },
        optionBox2: {
            width: "100%",
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            marginTop: 16,
        },

        optionText: {
            fontSize: 16,
            fontWeight: "700",
            fontFamily: "Avenir",
            color: "black",
        },
        optionText2: {
            fontSize: 16,
            fontWeight: "700",
            fontFamily: "Avenir",
            color: "#FF0000",
        },

        logOutIcon: {
            position: "absolute",
            end: 20,
        },
        contentBox2: {
            flexDirection: "row",
            width: "100%",
            height: 64,
            alignItems: "center",
            paddingStart: 20,
            paddingEnd: 20,
        },
        contentBox3: {
            flexDirection: "row",
            width: "100%",
            height: 64,
            alignItems: "center",
            paddingStart: 20,
            paddingEnd: 20,
            borderBottomWidth: 0.5,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderColor: "#DDDDDD",
        },

        contentBox: {
            width: "100%",
            height: 64,
            justifyContent: "center",
            paddingStart: 20,
            paddingEnd: 20,

        },
        contentBoxWithBoarder: {
            width: "100%",
            height: 64,
            justifyContent: "center",
            paddingStart: 20,
            paddingEnd: 20,
            borderBottomWidth: 0.5,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderColor: "#DDDDDD",
        },

        text3: {
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "Avenir",
            color: "#AC8400",
        },
        text4: {
            fontSize: 14,
            fontWeight: "500",
            fontFamily: "Saira",
            color: "#6E6E6E",
            marginTop: 2,
        },
        box2: {
            width: "100%",
            paddingStart: 16,
            paddingTop: 14,
            paddingBottom: 12,
            borderBottomWidth: 0.5,
            borderColor: "#DDDDDD",
        },
        optionBox1: {
            width: "100%",
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            marginTop: 40,
        },

        box1: {
            width: "100%",
            alignItems: "center",
        },
        text1: {
            fontSize: 20,
            fontWeight: "700",
            fontFamily: "Saira",
            color: "black",
            marginTop: 12,
        },
        text2: {
            fontSize: 16,
            fontWeight: "600",
            fontFamily: "Saira",
            color: "#6E6E6E",
        },

        settProfImage: {
            width: 100,
            height: 100,
            borderWidth: 2,
            borderRadius: 20,
            borderColor: "#DDDDDD",
            marginTop: 30,
        },
        containerBox: {
            alignItems: "center",
            paddingHorizontal: 16,
        },
        container: {
            width: "100%",
            backgroundColor: "#F7F7F7",
        },

        iconBox: {
            flexDirection: "row",
            gap: 24,
            position: "absolute",
            zIndex: 5,
            alignSelf: "center",
            start: 30,
        },
        topBox: {
            width: "100%",
            height: 104,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
        },
        screenTitle: {
            fontSize: 28,
            fontWeight: "bold",
            fontFamily: "Saira",
            color: "black",
            width: "80%",
            paddingStart: 0,
            marginLeft: 72,
        },

        main: {
            flex: 1,
            alignItems: "center",
            backgroundColor: "#FFFFFF",
        },
    }
);