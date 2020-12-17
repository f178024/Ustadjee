import { ObjectId } from 'mongodb'
import useDatabase from '../../../mongodb/mongodb'
import { withIronSession } from "next-iron-session";

async function handler(req, res) {
    let db = await useDatabase()

    let id = req.session.get('id')

    if (req.method == 'POST') {
        let { name, questions } = req.body
        questions = JSON.parse(questions)

        db.collection('Quizes').insertOne({
            id,
            name,
            questions
        }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
            res.json({ err })
        })
    } else {
        db.collection('Quizes').find({
            
        }).toArray().then(result => {
            for(let i = 0; i < result.length; i++){
                result[i].date = new ObjectId(result._id).getTimestamp()
            }
            res.json(result)
        }).catch(err => {
            console.log(err)
            res.json({ err })
        })
    }
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});