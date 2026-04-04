import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Briefcase,
  Building2,
  Calendar,
  CalendarCheck,
  Heart,
  Image,
  KeyRound,
  Scissors,
  User,
  UserPlus,
  Users,
  AlertTriangle,
} from "lucide-react";

const kpis = [
  { label: "Negocios activos", value: "12", icon: Users },
  { label: "Citas hoy", value: "48", icon: CalendarCheck },
  { label: "Clientes registrados", value: "1,284", icon: UserPlus },
  { label: "Productos por terminarse", value: "7", icon: AlertTriangle },
];

const modules = [
  {
    title: "Acceso y seguridad",
    desc: "Gestiona usuarios internos, roles, contrasenas y sesiones activas.",
    href: "/admin/acceso-seguridad",
    icon: KeyRound,
  },
  {
    title: "Servicios",
    desc: "Crea y organiza los servicios que ofreces.",
    href: "/admin/servicios",
    icon: Scissors,
  },
  {
    title: "Equipo de trabajo",
    desc: "Administra empleados, horarios y rendimiento.",
    href: "/admin/empleados",
    icon: Briefcase,
  },
  {
    title: "Agenda",
    desc: "Visualiza y gestiona citas de tus clientes.",
    href: "/admin/agenda",
    icon: Calendar,
  },
  {
    title: "Clientes",
    desc: "Consulta historial, preferencias y ficha completa de cada cliente.",
    href: "/admin/clientes",
    icon: User,
  },
  {
    title: "Fidelizacion",
    desc: "Activa beneficios, puntos y campanas para clientes recurrentes.",
    href: "/admin/fidelizacion",
    icon: Heart,
  },
  {
    title: "Inventario",
    desc: "Controla productos, stock y movimientos.",
    href: "/admin/inventario",
    icon: Boxes,
  },
  {
    title: "Galeria",
    desc: "Organiza el contenido visual que se muestra en el sitio publico.",
    href: "/admin/galeria",
    icon: Image,
  },
  {
    title: "Negocio",
    desc: "Gestiona datos generales, plan y estado operativo del tenant.",
    href: "/admin/configuracion/empresa",
    icon: Building2,
  },
];

export default function AdminHomePage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-fuchsia-50 p-6 shadow-sm">
        <p className="text-sm text-zinc-500">Bienvenido de nuevo</p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-900">Resumen del negocio</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Aqui tienes un vistazo rapido de lo que esta pasando hoy.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <article
              key={kpi.label}
              className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="rounded-xl bg-gradient-to-br from-sky-100 to-fuchsia-100 p-3">
                <Icon size={20} className="text-zinc-700" />
              </div>

              <div>
                <p className="text-sm text-zinc-500">{kpi.label}</p>
                <p className="text-2xl font-bold text-zinc-900">{kpi.value}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Modulos
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
              Accesos rapidos del panel
            </h2>
          </div>
          <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
            {modules.length} modulos
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 p-2">
                    <Icon size={18} className="text-zinc-700" />
                  </div>

                  <h2 className="text-lg font-semibold text-zinc-900">{module.title}</h2>
                </div>

                <p className="mt-3 text-sm text-zinc-600">{module.desc}</p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  Ir al modulo
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
