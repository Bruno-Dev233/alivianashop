import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

/** Botão que envia uma imagem do dispositivo e devolve o link dela. */
export function ImageUpload({ onUploaded, label = "Enviar imagem" }: { onUploaded: (url: string) => void; label?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handle = async (file: File) => {
    setBusy(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("landing-images").upload(path, file, { contentType: file.type });
    if (error) {
      setBusy(false);
      toast.error("Não foi possível enviar a imagem.");
      return;
    }
    const { data, error: e2 } = await supabase.storage
      .from("landing-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    setBusy(false);
    if (e2 || !data) {
      toast.error("Não foi possível obter o link da imagem.");
      return;
    }
    onUploaded(data.signedUrl);
    toast.success("Imagem enviada.");
  };

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handle(f);
          e.target.value = "";
        }}
      />
      <Button type="button" variant="outline" disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} {label}
      </Button>
    </>
  );
}
