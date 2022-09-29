import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createStackNavigator } from "@react-navigation/stack";
import { SLATE_900 } from "../Palette";
import CommentsHome from "./screens/CommentsHome";

const Stack = createStackNavigator();

export default function CommentsModal(props: {
  modalRef: React.RefObject<BottomSheetModal>;
}) {
  return (
    <>
      <BottomSheetModal
        ref={props.modalRef}
        snapPoints={["80%"]}
        backgroundStyle={{
          backgroundColor: SLATE_900,
        }}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
      >
        <Stack.Navigator
          initialRouteName="CommentsHome"
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: SLATE_900,
            },
          }}
        >
          <Stack.Screen name="CommentsHome" component={CommentsHome} />
        </Stack.Navigator>
      </BottomSheetModal>
    </>
  );
}
