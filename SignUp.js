import React, { useEffect, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SignUp({ navigation, route }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [coverImage, setCoverImage] = useState(null);

    const [profileImage, setProfileImage] = useState(null);
    const [slogan, setSlogan] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const [country, setCountry] = useState("");
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [countries, setCountries] = useState([]);


    const [mobileBox2, setMobileBox2] = useState('');
    const [firstNameText, setFirstNameText] = useState('');
    const [lastNameText, setLastNameText] = useState('');

    const [nameBox,setNameBox] = useState(styles.nameBox2Change);

    const [mobilInput, setMobileInput] = useState(styles.input4);
    const [mobileBox, setMobileBox] = useState(styles.view4);
    const [namesBox, setNamesBox] = useState(styles.view3);
    const [firstNameInput, setFirstNameInput] = useState(styles.input1);
    const [lastNameInput, setLastNameInput] = useState(styles.input2);
    const [sloganInput, setSloganInput] = useState(styles.input3);
    const [passwordInput, setPasswordInput] = useState(styles.input3);
    const [verifyPasswordInput, setVerifyPasswordInput] = useState(styles.Vinput3);
    const [selectCountryCode, setSelectCountryCode] = useState(styles.select1);

    const [ErrorCode, setErrorCode] = useState(0);
    const [ErrorSlogan, setErrorSlogan] = useState(0);
    const [ErrorMobile, setErrorMobile] = useState(0);
    const [ErrorPassword, setErrorPassword] = useState(0);
    const [ErrorPasswordVerify, setErrorPasswordVerfy] = useState(0);
    const [ErrorFirstName, setErrorFirstName] = useState(0);
    const [ErrorLastName, setErrorLastName] = useState(0);
    const [passwordErrorText, setPasswordErrorText] = useState("Password...");


    function loadCountries() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var countryArray = JSON.parse(request.responseText);
                setCountries(countryArray);
            }
        };
        request.open("GET", "http://localhost/chatApp/load_countries.php", true);
        request.send();
    }

    const load = () => {
        loadCountries();
    }

    useEffect(load, []);

    const ui = (
        <SafeAreaView style={styles.main}>

            <KeyboardAvoidingView style={{ width: "100%", }} behavior={"padding"}>
                <ScrollView style={{ width: "100%", }} contentContainerStyle={{ alignItems: "center", paddingBottom: 40, paddingTop: 29 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.view1}>
                        <Text style={styles.text1}>Sign Up</Text>
                        <Text style={styles.text2}>Create New account to continue</Text>
                    </View>

                    <View style={styles.view2}>

                        <Pressable style={styles.coverImageBox} onPress={selectCoverImage}>
                            {coverImage != null ? <Image source={coverImage} style={styles.coverImage} onPress={selectCoverImage} /> : ""}
                            {coverImage != null ? <Icon name="upload" size={30} color={"#FFFFFF"} style={styles.coverIcon} /> : <Icon name="upload" size={30} color={"#7F7F7F"} style={styles.coverIcon} />}
                        </Pressable>

                        <Pressable style={styles.profileImageBox} onPress={selectProfileImage}>
                            {profileImage != null ? <Image source={profileImage} style={styles.profileImage} onPress={selectProfileImage} /> : ""}
                            {profileImage != null ? <Icon name="camera" size={30} color={"#FFFFFF"} /> : <Icon name="camera" size={30} color={"#7F7F7F"} />}
                        </Pressable>

                    </View>

                    <View style={namesBox}>
                        <View>
                        {ErrorFirstName == 1 ? <Text style={styles.nameErrorText1}>Enter Your First Name</Text> : ""}
                        <TextInput style={firstNameInput} placeholder={"First Name"} autoCorrect={false} onChangeText={setFirstName} />
                        </View>
                            <View>
                            {ErrorLastName == 1 ? <Text style={styles.nameErrorText2}>Enter Your Last Name</Text> : ""}
                        <TextInput style={lastNameInput} placeholder={"Last Name"} autoCorrect={false} onChangeText={setLastName} />
                            </View>

                    </View>

                    {ErrorSlogan == 1 ? <Text style={styles.sloganErrorText}>Enter Your Slogan</Text> : ""}
                    <TextInput style={sloganInput} placeholder={"Your Slogan"} autoCorrect={false} onChangeText={setSlogan} />

                    <View style={nameBox}>
                        {ErrorCode == 1 ? <Text style={styles.CodeErrorText}>Country</Text> : ""}
                        {ErrorMobile == 1 ? <Text style={styles.mobileErrorText}>{mobileNumber == '' ? "Enter Your Mobile Number" : "Invalid Mobile Number"}</Text> : ""}
                    </View>
                    <View style={mobileBox2}>

                        <View style={mobileBox}>
                            <SelectDropdown data={countries} onSelect={setCountry} buttonStyle={selectCountryCode} buttonTextStyle={styles.selectText} dropdownStyle={styles.selectDrop} defaultButtonText={"Select"} />
                            <TextInput style={mobilInput} placeholder={"Your Mobile Number"} autoCorrect={false} keyboardType={"numeric"} onChangeText={setMobileNumber} maxLength={10} />
                        </View>
                    </View>

                    {ErrorPassword == 1 ? <Text style={styles.passwordErrorText}>{password == '' ? "Enter New Password" : passwordErrorText}</Text> : ""}
                    <TextInput style={passwordInput} placeholder={"Password"} autoCorrect={false} secureTextEntry={true} onChangeText={setPassword} />
                    {ErrorPasswordVerify == 1 ? <Text style={styles.passwordErrorText}>{password == '' ? "Enter Password Again" : passwordErrorText}</Text> : ""}
                    <TextInput style={verifyPasswordInput} placeholder={"Verify Password"} autoCorrect={false} secureTextEntry={true} onChangeText={setVerifyPassword} />

                    <Pressable style={styles.signUpButton} onPress={signUpRequest}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </Pressable>

                    <Pressable style={styles.view5} >
                        <Text style={styles.text3}>Already have account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("SignIn",route.params); }}><Text style={styles.text4}>Sign In</Text></TouchableOpacity>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
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



    async function signUpRequest() {

        if (firstName == null) {
            Alert.alert("Message", "Fill First Name");
        } else if (lastName == null) {
            Alert.alert("Message", "Fill Last Name");

        } else if (password != null) {
            var form = new FormData();
            form.append('cover', coverImage);
            form.append('profile_picture', profileImage);
            form.append('firstName', firstName);
            form.append('lastName', lastName);
            form.append('slogan', slogan);
            form.append('mobile', mobileNumber);
            form.append('countryCode', country);
            form.append('password', password);
            form.append('verifyPassword', verifyPassword);

            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {

                    const jsObject = JSON.parse(request.responseText);

                    if(jsObject.msg=="Error"){
                        Alert.alert("Message","Invalid Details");
                                 setMobileInput(styles.mobileError);
                        setMobileBox(styles.view4Change);
                        setMobileBox2(styles.mobileBox2);
                        setNamesBox(styles.view3Change);
                        setFirstNameInput(styles.fistnameError);
                        setLastNameInput(styles.lastnameError);
                        setSloganInput(styles.sloganError);
                        setPasswordInput(styles.passwordError);
                        setVerifyPasswordInput(styles.ErrorPasswordVerify);
                        setSelectCountryCode(styles.selectErrorCode);
                        setErrorFirstName(1);
                        setErrorLastName(1);
                        setErrorMobile(1);
                        setErrorSlogan(1);
                        setErrorPassword(1);
                        setErrorPasswordVerfy(1);
                        setErrorCode(1);
                        setNameBox(styles.nameBox2);
              
                    }else{
                        const user = {"mobile":mobileNumber,"id":jsObject.userID};
                        navigation.navigate("SignIn",user);
                        setMobileInput(styles.input4);

                            setMobileBox(styles.view4);
                            setMobileBox2(styles.mobileBox2);
                            setNamesBox(styles.view3);
                            setFirstNameInput(styles.input1);
                            setLastNameInput(styles.input2);
                            setSloganInput(styles.sloganError);
                            setPasswordInput(styles.input3);
                            setVerifyPasswordInput(styles.Vinput3);
                            setSelectCountryCode(styles.select1);
                            setNameBox(styles.nameBox2Change);
                            setErrorFirstName(0);
                            setErrorLastName(0);
                            setErrorMobile(0);
                            setErrorSlogan(0);
                            setErrorPassword(0);
                            setErrorPasswordVerfy(0);
                            setErrorCode(0);
                    }


                    if(jsObject.fname=="none"){
                        setNamesBox(styles.view3Change);
                        setFirstNameInput(styles.fistnameError);
                        setErrorFirstName(1);
                    }else{
                        setNamesBox(styles.view3);
                            setFirstNameInput(styles.input1);
                        setErrorFirstName(0);
                    }


                    if(jsObject.lname=="none"){
                        setNameBox(styles.view3Change);
                        setLastNameInput(styles.lastnameError);
                        setErrorLastName(1);
                    }else{
                        setNameBox(styles.view3);
                        setLastNameInput(styles.input2);
                        setErrorLastName(0);
                    }
                                        // if (jsObject.msg == "Error") {
                    //     // Alert.alert("Message","Invalid Details");
                    //     setMobileInput(styles.mobileError);
                    //     setMobileBox(styles.view4Change);
                    //     setMobileBox2(styles.mobileBox2);
                    //     setNamesBox(styles.view3Change);
                    //     setFirstNameInput(styles.fistnameError);
                    //     setLastNameInput(styles.lastnameError);
                    //     setSloganInput(styles.sloganError);
                    //     setPasswordInput(styles.passwordError);
                    //     setVerifyPasswordInput(styles.ErrorPasswordVerify);
                    //     setSelectCountryCode(styles.selectErrorCode);
                    //     setErrorFirstName(1);
                    //     setErrorLastName(1);
                    //     setErrorMobile(1);
                    //     setErrorSlogan(1);
                    //     setErrorPassword(1);
                    //     setErrorPasswordVerfy(1);
                    //     setErrorCode(1);
                    //     setNameBox(styles.nameBox2);

                    // } else {
                    //     setMobileInput(styles.input4);
                    //     setMobileBox(styles.view4);
                    //     setMobileBox2(styles.mobileBox2);
                    //     setNamesBox(styles.view3);
                    //     setFirstNameInput(styles.input1);
                    //     setLastNameInput(styles.input2);
                    //     setSloganInput(styles.sloganError);
                    //     setPasswordInput(styles.input3);
                    //     setVerifyPasswordInput(styles.Vinput3);
                    //     setSelectCountryCode(styles.select1);
                    //     setNameBox(styles.nameBox2Change);
                    //     setErrorFirstName(0);
                    //     setErrorLastName(0);
                    //     setErrorMobile(0);
                    //     setErrorSlogan(0);
                    //     setErrorPassword(0);
                    //     setErrorPasswordVerfy(0);
                    //     setErrorCode(0);
                    // }

                    // if (jsObject.fname == "none") {
                    //     setFirstNameInput(styles.fistnameError);
                    //     setErrorFirstName(1);
                    //     setNamesBox(styles.view3);
                    // } else {
                    //     setFirstNameInput(styles.input1);
                    //     setErrorFirstName(0);
                    //     setNamesBox(styles.view3Change);
                    // }

                    // if(jsObject.lname == "none"){
                    //     setLastNameInput(styles.lastnameError);
                    //     setErrorLastName(1);
                    //     setNamesBox(styles.view3);
                    // }else{
                    //     setLastNameInput(styles.input2);
                    //     setErrorLastName(0);
                    //     setNamesBox(styles.view3Change);
                    // }
              
                }
            }
            request.open("POST", "http://localhost/chatApp/signUp.php", true);
            request.send(form);
        }
    }

    return ui;
}



const styles = StyleSheet.create(
    {
        selectErrorCode: {
            width: 92,
            height: 50,
            borderStyle: "solid",
            borderWidth: 0.5,
            borderColor: "#FF003B",
            backgroundColor: "#FFFFFF",
            borderRadius: 9,
            textAlign: "center",
            color: "#FF003B",
        },

        CodeErrorText: {
            width: 92,
            fontFamily: "Avenir",
            color: "#FF003B",
            start: 0,

        },

        sloganErrorText: {
            width: 382,
            fontFamily: "Avenir",
            color: "#FF003B",
            start: 5,
            paddingTop: 20
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
            color: "#FF003B",
        },


        Vinput3: {
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
        ErrorPasswordVerify: {
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
            color: "#FF003B",
        },

        sloganError: {
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
            color: "#FF003B",
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
        fistnameError: {
            width: 186,
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
            color: "#FF003B",
            marginTop:8,

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
        lastnameError: {
            width: 186,
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
            marginLeft: 5,
            marginTop:8,
            color: "#FF003B",
        },


        view3: {
            flexDirection: "row",
            marginTop: 110,

        },
        view3Change: {
            flexDirection: "row",
            marginTop: 80,

        },
        nameBox: {
            flexDirection: "row",
            marginTop: 110,
        },
        nameBox2: {
            flexDirection: "row",
            marginTop: 20,
        },
        nameBox2Change: {
            flexDirection: "row",
            marginTop: 0,
        },
        nameErrorText1: {
            width: 191,
            fontFamily: "Avenir",
            color: "#FF003B",
            start: 5,
            paddingTop: 20
        },
        nameErrorText2: {
            width: 191,
            fontFamily: "Avenir",
            color: "#FF003B",
            start: 10,
            paddingTop: 20,
           
        },

        mobileBox2: {
            // marginTop: 20,
        },
        view4: {
            flexDirection: "row",
            marginTop: 20,
        },
        view4Change: {
            flexDirection: "row",
            marginTop: 0,
        },
        passwordErrorText: {
            width: 382,
            fontFamily: "Avenir",
            color: "#FF003B",
            start: 5,
            paddingTop: 20
        },
        mobileErrorText: {
            fontFamily: "Avenir",
            color: "#FF003B",
            paddingStart: 8,
            paddingBottom: 8,
            width: 280,
            alignSelf: "flex-end",
        },

        input4: {
            width: 280,
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
        mobileError: {
            width: 280,
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
            marginLeft: 10,
            color: "#FF003B",
        },


        main: {
            flex: 1,
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
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
        },
        coverImageBox: {
            width: "100%",
            height: 140,
            backgroundColor: "#FCFCFC",
            marginTop: 10,
            borderStyle: "solid",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16,
            shadowRadius: 2,
            alignItems: "center",
            justifyContent: "center",
        },
        coverImage: {
            width: "100%",
            height: 140,
            backgroundColor: "#FFFFFF",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            alignItems: "center",
            justifyContent: "center",
        },
        coverIcon: {
            position: "absolute",
        },

        profileImageBox: {
            width: 100,
            height: 100,
            borderStyle: "solid",
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#DDDDDD",
            backgroundColor: "#F8F8F8",
            alignSelf: "center",
            marginTop: 130,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#DDDDDD",
            backgroundColor: "#F8F8F8",
            alignSelf: "center",
            marginTop: 130,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
        },
        view2: {
            width: "100%",
        },

        view3: {
            flexDirection: "row",
            marginTop: 110,

        },





        select1: {
            width: 92,
            height: 50,
            borderStyle: "solid",
            borderWidth: 0.5,
            borderColor: "#D8D8D8",
            backgroundColor: "#FFFFFF",
            borderRadius: 9,
            textAlign: "center",
        },
        selectText: {
            fontFamily: "Avenir",
            fontWeight: "500",
            fontSize: 18,
        },
        selectDrop: {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,

        },

        signUpButton: {
            width: 382,
            height: 50,
            backgroundColor: "#6C00FF",
            borderRadius: 9,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
        },
        signUpButtonText: {
            fontFamily: "Avenir",
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: "900",
        },

        view5: {
            flexDirection: "row",
            gap: 8,
            marginTop: 20,

        },
        text3: {
            fontFamily: "Avenir",
            fontSize: 18,
            fontWeight: "400",
            color: "black",
        },
        text4: {
            fontFamily: "Avenir",
            fontSize: 18,
            fontWeight: "500",
            color: "#6C00FF",
        },
    }
);