import { useState } from "react";
import emailjs from "@emailjs/browser";
import api from "../api/axios.js";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);
    setStatusMessage("");

    try {
      const time = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      // 1. Send email through EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject || "No subject",
          message: form.message,
          time,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      // 2. Save message in MongoDB
      try {
        await api.post("/contact", form);
      } catch (dbError) {
        console.error("Email sent, but database save failed:", dbError);
      }

      setStatus("success");
      setStatusMessage(
        "Your message has been sent successfully. Thank you for contacting Chronicle!"
      );

      setForm(initialForm);
    } catch (error) {
      console.error("EmailJS Error:", error);

      setStatus("error");
      setStatusMessage(
        "Message could not be sent. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page contact-page">
      <h1>Get in Touch</h1>

      <p className="page__subtitle">
        Have a question, story idea, or collaboration in mind? Send a message
        below.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </label>
        </div>

        <label>
          Subject
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Enter subject"
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="6"
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p className={`form-status form-status--${status}`}>
            {statusMessage}
          </p>
        )}
      </form>
    </div>
  );
}