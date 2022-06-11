import { Image, StyleSheet, View } from "react-native";
import {
  Headline,
  Button,
  Subheading,
  TouchableRipple,
  Text,
} from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import DiscordSVG from "../../assets/social-icons/discord-color-logo.svg";
import GoogleSVG from "../../assets/social-icons/google-color-logo.svg";
import { InboxIcon } from "react-native-heroicons/solid";

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Headline>Welcome to Orsive</Headline>
      <Subheading style={{ marginTop: 0 }}>A simple social graph</Subheading>

      <View style={styles.authList}>
        <TouchableRipple
          rippleColor="gray"
          borderless
          onPress={() => {}}
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
          onPress={() => {}}
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
          onPress={() => {}}
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
          onPress={() => {}}
        >
          Already a smarty capty? Log In
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
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
