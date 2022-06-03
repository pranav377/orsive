import { Role } from "@prisma/client";
import invariant from "tiny-invariant";
import prisma from "../utils/data/dbClient";
import GetObjOrNotFound from "../utils/getObjOrNotFound";

export default async function getUserPermissions(userId: string) {
  let user = GetObjOrNotFound(
    await prisma.profile.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: true,
      },
    })
  );
  invariant(user);

  let isMod = !!user.roles.filter((role: Role) => role.name === "Mod")[0];
  let isStaff = !!user.roles.filter((role: Role) => role.name === "Staff")[0];

  return { isMod, isStaff };
}
