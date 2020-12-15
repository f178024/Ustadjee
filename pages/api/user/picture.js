import { withIronSession } from "next-iron-session";
import useDatabase from '../../../mongodb/mongodb'
import { ObjectId } from 'mongodb'
import fs from 'fs'
import path from 'path'
import { IncomingForm } from 'formidable'

export const config = {
    api: {
        bodyParser: false,
    }
};

async function handler(req, res) {
    // const db = await useDatabase()
    const form = new IncomingForm()
    const location = '/images/user/'
    const db = await useDatabase()

    form.parse(req, (err, fields, files) => {
        console.log(location)

        if (!err) {
            let newPath = path.join(process.cwd(), "/public" + location)
            if (!fs.existsSync(newPath)) {
                fs.mkdirSync(newPath, { recursive: true })
            }

            const file = fs.readFileSync(files.file.path)
            fs.writeFileSync(newPath + req.session.get('id') + '.png', file)

            db.collection('Users').updateOne({
                _id: ObjectId(req.session.get('id'))
            }, {
                $set: {
                    picture: location + req.session.get('id') + '.png'
                }
            }).then(response => {
                res.json({ message: 'OK' })
            }).catch(err => {
                res.status(500).send({ err })
            })
        } else {
            console.log(err)
            res.status(500).send({ err })
        }
    })

}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});