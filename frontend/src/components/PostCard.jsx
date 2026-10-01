import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function PostCard({ post }) {
  const date = new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const category = post.categories?.[0];

  return (
    <article className="post-card">
      <Link to={`/post/${post.slug}`} className="post-card__image">
        {post.coverImage ? <img src={post.coverImage} alt={post.title} loading="lazy" /> : <div className="post-card__placeholder">C</div>}
      </Link>
      <div className="post-card__body">
        {category && <Link to={`/category/${category.slug}`} className="pill">{category.name}</Link>}
        <h3 className="post-card__title"><Link to={`/post/${post.slug}`}>{post.title}</Link></h3>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <div className="post-card__meta">
          <span><Icon name="user" size={15} /> {post.author?.name || "Admin"}</span>
          <span><Icon name="calendar" size={15} /> {date}</span>
          <span><Icon name="clock" size={15} /> {post.readTimeMinutes} min</span>
        </div>
      </div>
    </article>
  );
}
