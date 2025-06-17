const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

client.verify.v2
  .services("VA81abf21ab119b8350a065302f74a7ffb")
  .verifications.create({ to: "+61468589981", channel: "sms" })
  .then((verification) => console.log(verification.sid));
