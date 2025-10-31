document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("papers-container");
  if (!container) return;

  const url = "https://upadhayay.github.io/db.json";

  async function fetchAndRender() {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Network response not ok: ${res.status}`);
      const data = await res.json();
      const books = Array.isArray(data.books) ? data.books : [];

      // Filter only for published books
      const publishedBooks = books.filter(book => book.published);

      if (publishedBooks.length === 0) {
        container.innerHTML = `<div class="paper-empty">No published papers found.</div>`;
        return;
      }

      container.innerHTML = "";
      publishedBooks.forEach(book => {
        const el = document.createElement("article");
        el.className = "paper";
        el.innerHTML = `
          <div class="paper-inner">
            <img class="paper-icon" src="images/paper_icon.jpeg" alt="Paper icon" width="64" height="64" />
            <div class="paper-meta">
              <h3 class="paper-title">${escapeHtml(book.title || "Untitled")}</h3>
              <div class="paper-sub">
                <span class="paper-year">${book.year ?? "—"}</span>
              </div>
            </div>
          </div>
        `;
        container.appendChild(el);
      });
    } catch (err) {
      console.error("Error fetching JSON:", err);
      container.innerHTML = `<div class="paper-error">Error fetching papers.</div>`;
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  fetchAndRender();
});
