import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // 1. Create a transporter (using Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // eslint-disable-next-line no-undef
      user: process.env.GMAIL_USER, // your Gmail address
      // eslint-disable-next-line no-undef
      pass: process.env.GMAIL_PASS, // your Gmail App Password
    },
  });
  
  // 2. Define the email options
  const mailOptions = {
    // eslint-disable-next-line no-undef
    from: process.env.GMAIL_USER,  // sender email
    to: options.email,             // receiver email
    subject: options.subject,
    text: options.message,
  };

  // 3. Send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

export default sendEmail;

