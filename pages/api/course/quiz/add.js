import { ObjectId } from 'mongodb'
import useDatabase from '../../../../mongodb/mongodb'
import { withIronSession } from "next-iron-session";
import user from "../../user";

async function handler(req, res) {
    try{
        let db = await useDatabase()

        let userId = req.session.get('id')
        let { courseId, name, questions } = req.body

        console.log("User Id: " + userId + ", Course Id: " + courseId)
        questions = JSON.parse(questions)

        let result = await db.collection('Courses').update({
                _id: ObjectId(courseId)
            },
            {
                $push: {
                    quizes: {
                        _id: ObjectId(),
                        name,
                        date: new Date(),
                        questions
                    }
                }
            }
        )

        console.log(result)

        res.status(200).json({message: 'OK'})
    } catch (err){
        console.log(err)
        res.status(500).json({err})
    }

}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});