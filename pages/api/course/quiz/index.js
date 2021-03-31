import { ObjectId } from 'mongodb'
import useDatabase from '../../../../mongodb/mongodb'
import { withIronSession } from "next-iron-session";

async function handler(req, res) {
    let db = await useDatabase()

    let id = req.session.get('id')

    let { courseId } = req.body
    console.log("Course Id " + courseId)

    let result = await db.collection('Courses').find({
        _id: ObjectId(courseId)
    }).toArray()

    console.log(result.quizes)
    res.json(result.quizes)

}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});