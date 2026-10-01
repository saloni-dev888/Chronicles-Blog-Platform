import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(() => localStorage.getItem("chronicle-theme") === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("chronicle-theme", dark ? "dark" : "light");
  }, [dark]);

  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const submitSearch = (e) => {
    e.preventDefault();
    const value = query.trim();
    setSearchOpen(false);
    if (value) navigate(`/?search=${encodeURIComponent(value)}`);
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand" aria-label="Chronicle home">
          <span className="brand__mark"><Icon name="book" size={35} stroke={2.4} /></span>
          <span>Chronicle</span>
        </Link>

        <nav className={`navbar__links ${open ? "is-open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "is-active" : "")}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
            <Icon name="search" size={22} />
          </button>
          <button
            className={`theme-switch ${dark ? "is-dark" : ""}`}
            aria-label="Toggle dark mode"
            aria-pressed={dark}
            onClick={() => setDark((v) => !v)}
          >
            <span className="theme-switch__thumb">{dark ? <Icon name="moon" size={13} /> : <Icon name="sun" size={13} />}</span>
          </button>
          <span className="navbar__divider" />
          <Link to="/profile" className="profile-button" aria-label="Profile">
            <Icon name="user" size={22} />
          </Link>
          <button className="navbar__toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            <Icon name="menu" size={24} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <form className="search-bar" onSubmit={submitSearch}>
          <div className="container search-bar__inner">
            <Icon name="search" size={20} />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." />
            <button type="submit">Search</button>
          </div>
        </form>
      )}
    </header>
  );
}
