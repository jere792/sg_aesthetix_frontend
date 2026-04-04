"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
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
    demand: "Top seller",
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
  "Confirmar herramientas esterilizadas",
  "Revisar stock de navajas y toallas",
  "Validar agenda de la tarde",
  "Actualizar notas de clientes frecuentes",
];

export function EmployeeWorkspace() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(linkedServices[0]?.id ?? "");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(
    initialAppointments[0]?.id ?? "",
  );
  const [dailyNote, setDailyNote] = useState(
    "Priorizar combos premium y registrar preferencias nuevas al cierre.",
  );

  const pendingCount = useMemo(
    () => appointments.filter((appointment) => appointment.status === "Pendiente").length,
    [appointments],
  );

  const nextAppointment = useMemo(
    () => appointments.find((appointment) => appointment.status !== "En curso"),
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

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Panel de empleado
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
              Mi jornada y servicios vinculados
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-zinc-600">
              Esta vista muestra solo los cortes y servicios asignados al empleado, junto
              con herramientas operativas para atender mejor el dia.
            </p>
          </div>

          <div
            className={`rounded-3xl border px-5 py-4 transition ${
              isAvailable
                ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-lime-50"
                : "border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50"
            }`}
          >
            <p className="text-sm font-semibold text-zinc-900">Estado operativo</p>
            <p className="mt-1 text-sm text-zinc-600">
              {isAvailable
                ? "La agenda puede seguir tomando reservas asignables."
                : "Se bloquean nuevas asignaciones mientras finalizas pendientes."}
            </p>
            <button
              type="button"
              onClick={() => setIsAvailable((current) => !current)}
              className={`mt-3 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isAvailable
                  ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                  : "bg-rose-600 text-white shadow-sm hover:bg-rose-700"
              }`}
            >
              {isAvailable ? "Disponible para nuevas citas" : "Bloquear nuevas citas"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <KpiCard label="Citas hoy" value="8" icon={<CalendarClock size={18} />} detail="2 en la tarde" />
          <KpiCard label="Servicios activos" value={String(linkedServices.length)} icon={<Scissors size={18} />} detail="Solo asignados al perfil" />
          <KpiCard label="Pendientes" value={String(pendingCount)} icon={<TimerReset size={18} />} detail="Por confirmar o iniciar" />
          <KpiCard label="Satisfaccion" value="4.9" icon={<Star size={18} />} detail="Promedio de la semana" />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
        <div className="space-y-6">
          <section id="servicios" className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-zinc-900">Servicios vinculados</p>
                <p className="mt-1 text-sm text-zinc-600">
                  El empleado no ve todo el catalogo, solo lo que el negocio le asigno.
                </p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
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
                      ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm"
                      : "border-zinc-200 bg-zinc-50 hover:-translate-y-0.5 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-zinc-900">{service.name}</p>
                      <p className="mt-1 text-sm text-zinc-600">{service.category}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getDemandClassName(
                        service.demand,
                      )}`}
                    >
                      {service.demand}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Duracion
                      </p>
                      <p className="mt-2 text-sm font-semibold text-zinc-900">{service.duration}</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Ticket
                      </p>
                      <p className="mt-2 text-sm font-semibold text-zinc-900">{service.price}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="agenda" className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-zinc-900">Agenda de hoy</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Acciones rapidas para marcar el avance de cada cita.
                </p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                {appointments.length} turnos
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {appointments.map((appointment) => (
                <article
                  key={appointment.id}
                  onClick={() => setSelectedAppointmentId(appointment.id)}
                  className={`cursor-pointer rounded-3xl border p-5 transition ${
                    selectedAppointmentId === appointment.id
                      ? "border-sky-300 bg-gradient-to-br from-sky-50 to-cyan-50 shadow-sm"
                      : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold text-zinc-900">{appointment.client}</p>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                          {appointment.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-600">{appointment.service}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => advanceAppointment(appointment.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                    >
                      Mover estado
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-[180px_1fr]">
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Estado
                      </p>
                      <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getAppointmentStatusClassName(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Nota operativa
                      </p>
                      <p className="mt-2 text-sm text-zinc-700">{appointment.note}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Seleccion actual
            </p>
            <div className="mt-3 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
              <p className="text-sm font-semibold text-zinc-900">{selectedService?.name}</p>
              <p className="mt-1 text-sm text-zinc-600">{selectedService?.category}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                  {selectedService?.duration}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                  {selectedService?.price}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-lg font-semibold text-zinc-900">Proxima cita clave</p>
            {nextAppointment ? (
              <div className="mt-4 rounded-3xl bg-zinc-900 p-5 text-white">
                <p className="text-sm text-zinc-300">{nextAppointment.time}</p>
                <p className="mt-1 text-2xl font-bold">{nextAppointment.client}</p>
                <p className="mt-2 text-sm text-zinc-300">{nextAppointment.service}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-zinc-200">
                  <BadgeCheck size={16} />
                  {nextAppointment.note}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-600">No hay citas pendientes para hoy.</p>
            )}
          </section>

          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-lg font-semibold text-zinc-900">Cita seleccionada</p>
            {selectedAppointment ? (
              <div className="mt-4 rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-zinc-900">{selectedAppointment.client}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                    {selectedAppointment.time}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-600">{selectedAppointment.service}</p>
                <div className="mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold">
                  <span className={getAppointmentStatusClassName(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </span>
                </div>
                <p className="mt-4 text-sm text-zinc-700">{selectedAppointment.note}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-600">Selecciona una cita para ver detalle.</p>
            )}
          </section>

          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-lg font-semibold text-zinc-900">Checklist de apertura</p>
            <div className="mt-4 space-y-3">
              {checklistItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3"
                >
                  {index < 2 ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : (
                    <ClipboardList size={18} className="text-zinc-500" />
                  )}
                  <span className="text-sm text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-lg font-semibold text-zinc-900">Nota del dia</p>
            <textarea
              value={dailyNote}
              onChange={(event) => setDailyNote(event.target.value)}
              className="mt-4 min-h-32 w-full rounded-3xl border border-zinc-200 px-4 py-4 text-sm outline-none transition focus:border-zinc-900"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MiniInfo
                icon={<BriefcaseBusiness size={16} />}
                title="Objetivo comercial"
                detail="Potenciar combos y add-ons en barba."
              />
              <MiniInfo
                icon={<ShieldCheck size={16} />}
                title="Calidad"
                detail="Cerrar cada ficha con observaciones del cliente."
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-lg font-semibold text-zinc-900">Perfil profesional</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <p className="flex items-center gap-2">
                <UserRound size={16} />
                Alejandro Ruiz · Barber Senior
              </p>
              <p className="flex items-center gap-2">
                <Sparkles size={16} />
                Especialista en fade, barba y acabados premium
              </p>
              <p className="flex items-center gap-2">
                <Clock3 size={16} />
                Horario de hoy: 9:00 AM - 6:00 PM
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  icon,
  detail,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  detail: string;
}) {
  return (
    <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-700">{label}</p>
        <div className="rounded-2xl bg-white p-2 text-zinc-700">{icon}</div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">{value}</p>
      <p className="mt-2 text-sm text-zinc-600">{detail}</p>
    </article>
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
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4">
      <div className="flex items-center gap-2 text-zinc-800">
        {icon}
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <p className="mt-2 text-sm text-zinc-600">{detail}</p>
    </div>
  );
}

function getDemandClassName(demand: string) {
  if (demand === "Top seller") {
    return "bg-amber-100 text-amber-900";
  }

  if (demand === "Alta demanda") {
    return "bg-sky-100 text-sky-900";
  }

  return "bg-emerald-100 text-emerald-900";
}

function getAppointmentStatusClassName(status: Appointment["status"]) {
  if (status === "En curso") {
    return "bg-amber-100 text-amber-900";
  }

  if (status === "Confirmada") {
    return "bg-emerald-100 text-emerald-900";
  }

  return "bg-sky-100 text-sky-900";
}
