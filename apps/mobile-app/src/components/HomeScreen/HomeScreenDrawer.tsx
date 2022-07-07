import { useRef } from "react";
import { DrawerLayoutAndroid, View, StatusBar } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { useUser } from "../../hooks/Auth/useUser";
import { Logout } from "../../logic/Auth/Logout";
import urlParser from "../../logic/urlParser";
import { store } from "../../store";
import { LoadingScreenActions } from "../../store/slices/app/loadingScreenSlice";
import { AuthState } from "../../store/slices/authSlice";
import HomeBar from "../Headers/HomeBar";
import { SLATE_900 } from "../Palette";
import { Button } from "react-native-paper";
import { Tailwind } from "@jeact/colors";

export default function HomeScreenMiddleware(props: {
  children: React.ReactNode;
}) {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const user = useUser();
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={RFValue(290)}
      drawerPosition={"right"}
      renderNavigationView={() => <DrawerContent user={user} />}
      drawerBackgroundColor={SLATE_900}
    >
      <>
        <HomeBar drawer={drawer} />
        {props.children}
      </>
    </DrawerLayoutAndroid>
  );
}

function DrawerContent(props: { user: AuthState }) {
  let user = props.user;
  return (
    <>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          height: "96%",
        }}
      >
        <View style={{ alignItems: "flex-end", margin: RFValue(5) }}>
          <Avatar.Image
            size={RFValue(64)}
            source={{
              uri: urlParser(user.avatar),
            }}
          />
          <Text style={{ fontSize: RFValue(18), marginTop: RFValue(5) }}>
            {props.user.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: Tailwind.gray[500],
            }}
          >
            ${props.user.username}
          </Text>
        </View>
        <View style={{ marginRight: RFValue(5), marginTop: RFValue(5) }}>
          <Button
            onPress={() => {}}
            mode="contained"
            style={{
              marginBottom: RFValue(7),
              backgroundColor: Tailwind.coolGray[500],
            }}
          >
            View Profile
          </Button>
          <Button
            onPress={() => {
              store.dispatch(
                LoadingScreenActions.showLoadingScreen({
                  message: "Logging Out...",
                })
              );
              Logout().finally(() => {
                store.dispatch(LoadingScreenActions.closeLoadingScreen());
              });
            }}
            mode="contained"
          >
            Logout
          </Button>
        </View>
      </View>
    </>
  );
}
