import admin from '../../firebase/firebase'
import useDatabase from '../../mongodb/mongodb'

export default async function handler(req, res) {
    let {cnic, email, phone, username, password, day, month,year} = req.body
    
    const auth = admin.auth()
    const uid = ''

    auth.createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: username,
        disabled: false,
    }).then(user => {
        uid = user.uid
        return useDatabase()
    }).then(db => {
        db.collection('Users').insert({
            uid,
            username,
            email
        }, function(err, result){
            if(err){
                res.json({err})
            } else {
                res.json({message: 'OK'})
            }
        })
    })
    .catch(err => {
        res.json({ err })
    })

}