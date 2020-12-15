import { ObjectId } from "mongodb";
import { withIronSession } from "next-iron-session";
import useDatabase from '../../mongodb/mongodb'

async function handler(req, res) {


    let db = await useDatabase()
    let id = req.session.get('id')

    db.collection('Courses').find({
        id
    }).toArray().then(result => {
        for(let i = 0; i < result.length; i++){
            result[i].created = new ObjectId(result[i]._id).getTimestamp()
        }
        res.json(result)
    }).catch(err => {
        console.log(err)
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