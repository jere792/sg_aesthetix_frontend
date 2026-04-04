import { ModulePageShell } from "@/components/dashboard/module-page-shell";
import { ServicesManagement } from "@/components/dashboard/services-management";

export default function ServiciosPage() {
  return (
    <ModulePageShell
      title="Servicios"
      description="CRUD de servicios por tenant, asignacion a empleados, activacion o desactivacion y metadata lista para publicacion."
    >
      <ServicesManagement />
    </ModulePageShell>
  );
}
