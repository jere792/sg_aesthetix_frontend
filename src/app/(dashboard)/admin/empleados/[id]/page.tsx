type EmpleadoDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmpleadoDetailPage({ params }: EmpleadoDetailPageProps) {
  const { id } = await params;

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Empleado</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">Perfil {id}</h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-600">
          Vista individual lista para conectar horario, rendimiento, comisiones y detalle de citas.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">Carga semanal</p>
          <p className="mt-3 text-3xl font-bold text-zinc-900">32 citas</p>
          <p className="mt-2 text-sm text-zinc-600">Promedio de 6.4 citas por dia habil.</p>
        </article>
        <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">Comision estimada</p>
          <p className="mt-3 text-3xl font-bold text-zinc-900">18%</p>
          <p className="mt-2 text-sm text-zinc-600">Se puede vincular luego con cierres y caja.</p>
        </article>
        <article className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">Estado</p>
          <p className="mt-3 text-3xl font-bold text-zinc-900">Activo</p>
          <p className="mt-2 text-sm text-zinc-600">Disponible para asignacion en agenda.</p>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-zinc-900">Especialidades y agenda</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Fade', 'Barba', 'Corte clasico', 'Asesoria'].map((item) => (
              <span
                key={item}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            Este bloque queda preparado para traer horarios semanales, descansos y servicios asignados.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-zinc-900">Proximas integraciones</p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>Historial de asistencia y tardanzas</li>
            <li>Metricas por ticket promedio y retencion</li>
            <li>Edicion de perfil y permisos internos</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
