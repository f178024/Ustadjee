import { withIronSession } from "next-iron-session";
import useDatabase from '../../../../mongodb/mongodb'
import { ObjectId } from 'mongodb'

async function handler(req, res) {
    let db = await useDatabase()

    let userId = req.session.get('id')
    let result = await db.collection('Users').aggregate([
        {
            $lookup: {
                from: 'Courses',
                localField: 'courses',
                foreignField: '_id',
                as: 'courses'
            }

        },
        {
            $match: {
                _id: ObjectId(userId)
            }
        }
    ]).toArray()

    res.json(result[0].courses)

}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});