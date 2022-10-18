import { ApolloError } from "apollo-server-express";

export default function GetObjOrNotFound<ObjType>(
  obj: ObjType,
  message = "Object not found",
  objFoundCallback?: any
) {
  if (!obj) {
    throw new ApolloError(message);
  } else {
    if (objFoundCallback) {
      objFoundCallback();
    }
    return obj;
  }
}
