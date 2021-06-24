import { withIronSession } from "next-iron-session";
import useDatabase from '../../../mongodb/mongodb'


async function handler(req, res) {
    var teacher= req.body.username
    console.log(teacher)
    let db = await useDatabase()
    let id = await db.collection("Users").aggregate([
        {
            '$match': {
                'username': teacher
            }
        }
    ]).toArray()

    console.log("Teacherid: " + id)

  //  console.log(result)

    res.json(id)
    //console.log(result)
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});