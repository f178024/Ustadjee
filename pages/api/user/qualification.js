import { withIronSession } from "next-iron-session";
import useDatabase from '../../../mongodb/mongodb'
import { ObjectId } from 'mongodb'

async function handler(req, res) {
    const db = await useDatabase()
    const id = req.session.get('id')

    // Add Qualification
    if (req.method == 'POST') {
        const { degree, institute, year } = req.body

        db.collection('Users').updateOne({ _id: ObjectId(id) },
            {
                $push: {
                    qualification: {
                        degree, institute, year
                    }
                }
            }).then(result => {
                res.json({ message: 'OK' })
            }).catch(err => {
                res.status(500).end()
            })
    } else { // Get Qualifications
        db.collection('Users').findOne({ _id: ObjectId(id) },
            {
                qualifications: 1
            }).then(result => {

                console.log(result)
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