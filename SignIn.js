import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View,TextInput ,Pressable, Alert, TouchableOpacity, ScrollView,KeyboardAvoidingView} from "react-native";


export function SignIn({route, navigation }) {

    const [mobile,setMobileNumber] = useState(null);
    const [password,setPassword] = useState(null);

    const [mobilInput,setMobileInput] = useState(styles.input3);
    const [passwordInput,setPasswordInput] = useState(styles.input3);
    const [ErrorMobile,setErrorMobile] = useState(0);
    const [ErrorPassword,setErrorPassword] = useState(0);
    const [passwordErrorText,setPasswordErrorText] = useState("Password...");

    // const [user,setUser] = useState('');

    // function checkUser (){
    //     const form = new FormData();

    //     if(route.params!=null){
    //         form.append("mobile",route.params.mobile);
    //         form.append("id",route.params.id);
    //     }

    //     var request = new XMLHttpRequest();
    //     request.onreadystatechange=function(){
    //         if(request.readyState==4&&request.status==200){
    //             setUser(JSON.parse(request.responseText));
    //         }
    //     };
    //     request.open("POST","http://localhost/chatApp/preview_user.php",true);
    //     request.send(form);

    // }

    // const callCheckUser = ()=>{checkUser();};
    // useEffect(callCheckUser,[]);

    const ui = (
        <SafeAreaView style={styles.main}>
<KeyboardAvoidingView style={{width:"100%",}} behavior={"padding"}>
        <ScrollView style={{width:"100%",}} contentContainerStyle={{alignItems:"center",paddingTop:40}} showsVerticalScrollIndicator={false}>
            {route.params!=null?
            <View style={styles.view2}>
                <Image source={{uri:"http://localhost/chatApp/"+route.params.pic}} style={styles.profileImage} />
                <Text style={styles.nameText}>{route.params.fname} {route.params.lname}</Text>
            </View>
            :
            ""}

            <View style={styles.view1}>
                <Text style={styles.text1}>Sign In</Text>
                <Text style={styles.text2}>Enter your details to continue</Text>
            </View>

            {ErrorMobile==1?<Text style={styles.mobileErrorText}>{mobile==''?"Enter Your Mobile Number":"Invalid Mobile Number"}</Text>:""}
            <TextInput style={mobilInput} placeholder={"Your Mobile Number"} autoCorrect={false}  onChangeText={setMobileNumber} maxLength={10} value={mobile}/>
            {ErrorPassword==1?<Text style={styles.passwordErrorText}>{password==''?"Enter Your Password":passwordErrorText}</Text>:""}
            <TextInput style={passwordInput} placeholder={"Password"} autoCorrect={false} secureTextEntry={true} onChangeText={setPassword} value={password}/>

            <Pressable style={styles.signInButton} onPress={signInProcess}>
                <Text style={styles.signInButtonText}>Sign In</Text>
            </Pressable>

            <Pressable style={styles.view5} >
                <Text style={styles.text3}>New to ChatApp?</Text>
               <TouchableOpacity onPress={()=>{navigation.navigate("SignUp",route.params)}}><Text style={styles.text4} >Sign Up</Text></TouchableOpacity>
            </Pressable>
</ScrollView>
</KeyboardAvoidingView>
        </SafeAreaView>
    );

    function signInProcess(){

        var jsRequestObject = {"mobile":mobile,"password":password}
        var jsonRequestText = JSON.stringify(jsRequestObject);

        var form = new FormData();
        form.append("jsonRequestText",jsonRequestText);

        var request = new XMLHttpRequest();
        request.onreadystatechange=function(){
            if(request.readyState==4&&request.status==200){
                
                var jsonResponseText = request.responseText;
                var jsResponseObject = JSON.parse(jsonResponseText);


                if(jsResponseObject.mobile=="Avalible"){
                    setMobileInput(styles.input3);
                    setErrorMobile(0);
                }
                if(jsResponseObject.mobile=="Avalible"&&jsResponseObject.password=="Wrong"){
                    setErrorPassword(styles.passwordError);
                    setErrorPassword(1);
                    setPasswordErrorText("Wrong Password");
                }


                // --------------------------------------------------------
                if(jsResponseObject.msg=="Error"){
                    // Alert.alert("Message","Invalid Details");
                    setMobileInput(styles.mobileError);
                    setPasswordInput(styles.passwordError);
                    setErrorPassword(1);
                    setErrorMobile(1);
                }else if(jsResponseObject.msg=="Success"){
                    var userObject = jsResponseObject.user;
                    AsyncStorage.setItem("user",JSON.stringify(userObject));
                    setMobileInput(styles.input3);
                    setPasswordInput(styles.input3);
                    setErrorPassword(0);
                    setMobileNumber('');
                    setPassword('');
                    navigation.navigate("Message");
                }



            }
        };
        request.open("POST","http://localhost/chatApp/signIn.php",true);
        request.send(form);

    }

    return ui;
}

const styles = StyleSheet.create(
    {

        passwordErrorText:{
            width: 382,
            fontFamily: "Avenir",
            color:"#FF003B",
            start:5,
            paddingTop:20
        },
        mobileErrorText:{
            width: 382,
            fontFamily: "Avenir",
            color:"#FF003B",
            start:5,
        },

        mobileError: {
            width: 382,
            height: 50,
            borderStyle: "solid",
            borderWidth: 0.5,
            borderColor: "#FF003B",
            fontFamily: "Avenir",
            fontSize: 18,
            fontWeight: "500",
            backgroundColor: "#FFFFFF",
            borderRadius: 9,
            paddingStart: 15,
            marginTop: 8,
            color:"#FF003B",
        },

        passwordError: {
            width: 382,
            height: 50,
            borderStyle: "solid",
            borderWidth: 0.5,
            borderColor: "#FF003B",
            fontFamily: "Avenir",
            fontSize: 18,
            fontWeight: "500",
            backgroundColor: "#FFFFFF",
            borderRadius: 9,
            paddingStart: 15,
            marginTop: 8,
            color:"#FF003B",
        },


        main: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            alignItems: "center",
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#DDDDDD",
            backgroundColor: "#F8F8F8",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
        },

        nameText: {
            fontFamily: "Maven Pro",
            fontSize: 18,
            fontWeight: 500,
            marginTop: 10,
        },

        text1: {
            fontSize: 35,
            fontFamily: "Maven Pro",
            fontWeight: "bold",
        },
        text2: {
            fontSize: 18,
            fontFamily: 'Avenir',
            fontWeight: 400,
            marginTop: 6,
        },

        view1: {
            alignSelf: "flex-start",
            start: 30,
            marginBottom:10,
        },
        view2:{
            marginBottom:60,
            alignItems:"center",
        },

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
            marginTop: 20,
        },

        signInButton:{
            width:382,
            height:50,
            backgroundColor:"#6C00FF",
            borderRadius:9,
            justifyContent:"center",
            alignItems:"center",
            marginTop:24,
        },
        signInButtonText:{
            fontFamily:"Avenir",
            color:"#FFFFFF",
            fontSize:22,
            fontWeight:"900",
        },

        view5:{
            flexDirection:"row",
            gap:8,
            marginTop:30,
            paddingBottom:110,
        },
        text3:{
            fontFamily:"Avenir",
            fontSize:18,
            fontWeight:"400",
            color:"black",
        },
        text4:{
            fontFamily:"Avenir",
            fontSize:18,
            fontWeight:"500",
            color:"#6C00FF",
        },
    }
);