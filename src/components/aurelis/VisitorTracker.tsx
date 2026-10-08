import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

type CheckoutEvent = { detail?: { open?: boolean; productName?: string } };

function getSessionId() {
  const key = "aurelis_visitor_session";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

/** Regista uma sessão anónima e envia heartbeat para contar visitantes activos. */
export function VisitorTracker() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined" || pathname.startsWith("/admin")) return;

    const sessionId = getSessionId();
    let checkoutOpen = false;
    let checkoutProduct = "";
    let disposed = false;

    const writeHeartbeat = async () => {
      if (disposed) return;
      const pageType = checkoutOpen ? "checkout" : "landing";
      const payload = {
        session_id: sessionId,
        path: window.location.pathname,
        page_type: pageType,
        product_name: checkoutOpen ? checkoutProduct || null : null,
        last_seen: new Date().toISOString(),
      };
      try {
        await (supabase as any).from("visitor_sessions").upsert(payload, { onConflict: "session_id" });
      } catch {
        // O rastreamento não deve bloquear a navegação nem o checkout.
      }
    };

    const onCheckout = (event: Event) => {
      const detail = (event as CustomEvent).detail as CheckoutEvent["detail"];
      checkoutOpen = Boolean(detail?.open);
      checkoutProduct = detail?.productName ?? "";
      void writeHeartbeat();
    };

    window.addEventListener("aurelis:checkout", onCheckout);
    void writeHeartbeat();
    const heartbeat = window.setInterval(() => void writeHeartbeat(), 20000);

    return () => {
      disposed = true;
      window.clearInterval(heartbeat);
      window.removeEventListener("aurelis:checkout", onCheckout);
    };
  }, [pathname]);

  return null;
}
