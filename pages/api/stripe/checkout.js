import Stripe from "stripe";
import useDatabase from "../../../mongodb/mongodb";
import { withIronSession } from "next-iron-session";
import { ObjectId } from 'mongodb'


async function handler(req, res){

    let db = await useDatabase()
    let user = await db.collection('Users').findOne({ _id: ObjectId(req.session.get('id')) })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    console.log(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.courseName,
              },
              unit_amount: req.body.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
       success_url: `http://localhost:3000/student/course/${req.body.courseId}`,
        cancel_url: 'https://example.com/cancel',
        payment_intent_data: {
            metadata: {
                courseId: req.body.courseId,
                userId: req.session.get('id')
            }
        }
      });
    
      res.json({ id: session.id });
}

export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});