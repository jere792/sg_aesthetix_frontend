import { EmployeesService } from "@/services/employees.service";

type EmpleadoDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmpleadoDetailPage({ params }: EmpleadoDetailPageProps) {
  const { id } = await params;

  let employee;
  try {
    employee = await EmployeesService.getById(id);
  } catch {
    return (
      <section className="space-y-6">
        <header className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-[var(--warning)]">Error al cargar empleado</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">No se pudo obtener la informacion del empleado.</p>
        </header>
      </section>
    );
  }

  if (!employee) {
    return (
      <section className="space-y-6">
        <header className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Empleado no encontrado</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">El empleado que buscas no existe o fue eliminado.</p>
        </header>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Empleado</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">{employee.name}</h1>
        <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)]">
          {employee.role} · {employee.email}
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-5 shadow-sm">
          <p className="text-sm font-semibold text-[var(--foreground)]">Estado</p>
          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              employee.status === "Activo"
                ? "bg-[var(--hover)]/15 text-[var(--hover)]"
                : "bg-[var(--warning)]/15 text-[var(--warning)]"
            }`}
          >
            {employee.status}
          </span>
        </article>
        <article className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-5 shadow-sm">
          <p className="text-sm font-semibold text-[var(--foreground)]">Telefono</p>
          <p className="mt-3 text-lg font-bold text-[var(--foreground)]">{employee.phone || "Sin registrar"}</p>
        </article>
        <article className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-5 shadow-sm">
          <p className="text-sm font-semibold text-[var(--foreground)]">Correo</p>
          <p className="mt-3 text-lg font-bold text-[var(--foreground)]">{employee.email}</p>
        </article>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
          <p className="text-lg font-semibold text-[var(--foreground)]">Especialidades</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {employee.specialties.length > 0
              ? employee.specialties.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]"
                  >
                    {item}
                  </span>
                ))
              : (
                <p className="text-sm text-[var(--text-muted)]">Sin especialidades asignadas</p>
              )}
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
          <p className="text-lg font-semibold text-[var(--foreground)]">Proximas integraciones</p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
            <li>Carga semanal desde reservas</li>
            <li>Comision desde ventas</li>
            <li>Historial de asistencia</li>
            <li>Metricas por ticket promedio</li>
            <li>Edicion de perfil y permisos</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
