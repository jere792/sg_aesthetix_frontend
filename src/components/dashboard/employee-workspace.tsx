"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  UserRound,
} from "lucide-react";

type ServiceLink = {
  id: string;
  name: string;
  duration: string;
  price: string;
  category: string;
  demand: string;
};

type Appointment = {
  id: string;
  time: string;
  client: string;
  service: string;
  status: "Confirmada" | "En curso" | "Pendiente";
  note: string;
};

const linkedServices: ServiceLink[] = [
  {
    id: "svc-fade",
    name: "Fade premium",
    duration: "50 min",
    price: "$24",
    category: "Corte",
    demand: "Alta demanda",
  },
  {
    id: "svc-barba",
    name: "Perfilado de barba",
    duration: "25 min",
    price: "$12",
    category: "Barba",
    demand: "Complementario",
  },
  {
    id: "svc-combo",
    name: "Corte + barba",
    duration: "70 min",
    price: "$30",
    category: "Combo",
    demand: "Muy pedido",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: "apt-01",
    time: "10:00",
    client: "Carlos Mendez",
    service: "Fade premium",
    status: "Confirmada",
    note: "Mantener laterales bajos.",
  },
  {
    id: "apt-02",
    time: "11:30",
    client: "Andres Torres",
    service: "Corte + barba",
    status: "En curso",
    note: "Cliente frecuente, ofrecer producto final.",
  },
  {
    id: "apt-03",
    time: "13:00",
    client: "Julian Rojas",
    service: "Perfilado de barba",
    status: "Pendiente",
    note: "Llega 10 min antes.",
  },
];

const checklistItems = [
  "Herramientas limpias y listas",
  "Toallas y navajas revisadas",
  "Citas de la tarde confirmadas",
  "Notas de clientes actualizadas",
];

const noteInputClassName =
  "min-h-32 w-full rounded-3xl border border-[var(--border)] px-4 py-4 text-sm outline-none transition focus:border-[var(--foreground)]";

type EmployeeWorkspaceProps = {
  initialView?: "jornada" | "servicios" | "agenda";
};

export function EmployeeWorkspace({
  initialView = "jornada",
}: EmployeeWorkspaceProps) {
  const router = useRouter();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(linkedServices[0]?.id ?? "");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(
    initialAppointments[0]?.id ?? "",
  );
  const [dailyNote, setDailyNote] = useState(
    "Recordar preferencias nuevas y ofrecer combo cuando encaje.",
  );

  const pendingCount = useMemo(
    () => appointments.filter((appointment) => appointment.status === "Pendiente").length,
    [appointments],
  );

  const selectedService = useMemo(
    () => linkedServices.find((service) => service.id === selectedServiceId) ?? linkedServices[0],
    [selectedServiceId],
  );

  const selectedAppointment = useMemo(
    () =>
      appointments.find((appointment) => appointment.id === selectedAppointmentId) ??
      appointments[0],
    [appointments, selectedAppointmentId],
  );

  const nextAppointment = useMemo(
    () =>
      appointments.find((appointment) => appointment.status === "Pendiente") ??
      appointments.find((appointment) => appointment.status === "Confirmada"),
    [appointments],
  );

  const advanceAppointment = (appointmentId: string) => {
    setAppointments((current) =>
      current.map((appointment) => {
        if (appointment.id !== appointmentId) {
          return appointment;
        }

        if (appointment.status === "Pendiente") {
          return { ...appointment, status: "Confirmada" };
        }

        if (appointment.status === "Confirmada") {
          return { ...appointment, status: "En curso" };
        }

        return { ...appointment, status: "Confirmada" };
      }),
    );

    setSelectedAppointmentId(appointmentId);
  };

  const openView = (view: "jornada" | "servicios" | "agenda") => {
    if (view === "jornada") {
      router.push("/empleado");
      return;
    }

    if (view === "servicios") {
      router.push("/empleado/servicios");
      return;
    }

    router.push("/empleado/citas");
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.75fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Mi jornada
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Tus servicios y tus citas
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
              Aqui ves solo lo que te corresponde hoy, con una vista clara y rapida.
            </p>
          </div>

          <div
            className={`rounded-[1.75rem] border px-5 py-4 transition ${
              isAvailable
                ? "border-[var(--hover)]/20"
                : "border-[var(--warning)]/20"
            }`}
            style={{
              background: isAvailable
                ? "color-mix(in srgb, var(--hover) 8%, var(--background-secondary))"
                : "color-mix(in srgb, var(--warning) 8%, var(--background-secondary))",
            }}
          >
            <p className="text-sm font-semibold text-[var(--foreground)]">Estado de hoy</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {isAvailable
                ? "Puedes seguir recibiendo nuevas citas."
                : "No entraran nuevas citas por ahora."}
            </p>
            <button
              type="button"
              onClick={() => setIsAvailable((current) => !current)}
              className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 ${
                isAvailable
                  ? "bg-[var(--hover)]"
                  : "bg-[var(--warning)]"
              }`}
            >
              {isAvailable ? "Disponible" : "No disponible"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Citas hoy"
            value="8"
            icon={<CalendarClock size={18} />}
            detail="2 mas por la tarde"
            isActive={initialView === "agenda"}
            onClick={() => openView("agenda")}
          />
          <KpiCard
            label="Mis servicios"
            value={String(linkedServices.length)}
            icon={<Scissors size={18} />}
            detail="Solo los tuyos"
            isActive={initialView === "servicios"}
            onClick={() => openView("servicios")}
          />
          <KpiCard
            label="Pendientes"
            value={String(pendingCount)}
            icon={<TimerReset size={18} />}
            detail="Por confirmar"
            isActive={initialView === "jornada"}
            onClick={() => openView("jornada")}
          />
          <KpiCard
            label="Puntuacion"
            value="4.9"
            icon={<Star size={18} />}
            detail="Promedio semanal"
            isActive={initialView === "jornada"}
            onClick={() => openView("jornada")}
          />
        </div>
      </section>

      {initialView === "jornada" ? (
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.95fr]">
          <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-[var(--foreground)]">Resumen del dia</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Entra rapido a lo que necesitas ver ahora.
                </p>
              </div>
              <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                Vista activa
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => openView("servicios")}
                className="rounded-3xl border border-[var(--hover)]/20 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                style={{
                  background: "color-mix(in srgb, var(--hover) 8%, var(--background-secondary))",
                }}
              >
                <p className="text-lg font-semibold text-[var(--foreground)]">Mis servicios</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Revisa solo lo que puedes atender hoy.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                    {linkedServices.length} servicios
                  </span>
                  <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                    {selectedService?.name}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openView("agenda")}
                className="rounded-3xl border border-[var(--hover)]/20 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                style={{
                  background: "color-mix(in srgb, var(--hover) 6%, var(--background-secondary))",
                }}
              >
                <p className="text-lg font-semibold text-[var(--foreground)]">Mis citas</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Mira tus turnos y actualiza su estado.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                    {appointments.length} citas
                  </span>
                  <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                    {pendingCount} pendientes
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <section className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-5">
                <p className="text-sm font-semibold text-[var(--foreground)]">Antes de empezar</p>
                <div className="mt-4 space-y-3">
                  {checklistItems.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] px-4 py-3"
                    >
                      {index < 2 ? (
                        <CheckCircle2 size={18} style={{ color: "var(--hover)" }} />
                      ) : (
                        <ClipboardList size={18} className="text-[var(--text-muted)]" />
                      )}
                      <span className="text-sm text-[var(--foreground)]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-5">
                <p className="text-sm font-semibold text-[var(--foreground)]">Nota del dia</p>
                <textarea
                  value={dailyNote}
                  onChange={(event) => setDailyNote(event.target.value)}
                  className={`mt-4 bg-[var(--background-secondary)] ${noteInputClassName}`}
                />
              </section>
            </div>
          </section>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
              <p className="text-sm font-semibold text-[var(--foreground)]">Siguiente cita</p>
              {nextAppointment ? (
                <div
                  className="mt-4 rounded-3xl p-5"
                  style={{ background: "var(--foreground)", color: "var(--background)" }}
                >
                  <p className="text-sm opacity-60">{nextAppointment.time}</p>
                  <p className="mt-1 text-xl font-bold">{nextAppointment.client}</p>
                  <p className="mt-2 text-sm opacity-60">{nextAppointment.service}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
                    <BadgeCheck size={16} />
                    {nextAppointment.note}
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-[var(--text-muted)]">No hay citas por atender.</p>
              )}
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
              <p className="text-sm font-semibold text-[var(--foreground)]">Tu perfil</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
                <p className="flex items-center gap-2">
                  <UserRound size={16} />
                  Alejandro Ruiz - Barber Senior
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles size={16} />
                  Especialista en fade, barba y acabados premium
                </p>
                <p className="flex items-center gap-2">
                  <Clock3 size={16} />
                  Hoy trabajas de 9:00 AM a 6:00 PM
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                <MiniInfo
                  icon={<Sparkles size={16} />}
                  title="Hoy conviene"
                  detail="Ofrecer combos cuando el cliente ya pide barba o acabado."
                />
                <MiniInfo
                  icon={<ShieldCheck size={16} />}
                  title="No olvidar"
                  detail="Guardar observaciones utiles al terminar cada cita."
                />
              </div>
            </section>
          </div>
        </div>
      ) : null}

      {initialView === "servicios" ? (
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-[var(--foreground)]">Mis servicios</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Solo ves los que te asignaron.</p>
              </div>
              <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                {linkedServices.length} servicios
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {linkedServices.map((service) => (
                <article
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`cursor-pointer rounded-3xl border p-5 transition ${
                    selectedServiceId === service.id
                      ? "border-[var(--hover)]/30"
                      : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--hover)]/20"
                  }`}
                  style={
                    selectedServiceId === service.id
                      ? { background: "color-mix(in srgb, var(--hover) 8%, var(--background-secondary))" }
                      : undefined
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-[var(--foreground)]">{service.name}</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">{service.category}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getDemandClassName(
                        service.demand,
                      )}`}
                    >
                      {service.demand}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                      {service.duration}
                    </span>
                    <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                      {service.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
            <p className="text-sm font-semibold text-[var(--foreground)]">Detalle del servicio</p>
            <div
              className="mt-4 rounded-3xl border border-[var(--hover)]/20 p-5"
              style={{
                background: "color-mix(in srgb, var(--hover) 8%, var(--background-secondary))",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-semibold text-[var(--foreground)]">{selectedService?.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{selectedService?.category}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getDemandClassName(
                    selectedService?.demand ?? "",
                  )}`}
                >
                  {selectedService?.demand}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoTile label="Tiempo" value={selectedService?.duration ?? "--"} />
                <InfoTile label="Precio" value={selectedService?.price ?? "--"} />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <MiniInfo
                icon={<Scissors size={16} />}
                title="Lo que haces"
                detail="Aqui revisas rapido que servicios puedes atender."
              />
              <MiniInfo
                icon={<Star size={16} />}
                title="Lo mas pedido"
                detail="Prioriza lo que mas te reservan durante el dia."
              />
            </div>
          </section>
        </div>
      ) : null}

      {initialView === "agenda" ? (
        <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-[var(--foreground)]">Mis citas</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Marca el avance de cada una.</p>
              </div>
              <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                {appointments.length} citas
              </span>
            </div>

            <div className="mt-5 grid gap-4">
              {appointments.map((appointment) => (
                <article
                  key={appointment.id}
                  onClick={() => setSelectedAppointmentId(appointment.id)}
                  className={`cursor-pointer rounded-3xl border p-5 transition ${
                    selectedAppointmentId === appointment.id
                      ? "border-[var(--hover)]/30"
                      : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--hover)]/20"
                  }`}
                  style={
                    selectedAppointmentId === appointment.id
                      ? { background: "color-mix(in srgb, var(--hover) 6%, var(--background-secondary))" }
                      : undefined
                  }
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-base font-semibold text-[var(--foreground)]">{appointment.client}</p>
                        <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                          {appointment.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--text-muted)]">{appointment.service}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        advanceAppointment(appointment.id);
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background-secondary)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--background)]"
                    >
                      Cambiar estado
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getAppointmentStatusClassName(
                        appointment.status,
                      )}`}
                    >
                      {appointment.status}
                    </span>
                    <p className="text-sm text-[var(--text-muted)]">{appointment.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
              <p className="text-sm font-semibold text-[var(--foreground)]">Cita elegida</p>
              {selectedAppointment ? (
                <div
                  className="mt-4 rounded-3xl border border-[var(--hover)]/20 p-5"
                  style={{
                    background: "color-mix(in srgb, var(--hover) 6%, var(--background-secondary))",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[var(--foreground)]">{selectedAppointment.client}</p>
                    <span className="rounded-full bg-[var(--background-secondary)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                      {selectedAppointment.time}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{selectedAppointment.service}</p>
                  <span
                    className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getAppointmentStatusClassName(
                      selectedAppointment.status,
                    )}`}
                  >
                    {selectedAppointment.status}
                  </span>
                  <p className="mt-4 text-sm text-[var(--foreground)]">{selectedAppointment.note}</p>

                  <button
                    type="button"
                    onClick={() => advanceAppointment(selectedAppointment.id)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--background)] transition hover:opacity-90"
                    style={{ background: "var(--foreground)" }}
                  >
                    Actualizar cita
                    <ChevronRight size={16} />
                  </button>
                </div>
              ) : (
                <p className="mt-4 text-sm text-[var(--text-muted)]">Elige una cita para ver mas.</p>
              )}
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--background-secondary)] p-6 shadow-sm">
              <p className="text-sm font-semibold text-[var(--foreground)]">Siguiente cita</p>
              {nextAppointment ? (
                <div
                  className="mt-4 rounded-3xl p-5"
                  style={{ background: "var(--foreground)", color: "var(--background)" }}
                >
                  <p className="text-sm opacity-60">{nextAppointment.time}</p>
                  <p className="mt-1 text-xl font-bold">{nextAppointment.client}</p>
                  <p className="mt-2 text-sm opacity-60">{nextAppointment.service}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
                    <BadgeCheck size={16} />
                    {nextAppointment.note}
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-[var(--text-muted)]">No hay citas por atender.</p>
              )}
            </section>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function KpiCard({
  label,
  value,
  icon,
  detail,
  isActive,
  onClick,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  detail: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border p-5 text-left transition ${
        isActive
          ? "border-[var(--foreground)] bg-[var(--background-secondary)] shadow-sm"
          : "border-[var(--border)] bg-[var(--background)] hover:-translate-y-0.5 hover:bg-[var(--background-secondary)]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--foreground)]">{label}</p>
        <div className="rounded-2xl bg-[var(--background-secondary)] p-2 text-[var(--foreground)]">{icon}</div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{detail}</p>
    </button>
  );
}

function MiniInfo({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-4">
      <div className="flex items-center gap-2 text-[var(--foreground)]">
        {icon}
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{detail}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[var(--background-secondary)] px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}

function getDemandClassName(demand: string) {
  if (demand === "Muy pedido") {
    return "bg-[var(--hover)]/15 text-[var(--hover)]";
  }

  if (demand === "Alta demanda") {
    return "bg-[var(--hover)]/10 text-[var(--hover)]";
  }

  return "bg-[var(--hover)]/10 text-[var(--hover)]";
}

function getAppointmentStatusClassName(status: Appointment["status"]) {
  if (status === "En curso") {
    return "bg-[var(--hover)]/15 text-[var(--hover)]";
  }

  if (status === "Confirmada") {
    return "bg-[var(--hover)]/15 text-[var(--hover)]";
  }

  return "bg-[var(--text-muted)]/15 text-[var(--text-muted)]";
}
