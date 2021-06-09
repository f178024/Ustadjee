import { withIronSession } from "next-iron-session";
import useDatabase from '../../../mongodb/mongodb'


async function handler(req, res) {
  //console.log(sourceFile.subject)
  var temp=req.body.subject
  console.log(temp)
  var regex = new RegExp(["^", temp, "$"].join(""), "i");
    let db = await useDatabase()

    let result = await db.collection("Users").aggregate([
        { '$match' : { 
            'type' : "Teacher" , 
            'subject' : regex
        }  
    }
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