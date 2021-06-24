import twilio from "twilio";
import config from "./config";
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;
import { withIronSession } from "next-iron-session";


 async function handler(req, res){
    // const identity = 'saad' //req.body.identity; // userid 
    const identity= req.session.get('username')
    //  console.log(req.session.get('id'))
    const room = req.body.room; // course id
    console.log(room)
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
}

const generateToken = config => {
    console.log(config.twilio.accountSid, config.twilio.apiKey, config.twilio.apiSecret)

  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

const sendTokenResponse = (token, res) => {
    res.json({
        token: token.toJwt()
    });
  };


  export default withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: 'session',
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });