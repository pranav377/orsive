import BASE_SCHEMA from "./base/base";
import AUTH_SCHEMA from "./auth/auth";
import PAGE_SCHEMA from "./pages";
import LIKE_SCHEMA from "./like/like";
import POST_SCHEMA from "./post/post";
import COMMENTS_SCHEMA from "./comments/comments";
import HISTORY_SCHEMA from "./history/history";
import PROFILE_SCHEMA from "./profile/profile";
import FEATURE_SCHEMA from "./features/features";
import NOTIFICATIONS_SCHEMA from "./notifications/notifications";
import SITEMAP_SCHEMA from "./sitemap/sitemap";
import MODERATION_SCHEMA from "./moderation/moderation";

const typeDefs = [
  BASE_SCHEMA,
  FEATURE_SCHEMA,
  AUTH_SCHEMA,
  ...PAGE_SCHEMA,
  LIKE_SCHEMA,
  POST_SCHEMA,
  COMMENTS_SCHEMA,
  HISTORY_SCHEMA,
  PROFILE_SCHEMA,
  NOTIFICATIONS_SCHEMA,
  MODERATION_SCHEMA,
  SITEMAP_SCHEMA,
];

export default typeDefs;
