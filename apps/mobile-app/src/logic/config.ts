const API_URL = __DEV__
  ? `http://${process.env.LOCAL_IPV4_ADDRESS}.nip.io:4000`
  : `https://api.orsive.com`;

const GRAPHQL_URL = `${API_URL}/graphql`;
const GOOGLE_AUTH_URL = `${API_URL}/auth/google-android`;
const DISCORD_AUTH_URL = `${API_URL}/auth/discord-android`;

export { GRAPHQL_URL, GOOGLE_AUTH_URL, DISCORD_AUTH_URL };
