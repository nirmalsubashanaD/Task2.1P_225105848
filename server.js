const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// GET homepage with email form
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Welcome to DEV@Deakin</title>
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <div class="container">
      <h2>SIGN UP FOR OUR DAILY INSIDER!</h2>
      <form action="/subscribe" method="POST">
        <input type="email" name="email" placeholder="Enter your email" required/>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </body>
  </html>
`);
});

// POST send welcome email
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "nirmalsubashana3@gmail.com",
      pass: "gwfh jevn vnzz wnva",
    },
  });

  // Email options
  const mailOptions = {
    from: `"DEV@Deakin" <nirmalsubashana3@gmail.com>`,
    to: email,
    subject: 'Welcome to DEV@Deakin!',
    html: `
      <h3>Hi there!</h3>
      <p>Welcome to DEV@Deakin. We're thrilled to have you on board.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('<h3>Welcome email sent successfully!</h3>');
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).send('Something went wrong. Please try again.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
