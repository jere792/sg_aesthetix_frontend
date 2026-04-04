import Link from "next/link";

type LandingPageProps = {
  params: Promise<{ slug: string }>;
};

const services = [
  {
    name: "Corte clásico",
    duration: "45 min",
    price: "$18",
    description: "Limpieza de contornos, acabado con producto y asesoría de estilo.",
  },
  {
    name: "Corte + barba",
    duration: "60 min",
    price: "$25",
    description: "Corte completo con perfilado de barba y toalla caliente.",
  },
  {
    name: "Afeitado premium",
    duration: "30 min",
    price: "$15",
    description: "Afeitado tradicional con crema premium y loción final.",
  },
];

const team = [
  { name: "Alejandro", role: "Master Barber" },
  { name: "Matías", role: "Fade Specialist" },
  { name: "Sergio", role: "Beard Artist" },
];

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;

  return (
    <div className="space-y-20 pb-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--tenant-surface)] p-8 shadow-2xl shadow-black/5 sm:p-12">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[var(--tenant-accent)]/25 blur-3xl" />
        <div className="absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[var(--tenant-primary)]/10 blur-3xl" />

        <div className="relative z-10">
          <p className="inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tenant-muted)]">
            Barbería · {slug}
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Tu estilo, nuestra precisión.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--tenant-muted)] sm:text-lg">
            Diseñamos cada corte con técnica y detalle. Reserva tu turno online,
            conoce al equipo y vive una experiencia premium desde el primer clic.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={`/${slug}/reservar`}
              className="rounded-full bg-[var(--tenant-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              Reservar ahora
            </Link>
            <Link
              href={`/${slug}/galeria`}
              className="rounded-full border border-black/15 bg-white/75 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white"
            >
              Ver galería
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/75 p-4 backdrop-blur">
              <p className="text-2xl font-bold">+2K</p>
              <p className="text-sm text-[var(--tenant-muted)]">Clientes atendidos</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/75 p-4 backdrop-blur">
              <p className="text-2xl font-bold">4.9★</p>
              <p className="text-sm text-[var(--tenant-muted)]">Valoración promedio</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/75 p-4 backdrop-blur">
              <p className="text-2xl font-bold">Lun-Sáb</p>
              <p className="text-sm text-[var(--tenant-muted)]">8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tenant-muted)]">
              Servicios
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Lo más solicitado</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="group rounded-3xl border border-black/10 bg-[var(--tenant-surface)] p-6 shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <span className="rounded-full bg-[var(--tenant-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--tenant-primary)]">
                  {service.duration}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--tenant-muted)]">
                {service.description}
              </p>
              <p className="mt-5 text-2xl font-bold text-[var(--tenant-primary)]">
                {service.price}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="equipo" className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tenant-muted)]">
            Equipo
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Profesionales de la casa</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="rounded-3xl border border-black/10 bg-[var(--tenant-surface)] p-6 shadow-lg shadow-black/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--tenant-primary)] text-base font-bold text-white">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-[var(--tenant-muted)]">{member.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--tenant-muted)]">
                Especialista en cortes modernos, perfiles limpios y acabados que
                respetan tu estilo.
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
