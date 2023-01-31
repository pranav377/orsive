const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
const DISCORD_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/discord`;
type INFINITE_SCROLL_SCREENS =
    | 'feed'
    | 'search'
    | 'profile'
    | 'following'
    | 'moderation';

export { GOOGLE_AUTH_URL, DISCORD_AUTH_URL, GRAPHQL_URL };

export type { INFINITE_SCROLL_SCREENS };
