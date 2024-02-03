export const APP_NAME = "Hutukara";
export const APP_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://hutukara.vercel.app"
    : "http://localhost:3000";
export const GROUP_TITLE = APP_NAME;
export const PLURALIZED_GROUP_TITLE = `${GROUP_TITLE}s`;
