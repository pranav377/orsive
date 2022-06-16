import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SLATE_900 } from "../../../components/Palette";
import HomeMainScreen from "./HomeMainScreen";
import NotificationsScreen from "./NotificationsScreen";
import SearchScreen from "./SearchScreen";
import { HomeTabIcon, NotificationsTabIcon, SearchTabIcon } from "./TabIcons";

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: SLATE_900,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: HomeTabIcon,
          title: "Home",
        }}
        name="HomeMain"
        component={HomeMainScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: SearchTabIcon,
          title: "Search",
        }}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: NotificationsTabIcon,
          title: "Notifications",
        }}
        name="Notifications"
        component={NotificationsScreen}
      />
    </Tab.Navigator>
  );
}
