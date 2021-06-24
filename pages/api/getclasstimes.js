import { ObjectId } from "mongodb";
import { withIronSession } from "next-iron-session";
import useDatabase from '../../mongodb/mongodb'

async function handler(req, res) {
    let db = await useDatabase()
    let id = req.session.get('id')

    let result = await db.collection('Courses').aggregate([
        { '$match' : { 
            'id': ObjectId(id) , 'status' : "Current"
        
        } 
    }]).project({ times: 1, _id: 0 }).toArray()

    res.json(result);
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });