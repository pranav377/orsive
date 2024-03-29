import BASE_SCHEMA from './base/base';
import AUTH_SCHEMA from './auth/auth';
import PAGE_SCHEMA from './pages';
import LIKE_SCHEMA from './like/like';
import POST_SCHEMA from './post/post';
import COMMENTS_SCHEMA from './comments/comments';
import HISTORY_SCHEMA from './history/history';
import PROFILE_SCHEMA from './profile/profile';
import NOTIFICATIONS_SCHEMA from './notifications/notifications';
import SITEMAP_SCHEMA from './sitemap/sitemap';
import MODERATION_SCHEMA from './moderation/moderation';
import SUPPORT_SCHEMA from './support/support';

const typeDefs = [
    BASE_SCHEMA,
    AUTH_SCHEMA,
    ...PAGE_SCHEMA,
    LIKE_SCHEMA,
    POST_SCHEMA,
    COMMENTS_SCHEMA,
    HISTORY_SCHEMA,
    PROFILE_SCHEMA,
    NOTIFICATIONS_SCHEMA,
    MODERATION_SCHEMA,
    SUPPORT_SCHEMA,
    SITEMAP_SCHEMA,
];

export default typeDefs;
