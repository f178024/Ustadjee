import admin from '../../firebase/firebase'
import useDatabase from '../../mongodb/mongodb'

export default async function handler(req, res) {
    let { cnic, email, phone, username, password, day, month, year } = req.body

    const auth = admin.auth()
    const uid = ''

    let db = await useDatabase()

    db.collection('Users').insert({
        email: 'sinan@gmail.com',
        password: 'pass123'
    }, function (err, result) {
        if (err) {
            res.send(err)
        }

        res.send(result)
    })

}