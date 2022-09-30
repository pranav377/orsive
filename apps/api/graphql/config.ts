const PAGINATION_SET_SIZE = 7;
const COMMENT_PAGINATION_SET_SIZE = 8;
const REPUTATION_FOR_LIKE = 10;
const REPUTATION_FOR_DISLIKE = -5;
const DECISION_WON_REPUTATION = 1000;
const DECISION_LOST_REPUTATION = 200;
const SITEMAP_PAGINATION_LIMIT = 7000;
const SEARCH_KEY_UID = "e50180b9-5062-4cbc-8d6f-8ac2b49048dd";

const NODE_ENV = process.env.NODE_ENV;
const FILE_UPLOADS_URL = process.env.FILE_UPLOADS_URL!; // http://localhost:4000/uploads/
const ADMIN_MAIL_ID = process.env.ADMIN_MAIL_ID || "";
const JWT_SECRET = process.env.JWT_SECRET || "never_gonna_give_you_up";
const OAUTH_SUCCESS_REDIRECT_URL =
  process.env.OAUTH_SUCCESS_REDIRECT_URL || " ";
const OAUTH_SUCCESS_ANDROID_REDIRECT_URL =
  process.env.OAUTH_SUCCESS_ANDROID_REDIRECT_URL || " ";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || " ";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || " ";
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || " ";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || " ";
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || " ";
const S3_SECRET_KEY = process.env.S3_SECRET_KEY || " ";
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || " ";
const FIREBASE_NOTIFICATIONS_SERVER_KEY =
  process.env.FIREBASE_NOTIFICATIONS_SERVER_KEY || " ";
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || " ";
const GORSE_URL = process.env.GORSE_URL || " ";
const NEXTJS_API_URL = process.env.NEXTJS_API_URL || " ";
const NEXTJS_REVALIDATE_KEY = process.env.NEXTJS_REVALIDATE_KEY || " ";
const MEILISEARCH_URL = process.env.MEILISEARCH_URL || " ";
const MEILISEARCH_MASTER_KEY = process.env.MEILISEARCH_MASTER_KEY || " ";
const SCHEDULER_DB_URL = process.env.SCHEDULER_DB_URL || " ";

export {
  PAGINATION_SET_SIZE,
  COMMENT_PAGINATION_SET_SIZE,
  REPUTATION_FOR_DISLIKE,
  REPUTATION_FOR_LIKE,
  DECISION_LOST_REPUTATION,
  DECISION_WON_REPUTATION,
  SITEMAP_PAGINATION_LIMIT,
  SEARCH_KEY_UID,
  NODE_ENV,
  FILE_UPLOADS_URL,
  ADMIN_MAIL_ID,
  JWT_SECRET,
  OAUTH_SUCCESS_REDIRECT_URL,
  OAUTH_SUCCESS_ANDROID_REDIRECT_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_BUCKET_NAME,
  FIREBASE_NOTIFICATIONS_SERVER_KEY,
  EMAIL_API_KEY,
  GORSE_URL,
  NEXTJS_API_URL,
  NEXTJS_REVALIDATE_KEY,
  MEILISEARCH_URL,
  MEILISEARCH_MASTER_KEY,
  SCHEDULER_DB_URL,
};
