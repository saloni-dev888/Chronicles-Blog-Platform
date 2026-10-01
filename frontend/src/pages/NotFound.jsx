import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page not-found">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Back to home</Link>
    </div>
  );
}
