import { GalleryManagement } from "@/components/dashboard/gallery-management";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

export default function GaleriaAdminPage() {
  return (
    <ModulePageShell
      title="Catalogo de estilos"
      description="CRUD de estilos de corte, tags, orden y activacion para exponer en la landing publica."
    >
      <GalleryManagement />
    </ModulePageShell>
  );
}
