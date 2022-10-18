import { ForbiddenError } from "apollo-server-express";
import { User } from "./IsUserAuthenticated";

export default function IsUserOwner(user: User, post: any) {
  if (user.id !== post.post.uploadedById) {
    throw new ForbiddenError("User doesn't own the content");
  }
}
