const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport(
  {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  },
  {
    from: `${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>`,
  },
);

exports.send = async (options) => {
  try {
    return await transporter.sendMail(options);
  } catch (e) {
    console.error(e);
  }
};
