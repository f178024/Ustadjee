import { withIronSession } from "next-iron-session";
import useDatabase from '../../mongodb/mongodb'

async function handler(req, res) {

    let {title, description, subject, topic} = req.body

    let db = await useDatabase()
    let _id = req.session.get('id')

    db.collection('Courses').insertOne({
        id: _id,
        title,
        description,
        subject,
        topic,
        files: []
    }).then(result => {
        res.json({message: 'OK'})
    }).catch(err => {
        res.json({err})
    })

}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });