import { withIronSession } from "next-iron-session";
import useDatabase from '../../mongodb/mongodb'
import {ObjectId} from 'mongodb'
import { IncomingForm } from 'formidable'
import fs from 'fs'

export const config = {
    api: {
        bodyParser: false,
    }
};

async function handler(req, res) {
    const form = new IncomingForm()
    let db = await useDatabase()

    form.parse(req, (err, fields, files) => {
        if(err){
            res.status(500)
            console.log(err)
            return
        }
        let { title, description, subject, topic, times } = fields
        let file = null
        if(files.file){
            file = fs.readFileSync(files.file.path)
        }

        let _id = req.session.get('id')

        db.collection('Courses').insertOne({
            id: ObjectId(_id),
            image: file,
            title,
            description,
            subject,
            topic,
            times: JSON.parse(times),
            files: [],
            quizes: [],
            ratingArray : [] ,  //to keep all ratings
            rating: 0,  //to keep final rating
            status: "Current" , 
            totalStudents: 0
        }).then(result => {
            res.json({ message: 'OK' })
        }).catch(err => {
            res.json({ err })
        })
    })



}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});