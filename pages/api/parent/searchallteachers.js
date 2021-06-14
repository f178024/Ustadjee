import { withIronSession } from "next-iron-session";
import useDatabase from '../../../mongodb/mongodb'


async function handler(req, res) {
    var x="Teacher"
    let db = await useDatabase()
    let result = await db.collection('Users').aggregate([
        { '$match' : { 
            'type' : x
        
        } 
    }]).toArray()

  //  console.log(result)

    res.json(result)
    //console.log(result)
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});