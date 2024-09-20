/*import { Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      OAuthClientID:
        "741500148269-d9s0m2p927vdh22oa9cks9o1btga5v0v.apps.googleusercontent.com",
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    console.log("Pressed Sign In");

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUserInfo(userInfo);
      
      if (onLoginSuccess) {
        onLoginSuccess(userInfo);
      }
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
}*/
