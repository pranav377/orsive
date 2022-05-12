import { NextRouter } from "next/router";

export default function refreshProfileData(
  router: NextRouter,
  username: string
) {
  router.push(`/${username}`).then(() => {
    router.reload();
  });
}
