import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import PostCard from "../components/PostCard.jsx";
import Icon from "../components/Icon.jsx";
import { Loader, ErrorMessage, Pagination } from "../components/UI.jsx";

const categoryOrder = ["Technology", "Travel", "Lifestyle", "Education", "Health", "Food"];
const orderCategories = (items) => [...items].sort((a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name));

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const [posts, setPosts] = useState([]), [pages, setPages] = useState(1), [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true), [error, setError] = useState(null);

  useEffect(() => { api.get("/categories").then((r) => setCategories(orderCategories(r.data))).catch(() => {}); }, []);
  useEffect(() => {
    setLoading(true);
    const q = search ? `&search=${encodeURIComponent(search)}` : "";
    api.get(`/posts?page=${page}&limit=6${q}`).then((r) => { setPosts(r.data.posts); setPages(r.data.pages); setError(null); }).catch(() => setError("Could not load posts. Is the API running?")).finally(() => setLoading(false));
  }, [page, search]);

  return <>
    <section className="home-hero"><div className="container home-hero__inner">
      <div><span className="eyebrow">WELCOME TO CHRONICLE</span><h1>Stories, ideas &amp; perspectives for curious minds.</h1><p>A clean space for technology, travel, lifestyle, education and the little things that make everyday life interesting.</p><a href="#latest" className="primary-button">Explore Stories <Icon name="arrow" size={18} /></a></div>
      <div className="hero-orbit"><span /><span /><span /></div>
    </div></section>

    <section className="container topic-strip"><div className="section-heading"><div><span className="eyebrow">EXPLORE</span><h2>Browse by category</h2></div><Link to="/categories" className="text-link">All categories <Icon name="arrow" size={17} /></Link></div>
      <div className="topic-strip__grid">{categories.slice(0, 6).map((cat) => <Link key={cat._id} to={`/category/${cat.slug}`} className="topic-mini"><span>{cat.name}</span><b>{cat.postCount}</b></Link>)}</div>
    </section>

    <section className="container posts-section" id="latest"><div className="section-heading"><div><span className="eyebrow">READ &amp; DISCOVER</span><h2>{search ? `Search results for “${search}”` : "Latest stories"}</h2></div></div>
      {loading && <Loader />}{error && <ErrorMessage message={error} />}{!loading && !error && <><div className="posts-grid">{posts.map((post) => <PostCard key={post._id} post={post} />)}</div>{posts.length === 0 && <div className="empty-state">No stories found.</div>}<Pagination page={page} pages={pages} onChange={(p) => setSearchParams(search ? { page: p, search } : { page: p })} /></>}
    </section>
  </>;
}
