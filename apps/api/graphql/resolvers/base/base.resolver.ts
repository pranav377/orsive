import { GraphQLUpload } from "graphql-upload";
import { GraphQLScalarType } from "graphql";
import { EditorImageUpload, EditorImageUploadArgs } from "./base.controller";
import IsUserAuthenticated from "../../permissions/IsUserAuthenticated";

const BASE_RESOLVERS = {
  Upload: GraphQLUpload,

  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value: any) {
      return new Date(value);
    },
    serialize(value: any) {
      return value.toISOString();
    },
  }),

  Query: {
    hello(_: void) {
      return "Aha, looks like we have got a developer.";
    },
  },

  Mutation: {
    hello(_: void) {
      return "Aha, looks like we have got a developer.";
    },

    editorImageUpload(_: void, args: EditorImageUploadArgs, context: any) {
      IsUserAuthenticated(context);

      return EditorImageUpload(args);
    },
  },
};

export default BASE_RESOLVERS;
