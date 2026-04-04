import Link from "next/link";

type ReservarPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ReservarPage({ params }: ReservarPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-6 rounded-3xl bg-[var(--tenant-surface)] p-8 shadow-sm">
      <h1 className="text-3xl font-bold tracking-tight">Reservar turno</h1>
      <p className="text-[var(--tenant-muted)]">
        Flujo inicial de reserva pública para <strong>{slug}</strong>.
      </p>

      <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--tenant-muted)]">
        <li>Elegir servicio.</li>
        <li>Elegir profesional.</li>
        <li>Seleccionar fecha y horario disponible.</li>
        <li>Confirmar datos de contacto.</li>
      </ol>

      <Link href={`/${slug}`} className="inline-flex rounded-full border border-black/15 px-4 py-2 text-sm font-medium">
        Volver al inicio
      </Link>
    </section>
  );
}
