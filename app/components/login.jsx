import { Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { LogBox } from 'react-native';



LogBox.ignoreLogs([
  'RNGoogleSignIn: `androidClientId` is not a valid configuration parameter',
]);


export default function Login() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
  
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      OAuthClientID:
        "741500148269-d9s0m2p927vdh22oa9cks9o1btga5v0v.apps.googleusercontent.com",
      // webClientId:
      //   "741500148269-fq05tj4jlav3grijbt08u5lbndfj47fa.apps.googleusercontent.com",
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
    // createTable();
  });

  const signIn = async () => {
    console.log("Pressed Sign In");

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text>{JSON.stringify(error)}</Text>
      <Text>{JSON.stringify(userInfo)}</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
}
