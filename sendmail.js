const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email endpoint
app.post("/send-email", async (req, res) => {
  const { name, email, car, message } = req.body;

  // Validate inputs
  if (!name || !email || !car || !message) {
    return res.status(400).send("All fields are required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yarramanlogistics@gmail.com", // Replace with your Gmail
        pass: "njrq uhoe zpyx anpk", // Replace with your App Password
      },
    });

    const mailOptions = {
      from: `"Runswell Contact Form" <${email}>`,
      to: "yarramanlogistics@gmail.com", // Replace with your Gmail
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nCar Registration: ${car}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Thank you! Your message has been sent.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send the email. Please try again later.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
