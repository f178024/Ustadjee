import { withIronSession } from "next-iron-session";

async function handler(req, res) {
    req.session.destroy()
    res.redirect('/signin')
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });