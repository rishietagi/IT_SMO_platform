import { useNavigate } from "react-router-dom";
import { FilePlus2, LayoutDashboard, ArrowRight } from "lucide-react";
import { KpmgLogo } from "@/components/brand/KpmgLogo";
import { useProgram } from "@/store/program";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    key: "setup",
    to: "/setup",
    accent: "#00338D",
    tint: "bg-blue-50",
    Icon: FilePlus2,
    title: "Setup New SMO Program",
    desc: "Configure your separation programme with guiding principles, initiative roadmap, and TSA structure. AI-assisted where you need it.",
    tags: ["Guided wizard", "AI-assisted", "5 steps"],
    cta: "Start setup",
  },
  {
    key: "sample",
    to: "/app/overview",
    accent: "#0091DA",
    tint: "bg-sky-50",
    Icon: LayoutDashboard,
    title: "Sample SMO Program",
    desc: "ClientCo separating from Global Corp — full executive command centre, 25 initiatives, ARB framework, roadmap, risks, and all artifacts pre-loaded.",
    tags: ["Executive dashboard", "25 initiatives", "ARB live", "All artifacts", "AI insights"],
    cta: "Explore sample",
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const { loadSample } = useProgram();

  const go = (card: (typeof CARDS)[number]) => {
    if (card.key === "sample") loadSample();
    navigate(card.to);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Brand bar */}
      <div className="flex items-center gap-3.5 border-b border-slate-200/70 px-10 py-5">
        <KpmgLogo variant="black" className="h-7" />
        <div className="h-6 w-px bg-slate-300" />
        <p className="text-[13px] font-semibold text-muted-foreground">
          IT Separation Management Office
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Hero */}
        <div className="mb-11 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold tracking-wide text-kpmg-navy">
            KPMG IT Separation Management Office
          </span>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
            Welcome to the <span className="text-kpmg-navy">KPMG IT SMO Suite</span>
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600">
            Managing your end-to-end IT transformation — from separation strategy through to
            standalone operation.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["Executive Command Centre", "25 Initiatives", "ARB Framework", "AI-Powered", "All Artifacts Pre-Loaded"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          {CARDS.map((c) => (
            <button
              key={c.key}
              onClick={() => go(c)}
              style={{ borderTopColor: c.accent }}
              className="group flex flex-col rounded-2xl border border-slate-200 border-t-4 bg-white p-7 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl", c.tint)}>
                <c.Icon className="h-6 w-6" style={{ color: c.accent }} />
              </div>
              <h2 className="mb-2.5 text-lg font-extrabold text-slate-900">{c.title}</h2>
              <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">{c.desc}</p>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className={cn("rounded-md px-2.5 py-1 text-[11px] font-semibold", c.tint)}
                    style={{ color: c.accent }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div
                className="mt-auto flex items-center gap-2 text-sm font-bold"
                style={{ color: c.accent }}
              >
                {c.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className="pb-7 text-center text-[11px] text-muted-foreground/70">
        KPMG India · Digital Transformation Practice · Confidential
      </p>
    </div>
  );
}
