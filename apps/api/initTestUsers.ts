import prisma from "./graphql/utils/data/dbClient";
import bcrypt from "bcrypt";
import { createFullAvatar } from "./graphql/resolvers/auth/controllers/auth.controller";

async function initTestUsers() {
  const TEST_USERS = [
    {
      username: "bob",
      name: "Bob",
      email: "bob@orsive.com",
      password: "1234",
    },
    {
      username: "alice",
      name: "Alice",
      email: "alice@orsive.com",
      password: "1234",
    },
    {
      username: "harry",
      name: "Harry",
      email: "harry@orsive.com",
      password: "1234",
    },
    {
      username: "ron",
      name: "Ron",
      email: "ron@orsive.com",
      password: "1234",
    },
    {
      username: "hermione",
      name: "Hermione",
      email: "hermione@orsive.com",
      password: "1234",
    },
    {
      username: "voldemort",
      name: "Voldemort",
      email: "voldemort@orsive.com",
      password: "1234",
    },
  ];

  const USERS = await Promise.all(
    TEST_USERS.map(async (test_user) => {
      const hashed = await bcrypt.hash(test_user.password, 10);
      let avatar = await createFullAvatar();

      return {
        username: test_user.username,
        email: test_user.email,
        name: test_user.name,
        password: hashed,
        avatar: avatar,
      };
    })
  );

  await prisma.profile.createMany({
    data: await USERS,
  });

  await prisma.feature.createMany({
    data: [
      {
        name: "post-like",
        status: "enabled",
      },
      {
        name: "post-comment",
        status: "enabled",
      },
      {
        name: "post-orsic",
        status: "enabled",
      },
      {
        name: "edit-profile",
        status: "enabled",
      },
      {
        name: "post-image",
        status: "enabled",
      },
      {
        name: "auth",
        status: "enabled",
      },
      {
        name: "delete-post",
        status: "enabled",
      },
    ],
  });
}

initTestUsers();
