import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";

import appCss from "../styles.css?url";
import { Toaster } from "../components/ui/sonner";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { VisitorTracker } from "@/components/aurelis/VisitorTracker";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AURELIS — Massageador Deep Relax" },
      {
        name: "description",
        content:
          "Loja AURELIS: encomende o Massageador Deep Relax com entrega gratuita em Angola e pagamento na entrega.",
      },
      { name: "author", content: "AURELIS" },
      { property: "og:title", content: "AURELIS — Massageador Deep Relax" },
      {
        property: "og:description",
        content:
          "Loja AURELIS: encomende o Massageador Deep Relax com entrega gratuita em Angola e pagamento na entrega.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','4582169178770467');",
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function WhatsAppFloatingButton() {
  const openWhatsApp = () => {
    if (typeof window === "undefined") return;
    const pageTitle = document.title || "AURELIS";
    const pageUrl = window.location.href;
    const message = `Olá, AURELIS! 👋 Tenho interesse num produto da vossa loja.\n\nPágina: ${pageTitle}\nLink: ${pageUrl}\n\nPodem ajudar-me com o preço, disponibilidade e entrega?\n\nObrigado!`;
    window.open(`https://wa.me/244955526741?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={openWhatsApp}
      aria-label="Falar com a AURELIS pelo WhatsApp"
      className="fixed bottom-24 right-4 z-[60] inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-black text-white shadow-[0_8px_30px_rgba(0,0,0,.22)] transition hover:scale-[1.03] hover:bg-[#1fbd5b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128c48] md:bottom-6 md:right-6"
    >
      <MessageCircle className="size-6" />
      <span>Falar no WhatsApp</span>
    </button>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <VisitorTracker />
      <Outlet />
      <WhatsAppFloatingButton />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}

