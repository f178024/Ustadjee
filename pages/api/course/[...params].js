import { ObjectId } from 'mongodb'
import useDatabase from '../../../mongodb/mongodb'

export default async function handler(req, res) {
    const {params}= req.query
    const courseId = params[0]
    const fileId = params[2]
    const db = await useDatabase()

    db.collection('Courses').findOne({
        _id: ObjectId(courseId)
    }).then(result => {
        const files = result.files.filter(item => item._id == fileId)
        if(files.length == 0){
            res.status(404).end()
        }
        res.end(files[0].content.buffer)
    })
    

}