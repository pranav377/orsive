import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";
import IsUsernameValid from "../../utils/data/IsUsernameValid";
import {
  CheckEmail,
  CheckEmailInput,
  FollowUser,
  FollowUserInput,
  GetOTP,
  GetOTPArgs,
  GetUser,
  GetUserInput,
  Me,
  SignIn,
  SignInArgs,
  SignUp,
  SignUpArgs,
} from "./controllers/auth.controller";

const AUTH_RESOLVERS = {
  Query: {
    getOTP(_: void, args: GetOTPArgs) {
      GetOTP(args);

      return "OTP sent successfully!";
    },

    getUser(_: void, args: GetUserInput) {
      return GetUser(args);
    },

    me(_: void, _args: any, context: any) {
      IsUserAuthenticated(context);

      return Me(context.getUser());
    },

    checkUsername(_: void, args: any) {
      return IsUsernameValid(args);
    },

    checkEmail(_: void, args: CheckEmailInput) {
      return CheckEmail(args);
    },
  },

  Mutation: {
    signUp(_: void, args: SignUpArgs, context: any) {
      return SignUp(args, context);
    },

    signIn(_: void, args: SignInArgs, context: any) {
      return SignIn(args, context);
    },

    logout(_: void, _args: any, context: any) {
      IsUserAuthenticated(context);
      context.logout();
      return "success";
    },

    followUser(_: void, args: FollowUserInput, context: any) {
      IsUserAuthenticated(context);

      return FollowUser(args, context.getUser());
    },
  },
};

export default AUTH_RESOLVERS;
