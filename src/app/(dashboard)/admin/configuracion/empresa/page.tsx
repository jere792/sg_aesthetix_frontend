import { BusinessManagement } from "@/components/dashboard/business-management";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

export default function ConfiguracionEmpresaPage() {
  return (
    <ModulePageShell
      breadcrumb={[{ label: "Administracion", href: "/admin" }, { label: "Configuracion" }]}
      title="Configuracion"
      description="Administra los datos de tu negocio, nombre, enlace y estado."
    >
      <BusinessManagement />
    </ModulePageShell>
  );
}
