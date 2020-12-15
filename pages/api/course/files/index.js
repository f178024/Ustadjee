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
    const courseID = '5fd5e5fe14199b30d8686344'

    const form = new IncomingForm()

    form.parse(req, (err, fields, files) => {
        if (!err) {
            const content = fs.readFileSync(files?.file?.path)
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
                res.json({message: 'ok'})
            })
            
            
        } else {
            res.status(500).end()

        }

    })


}