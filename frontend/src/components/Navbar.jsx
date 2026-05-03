import { useEffect, useState } from "react";
import ContactDialog from "@/components/ContactDialog";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const scrollTo = (id, center = false) => {
    close();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: center ? "center" : "start",
      });
    }, 300);
  };

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#050508]/70 backdrop-blur-md md:bg-transparent md:backdrop-blur-none ${
          scrolled ? "py-3" : "py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#top" data-testid="logo" className="flex items-center gap-2.5 group" onClick={close}>
            <span className="relative inline-flex w-9 h-9 items-center justify-center">
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 opacity-90 group-hover:opacity-100 transition" />
              <span className="absolute inset-[1.5px] rounded-md bg-[#050508]" />
              <span className="relative font-display text-[15px] font-bold neon-text">Z</span>
            </span>
            <span className="font-display text-lg tracking-tight">
              Zentrox <span className="text-violet-300">Web</span>
            </span>
          </a>

          {/* Desktop nav */}
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

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <ContactDialog
              trigger={
                <button className="btn-ghost text-xs" data-testid="nav-cta">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
                  Contactează-ne
                </button>
              }
            />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-lg text-violet-200 hover:text-white transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Meniu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(5,5,8,0.97)", backdropFilter: "blur(24px)" }}
      >
        {/* Neon glow blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <nav className="relative flex flex-col items-center gap-10">
          <a
            href="#message"
            className="font-display text-4xl tracking-tight text-violet-100/80 hover:neon-text transition-all duration-200"
            onClick={(e) => { e.preventDefault(); scrollTo("message", true); }}
          >
            Idee
          </a>
          <a
            href="#build"
            className="font-display text-4xl tracking-tight text-violet-100/80 hover:neon-text transition-all duration-200"
            onClick={(e) => { e.preventDefault(); scrollTo("build"); }}
          >
            Construim
          </a>
          <a
            href="#process"
            className="font-display text-4xl tracking-tight text-violet-100/80 hover:neon-text transition-all duration-200"
            onClick={(e) => { e.preventDefault(); scrollTo("process"); }}
          >
            Proces
          </a>
          <a
            href="#incredere"
            className="font-display text-4xl tracking-tight text-violet-100/80 hover:neon-text transition-all duration-200"
            onClick={(e) => { e.preventDefault(); scrollTo("incredere"); }}
          >
            Încredere
          </a>

          <div className="mt-4">
            <ContactDialog
              trigger={
                <button className="btn-neon text-sm" onClick={close}>
                  Contactează-ne
                </button>
              }
            />
          </div>
        </nav>

        <div className="absolute bottom-10 font-mono text-[10px] tracking-[0.2em] uppercase text-violet-400/40">
          Zentrox Web · 2026
        </div>
      </div>
    </>
  );
}
