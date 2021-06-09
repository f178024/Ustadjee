import useDatabase from '../../mongodb/mongodb'
import { withIronSession } from "next-iron-session";


async function handler(req, res) {
    try {


        console.log(req.body.type)
        let { cnic, email, phone, username, type , password, day, month, year } = req.body

        let db = await useDatabase()

        console.log('Adding user ' + username)
        let result = await db.collection('Users').insert({
            ...req.body,
            quizes: [],
            qualifications: [],
            subject : []
        }
            )

        console.log('Craeting Session for user id ' + result._id)
        req.session.set('id', result._id)

        console.log('Saving Session')
        await req.session.save()

        console.log('Sending response')
        res.status(200).json({ message: 'OK' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error })
    }
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});