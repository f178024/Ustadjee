import { withIronSession } from "next-iron-session";
import useDatabase from '../../mongodb/mongodb'
import { ObjectId } from 'mongodb'

async function handler(req, res) {

  let db = await useDatabase()
  let _id = req.session.get('id')


  db.collection('Users').findOne({ _id: ObjectId(_id) }, function (err, result) {
    if (err) {
      res.json({ err: 'Server Error' })
    }
    if (result == null) {
      res.status(404).json({ err: 'Not logged in' })
    } else {
      res.json(result)

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