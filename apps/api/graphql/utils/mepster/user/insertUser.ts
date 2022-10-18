import recommenderClient from "../client";
import { searchIndex } from "../searchClient";

interface UserType {
  UserId: string;
}

export default function insertUser(user: UserType, userDetails: any) {
  searchIndex.addDocuments([
    {
      id: userDetails.id,
      type: "Profile",
      username: userDetails.username,
      name: userDetails.name,
      avatar: userDetails.avatar,
      joined: userDetails.joined,
      _count: { ...userDetails._count },
    },
  ]);
  recommenderClient.post("/user/", user);
}

/*
  id
  username
  name
  avatar
  joined
  _count {
    followers
    following
  }
 */
