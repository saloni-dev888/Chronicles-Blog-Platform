import { useState } from "react";
import api from "../api/axios.js";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await api.post("/subscribe", { email });
      setStatus("success");
      setMessage(res.data.message || "Subscribed successfully");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter">
      <h3>Subscribe to the Newsletter</h3>
      <p>Get new posts delivered straight to your inbox. No spam, ever.</p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status && (
        <p className={`newsletter__status newsletter__status--${status}`}>{message}</p>
      )}
    </div>
  );
}
