import Link from "next/link";

type LandingPageProps = {
  params: Promise<{ slug: string }>;
};

const services = [
  {
    name: "Corte clásico",
    duration: "45 min",
    price: "$25",
    description: "Limpieza de contornos, acabado con producto y asesoría de estilo.",
    dark: false,
  },
  {
    name: "Corte + barba",
    duration: "60 min",
    price: "$35",
    description: "Corte completo con perfilado de barba y toalla caliente.",
    dark: true,
  },
  {
    name: "Afeitado premium",
    duration: "30 min",
    price: "$15",
    description: "Afeitado tradicional con crema premium y loción final.",
    dark: false,
  },
];

const team = [
  { name: "Alejandro", role: "Master Barber" },
  { name: "Matias", role: "Fade Specialist" },
  { name: "Sergio", role: "Beard Artist" },
];

const availableSlots = ["10:00", "11:30", "13:00", "15:30", "17:00", "18:30"];

const testimonials = [
  { name: "Carlos M.", quote: "La mejor barbería del barrio. Siempre salgo impecable." },
  { name: "Andrés P.", quote: "Reservar online me ahorra tiempo y el servicio es top." },
  { name: "Julián R.", quote: "Excelente atención, ambiente cuidado y puntualidad total." },
];

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;

  return (
    <div className="space-y-20 pb-8">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="-mx-6 -mt-10 sm:-mt-14">

        {/* MOBILE */}
        <div className="md:hidden">
          <div className="relative w-full overflow-hidden bg-black" style={{ height: "56vw", minHeight: 220 }}>
            <video
              autoPlay muted loop playsInline
              className="h-full w-full object-cover opacity-90"
              src="https://video.wixstatic.com/video/5d3a2a_196d0b31232e4c658ab94f9cb876282b/720p/mp4/file.mp4"
            />
            <span className="absolute bottom-3 left-3 bg-black/75 px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] uppercase text-white">
              Reserva online · Sin esperas
            </span>
          </div>

          <div className="border-b border-black/10 bg-white px-6 py-8">
            <div className="mb-4 h-px w-8 bg-black" />
            <p className="mb-3 text-[9px] font-semibold tracking-[0.2em] uppercase text-neutral-400">
              San Miguel · Barbería
            </p>
            <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-black">
              Redefi&shy;niendo<br />el corte
            </h1>
            <Link
              href={`/${slug}/reservar`}
              className="mt-6 inline-block bg-black px-6 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-white transition hover:opacity-75"
            >
              Reservar turno
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-px bg-black/10">
            <div className="bg-neutral-50 px-6 py-5">
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-neutral-400">Clientes</p>
              <p className="mt-1 text-4xl font-black tracking-tight">+2K</p>
              <p className="mt-1 text-[9px] tracking-widest uppercase text-neutral-400">Atendidos</p>
            </div>
            <div className="bg-neutral-900 px-6 py-5 text-white">
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/40">Promedio</p>
              <p className="mt-1 text-4xl font-black tracking-tight">4.9</p>
              <p className="mt-1 text-[9px] tracking-widest uppercase text-white/40">Puntuación</p>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <div
            className="grid gap-px bg-neutral-300"
            style={{ gridTemplateColumns: "1fr 1.6fr 1fr", gridTemplateRows: "380px 260px" }}
          >
            <div className="flex flex-col justify-end bg-white px-10 py-10">
              <div className="mb-4 h-px w-8 bg-black" />
              <p className="mb-3 text-[9px] font-semibold tracking-[0.2em] uppercase text-neutral-400">
                San Miguel · Barbería
              </p>
              <h1 className="text-5xl font-black uppercase leading-none tracking-tight text-black xl:text-6xl">
                Redefi<br />niendo<br />el corte
              </h1>
            </div>

            <div className="relative overflow-hidden bg-black" style={{ gridColumn: "2 / 4" }}>
              <video
                autoPlay muted loop playsInline
                className="h-full w-full object-cover opacity-90"
                src="https://video.wixstatic.com/video/5d3a2a_196d0b31232e4c658ab94f9cb876282b/720p/mp4/file.mp4"
              />
              <span className="absolute bottom-5 left-5 bg-black/80 px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white">
                Reserva online · Sin esperas
              </span>
            </div>

            <div className="flex flex-col justify-center bg-neutral-50 px-10 py-8">
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-neutral-400">Clientes</p>
              <p className="mt-2 text-6xl font-black leading-none tracking-tight">+2K</p>
              <p className="mt-2 text-[9px] tracking-widest uppercase text-neutral-400">Atendidos</p>
            </div>

            <div className="flex flex-col justify-center bg-neutral-900 px-10 py-8 text-white">
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/40">Promedio</p>
              <p className="mt-2 text-6xl font-black leading-none tracking-tight">4.9</p>
              <p className="mt-2 text-[9px] tracking-widest uppercase text-white/40">Puntuación</p>
            </div>

            <div className="flex flex-col justify-center bg-stone-100 px-10 py-8">
              <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-neutral-400">Horario</p>
              <p className="mt-2 text-2xl font-black uppercase tracking-tight">Lun – Sáb</p>
              <p className="mt-1 text-[9px] tracking-widest uppercase text-neutral-500">8:00 AM – 8:00 PM</p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                Tres especialistas, un espacio cuidado y puntualidad garantizada.
              </p>
              <Link
                href={`/${slug}/reservar`}
                className="mt-5 inline-block bg-black px-5 py-2.5 text-[10px] font-bold tracking-[0.14em] uppercase text-white transition hover:opacity-75 w-fit"
              >
                Reservar turno
              </Link>
            </div>
          </div>

        </div>
      </section>
      {/* ── FIN HERO ──────────────────────────────────────────────────── */}


      {/* ── RESERVAS ─────────────────────────────────────────────────── */}
      <section
        id="reservas"
        className="grid gap-px bg-neutral-200 border border-neutral-200 lg:grid-cols-[1.2fr_1fr]"
      >
        <div className="bg-white px-8 py-10">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Reservas rápidas
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Agenda tu cita con una vista clara
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-neutral-500">
            Elige servicio, fecha y hora en un flujo visual más limpio y directo.
          </p>

          <div className="mt-6 grid gap-px bg-neutral-200 sm:grid-cols-3">
            {["Servicio", "Fecha", "Hora"].map((title, index) => (
              <div key={title} className="bg-neutral-50 px-5 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Paso {index + 1}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-tight">{title}</p>
              </div>
            ))}
          </div>

          <Link
            href={`/${slug}/reservar`}
            className="mt-6 inline-block bg-[var(--tenant-primary)] px-6 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-white transition hover:opacity-75"
          >
            Empezar reserva
          </Link>
        </div>

        <aside className="bg-neutral-50 px-8 py-10">
          <p className="text-sm font-bold uppercase tracking-tight">Hoy hay disponibilidad</p>
          <p className="mt-1 text-[9px] uppercase tracking-widest text-neutral-400">Horarios de ejemplo</p>
          <div className="mt-5 grid grid-cols-3 gap-px bg-neutral-200">
            {availableSlots.map((slot, index) => (
              <span
                key={slot}
                className={`px-2 py-3 text-center text-xs font-bold tracking-wide ${
                  index % 2 === 0
                    ? "bg-white text-black"
                    : "bg-[var(--tenant-primary)] text-white"
                }`}
              >
                {slot}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[10px] text-neutral-400">
            Los horarios reales se verán al conectar la disponibilidad del negocio.
          </p>
        </aside>
      </section>


      {/* ── SERVICIOS ────────────────────────────────────────────────── */}
      <section id="servicios" className="space-y-6">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Servicios
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Lo más solicitado</h2>
        </div>

        <div className="grid gap-px bg-neutral-200 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.name}
              className={`p-8 transition hover:-translate-y-px ${
                index === 1 ? "bg-neutral-900 text-white" : "bg-white"
              }`}
            >
              <div className="mb-6 flex items-start justify-between">
                <h3 className="text-base font-bold uppercase tracking-tight">{service.name}</h3>
                <span className={`text-[9px] font-semibold uppercase tracking-widest ${
                  index === 1 ? "text-white/40" : "text-neutral-400"
                }`}>
                  {service.duration}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${
                index === 1 ? "text-white/60" : "text-neutral-500"
              }`}>
                {service.description}
              </p>
              <p className={`mt-6 text-3xl font-black tracking-tight ${
                index === 1 ? "text-white" : "text-[var(--tenant-primary)]"
              }`}>
                {service.price}
              </p>
            </article>
          ))}
        </div>
      </section>


      {/* ── EQUIPO ───────────────────────────────────────────────────── */}
      <section id="equipo" className="space-y-6">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Equipo
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Profesionales de la casa</h2>
        </div>

        <div className="grid gap-px bg-neutral-200 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member, index) => (
            <article
              key={member.name}
              className={`p-8 ${index === 1 ? "bg-neutral-900 text-white" : "bg-white"}`}
            >
              <div className={`mb-5 inline-flex h-10 w-10 items-center justify-center text-sm font-black ${
                index === 1
                  ? "bg-white text-neutral-900"
                  : "bg-[var(--tenant-primary)] text-white"
              }`}>
                {member.name.charAt(0)}
              </div>
              <h3 className="text-base font-bold uppercase tracking-tight">{member.name}</h3>
              <p className={`mt-1 text-[9px] uppercase tracking-widest ${
                index === 1 ? "text-white/40" : "text-neutral-400"
              }`}>
                {member.role}
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${
                index === 1 ? "text-white/60" : "text-neutral-500"
              }`}>
                Especialista en cortes modernos, perfiles limpios y acabados que respetan tu estilo.
              </p>
            </article>
          ))}
        </div>
      </section>


      {/* ── TESTIMONIOS ──────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Testimonios
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Lo que dicen nuestros clientes</h2>
        </div>

        <div className="grid gap-px bg-neutral-200 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={`p-8 ${index === 1 ? "bg-neutral-900 text-white" : "bg-white"}`}
            >
              <div className={`mb-1 h-px w-6 ${
                index === 1 ? "bg-white/30" : "bg-[var(--tenant-primary)]"
              }`} />
              <p className={`mt-4 text-sm leading-relaxed ${
                index === 1 ? "text-white/70" : "text-neutral-600"
              }`}>
                "{testimonial.quote}"
              </p>
              <p className={`mt-5 text-[9px] font-bold uppercase tracking-widest ${
                index === 1 ? "text-white/40" : "text-neutral-400"
              }`}>
                {testimonial.name}
              </p>
            </article>
          ))}
        </div>
      </section>


      {/* ── CTA FINAL ────────────────────────────────────────────────── */}
      <section className="bg-neutral-900 p-8 sm:p-12">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
          Reserva tu lugar
        </p>
        <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white">
          ¿Listo para tu<br />próximo look?
        </h2>
        <p className="mt-3 max-w-md text-sm text-white/50">
          Agenda ahora y asegura tu horario preferido.
        </p>
        <Link
          href={`/${slug}/reservar`}
          className="mt-6 inline-block bg-[var(--tenant-primary)] px-7 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-white transition hover:opacity-75"
        >
          Reservar mi turno
        </Link>
      </section>

    </div>
  );
}