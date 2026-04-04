"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Scissors, ShieldCheck, Sparkles, UserRound } from "lucide-react";

type BookingOption = {
  name: string;
  duration: string;
  price: string;
};

type TeamMember = {
  name: string;
  role: string;
};

type BookingFormProps = {
  businessName: string;
  services: BookingOption[];
  barbers: TeamMember[];
  availableDates: string[];
  availableSlots: string[];
};

type BookingDraft = {
  service: string;
  barber: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
  notes: string;
};

const initialDraft: BookingDraft = {
  service: "",
  barber: "",
  date: "",
  time: "",
  customerName: "",
  phone: "",
  email: "",
  notes: "",
};

const inputClassName =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[var(--tenant-text)] outline-none transition placeholder:text-[var(--tenant-muted)] focus:border-[var(--tenant-primary)] focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--tenant-primary)_14%,white)]";

export function BookingForm({
  businessName,
  services,
  barbers,
  availableDates,
  availableSlots,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingDraft>({
    ...initialDraft,
    service: services[0]?.name ?? "",
    barber: barbers[0]?.name ?? "",
    date: availableDates[0] ?? "",
    time: availableSlots[0] ?? "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedService = useMemo(
    () => services.find((service) => service.name === formData.service),
    [formData.service, services],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setIsSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[2rem] border border-black/10 bg-[var(--tenant-surface)] p-6 shadow-xl shadow-black/5 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tenant-muted)]">
              Reserva online
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Reservar turno
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--tenant-muted)] sm:text-base">
              Completa tu reserva en pocos pasos. Por ahora la confirmacion es local
              para validar el flujo visual antes de conectar disponibilidad real.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm shadow-sm">
            <p className="font-semibold text-[var(--tenant-text)]">{businessName}</p>
            <p className="mt-1 text-[var(--tenant-muted)]">Atencion premium con horario reservado</p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Reserva lista para integracion</p>
              <p className="mt-1">
                Simulamos la confirmacion de {formData.customerName || "tu turno"} para
                el {formData.date} a las {formData.time}. El siguiente paso sera enviarlo al backend.
              </p>
            </div>
          </div>
        ) : null}

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--tenant-primary)] text-white">
              <Scissors className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Servicio y profesional</h2>
              <p className="text-sm text-[var(--tenant-muted)]">
                Elige la combinacion que mejor encaje con tu cita.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {services.map((service) => {
              const isActive = formData.service === service.name;

              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => {
                    setFormData((current) => ({ ...current, service: service.name }));
                    setIsSubmitted(false);
                  }}
                  className={`rounded-3xl border p-4 text-left transition ${
                    isActive
                      ? "border-[var(--tenant-primary)] bg-white shadow-lg shadow-black/10"
                      : "border-black/10 bg-white/80 hover:-translate-y-0.5 hover:bg-white"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{service.name}</p>
                      <p className="mt-1 text-sm text-[var(--tenant-muted)]">
                        Ideal para quienes buscan una experiencia cuidada y puntual.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[var(--tenant-primary)]">
                        {service.price}
                      </p>
                      <p className="text-xs text-[var(--tenant-muted)]">{service.duration}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {barbers.map((barber) => {
              const isActive = formData.barber === barber.name;

              return (
                <button
                  key={barber.name}
                  type="button"
                  onClick={() => {
                    setFormData((current) => ({ ...current, barber: barber.name }));
                    setIsSubmitted(false);
                  }}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    isActive
                      ? "border-[var(--tenant-primary)] bg-white shadow-md shadow-black/10"
                      : "border-black/10 bg-white/70 hover:bg-white"
                  }`}
                >
                  <p className="font-semibold">{barber.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--tenant-muted)]">
                    {barber.role}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--tenant-primary)] text-white">
              <CalendarDays className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Fecha y horario</h2>
              <p className="text-sm text-[var(--tenant-muted)]">
                Dejamos una disponibilidad de ejemplo para esta primera iteracion.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Fecha</span>
              <select
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClassName}
                required
              >
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Horario</span>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={inputClassName}
                required
              >
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--tenant-primary)] text-white">
              <UserRound className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Tus datos</h2>
              <p className="text-sm text-[var(--tenant-muted)]">
                Solo pedimos lo necesario para sostener la reserva.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium">Nombre completo</span>
              <input
                required
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Ej. Juan Perez"
                className={inputClassName}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Telefono</span>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="999 999 999"
                className={inputClassName}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Email</span>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nombre@correo.com"
                className={inputClassName}
              />
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium">Notas para el equipo</span>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Ej. Quiero mantener laterales bajos o retocar barba."
                className={`${inputClassName} resize-none`}
              />
            </label>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-black/10 bg-white/70 px-5 py-4">
          <p className="max-w-xl text-sm text-[var(--tenant-muted)]">
            Al confirmar, mostramos una simulacion local del turno. No se enviara
            informacion al backend todavia.
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[var(--tenant-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:opacity-95"
          >
            Confirmar reserva
          </button>
        </div>
      </form>

      <aside className="space-y-5">
        <div className="rounded-[2rem] border border-black/10 bg-gradient-to-br from-white to-zinc-100 p-6 shadow-xl shadow-black/5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tenant-muted)]">
            Resumen
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Tu turno en vista previa</h2>

          <div className="mt-5 space-y-3">
            <SummaryRow icon={<Scissors className="h-4 w-4" />} label="Servicio" value={formData.service} />
            <SummaryRow icon={<UserRound className="h-4 w-4" />} label="Profesional" value={formData.barber} />
            <SummaryRow icon={<CalendarDays className="h-4 w-4" />} label="Fecha" value={formData.date} />
            <SummaryRow icon={<Clock3 className="h-4 w-4" />} label="Hora" value={formData.time} />
          </div>

          <div className="mt-5 rounded-3xl bg-[var(--tenant-primary)] px-5 py-5 text-white">
            <p className="text-sm text-white/80">Inversion estimada</p>
            <p className="mt-1 text-3xl font-bold">{selectedService?.price ?? "--"}</p>
            <p className="mt-1 text-sm text-white/80">{selectedService?.duration ?? "Sin duracion"}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-[var(--tenant-surface)] p-6 shadow-lg shadow-black/5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tenant-muted)]">
            Lo que cuidamos
          </p>

          <div className="mt-4 space-y-4">
            <InfoRow
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Confirmacion clara"
              description="El usuario entiende que esta version valida interfaz y experiencia antes de la integracion."
            />
            <InfoRow
              icon={<Sparkles className="h-4 w-4" />}
              title="Experiencia coherente"
              description="Usamos las mismas superficies, bordes suaves y acentos del resto del sitio publico."
            />
            <InfoRow
              icon={<Clock3 className="h-4 w-4" />}
              title="Flujo rapido"
              description="Servicio, profesional, horario y datos quedan visibles sin pasos escondidos."
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--tenant-primary)]/10 text-[var(--tenant-primary)]">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tenant-muted)]">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--tenant-primary)]/10 text-[var(--tenant-primary)]">
        {icon}
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--tenant-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}
