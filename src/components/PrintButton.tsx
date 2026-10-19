"use client";

/** Prints the page in full colour, or in an ink-saving black-and-white style (see order.module.css). */
export function PrintButton({ label, ink = false }: { label: string; ink?: boolean }) {
  function print() {
    const root = document.documentElement;
    root.dataset.print = ink ? "ink" : "colour";
    window.addEventListener("afterprint", () => delete root.dataset.print, { once: true });
    window.print();
  }

  return (
    <button type="button" className="btn btn-secondary" onClick={print}>
      {label}
    </button>
  );
}
