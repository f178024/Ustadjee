import { ObjectId } from 'mongodb'
import useDatabase from '../../../../mongodb/mongodb'

export default function handler(req, res) {
    const { id } = req.query

    useDatabase().then(db => {
        return db.collection('Courses').findOne({
            _id: ObjectId(id)
        })
    }).then(result => {
        const file = result.image
        if(!file){
            res.status(404)
        } else {
            res.end(file.buffer)
        }
    }).catch(err => {
        res.status(404)
    })


}