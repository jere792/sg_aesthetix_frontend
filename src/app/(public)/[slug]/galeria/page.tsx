import Link from "next/link";

type GaleriaPageProps = {
  params: Promise<{ slug: string }>;
};

const photos = [
  {
    url: "https://res.cloudinary.com/dp1vgjhsq/image/upload/v1777103515/8020dbbb-a7c8-47cd-bb4e-33820aa95c9f.png",
    label: "Fade clásico",
  },
  {
    url: "https://res.cloudinary.com/dp1vgjhsq/image/upload/v1777103506/1bbac8bf-f9d9-456a-828e-270cce1b6dc8.png",
    label: "Corte + barba",
  },
  {
    url: "https://res.cloudinary.com/dp1vgjhsq/image/upload/v1777103499/b9f3f759-46eb-4be8-97eb-438b1042db88.png",
    label: "Perfilado premium",
  },
  {
    url: "https://res.cloudinary.com/dp1vgjhsq/image/upload/v1777103491/d57476ce-540d-4fcb-be45-b223b115b170.png",
    label: "Corte moderno",
  },
  {
    url: "https://res.cloudinary.com/dp1vgjhsq/image/upload/v1777103484/07ae08e6-29df-4bf1-9bb1-75877d851e8e.png",
    label: "Afeitado tradicional",
  },
  {
    url: "https://res.cloudinary.com/dp1vgjhsq/image/upload/v1777103451/1fa24289-501e-41a9-b262-04d0f42968ac.png",
    label: "Estilo clásico",
  },
];

export default async function GaleriaPage({ params }: GaleriaPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-10">
      {/* Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--tenant-muted)]">
          Portfolio
        </p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">
          Galería
        </h1>
        <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-[var(--tenant-muted)]">
          Cada corte es una firma. Explorá nuestro trabajo y elegí tu estilo.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-[3px] sm:grid-cols-2 md:grid-cols-3">
        {photos.map((photo, index) => (
          <article
            key={index}
            className="group relative aspect-square overflow-hidden bg-neutral-900"
          >
            {/* Imagen */}
            <img
              src={photo.url}
              alt={photo.label}
              className="h-full w-full object-cover brightness-90 saturate-[0.85] transition duration-500 group-hover:scale-105 group-hover:brightness-75 group-hover:saturate-100"
            />

            {/* Overlay en hover */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 transition duration-300 group-hover:opacity-100">
              {/* Número */}
              <span
                className="self-end font-black leading-none text-white/20"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "56px" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Label */}
              <span className="inline-flex w-fit items-center gap-2 bg-[var(--tenant-primary)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                {photo.label}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-6 pt-2">
        <Link
          href={`/${slug}`}
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--tenant-muted)] transition hover:text-[var(--tenant-primary)]"
        >
          ← Volver al inicio
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-[var(--tenant-muted)]/40">
          {photos.length} trabajos
        </span>
      </div>
    </section>
  );
}