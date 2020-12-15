import { ObjectId } from 'mongodb'
import useDatabase from '../../../mongodb/mongodb'
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
        const courseID = fields.id
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
                
            )
            console.log(fields)
            console.log(files?.file?.name)
        }
    })


}