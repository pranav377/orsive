const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
const GOOGLE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
const DISCORD_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/discord`;
const USER_COOKIE_KEY = `X-ORSIVE-USER`;

export { GOOGLE_AUTH_URL, DISCORD_AUTH_URL, GRAPHQL_URL, USER_COOKIE_KEY };
