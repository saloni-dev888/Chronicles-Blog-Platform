export default function Icon({ name, size = 22, stroke = 2, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8M8 11h8"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></>,
    moon: <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.6 8.6 0 1 0 20.5 15.5z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></>,
    plane: <><path d="m3 11 18-7-7 18-2.5-7.5z"/><path d="m11.5 14.5 6-6"/></>,
    laptop: <><rect x="4" y="5" width="16" height="11" rx="1"/><path d="M2 20h20M8 20h8"/></>,
    heart: <path d="M20.8 8.7c0 5-8.8 10.3-8.8 10.3S3.2 13.7 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3z"/>,
    education: <><path d="m3 9 9-5 9 5-9 5z"/><path d="M7 12v5c3 2 7 2 10 0v-5M21 10v6"/></>,
    leaf: <><path d="M20 4C10 4 5 9 5 17c0 1.7.5 3 1 4"/><path d="M4 20c4-7 9-10 15-13"/></>,
    health: <><path d="M4 13a4 4 0 0 1 4-4c2 0 3 1 4 2 1-1 2-2 4-2a4 4 0 0 1 4 4c0 4-8 8-8 8s-8-4-8-8z"/><path d="M12 7V3M10 5h4"/></>,
    food: <><path d="M7 3v7M4 3v7a3 3 0 0 0 6 0V3M7 13v8M16 3v18M16 3c3 1 4 4 4 7h-4"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    back: <><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></>,
    calendar: <><rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M7 2v5M17 2v5M3 9h18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}
