const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

const exports.send = (message) => {
  const options = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: 'Repostered Bot Message',
    text: message
  };

  transporter.sendMail(options, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
