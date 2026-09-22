import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink, Loader2 } from "lucide-react";

import { AdminShell } from "@/components/aurelis/AdminShell";
import { useLandingPages } from "@/hooks/useLandingPage";

export const Route = createFileRoute("/admin/landing")({
  head: () => ({
    meta: [
      { title: "Landing Pages | AURELIS Gestão" },
      { name: "description", content: "Editar as landing pages da AURELIS." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Landing Pages | AURELIS Gestão" },
      { property: "og:description", content: "Editar as landing pages da AURELIS." },
    ],
  }),
  component: () => (
    <AdminShell title="Landing Pages">
      <LandingList />
    </AdminShell>
  ),
});

function LandingList() {
  const { data, isLoading } = useLandingPages();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">Landing Pages</h2>
        <p className="text-sm text-muted-foreground">
          Edite textos, preços, imagens, ofertas e perguntas de cada página.
        </p>
      </div>

      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {(data ?? []).map((page) => (
          <div key={page.id} className="flex items-center gap-3 px-4 py-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{page.name}</p>
              <p className="truncate text-xs text-muted-foreground">/{page.slug}</p>
            </div>
            <a
              href={`/${page.slug}`}
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-secondary"
              aria-label="Abrir página"
            >
              <ExternalLink className="size-4" />
            </a>
            <Link
              to="/admin/landing/$slug"
              params={{ slug: page.slug }}
              className="flex items-center gap-1 rounded-full bg-success px-4 py-2 text-xs font-bold text-success-foreground"
            >
              Editar <ChevronRight className="size-3.5" />
            </Link>
          </div>
        ))}
        {(data ?? []).length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Ainda não há landing pages.
          </p>
        )}
      </div>
    </div>
  );
}
