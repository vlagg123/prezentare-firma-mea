import { useEffect, useState } from "react";
import ContactDialog from "@/components/ContactDialog";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#top"
          data-testid="logo"
          className="flex items-center gap-2.5 group"
        >
          <span className="relative inline-flex w-9 h-9 items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 opacity-90 group-hover:opacity-100 transition" />
            <span className="absolute inset-[1.5px] rounded-md bg-[#050508]" />
            <span className="relative font-display text-[15px] font-bold neon-text">Z</span>
          </span>
          <span className="font-display text-lg tracking-tight">
            Zentrox <span className="text-violet-300">Web</span>
          </span>
        </a>

        <div
          className={`hidden md:flex items-center gap-8 px-7 py-2.5 rounded-full transition-all duration-500 ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <a
            href="#message"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-violet-200/80 hover:text-white transition"
            data-testid="nav-link-idee"
            onClick={(e) => { e.preventDefault(); document.getElementById("message")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
          >Idee</a>
          <a href="#build" className="font-mono text-[11px] tracking-[0.2em] uppercase text-violet-200/80 hover:text-white transition" data-testid="nav-link-construim">Construim</a>
          <a href="#process" className="font-mono text-[11px] tracking-[0.2em] uppercase text-violet-200/80 hover:text-white transition" data-testid="nav-link-proces">Proces</a>
          <a href="#incredere" className="font-mono text-[11px] tracking-[0.2em] uppercase text-violet-200/80 hover:text-white transition" data-testid="nav-link-incredere">Încredere</a>
        </div>

        <ContactDialog
          trigger={
            <button className="btn-ghost text-xs" data-testid="nav-cta">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
              Contactează-ne
            </button>
          }
        />
      </div>
    </nav>
  );
}
