import Axios from 'axios'
import admin from '../../firebase/firebase'
import { withIronSession } from "next-iron-session";
import useDatabase from '../../mongodb/mongodb'

async function handler(req, res) {
  let { email, password } = req.body

  let db = await useDatabase()

  db.collection('Users').findOne({ email, password }, function (err, result) {
    if (err) {
      res.json({ err: 'Server Error' })
    }

    if (result != null) {
      req.session.set('id', result._id)
      req.session.save().then(() => {
        res.json({ message: 'OK' })
      })

    } else {
      res.json({ err: 'Incorrect Username/Password' })
    }
  })

}
export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: 'session',
  cookieOptions: {
      secure: process.env.NODE_ENV === "production",
  },
});

