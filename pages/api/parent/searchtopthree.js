import { withIronSession } from "next-iron-session";
import useDatabase from '../../../mongodb/mongodb'


async function handler(req, res) {  
    let db = await useDatabase()

    let result = await db.collection("Courses").aggregate([
        { '$match' :  
            {'status' : "Current"}
        } ,
       {  $sort: { rating: -1 ,totalStudents: -1}  },
        { "$limit": 5  }
    ]).toArray()

    //  console.log(result)
      res.json(result)
      
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});