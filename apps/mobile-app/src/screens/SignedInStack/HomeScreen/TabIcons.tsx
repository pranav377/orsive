import {
  HomeIcon as HomeIconSolid,
  SearchIcon as SearchIconSolid,
  BellIcon as BellIconSolid,
} from "react-native-heroicons/solid";
import { HomeIcon, SearchIcon, BellIcon } from "react-native-heroicons/outline";

export function HomeTabIcon(props: { focused: boolean; color: string }) {
  if (props.focused) {
    return <HomeIconSolid color={props.color} />;
  } else {
    return <HomeIcon color={props.color} />;
  }
}

export function SearchTabIcon(props: { focused: boolean; color: string }) {
  return <SearchIcon color={props.color} />;
}

export function NotificationsTabIcon(props: {
  focused: boolean;
  color: string;
}) {
  // if (props.focused) {
  return <BellIconSolid color={props.color} />;
  // } else {
  //   return <BellIcon color={props.color} />;
  // }
}
