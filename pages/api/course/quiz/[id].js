import { ObjectId } from 'mongodb'
import useDatabase from '../../../../mongodb/mongodb'

export default async function handler(req, res) {
    const {
        query: { id },
    } = req

    let db = await useDatabase()

    let results = await db.collection('Courses').aggregate([
        {
            $unwind: {
                path: '$quizes',
            }
        }, {
            $match: {
                "quizes._id": ObjectId(id)
            }
        }, {
            $project: {
                quizes: 1
            }
        }]).toArray()

    console.log(results)
    res.json(results[0].quizes)
}