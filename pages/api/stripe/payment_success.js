import Stripe from "stripe";
import { buffer } from "micro";
import useDatabase from '../../../mongodb/mongodb'
import { ObjectId } from 'mongodb'
var mongodb = require('mongodb');

export const config = {
    api: {
      bodyParser: false,
    },
  }

export default async function(req, res){
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        let event = stripe.webhooks.constructEvent(buf.toString(), sig, "whsec_70VeQbl40Rw6h4mkfrxTcQhX4Efw3Csu")
        let db = await useDatabase()

       if(event.type === "payment_intent.succeeded"){
          let metadata = event.data.object.metadata
          let courseId = metadata.courseId
          let userId = metadata.userId

          let result = await db.collection('Users').updateOne({
            _id: ObjectId(userId)
        }, {
            $push: {
                courses: ObjectId(courseId)
            }
        })

        let previousStudentcount = await db.collection("Courses").aggregate([
            {
                '$match': {
                    '_id': mongodb.ObjectId(courseId)
                }
            }
        ]).project({ totalStudents: 1, _id: 0 }).toArray()
    
        console.log(previousStudentcount[0].totalStudents)
       var newStudentcount = previousStudentcount[0].totalStudents + 1 ;
        console.log(newStudentcount)
      
        db.collection('Courses').updateOne(
    
            { '_id': mongodb.ObjectId(courseId) },
            { $set: { 'totalStudents': newStudentcount } }
        )
    
        res.json({message: 'OK'})
        console.log(event.data.object)

      }

      res.send('OK')
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
    
}   