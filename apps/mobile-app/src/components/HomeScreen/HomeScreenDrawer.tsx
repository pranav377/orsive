import { useRef } from "react";
import { DrawerLayoutAndroid, View, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { useToast } from "react-native-toast-notifications";
import { Logout } from "../../logic/Auth/Logout";
import { store } from "../../store";
import { LoadingScreenActions } from "../../store/slices/app/loadingScreenSlice";
import HomeBar from "../Headers/HomeBar";
import { SLATE_900 } from "../Palette";

export default function HomeScreenMiddleware(props: {
  children: React.ReactNode;
}) {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={RFValue(290)}
      drawerPosition={"right"}
      renderNavigationView={HomeScreenDrawerContent}
      drawerBackgroundColor={SLATE_900}
    >
      <>
        <HomeBar drawer={drawer} />
        {props.children}
      </>
    </DrawerLayoutAndroid>
  );
}

function HomeScreenDrawerContent() {
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        padding: RFValue(5),
        height: "96%",
      }}
    >
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
  );
}
