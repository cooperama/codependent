const nodemailer = require("nodemailer");
const nodemailMailgun = require("nodemailer-mailgun-transport");
// //////////////////////////////////////////////////////////////////////////////////
// USING MAILGUN & EXPORTING TO SERVER
//////////////////////////////////////////////////////////////////////////////////
// require("dotenv").config();

// const requestPartner = (recipient, emailComponent) => {
//   const auth = {
//     auth: {
//       api_key: process.env.MAILGUN_API_KEY,
//       domain: process.env.MAILGUN_URL,
//     },
//   };
//   let transporter = nodemailer.createTransport(nodemailMailgun(auth));

//   const mailOptions = {
//     from: "'Jia' codedependent2@gmail.com",
//     to: recipient,
//     // to: "coope133@gmail.com",
//     subject: "Hello!",
//     text: emailComponent,
//     // text: "Body of email!",
//   };

//   transporter.sendMail(mailOptions, function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("hooorayyyy!");
//     }
//   });
// };

// module.exports = requestPartner;
// //////////////////////////////////////////////////////////////////////////////////
// USING MAILGUN
//////////////////////////////////////////////////////////////////////////////////
require("dotenv").config();

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_URL,
  },
};
let transporter = nodemailer.createTransport(nodemailMailgun(auth));

const mailOptions = {
  from: "'Jia' codedependent2@gmail.com",
  to: "coope133@gmail.com",
  subject: "Hello!",
  text: "Nodemailer and Mailgunnnnnnn!",
};

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("hooorayyyy!");
  }
});

// //////////////////////////////////////////////////////////////////////////////////
// SENDING EMAIL SIMPLY WITH GMAIL.... IDK IF IT WORKS FOR EVERYONE
//////////////////////////////////////////////////////////////////////////////////
// const nodemailer = require("nodemailer");

// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: "gmail", //
//   host: "smtp.gmail.com", // this or above?
//   auth: {
//     user: process.env.CODE_EMAIL,
//     pass: process.env.CODE_PASS,
//   },
// });

// const mailOptions = {
//   from: "'J-bonez' codedependent2@gmail.com",
//   to: "coope133@gmail.com",
//   subject: "Hello!",
//   text: "Body of email!",
// };

// transporter.sendMail(mailOptions, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("hooorayyyy!");
//   }
// });
