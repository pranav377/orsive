import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { memo } from "react";
import HomeScreenDrawer from "../../../components/HomeScreen/HomeScreenDrawer";
import { SLATE_900 } from "../../../components/Palette";
import HomeMainScreen from "./HomeMainScreen";
import NotificationsScreen from "./NotificationsScreen";
import SearchScreen from "./SearchScreen";
import { HomeTabIcon, NotificationsTabIcon, SearchTabIcon } from "./TabIcons";

const Tab = createMaterialBottomTabNavigator();
export function HomeScreenComponent() {
  return (
    <HomeScreenDrawer>
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
    </HomeScreenDrawer>
  );
}

const HomeScreen = memo(HomeScreenComponent);
export default HomeScreen;
