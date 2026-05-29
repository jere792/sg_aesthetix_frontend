import type { ReactNode } from "react";

type ModulePageShellProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function ModulePageShell({
  title,
  description,
  actions,
  children,
}: ModulePageShellProps) {
  return (
    <section className="space-y-5">
      <header className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Administracion
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>
          </div>
          {actions}
        </div>
      </header>

      {children}
    </section>
  );
}
