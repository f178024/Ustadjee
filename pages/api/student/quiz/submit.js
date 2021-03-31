import { ObjectId } from "mongodb";
import { withIronSession } from "next-iron-session";
import useDatabase from 'mongodb/mongodb'

async function handler(req, res) {

    const {quizId, answers} = req.body

    let db = await useDatabase()
    let id = req.session.get('id')

    let results = await db.collection('Users').updateOne({
        _id: ObjectId(id)
    },{
        $push: {
            quizes: {
                _id: ObjectId(quizId),
                date: new Date(),
                answers
            }
        }
    })

    res.status(200).json({message: 'OK'})



}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});