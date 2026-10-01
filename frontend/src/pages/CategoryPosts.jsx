import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import PostCard from "../components/PostCard.jsx";
import { Loader, ErrorMessage, Pagination } from "../components/UI.jsx";

export default function CategoryPosts() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/categories")
      .then((res) => {
        const match = res.data.find((c) => c.slug === slug);
        if (!match) {
          setError("Category not found.");
          setLoading(false);
          return;
        }
        setCategory(match);
        return api.get(`/posts?category=${match._id}&page=${page}&limit=9`);
      })
      .then((res) => {
        if (!res) return;
        setPosts(res.data.posts);
        setPages(res.data.pages);
        setError(null);
      })
      .catch(() => setError("Could not load posts."))
      .finally(() => setLoading(false));
  }, [slug, page]);

  return (
    <div className="container page">
      <h1>{category ? category.name : "Category"}</h1>
      <p className="page__subtitle">
        {category ? `${category.postCount} posts in this category` : ""}
      </p>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Pagination
            page={page}
            pages={pages}
            onChange={(p) => setSearchParams({ page: p })}
          />
        </>
      )}
    </div>
  );
}
