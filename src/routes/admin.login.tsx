import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminSession } from "@/hooks/useAdminSession";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Entrar na gestão | AURELIS" },
      { name: "description", content: "Área privada de gestão de pedidos da AURELIS." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Entrar na gestão | AURELIS" },
      { property: "og:description", content: "Área privada de gestão de pedidos da AURELIS." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const { session, isAdmin } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session && isAdmin) void navigate({ to: "/admin" });
  }, [session, isAdmin, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });

    setBusy(false);

    if (result.error) {
      setError(
        result.error.message === "Invalid login credentials"
          ? "Email ou palavra-passe incorrectos."
          : result.error.message,
      );
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setError("Conta criada. Confirme o email e depois inicie sessão.");
      setMode("signin");
      return;
    }

    void navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-primary" />
          <span className="font-display text-sm font-bold tracking-tight text-gradient-brand">
            AURELIS · Gestão
          </span>
        </div>
        <h1 className="mt-3 font-display text-xl font-bold">
          {mode === "signin" ? "Entrar" : "Criar conta de administrador"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Área privada de gestão de pedidos.
        </p>

        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="h-11"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Palavra-passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              minLength={6}
              required
              className="h-11"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="h-11 w-full" disabled={busy}>
            {busy && <Loader2 className="size-4 animate-spin" />}
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
            }}
            className="w-full text-center text-xs font-medium text-muted-foreground hover:text-primary"
          >
            {mode === "signin"
              ? "Primeira vez? Criar a conta de administrador"
              : "Já tenho conta — entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
