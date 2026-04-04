import Link from "next/link";

type GaleriaPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GaleriaPage({ params }: GaleriaPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Galería de cortes</h1>
        <p className="mt-2 text-[var(--tenant-muted)]">
          Vista inicial de la galería pública de {slug}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-2xl bg-[var(--tenant-surface)] p-4 shadow-sm"
          >
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-black/20 text-sm text-[var(--tenant-muted)]">
              Foto {index + 1}
            </div>
          </div>
        ))}
      </div>

      <Link href={`/${slug}`} className="inline-flex rounded-full border border-black/15 px-4 py-2 text-sm font-medium">
        Volver al inicio
      </Link>
    </section>
  );
}
