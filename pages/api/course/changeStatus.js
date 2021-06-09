import { withIronSession } from "next-iron-session";
import useDatabase from '../../../mongodb/mongodb'
var mongodb = require('mongodb');

async function handler(req, res) {
    let db = await useDatabase()


    var status=req.body.status
    let { courseId } = req.body
    console.log(courseId);
    db.collection('Courses').updateOne(

        { '_id': mongodb.ObjectId(courseId) },
        { $set: { 'status': status } }
    )

 
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});