import { withIronSession } from "next-iron-session";
import useDatabase from '../../../../mongodb/mongodb'


async function handler(req, res) {

    let db = await useDatabase()

    let result = await db.collection('Courses').aggregate([
        {
          '$project': {
              'image': 0
          }
        },
        {
            '$lookup': {
                'from': 'Users',
                'localField': 'id',
                'foreignField': '_id',
                'as': 'user'
            }
        }, {
            '$unwind': {
                'path': '$user'
            }
        }
    ]).toArray()

    console.log(result)

    res.json(result)
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});