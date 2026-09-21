import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatKz } from "@/lib/aurelis";
import type { PlacedOrder } from "@/components/aurelis/CheckoutDrawer";

type Props = {
  order: PlacedOrder | null;
  onClose: () => void;
};

export function OrderSuccessDialog({ order, onClose }: Props) {
  return (
    <Dialog open={Boolean(order)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm rounded-2xl">
        {order && (
          <div className="text-center">
            <CheckCircle2 className="mx-auto size-12 text-primary" />
            <h2 className="mt-3 font-display text-xl font-bold">🎉 Pedido recebido com sucesso!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Obrigado pela sua encomenda. Entraremos em contacto consigo para confirmar os detalhes
              da entrega.
            </p>

            <dl className="mt-5 space-y-2 rounded-xl border border-border bg-secondary/60 p-4 text-left text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Produto</dt>
                <dd className="text-right font-medium">{order.productName}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Quantidade</dt>
                <dd className="font-medium">{order.quantity}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Total</dt>
                <dd className="font-bold text-primary">{formatKz(order.total)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Pagamento</dt>
                <dd className="font-medium">Na Entrega</dd>
              </div>
            </dl>

            <Button className="mt-5 w-full" onClick={onClose}>
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
