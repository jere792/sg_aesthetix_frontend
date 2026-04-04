import { InventoryManagement } from "@/components/dashboard/inventory-management";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

export default function InventarioPage() {
  return (
    <ModulePageShell
      title="Inventario"
      description="Registro de productos, movimientos y alertas de stock minimo con trazabilidad por usuario."
    >
      <InventoryManagement />
    </ModulePageShell>
  );
}
