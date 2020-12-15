import { ObjectId } from 'mongodb'
import useDatabase from '../../../../mongodb/mongodb'
import { IncomingForm } from 'formidable'
import fs from 'fs'

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req, res) {
    const db = await useDatabase()
    

    const form = new IncomingForm()

    form.parse(req, (err, fields, files) => {
        if (!err) {
            const content = fs.readFileSync(files?.file?.path)
            const courseID = fields.id
            db.collection('Courses').updateOne(
                { 
                    _id: ObjectId(courseID)
                },
                {
                    $push: {
                        files: {
                            _id: ObjectId(),
                            name: files.file.name,
                            content
                        }
                        
                    }
                }
                
            ).then(result => {
                console.log(courseID)
                res.json({message: 'ok'})
            })
            
            
        } else {
            res.status(500).end()

        }

    })


}