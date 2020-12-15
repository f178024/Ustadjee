import useDatabase from '../../mongodb/mongodb'
import { withIronSession } from "next-iron-session";


async function handler(req, res) {
    let { cnic, email, phone, username, password, day, month, year } = req.body

    let db
    useDatabase().then(database => {
        db = database
        return db.collection('Users').insert({
            cnic,
            email,
            phone,
            username,
            password,

            qualifications: []
        })
    }).then(result => {
        req.session.set('id', result._id)
        return req.session.save()
    })
    .then(() => {
        res.send({message: 'OK'})
    }).catch(err => {
        res.status(500).json({ err })
        console.l
    })
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});