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

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, car, message } = req.body;

    // Validate inputs
    if (!name || !email || !car || !message) {
      return res.status(400).send("All fields are required.");
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yarramanlogistics@gmail.com", // Your email
        pass: "njrq uhoe zpyx anpk", // Your app password
      },
    });

    const mailOptions = {
      from: `"Yarraman Contact Form" <${email}>`,
      to: "yarramanlogistics@gmail.com", // Your email
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nLocation: ${car}\nMessage:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Thank you! Your message has been sent.");
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).send("Failed to send the email. Please try again later.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
