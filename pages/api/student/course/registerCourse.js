import { withIronSession } from "next-iron-session";
import useDatabase from '../../../../mongodb/mongodb'
import { ObjectId } from 'mongodb'
var mongodb = require('mongodb');

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


    let previousStudentcount = await db.collection("Courses").aggregate([
        {
            '$match': {
                '_id': mongodb.ObjectId(courseId)
            }
        }
    ]).project({ totalStudents: 1, _id: 0 }).toArray()

    console.log(previousStudentcount[0].totalStudents)
   var newStudentcount = previousStudentcount[0].totalStudents + 1 ;
    console.log(newStudentcount)
  
    db.collection('Courses').updateOne(

        { '_id': mongodb.ObjectId(courseId) },
        { $set: { 'totalStudents': newStudentcount } }
    )

    res.json({message: 'OK'})

}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});