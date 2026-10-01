import { useState } from "react";
import api from "../api/axios.js";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await api.post("/contact", form);
      setStatus("success");
      setStatusMessage(res.data.message);
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setStatusMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page contact-page">
      <h1>Get in Touch</h1>
      <p className="page__subtitle">
        Have a question, story idea, or collaboration in mind? Send a message below.
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
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p className={`form-status form-status--${status}`}>{statusMessage}</p>
        )}
      </form>
    </div>
  );
}
