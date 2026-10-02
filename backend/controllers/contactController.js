const Contact = require("../models/Contact");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject: subject || "No subject",
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message saved successfully",
      contact,
    });
  } catch (error) {
    console.error("Contact Save Error:", error);

    return res.status(500).json({
      success: false,
      message: "Message could not be saved",
      error: error.message,
    });
  }
};

module.exports = {
  sendContactMessage,
};