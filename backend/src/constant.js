import "dotenv/config";
const ACCESS_TOKEN = "accessToken";
const DB_NAME = "portal";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "Strict",
};
export { ACCESS_TOKEN, DB_NAME, cookieOptions };
