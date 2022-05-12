import prisma from "../dbClient";

export default function sendNotificationsForPost(
  ownerId: string,
  postId: string
) {
  Promise.all([
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
