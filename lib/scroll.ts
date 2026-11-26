import type { MouseEvent } from "react";

/**
 * Smoothly scroll to an in-page `#section` target without appending `#...` to the URL bar.
 */
export function scrollToSection(href: string, e?: MouseEvent) {
  if (!href.startsWith("#")) return;
  e?.preventDefault();
  const id = href.slice(1);
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  if (window.location.hash) {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
}
