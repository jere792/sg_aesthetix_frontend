import { AgendaManagement } from "@/components/dashboard/agenda-management";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

export default function AgendaPage() {
  return (
    <ModulePageShell
      title="Agenda diaria"
      description="Vista de reservas por dia con estados de cita, reprogramacion y control de solapamientos por empleado."
    >
      <AgendaManagement />
    </ModulePageShell>
  );
}
