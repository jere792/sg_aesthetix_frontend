import { CustomersManagement } from "@/components/dashboard/customers-management";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

export default function ClientesPage() {
  return (
    <ModulePageShell
      title="Clientes"
      description="Listado, edicion y baja de clientes registrados desde el canal publico o de reservas."
    >
      <CustomersManagement />
    </ModulePageShell>
  );
}
