import { EmployeesManagement } from "@/components/dashboard/employees-management";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

export default function EmpleadosPage() {
  return (
    <ModulePageShell
      title="Empleados"
      description="Gestion de perfiles, horarios semanales, asistencia, comisiones y rendimiento individual."
    >
      <EmployeesManagement />
    </ModulePageShell>
  );
}
