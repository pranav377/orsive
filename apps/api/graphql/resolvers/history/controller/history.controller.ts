import { User } from "../../../permissions/IsUserAuthenticated";
import prisma from "../../../utils/data/dbClient";
import insertFeedback from "../../../utils/mepster/insertFeedback";

export interface AddHistoryArgs {
  post_id: string;
}

export async function AddHistory(args: AddHistoryArgs, user: User) {
  await prisma.history.create({
    data: {
      postId: args.post_id,
      userId: user.id,
    },
  });

  await insertFeedback(user.id, args.post_id, "view");

  return "success";
}
