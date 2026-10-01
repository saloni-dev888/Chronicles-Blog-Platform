import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import Categories from "./pages/Categories.jsx";
import CategoryPosts from "./pages/CategoryPosts.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return <div className="site"><Navbar /><main><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post/:slug" element={<PostDetail />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/category/:slug" element={<CategoryPosts />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<NotFound />} />
  </Routes></main><Footer /></div>;
}
