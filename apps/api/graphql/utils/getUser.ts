import jwt from "jsonwebtoken";

const getUser = (token: string | undefined) => {
  if (token && token !== "null") {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return null;
    }
  } else return null;
};

export default getUser;
