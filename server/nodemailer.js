const nodemailer = require("nodemailer");
const nodemailMailgun = require("nodemailer-mailgun-transport");
// //////////////////////////////////////////////////////////////////////////////////
// USING MAILGUN & EXPORTING TO SERVER
//////////////////////////////////////////////////////////////////////////////////
require("dotenv").config();

const requestPartner = (recipient, emailComponent) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_URL,
    },
  };
  let transporter = nodemailer.createTransport(nodemailMailgun(auth));

  const mailOptions = {
    from: "'co[de]pendent' codedependent2@gmail.com",
    to: recipient,
    subject: "Hello!",
    text: emailComponent,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("hooorayyyy!");
    }
  });
};

module.exports = requestPartner;
