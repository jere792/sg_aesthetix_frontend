"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AppointmentsService } from "@/services/appointments.service";

type BookingOption = {
  id: string;
  name: string;
  duration: string;
  price: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
};

type CalendarDate = {
  value: string;
  weekday: string;
  day: string;
  month: string;
  monthLabel: string;
  label: string;
};

type BookingFormProps = {
  businessName: string;
  services: BookingOption[];
  barbers: TeamMember[];
  availableDates: CalendarDate[];
  availableSlots: string[];
};

type BookingDraft = {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
};

const initialDraft: BookingDraft = {
  serviceId: "",
  barberId: "",
  date: "",
  time: "",
  customerName: "",
  phone: "",
  email: "",
};

const inputClassName =
  "w-full border border-black/10 bg-white px-4 py-3 text-sm text-[var(--tenant-text)] outline-none transition placeholder:text-[var(--tenant-muted)] focus:border-black focus:ring-0";

const calendarWeekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function BookingForm({
  businessName,
  services,
  barbers,
  availableDates,
  availableSlots,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingDraft>({
    ...initialDraft,
    serviceId: services[0]?.id ?? "",
    barberId: barbers[0]?.id ?? "",
    date: availableDates[0]?.value ?? "",
    time: availableSlots[0] ?? "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const monthOptions = useMemo(() => {
    const groupedMonths = new Map
      <string,{
        key: string;
        label: string;
        year: number;
        month: number;
        firstDay: number;
        totalDays: number;
        datesByDay: Map<number, CalendarDate>;
      }
    >();

    availableDates.forEach((date) => {
      const parsedDate = parseCalendarDate(date.value);
      const year = parsedDate.getFullYear();
      const month = parsedDate.getMonth();
      const key = `${year}-${String(month + 1).padStart(2, "0")}`;

      if (!groupedMonths.has(key)) {
        groupedMonths.set(key, {
          key,
          label: date.monthLabel,
          year,
          month,
          firstDay: new Date(year, month, 1).getDay(),
          totalDays: new Date(year, month + 1, 0).getDate(),
          datesByDay: new Map<number, CalendarDate>(),
        });
      }

      groupedMonths.get(key)?.datesByDay.set(parsedDate.getDate(), date);
    });

    return Array.from(groupedMonths.values()).sort((left, right) =>
      left.key.localeCompare(right.key),
    );
  }, [availableDates]);

  const [activeMonthKey, setActiveMonthKey] = useState(() => monthOptions[0]?.key ?? "");

  const selectedService = useMemo(
    () => services.find((service) => service.id === formData.serviceId),
    [formData.serviceId, services],
  );

  const selectedDate = useMemo(
    () => availableDates.find((date) => date.value === formData.date),
    [availableDates, formData.date],
  );

  const selectedMonthKey = selectedDate
    ? buildMonthKey(parseCalendarDate(selectedDate.value))
    : "";

  const activeMonth = useMemo(
    () =>
      monthOptions.find((month) => month.key === activeMonthKey) ??
      monthOptions.find((month) => month.key === selectedMonthKey) ??
      monthOptions[0],
    [activeMonthKey, monthOptions, selectedMonthKey],
  );

  const calendarCells = useMemo(() => {
    if (!activeMonth) return [];

    return Array.from(
      { length: activeMonth.firstDay + activeMonth.totalDays },
      (_, index) => {
        if (index < activeMonth.firstDay) return null;
        const dayNumber = index - activeMonth.firstDay + 1;
        const availableDate = activeMonth.datesByDay.get(dayNumber);
        return { dayNumber, availableDate };
      },
    );
  }, [activeMonth]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setIsSubmitted(false);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const exactService = services.find((s) => s.id === formData.serviceId);
      const exactBarber = barbers.find((b) => b.id === formData.barberId);

      const serviceId = exactService?.id ?? "";
      const employeeId = exactBarber?.id ?? "";
      const duration = exactService?.duration ?? "30 min";
      const endTimeHHMM = calculateEndTime(formData.time, duration);

      const payload = {
        id: crypto.randomUUID(),
        customerId: crypto.randomUUID(),
        serviceId,
        employeeId,
        reservationDate: formData.date,
        startTime: `${formData.time}:00`,
        endTime: `${endTimeHHMM}:00`,
        channel: "landing",
        status: "pendiente",
        notes: `Nombre: ${formData.customerName} | Tel: ${formData.phone} | Email: ${formData.email}`,
      };

      await AppointmentsService.createPublic(businessName, payload);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-px bg-neutral-200 xl:grid-cols-[1.2fr_0.72fr]">
      {/* ── FORMULARIO ─────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-0 bg-white">

        {/* Encabezado */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 px-8 py-8">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Reserva online
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Elige tu fecha y hora</h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Confirmación rápida, sin esperas ni llamadas.
            </p>
          </div>
          <div className="border border-black/10 bg-neutral-50 px-4 py-3">
            <p className="text-sm font-bold uppercase tracking-tight">{businessName}</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-widest text-neutral-400">
              Agenda visual
            </p>
          </div>
        </div>

        {/* Banner éxito */}
        {isSubmitted && (
          <div className="flex items-start gap-3 border-b border-black/10 bg-neutral-900 px-8 py-5 text-white">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="text-sm font-bold uppercase tracking-tight">¡Turno confirmado!</p>
              <p className="mt-1 text-[11px] text-white/60">
                Reserva registrada para el {selectedDate?.label ?? "día elegido"} a las{" "}
                {formData.time}. Te esperamos.
              </p>
            </div>
          </div>
        )}

        {/* ── PASO 1 · Servicio ─────────────────────────────────────── */}
        <div className="border-b border-black/10 px-8 py-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-black text-[10px] font-bold text-white">
              1
            </div>
            <p className="text-sm font-bold uppercase tracking-tight">Servicio</p>
          </div>

          <div className="grid gap-px bg-neutral-200">
            {services.map((service) => {
              const isActive = formData.serviceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setFormData((c) => ({ ...c, serviceId: service.id }));
                    setIsSubmitted(false);
                  }}
                  className={`flex items-center justify-between px-5 py-4 text-left transition ${
                    isActive ? "bg-neutral-900 text-white" : "bg-white hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 shrink-0 ${
                        isActive ? "bg-white" : "border border-black/20 bg-transparent"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-tight">{service.name}</p>
                      <p
                        className={`mt-0.5 text-[9px] uppercase tracking-widest ${
                          isActive ? "text-white/40" : "text-neutral-400"
                        }`}
                      >
                        {service.duration}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-base font-black tracking-tight ${
                      isActive ? "text-white" : "text-[var(--tenant-primary)]"
                    }`}
                  >
                    {service.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PASO 2 · Calendario ───────────────────────────────────── */}
        <div className="border-b border-black/10 px-8 py-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-black text-[10px] font-bold text-white">
              2
            </div>
            <p className="text-sm font-bold uppercase tracking-tight">Fecha</p>
          </div>

          {/* Selector de mes */}
          <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-4">
            <p className="text-sm font-bold uppercase tracking-tight">
              {activeMonth?.label ?? ""}
            </p>
            <div className="flex gap-px">
              {monthOptions.map((month) => {
                const isActive = month.key === activeMonth?.key;
                return (
                  <button
                    key={month.key}
                    type="button"
                    onClick={() => setActiveMonthKey(month.key)}
                    className={`px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest transition ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-black"
                    }`}
                  >
                    {month.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grilla de días */}
          <div className="grid grid-cols-7 gap-px bg-neutral-200">
            {calendarWeekdays.map((wd) => (
              <div
                key={wd}
                className="bg-neutral-50 py-2 text-center text-[9px] font-semibold uppercase tracking-widest text-neutral-400"
              >
                {wd}
              </div>
            ))}

            {calendarCells.map((cell, index) => {
              if (!cell) {
                return <div key={`empty-${index}`} className="bg-white" />;
              }

              const isActive = formData.date === cell.availableDate?.value;
              const isAvailable = Boolean(cell.availableDate);

              return (
                <button
                  key={cell.availableDate?.value ?? `day-${cell.dayNumber}`}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => {
                    if (!cell.availableDate) return;
                    setFormData((c) => ({
                      ...c,
                      date: cell.availableDate?.value ?? c.date,
                    }));
                    setIsSubmitted(false);
                  }}
                  className={`flex aspect-square items-center justify-center text-xs font-bold transition ${
                    isActive
                      ? "bg-black text-white"
                      : isAvailable
                        ? "bg-white text-black hover:bg-neutral-100"
                        : "bg-white text-neutral-200 cursor-default"
                  }`}
                >
                  {String(cell.dayNumber).padStart(2, "0")}
                </button>
              );
            })}
          </div>

          {/* Dot disponible */}
          <p className="mt-3 text-[9px] uppercase tracking-widest text-neutral-400">
            {availableSlots.length} horarios disponibles ·{" "}
            {selectedDate?.label ?? "Selecciona un día"}
          </p>
        </div>

        {/* ── PASO 3 · Horario ──────────────────────────────────────── */}
        <div className="border-b border-black/10 px-8 py-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-black text-[10px] font-bold text-white">
              3
            </div>
            <p className="text-sm font-bold uppercase tracking-tight">Horario</p>
          </div>

          <div className="grid grid-cols-3 gap-px bg-neutral-200 sm:grid-cols-4 lg:grid-cols-6">
            {availableSlots.map((slot) => {
              const isActive = formData.time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setFormData((c) => ({ ...c, time: slot }));
                    setIsSubmitted(false);
                  }}
                  className={`py-3 text-center text-xs font-bold uppercase tracking-wide transition ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "bg-white text-black hover:bg-neutral-50"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PASO 4 · Datos ────────────────────────────────────────── */}
        <div className="px-8 py-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-black text-[10px] font-bold text-white">
              4
            </div>
            <p className="text-sm font-bold uppercase tracking-tight">Datos de contacto</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                Nombre completo
              </span>
              <input
                required
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className={inputClassName}
              />
            </label>

            <label className="space-y-2">
              <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                Teléfono
              </span>
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
              <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                Email
              </span>
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
          </div>

          {/* Submit */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
            <p className="text-[10px] uppercase tracking-widest text-neutral-400">
              Al confirmar, tu turno se agendará en nuestro sistema.
            </p>
            <div className="flex flex-col items-end gap-2">
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className="bg-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition hover:opacity-75 disabled:opacity-40"
              >
                {isLoading ? "Procesando..." : isSubmitted ? "¡Confirmado!" : "Confirmar turno"}
              </button>
              {error && (
                <span className="text-[10px] font-semibold uppercase tracking-wide text-red-500">
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* ── SIDEBAR · Resumen ──────────────────────────────────────── */}
      <aside className="bg-neutral-50">
        <div className="xl:sticky xl:top-6">

          <div className="border-b border-black/10 px-6 py-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Resumen
            </p>
            <h2 className="mt-2 text-xl font-bold uppercase tracking-tight">Tu cita</h2>
          </div>

          {/* Filas de resumen */}
          <div className="divide-y divide-black/10">
            <SummaryRow label="Servicio" value={selectedService?.name ?? "Pendiente"} />
            <SummaryRow
              label="Profesional"
              value={barbers.find((b) => b.id === formData.barberId)?.name ?? "Pendiente"}
            />
            <SummaryRow label="Fecha" value={selectedDate?.label ?? "Pendiente"} />
            <SummaryRow label="Hora" value={formData.time || "Pendiente"} />
          </div>

          {/* Precio */}
          <div className="bg-neutral-900 px-6 py-6 text-white">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-white/40">
              Inversión
            </p>
            <p className="mt-2 text-4xl font-black tracking-tight">
              {selectedService?.price ?? "--"}
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-widest text-white/40">
              {selectedService?.duration ?? "Sin duración"}
            </p>
          </div>

          {/* Selección de profesional */}
          <div className="px-6 py-6">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
              Profesional
            </p>
            <div className="grid gap-px bg-neutral-200">
              {barbers.map((barber) => {
                const isActive = formData.barberId === barber.id;
                return (
                  <button
                    key={barber.id}
                    type="button"
                    onClick={() => {
                      setFormData((c) => ({ ...c, barberId: barber.id }));
                      setIsSubmitted(false);
                    }}
                    className={`px-4 py-3 text-left transition ${
                      isActive ? "bg-neutral-900 text-white" : "bg-white hover:bg-neutral-50"
                    }`}
                  >
                    <p className="text-sm font-bold uppercase tracking-tight">{barber.name}</p>
                    <p
                      className={`mt-0.5 text-[9px] uppercase tracking-widest ${
                        isActive ? "text-white/40" : "text-neutral-400"
                      }`}
                    >
                      {barber.role}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">{label}</p>
      <p className="text-sm font-bold uppercase tracking-tight">{value}</p>
    </div>
  );
}

function parseCalendarDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function buildMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function calculateEndTime(startTime: string, durationString: string): string {
  if (!startTime) return "";
  const minutesToAdd = parseInt(durationString.replace(/\D/g, "")) || 30;
  const [hours, minutes] = startTime.split(":").map(Number);
  const dateObj = new Date();
  dateObj.setHours(hours, minutes + minutesToAdd);
  return `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
}