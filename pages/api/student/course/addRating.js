import { withIronSession } from "next-iron-session";
import useDatabase from '../../../../mongodb/mongodb'
var mongodb = require('mongodb');

async function handler(req, res) {
    let db = await useDatabase()

    var UserRating = req.body.rate     //jo user ne rating di hay 
    let { courseId } = req.body
    console.log(courseId);
    let result = await db.collection("Courses").aggregate([
        {
            '$match': {
                '_id': mongodb.ObjectId(courseId)
            }
        }
    ]).project({ ratingArray: 1, _id: 0 }).toArray()

    //console.log(result[0].rating) 

    // var newRating = (result[0].rating + UserRating) / 2   //average of previous and new rating
    // console.log(newRating)
    console.log("length: " + result[0].ratingArray.length)
    res.json(result)

    db.collection('Courses').updateOne(

        { '_id': mongodb.ObjectId(courseId) },
        { $push: { 'ratingArray': (Math.round(UserRating * 10) / 10) } }
    )
///////////////////////dubara fetch kiya hay updated result ke leye
    let updatedResult = await db.collection("Courses").aggregate([
        {
            '$match': {
                '_id': mongodb.ObjectId(courseId)
            }
        }
    ]).project({ ratingArray: 1, _id: 0 }).toArray()

    /////////////////////////////////////////
    var lengthofArray=(updatedResult[0].ratingArray.length)//length of rating array
    console.log("Ulen: " + lengthofArray)
    let addRating= 0
    for(var i=0; i < lengthofArray; i++)
    {
        let temp=updatedResult[0].ratingArray[i]
        addRating=addRating + temp
        
    }

   console.log(addRating)

   let finalRating
   finalRating=addRating/lengthofArray
   console.log(finalRating)

   db.collection('Courses').updateOne(

    { '_id': mongodb.ObjectId(courseId) },
    { $set: { 'rating': (Math.round(finalRating * 10) / 10)} }
)


}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});