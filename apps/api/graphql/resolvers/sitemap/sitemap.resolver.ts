import {
  GetPostSitemap,
  GetProfileSitemap,
  GetSitemapArgs,
  NumPostSitemaps,
  NumProfileSitemaps,
} from "./sitemap.controller";

const SITEMAP_RESOLVERS = {
  Query: {
    numPostSitemaps() {
      return NumPostSitemaps();
    },

    getPostSitemap(_: void, args: GetSitemapArgs) {
      return GetPostSitemap(args);
    },

    numProfileSitemaps() {
      return NumProfileSitemaps();
    },

    getProfileSitemap(_: void, args: GetSitemapArgs) {
      return GetProfileSitemap(args);
    },
  },
};

export default SITEMAP_RESOLVERS;
