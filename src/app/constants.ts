export const APP_NAME = "Popcorn Party";
export const APP_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://popcorn-party.vercel.app"
    : "http://localhost:3000";
