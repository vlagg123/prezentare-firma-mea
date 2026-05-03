import { useEffect, useRef } from "react";
import ContactDialog from "@/components/ContactDialog";
import { ArrowDown, ArrowUpRight, Sparkles, Zap, Layers, Code2, Workflow } from "lucide-react";

/* Reveal-on-scroll helper */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const buildItems = [
  { t: "Site-uri de prezentare", d: "Identitate digitală curată, rapidă, optimizată SEO.", icon: Layers },
  { t: "Bloguri", d: "Conținut structurat cu CMS și performanță maximă.", icon: Sparkles },
  { t: "Magazine online", d: "E-commerce cu plăți, stoc și conversie ridicată.", icon: ArrowUpRight },
  { t: "Aplicații web custom", d: "Produse SaaS construite la cerere, end-to-end.", icon: Code2 },
  { t: "Dashboard-uri admin", d: "Panouri interne complexe, date în timp real.", icon: Workflow },
  { t: "Platforme complexe", d: "Sisteme distribuite, multi-tenant, scalabile.", icon: Zap },
  { t: "Automatizări & integrări", d: "API-uri, webhooks, fluxuri de date conectate.", icon: Sparkles },
];

const processSteps = [
  { i: "01", t: "Înțelegem ideea", d: "Discuție directă, întrebări țintite, claritate totală despre ce vrei să construiești." },
  { i: "02", t: "Planificăm", d: "Roadmap, arhitectură, stack tehnologic și estimări reale." },
  { i: "03", t: "Design", d: "Interfețe distinctive, gândite pentru produs, nu doar pentru aspect." },
  { i: "04", t: "Dezvoltare", d: "Cod curat, testat, livrat în iterații vizibile săptămânal." },
  { i: "05", t: "Lansare", d: "Deploy, monitorizare, suport — și creștem produsul împreună." },
];

export default function Sections({ ready }) {
  useReveal();
  const heroRef = useRef(null);

  return (
    <main id="top">
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center" ref={heroRef} data-testid="hero-section">
        <div className="max-w-7xl w-full mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal in">
            <div className="chip mb-7" data-testid="hero-chip">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 pulse-glow" />
              Zentrox Web · Studio · 2026
            </div>
            <h1
              className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-tight"
              data-testid="hero-headline"
            >
              <span className="block neon-text-soft">Construim</span>
              <span className="block neon-text">orice</span>
              <span className="block">
                pe <span className="italic font-medium text-violet-300">web.</span>
              </span>
            </h1>
            <p
              className="mt-8 text-lg md:text-xl text-violet-100/70 max-w-xl leading-relaxed"
              data-testid="hero-subheadline"
            >
              De la site-uri simple și magazine online, până la aplicații web custom și platforme complexe
              — transformăm orice idee într-un produs digital real.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ContactDialog
                trigger={
                  <button className="btn-neon" data-testid="hero-cta-primary">
                    Spune-ne ideea ta
                    <ArrowUpRight size={16} />
                  </button>
                }
              />
              <a
                href="#build"
                className="btn-ghost"
                data-testid="hero-cta-secondary"
              >
                Vezi ce putem construi
                <ArrowDown size={14} />
              </a>
            </div>

            <div className="mt-14 flex items-center gap-6 text-xs font-mono text-violet-200/50 tracking-[0.2em] uppercase">
              <span>Design · Cod · Rezultate</span>
              <span className="w-px h-4 bg-violet-400/30" />
              <span>Rezultate garantate</span>
            </div>
          </div>

          {/* Right side: floating HUD panel — overlays canvas, gives depth */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative h-[480px]">
              <div className="absolute top-0 right-0 glass-strong rounded-2xl p-5 w-[260px] float-y" style={{ animationDelay: "0s" }} data-testid="hero-hud-1">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan-300/80">// zentrox.web</div>
                <div className="mt-3 font-display text-2xl">Construim pe web</div>
                <div className="mt-1 text-sm text-violet-200/60">De la idee la produs, end-to-end</div>
                <div className="mt-4 flex gap-1.5">
                  <span className="h-1 flex-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
                  <span className="h-1 flex-1 bg-gradient-to-r from-violet-500 to-transparent rounded-full" />
                  <span className="h-1 flex-1 bg-gradient-to-r from-pink-500 to-transparent rounded-full" />
                </div>
              </div>

              <div className="absolute bottom-6 left-4 glass-strong rounded-2xl p-5 w-[230px] float-y" style={{ animationDelay: "1.5s" }} data-testid="hero-hud-2">
                <div className="text-sm text-violet-100/80">
                  „Transformăm orice idee în produs digital real, de la primul rând de cod până la lansare.”
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-violet-400/20 pulse-glow" />
            </div>
          </div>
        </div>

      </section>

      {/* MESSAGE */}
      <section id="message" className="section section-solid" data-testid="message-section">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="chip reveal mx-auto" data-testid="message-chip">01 / Idee</div>
          <h2 className="reveal mt-8 font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight">
            Ai o idee?{" "}
            <span className="neon-text">Noi o construim.</span>
          </h2>
          <p className="reveal mt-7 text-lg md:text-xl text-violet-100/70 max-w-2xl mx-auto">
            Ne ocupăm de tot ce ține de web, de la concept până la lansare.
          </p>
        </div>
      </section>

      {/* BUILD — floating cards arranged asymmetrically */}
      <section id="build" className="section section-solid" data-testid="build-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="chip reveal">02 / Construim</div>
              <h2 className="reveal mt-6 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
                Ce putem <span className="neon-text">construi</span>
              </h2>
            </div>
            <p className="reveal text-violet-100/60 max-w-md">
              Toate produsele orbitează în jurul nucleului. Fiecare e construit cu aceeași grijă —
              fie că e un blog, fie că e o platformă complexă.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {buildItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="reveal glass-strong rounded-2xl p-7 group relative overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                  style={{ transitionDelay: `${i * 40}ms` }}
                  data-testid={`build-card-${i}`}
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/10 blur-2xl opacity-60 group-hover:opacity-100 transition" />
                  <div className="relative">
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan-300/80">
                      0{i + 1}
                    </div>
                    <div className="mt-4 inline-flex w-11 h-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-violet-400/30 text-violet-200">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 font-display text-2xl tracking-tight">{item.t}</h3>
                    <p className="mt-2 text-sm text-violet-100/60 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              );
            })}

            {/* Final card → CTA inside the grid */}
            <div className="reveal rounded-2xl p-7 relative overflow-hidden flex flex-col justify-between min-h-[220px]" data-testid="build-card-cta"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(168,85,247,0.18) 50%, rgba(236,72,153,0.18))",
                border: "1px solid rgba(236, 72, 153, 0.35)",
              }}
            >
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-pink-200/90">→ orice altceva</div>
              <div>
                <h3 className="font-display text-2xl">Ai o cerință neobișnuită?</h3>
                <p className="mt-2 text-sm text-violet-100/80">
                  Construim și ce nu e pe listă. Spune-ne ce ai în minte.
                </p>
                <ContactDialog
                  trigger={
                    <button className="btn-neon mt-5 text-[11px]" data-testid="build-card-cta-button">
                      Spune-ne
                      <ArrowUpRight size={14} />
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS — moving path through space */}
      <section id="process" className="section section-solid" data-testid="process-section">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <div className="chip reveal">03 / Proces</div>
            <h2 className="reveal mt-6 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02]">
              Cum <span className="neon-text">lucrăm</span>
            </h2>
            <p className="reveal mt-5 text-violet-100/60">
              Un drum clar prin spațiu. Fără surprize. Fără pași inutili.
              Doar pași care duc produsul tău în lume.
            </p>
          </div>

          <div className="lg:col-span-8 relative">
            {/* Vertical line gradient */}
            <div className="absolute left-[9px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/60 to-pink-500/60" />
            <ol className="space-y-12">
              {processSteps.map((s, i) => (
                <li key={i} className="reveal path-step" data-testid={`process-step-${i}`}>
                  <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyan-300/80">
                    {s.i}
                  </div>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-violet-100/60 max-w-xl">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section id="incredere" className="section section-solid" data-testid="diff-section">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="chip reveal">04 / Încredere</div>
            <h2 className="reveal mt-6 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
              Nu doar design.{" "}
              <span className="neon-text">Soluții complete.</span>
            </h2>
          </div>
          <p className="reveal text-lg text-violet-100/75 leading-relaxed">
            Construim produse digitale care funcționează rapid și pot crește odată cu afacerea ta.
            Cod modular, infrastructură pregătită pentru scalare, design care rezistă în timp.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: "Performanță", v: "≤ 1.5s", d: "First paint pe orice dispozitiv." },
            { k: "Cod", v: "100%", d: "Custom, fără template-uri reciclate." },
            { k: "Scalare", v: "∞", d: "De la primul user la milioane." },
            { k: "Suport", v: "24/7", d: "Aproape de tine după lansare." },
          ].map((s, i) => (
            <div key={i} className="reveal glass rounded-2xl p-6" data-testid={`stat-${i}`}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-violet-300/70">{s.k}</div>
              <div className="font-display text-4xl mt-3 neon-text">{s.v}</div>
              <div className="mt-1 text-sm text-violet-100/55">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="section section-solid" data-testid="trust-section">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="chip reveal mx-auto">05 / Diferențiere</div>
          <h2 className="reveal mt-7 font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.98]">
            Orice vrei să construiești pe web,{" "}
            <span className="neon-text">putem face.</span>
          </h2>
          <p className="reveal mt-6 text-lg md:text-xl text-violet-100/65">
            De la idei simple la aplicații complexe.
          </p>

          {/* Marquee row */}
          <div className="reveal mt-14 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10" />
            <div className="marquee-track gap-16 font-display text-2xl md:text-3xl text-violet-200/40">
              {[...Array(2)].map((_, k) => (
                <div className="flex gap-16 px-8" key={k}>
                  <span>SaaS</span><span>·</span>
                  <span>E-commerce</span><span>·</span>
                  <span>Dashboard</span><span>·</span>
                  <span>API</span><span>·</span>
                  <span>Landing</span><span>·</span>
                  <span>Marketplace</span><span>·</span>
                  <span>CMS</span><span>·</span>
                  <span>Booking</span><span>·</span>
                  <span>Custom</span><span>·</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — dramatic zoom into core */}
      <section className="relative min-h-[100svh] flex items-center" data-testid="final-cta-section">
        <div className="max-w-4xl mx-auto px-6 text-center w-full">
          <div className="chip reveal mx-auto">06 / Începe</div>
          <h2 className="reveal mt-8 font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.92] tracking-tight">
            Ai o idee?
            <br />
            <span className="neon-text">Hai să o construim.</span>
          </h2>
          <p className="reveal mt-7 text-lg text-violet-100/70 max-w-xl mx-auto">
            Trimite-ne câteva detalii. Răspundem în maxim 24 de ore cu un plan inițial și un calendar realist.
          </p>
          <div className="reveal mt-10 flex flex-wrap justify-center gap-4">
            <ContactDialog
              trigger={
                <button className="btn-neon" data-testid="final-cta-button">
                  Începe proiectul
                  <ArrowUpRight size={16} />
                </button>
              }
            />
          </div>

          <div className="reveal mt-20 flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] tracking-[0.2em] uppercase text-violet-300/50">
            <span>contact@zentrox.web</span>
            <span className="w-px h-4 bg-violet-400/30" />
            <span>Iași · Remote · Worldwide</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-violet-500/10 py-10 mt-10" data-testid="footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-violet-300/50 tracking-[0.15em] uppercase">
          <div>© 2026 Zentrox Web · Toate drepturile rezervate</div>
        </div>
      </footer>
    </main>
  );
}
