import BASE_RESOLVERS from "./base/base.resolver";
import AUTH_RESOLVERS from "./auth/auth.resolver";
import PAGE_RESOLVERS from "./pages";
import LIKE_RESOLVERS from "./like/like.resolver";
import POST_RESOLVERS from "./post/post.resolver";
import COMMENTS_RESOLVERS from "./comments/comments.resolver";
import HISTORY_RESOLVERS from "./history/history.resolver";
import PROFILE_RESOLVERS from "./profile/profile.resolver";
import { NOTIFICATIONS_RESOLVERS } from "./notifications/notifications.resolver";
import SITEMAP_RESOLVERS from "./sitemap/sitemap.resolver";
import MODERATION_RESOLVERS from "./moderation/moderation.resolver";
import SUPPORT_RESOLVERS from "./support/support.resolver";

const resolvers = [
  BASE_RESOLVERS,
  AUTH_RESOLVERS,
  ...PAGE_RESOLVERS,
  LIKE_RESOLVERS,
  POST_RESOLVERS,
  COMMENTS_RESOLVERS,
  HISTORY_RESOLVERS,
  PROFILE_RESOLVERS,
  NOTIFICATIONS_RESOLVERS,
  MODERATION_RESOLVERS,
  SUPPORT_RESOLVERS,
  SITEMAP_RESOLVERS,
];

export default resolvers;
