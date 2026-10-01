import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { Loader, ErrorMessage } from "../components/UI.jsx";
import Icon from "../components/Icon.jsx";

const categoryOrder = ["Technology", "Travel", "Lifestyle", "Education", "Health", "Food"];
const orderCategories = (items) => [...items].sort((a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name));

const icons = { Technology: "laptop", Travel: "plane", Lifestyle: "heart", Education: "education", Health: "health", Food: "food" };

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(orderCategories(res.data))).catch(() => setError("Could not load categories.")).finally(() => setLoading(false));
  }, []);

  return (
    <div className="categories-page">
      <section className="categories-hero">
        <div className="container">
          <span className="eyebrow">EXPLORE</span>
          <h1>All Categories</h1>
          <p>Explore blogs by category and find what interests you.</p>
          <div className="hero-decoration"><Icon name="leaf" size={90} /></div>
        </div>
      </section>

      <section className="container categories-content">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link key={cat._id} to={`/category/${cat.slug}`} className="category-card">
                <div className={`category-icon category-icon--${cat.slug}`}><Icon name={icons[cat.name] || "book"} size={42} stroke={1.8} /></div>
                <h3>{cat.name}</h3>
                <div className="category-count">{cat.postCount} {cat.postCount === 1 ? "Article" : "Articles"}</div>
                <p>{description(cat.name)}</p>
                <span className="category-link">View Posts <Icon name="arrow" size={20} /></span>
                <span className="category-arrow"><Icon name="arrow" size={21} /></span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function description(name) {
  const map = {
    Technology: "Latest trends, tools and insights in the tech world.",
    Travel: "Discover new places, cultures and travel experiences.",
    Lifestyle: "Simple living, better habits and a happy you.",
    Education: "Learning resources, study tips and career guidance.",
    Health: "Wellness, fitness and a healthier lifestyle.",
    Food: "Tasty recipes, food stories and more.",
  };
  return map[name] || "Ideas, stories and useful insights.";
}
