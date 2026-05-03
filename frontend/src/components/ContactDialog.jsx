import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowUpRight, Sparkles } from "lucide-react";

const websiteTypes = [
  "Site de prezentare",
  "Blog",
  "Magazin online",
  "Aplicație web custom",
  "Dashboard / Admin",
  "Platformă complexă",
  "Automatizări / Integrări",
  "Altceva",
];

export default function ContactDialog({ trigger }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.type) {
      toast.error("Completează numele, emailul, telefonul și tipul de site.");
      return;
    }
    setSubmitting(true);
    // Frontend-only: persist to localStorage so leads aren't lost in demo
    try {
      const list = JSON.parse(localStorage.getItem("zentrox_leads") || "[]");
      list.push({ ...form, ts: new Date().toISOString() });
      localStorage.setItem("zentrox_leads", JSON.stringify(list));
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Mulțumim! Revenim în maxim 24 de ore.", {
      description: `Cerere: ${form.type} · ${form.email}`,
    });
    setForm({ name: "", email: "", phone: "", type: "", message: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        data-testid="contact-dialog"
        className="sm:max-w-[560px] glass-strong border-violet-500/30 text-violet-50 p-0 overflow-hidden"
      >
        <div className="relative p-7">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-pink-500/20 blur-3xl pointer-events-none" />
          <DialogHeader className="text-left relative">
            <DialogTitle className="font-display text-2xl tracking-tight text-white">
              Spune-ne ideea ta
            </DialogTitle>
            <DialogDescription className="text-violet-200/60 mt-1 text-sm">
              Revenim în maxim 24 de ore cu un plan și estimare.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submit} className="mt-5 space-y-3.5 relative" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-violet-300/70">
                  Nume
                </label>
                <input
                  data-testid="form-name"
                  className="input-dark mt-2"
                  placeholder="Numele tău"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-violet-300/70">
                  Email
                </label>
                <input
                  data-testid="form-email"
                  type="email"
                  className="input-dark mt-2"
                  placeholder="nume@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-violet-300/70">
              Telefon
              </label>
              <input
                data-testid="form-phone"
                className="input-dark mt-2"
                placeholder="07xx xxx xxx"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-violet-300/70">
                Tip de website
              </label>
              <div className="mt-2 flex flex-wrap gap-2" data-testid="form-types">
                {websiteTypes.map((t) => {
                  const active = form.type === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      data-testid={`form-type-${t.replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={() => update("type", t)}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wide transition-all ${
                        active
                          ? "bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 text-white border-0"
                          : "bg-white/5 border border-violet-400/20 text-violet-200/70 hover:border-violet-400/60"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-violet-300/70">
                Mesaj (opțional)
              </label>
              <textarea
                data-testid="form-message"
                rows={3}
                className="input-dark mt-2 resize-none"
                placeholder="Câteva detalii despre idee, deadline, buget..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn-neon disabled:opacity-60"
                data-testid="form-submit"
              >
                {submitting ? "Se trimite..." : "Trimite cererea"}
                <ArrowUpRight size={15} />
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
