import { ObjectId } from 'mongodb'
import useDatabase from 'mongodb/mongodb'

export default async function handler(req, res) {
    let {attendance, date, courseId} = req.body

    let db = await useDatabase()

    console.log(attendance, date, courseId)

    for(let i = 0; i < attendance.length; i++){
        let result = await db.collection('Attendance').updateOne({
            courseId: ObjectId(courseId),
            studentId: attendance[i].id,
            date
        }, {
            $set: {
                courseId: ObjectId(courseId),
                studentId: attendance[i].id,
                date,
                status: attendance[i].status,
            }

        },
        {
            upsert: true
        })
    }
    res.send('ok')
}