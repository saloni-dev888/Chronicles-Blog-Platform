const asyncHandler = require("express-async-handler");
const Subscriber = require("../models/Subscriber");

// @desc    Subscribe to newsletter
// @route   POST /api/subscribe
// @access  Public
const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const exists = await Subscriber.findOne({ email: email.toLowerCase() });
  if (exists) {
    res.status(400);
    throw new Error("This email is already subscribed");
  }

  const subscriber = await Subscriber.create({ email });
  res.status(201).json({ message: "Subscribed successfully", subscriber });
});

module.exports = { subscribe };
