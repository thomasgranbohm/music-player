import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    cookieName: "music-token",
    password: process.env.SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production"
    }
  })
}