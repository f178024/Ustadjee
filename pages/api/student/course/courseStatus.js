import { withIronSession } from "next-iron-session";
import useDatabase from '../../../../mongodb/mongodb'
var mongodb = require('mongodb');

async function handler(req, res) {
    let db = await useDatabase()

    let userId = req.session.get('id')
    let { courseId } = req.body

    let result = await db.collection("Courses").aggregate([
        {
            '$match': {
                '_id': mongodb.ObjectId(courseId)
            }
        }
    ]).project({ status: 1, _id: 0 }).toArray()

    //console.log(result[0].status) 
    res.json(result[0].status)

}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});