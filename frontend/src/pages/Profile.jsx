import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

export default function Profile() {
  return (
    <div className="container page profile-page">
      <div className="profile-card">
        <div className="profile-avatar"><Icon name="user" size={54} stroke={1.7} /></div>
        <span className="eyebrow">CHRONICLE AUTHOR</span>
        <h1>Admin</h1>
        <p>Writer, editor and storyteller sharing practical ideas about technology, travel, lifestyle and learning.</p>
        <Link to="/" className="primary-button">Back to Chronicle</Link>
      </div>
    </div>
  );
}
