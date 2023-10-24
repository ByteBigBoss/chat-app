import React, { useEffect, useState } from "react";
import { SignUp } from "./SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "./SignIn";
import { Message } from "./Message";
import { Chat } from "./Chat";
import { MyProfile } from "./MyProfile";
import { Profile } from "./Profile";
import { Moments } from "./Moments";
import { PostMoment } from "./PostMoment";
import { EditProfile } from "./EditProfile";
import { Settings } from "./Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Test } from "./Test";


const Stack = createNativeStackNavigator()

function App (){
  const [user,setUser] = useState(0);

  async function checkUser(){
    const user = await AsyncStorage.getItem("user");
    // if(user==null){
    // setUser(0);
    // }else{
    //   setUser(1);
    // }
    return user;
  }
  // const call = ()=>{checkUser()};
  // useEffect(call,[]);


  const ui = (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={checkUser!=null?"SignUp":"SignIn"} screenOptions={{animationTypeForReplace:'push'}}>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
        <Stack.Screen name="Message" component={Message} options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
        <Stack.Screen name="MyProfile" component={MyProfile} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="Moments" component={Moments} options={{headerShown:false}}/>
        <Stack.Screen name="PostMoment" component={PostMoment} options={{headerShown:false}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
        <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>

        <Stack.Screen name="Test" component={Test} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}

export default App;