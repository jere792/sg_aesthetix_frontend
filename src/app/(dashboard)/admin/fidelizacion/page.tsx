import { LoyaltyManagement } from "@/components/dashboard/loyalty-management";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

export default function FidelizacionPage() {
  return (
    <ModulePageShell
      title="Fidelizacion"
      description="CRUD de reglas de puntos, configuracion por tenant y base para acumulacion, canje y expiracion."
    >
      <LoyaltyManagement />
    </ModulePageShell>
  );
}
