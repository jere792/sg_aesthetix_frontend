import { BusinessManagement } from "@/components/dashboard/business-management";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

export default function EmpresaPage() {
  return (
    <ModulePageShell
      title="Empresa y tenants"
      description="CRUD de tenant, activacion o desactivacion, plan y validacion de tenant_id obligatorio."
    >
      <BusinessManagement />
    </ModulePageShell>
  );
}
