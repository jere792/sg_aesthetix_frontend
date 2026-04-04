import Link from "next/link";

type LandingPageProps = {
  params: Promise<{ slug: string }>;
};

const services = [
  { name: "Corte clásico", duration: "45 min", price: "$18" },
  { name: "Corte + barba", duration: "60 min", price: "$25" },
  { name: "Afeitado premium", duration: "30 min", price: "$15" },
];

const team = ["Alejandro", "Matías", "Sergio"];

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;

  return (
    <div className="space-y-14">
      <section className="rounded-3xl bg-[var(--tenant-surface)] p-8 shadow-sm sm:p-12">
        <p className="mb-2 text-sm uppercase tracking-[0.15em] text-[var(--tenant-muted)]">
          Barbería {slug}
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Tu estilo, nuestro detalle.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--tenant-muted)] sm:text-lg">
          Bienvenido a nuestra barbería. Conoce nuestros servicios, al equipo y
          reserva tu turno en segundos.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${slug}/reservar`}
            className="rounded-full bg-[var(--tenant-primary)] px-5 py-3 text-sm font-semibold text-white"
          >
            Reservar ahora
          </Link>
          <Link
            href={`/${slug}/galeria`}
            className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold"
          >
            Ver galería
          </Link>
        </div>
      </section>

      <section id="servicios" className="space-y-5">
        <h2 className="text-2xl font-semibold">Servicios</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="rounded-2xl bg-[var(--tenant-surface)] p-5 shadow-sm"
            >
              <h3 className="font-semibold">{service.name}</h3>
              <p className="mt-2 text-sm text-[var(--tenant-muted)]">
                Duración: {service.duration}
              </p>
              <p className="mt-1 text-lg font-bold text-[var(--tenant-primary)]">
                {service.price}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="equipo" className="space-y-5">
        <h2 className="text-2xl font-semibold">Equipo</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member) => (
            <article
              key={member}
              className="rounded-2xl bg-[var(--tenant-surface)] p-5 shadow-sm"
            >
              <h3 className="font-semibold">{member}</h3>
              <p className="mt-2 text-sm text-[var(--tenant-muted)]">
                Especialista en cortes modernos y perfilado de barba.
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
