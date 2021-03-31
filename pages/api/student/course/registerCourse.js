import { withIronSession } from "next-iron-session";
import useDatabase from '../../../../mongodb/mongodb'
import { ObjectId } from 'mongodb'

async function handler(req, res) {
    let db = await useDatabase()

    let userId = req.session.get('id')
    let { courseId } = req.body

    let result = await db.collection('Users').updateOne({
        _id: ObjectId(userId)
    }, {
        $push: {
            courses: ObjectId(courseId)
        }
    })


    res.json({message: 'OK'})

}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});