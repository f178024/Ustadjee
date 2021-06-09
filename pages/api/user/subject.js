import { withIronSession } from "next-iron-session";
import useDatabase from '../../../mongodb/mongodb'
import { ObjectId } from 'mongodb'


async function handler(req, res) {
    const db = await useDatabase()
    const id = req.session.get('id')

    // Add Qualification
    if (req.method == 'POST') {
        const { subject } = req.body

        db.collection('Users').updateOne({ _id: ObjectId(id) },
        { $push: { 'subject': subject } }).then(result => {
                res.json({ message: 'OK' })
            }).catch(err => {
                res.status(500).end()
            })
    } else { // Get Qualifications
        db.collection('Users').findOne({ _id: ObjectId(id) },
            {
                subject: 1
            }).then(result => {
                res.json(result)
            }).catch(err => {
                res.status(500).end()
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