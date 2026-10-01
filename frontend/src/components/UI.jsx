export function Loader() {
  return <div className="loader">Loading…</div>;
}

export function ErrorMessage({ message }) {
  return <div className="error-message">{message || "Something went wrong."}</div>;
}

export function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className={p === page ? "is-active" : ""}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button disabled={page >= pages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
