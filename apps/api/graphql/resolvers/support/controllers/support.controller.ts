import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";
import validate from "../../../utils/data/validate";
import emailApi from "../../../utils/email/client";
import { ADD_CONTACT_VALIDATOR } from "../validators";

export interface AddContactArgs {
  input: AddContactInput;
}

export interface AddContactInput {
  type: "bug_report" | "feature_request" | "business_inquiry";
  content: string;
}

export async function AddContact(args: AddContactArgs, user: User) {
  let data: AddContactInput = validate(args.input, ADD_CONTACT_VALIDATOR);

  await prisma.contact.create({
    data: {
      contactType: data.type,
      content: data.content,
      uploadedById: user.id,
    },
  });

  emailApi.sendTransacEmail({
    templateId: 3,
    params: {
      username: user.username,
      userId: user.id,
      contactType: data.type,
      content: data.content,
    },
  });

  return "ok";
}
