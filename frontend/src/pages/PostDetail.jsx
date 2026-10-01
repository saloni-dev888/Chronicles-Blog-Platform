import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios.js";
import { Loader, ErrorMessage } from "../components/UI.jsx";
import Icon from "../components/Icon.jsx";

const categoryOrder = ["Technology", "Travel", "Lifestyle", "Education", "Health", "Food"];
const orderCategories = (items) => [...items].sort((a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name));

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null), [related, setRelated] = useState([]), [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true), [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get(`/posts/slug/${slug}`), api.get("/posts?limit=6"), api.get("/categories")])
      .then(([p, r, c]) => { setPost(p.data); setRelated(r.data.posts.filter((item) => item.slug !== slug).slice(0, 3)); setCategories(orderCategories(c.data)); setError(null); })
      .catch(() => setError("Post not found."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container"><Loader /></div>;
  if (error) return <div className="container"><ErrorMessage message={error} /></div>;
  if (!post) return null;
  const date = new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return <div className="container detail-layout">
    <article className="post-detail">
      <Link to="/" className="back-link"><Icon name="back" size={19} /> Back to Blogs</Link>
      {post.coverImage && <img className="post-detail__cover" src={post.coverImage} alt={post.title} />}
      <div className="post-detail__categories">{post.categories?.map((cat) => <Link key={cat._id} to={`/category/${cat.slug}`} className="pill"><Icon name={cat.name === "Travel" ? "plane" : "book"} size={14} /> {cat.name}</Link>)}</div>
      <h1>{post.title}</h1>
      <div className="post-detail__meta"><span><Icon name="user" size={16} /> By {post.author?.name || "Admin"}</span><span>•</span><span><Icon name="calendar" size={16} /> {date}</span><span>•</span><span><Icon name="clock" size={16} /> {post.readTimeMinutes} min read</span></div>
      <p className="post-detail__lead">{post.excerpt}</p>
      <div className="post-detail__content">{post.content.split(/\n\s*\n/).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
    </article>

    <aside className="detail-sidebar">
      <section className="sidebar-card"><h2>Related Posts</h2>{related.map((item) => <Link to={`/post/${item.slug}`} key={item._id} className="related-post"><img src={item.coverImage} alt=""/><div><strong>{item.title}</strong><span><Icon name="calendar" size={14} /> {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span></div></Link>)}</section>
      <section className="sidebar-card"><h2>Categories</h2><div className="sidebar-categories">{categories.slice(0, 6).map((cat) => <Link key={cat._id} to={`/category/${cat.slug}`}><span>{cat.name}</span><b>{cat.postCount}</b></Link>)}</div></section>
    </aside>
  </div>;
}
