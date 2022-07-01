import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import {
  Headline,
  Button,
  Subheading,
  TouchableRipple,
} from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import DiscordSVG from "../../../assets/social-icons/discord-color-logo.svg";
import GoogleSVG from "../../../assets/social-icons/google-color-logo.svg";
import { InboxIcon } from "react-native-heroicons/solid";
import { useEffect, useRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import EmailRegistrationModal from "../../components/Auth/EmailRegistrationModal";
import EmailLoginModal from "../../components/Auth/EmailLoginModal";
import { useNavigationParams } from "../../hooks/useNavigationParams";
import { DISCORD_AUTH_URL, GOOGLE_AUTH_URL } from "../../logic/config";
import * as WebBrowser from "expo-web-browser";
import { useDispatch } from "react-redux";
import { LoadingScreenActions } from "../../store/slices/app/loadingScreenSlice";
import LoginUser from "../../logic/Auth/LoginUser";

export default function AuthScreen() {
  const emailRegistrationModalRef = useRef<BottomSheetModal>(null);
  const emailLoginModalRef = useRef<BottomSheetModal>(null);

  const params = useNavigationParams("Auth");
  const dispatch = useDispatch();

  useEffect(() => {
    if (params["token"]) {
      dispatch(
        LoadingScreenActions.showLoadingScreen({
          message: "Logging in...",
        })
      );

      (async () => {
        await LoginUser(params["token"], {
          ...params,
          setupComplete: params["setupComplete"] === "true",
        });
        dispatch(LoadingScreenActions.closeLoadingScreen());
      })();
    }
  }, [params]);

  return (
    <>
      <BottomSheetModalProvider>
        <EmailRegistrationModal modalRef={emailRegistrationModalRef} />
        <EmailLoginModal modalRef={emailLoginModalRef} />
        <View style={styles.container}>
          <Image
            source={require("../../../assets/logo.png")}
            style={{
              width: RFValue(50),
              height: RFValue(50),
            }}
          />
          <Headline>Welcome to Orsive</Headline>
          <Subheading style={{ marginTop: 0 }}>
            A simple social graph
          </Subheading>

          <View style={styles.authList}>
            <TouchableRipple
              rippleColor="gray"
              borderless
              onPress={() => {
                WebBrowser.openBrowserAsync(GOOGLE_AUTH_URL);
              }}
              style={[styles.authButton, styles.googleButton]}
            >
              <>
                <GoogleSVG
                  style={{
                    width: RFValue(20),
                    height: RFValue(20),
                  }}
                />
                <Subheading style={[{ color: "black" }, styles.authButtonText]}>
                  Continue with Google
                </Subheading>
              </>
            </TouchableRipple>
            <TouchableRipple
              borderless
              onPress={() => {
                WebBrowser.openBrowserAsync(DISCORD_AUTH_URL);
              }}
              style={[styles.authButton, styles.discordButton]}
            >
              <>
                <DiscordSVG
                  style={{
                    width: RFValue(20),
                    height: RFValue(20),
                  }}
                />
                <Subheading style={styles.authButtonText}>
                  Continue with Discord
                </Subheading>
              </>
            </TouchableRipple>
            <TouchableRipple
              borderless
              onPress={() => {
                emailRegistrationModalRef.current?.present();
              }}
              style={[styles.authButton, styles.emailButton]}
            >
              <>
                <InboxIcon
                  color={"white"}
                  style={{
                    width: RFValue(20),
                    height: RFValue(20),
                  }}
                />
                <Subheading style={styles.authButtonText}>
                  Continue with Email
                </Subheading>
              </>
            </TouchableRipple>
            <Button
              mode="text"
              style={{ marginTop: RFValue(10) }}
              onPress={() => {
                emailLoginModalRef.current?.present();
              }}
            >
              Already a smarty capty? Log In
            </Button>
          </View>
        </View>
      </BottomSheetModalProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  authList: {
    alignItems: "center",
    marginTop: RFValue(23),
  },
  authButton: {
    width: RFValue(240),
    borderRadius: RFValue(25),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(4),
    margin: RFValue(3),
  },
  googleButton: {
    backgroundColor: "white",
  },
  discordButton: {
    backgroundColor: "#334155",
  },
  emailButton: {
    backgroundColor: "#1d4ed8",
  },
  authButtonText: {
    width: "80%",
    textAlign: "center",
  },
});
