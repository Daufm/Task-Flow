import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'selamawithabtamu567@gmail.com',
    pass: 'dkow qaxe mqcb gmrp',
  },
});


export default async function sendEmail(email, subject, text) {
  const mailOptions = {
    from: 'selamawithabtamu567@gmail.com',
    to: email,
    subject: subject,
    text: text,
    replyTo: 'no-reply@taskflow.com',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email} with subject "${subject}"`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
}