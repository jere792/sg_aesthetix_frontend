import { KeyRound, LockKeyhole, ShieldCheck, Smartphone, UserCog } from "lucide-react";
import { ModulePageShell } from "@/components/dashboard/module-page-shell";

const users = [
  { name: "Juan Diego", role: "Owner", status: "Activo", lastAccess: "Hoy, 08:12" },
  { name: "Alejandro Ruiz", role: "Administrador", status: "Activo", lastAccess: "Hoy, 07:45" },
  { name: "Sergio Lara", role: "Recepcion", status: "Invitado", lastAccess: "Ayer, 18:20" },
];

const securityControls = [
  {
    title: "Roles y permisos",
    description: "Define que puede ver o editar cada perfil del equipo administrativo.",
    icon: UserCog,
  },
  {
    title: "Politicas de contrasena",
    description: "Configura longitud minima, renovacion periodica y bloqueo por intentos.",
    icon: LockKeyhole,
  },
  {
    title: "Sesiones y dispositivos",
    description: "Revisa sesiones activas y fuerza cierre cuando detectes actividad sospechosa.",
    icon: Smartphone,
  },
  {
    title: "Verificacion adicional",
    description: "Prepara el flujo para doble factor en accesos con privilegios altos.",
    icon: ShieldCheck,
  },
];

export default function AccesoSeguridadPage() {
  return (
    <ModulePageShell
      title="Acceso y seguridad"
      description="Administracion de credenciales internas, roles, sesiones activas y politicas de proteccion para el panel."
      rf={["RF-06", "RF-07", "RF-08", "RF-09", "RF-11", "RF-12"]}
    >
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 bg-gradient-to-r from-sky-50 to-cyan-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Usuarios con acceso</p>
                <p className="text-xs text-zinc-500">Vista inicial para gestionar permisos del panel</p>
              </div>
              <div className="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white">
                {users.length} cuentas
              </div>
            </div>

            <table className="min-w-full text-sm">
              <thead className="bg-white text-left text-zinc-500">
                <tr>
                  <th className="px-4 py-3">Usuario</th>
                  <th className="px-4 py-3">Rol</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Ultimo acceso</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.name} className="border-t border-zinc-100">
                    <td className="px-4 py-3 font-semibold text-zinc-900">{user.name}</td>
                    <td className="px-4 py-3 text-zinc-700">{user.role}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "Activo"
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-amber-100 text-amber-900"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-700">{user.lastAccess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-sky-50 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sky-100 p-3">
                <KeyRound size={18} className="text-zinc-700" />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-900">Resumen operativo</p>
                <p className="text-sm text-zinc-600">
                  Este modulo queda listo para conectar alta de usuarios, restablecimiento de clave y auditoria.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  MFA
                </p>
                <p className="mt-2 text-xl font-bold text-zinc-900">Pendiente</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Politicas
                </p>
                <p className="mt-2 text-xl font-bold text-zinc-900">3 activas</p>
              </div>
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Alertas
                </p>
                <p className="mt-2 text-xl font-bold text-zinc-900">0 criticas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {securityControls.map((control) => {
            const Icon = control.icon;

            return (
              <article
                key={control.title}
                className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-gradient-to-br from-fuchsia-100 to-sky-100 p-3">
                    <Icon size={18} className="text-zinc-700" />
                  </div>
                  <h2 className="text-base font-semibold text-zinc-900">{control.title}</h2>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {control.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </ModulePageShell>
  );
}
