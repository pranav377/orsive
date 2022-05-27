// send notification to followers when new content is posted by the people they are following
import prisma from "../dbClient";
import NotificationClient from "./client";

export default function sendNotificationsForPost(
  ownerId: string,
  postId: string,
  postType: "image" | "orsic",
  postSlug: string
) {
  return Promise.all([
    new Promise(async (resolve) => {
      let owner = await prisma.profile.findUnique({
        where: {
          id: ownerId,
        },
        include: {
          followers: true,
        },
      });
      let followers = owner!.followers;

      for (let index = 0; index < followers.length; index++) {
        const follower = followers[index];

        await Promise.all(
          follower?.notificationToken?.map(async (notificationToken) => {
            await NotificationClient.post("", {
              to: notificationToken,
              data: {
                title: "New Post",
                body: `${owner!.name} uploaded a new post`,
                for: follower.username,
                url: `/${postType}/${postSlug}`,
              },
            });
          })
        );

        await prisma.notificationForPost.create({
          data: {
            post: {
              connect: {
                id: postId,
              },
            },
            notification: {
              create: {
                forUserId: follower.id,
                notificationType: "forPost",
              },
            },
          },
        });
      }

      resolve(1);
    }),
  ]);
}
