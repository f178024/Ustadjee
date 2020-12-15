import { ObjectId } from 'mongodb'
import useDatabase from '../../../mongodb/mongodb'

export default async function handler(req, res) {
    const {
        query: { id },
    } = req

    let db = await useDatabase()

    db.collection('Quiz').findOne({
        _id: ObjectId(id)
    }).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.json({ err })
    })
}