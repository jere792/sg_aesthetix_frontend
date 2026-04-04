import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { getThemeSettingsByTenantId } from "@/lib/theme/get-theme-settings";
import { resolveTenantBySlug } from "@/lib/tenant/resolve-tenant";

type PublicLandingLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Omit<PublicLandingLayoutProps, "children">): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await resolveTenantBySlug(slug);
  const theme = await getThemeSettingsByTenantId(tenant.tenantId);

  return {
    title: `${theme.brandName} | Barbería`,
    description: `Sitio público de ${theme.brandName}: información, servicios, equipo y reservas en línea.`,
  };
}

export default async function PublicLandingLayout({
  children,
  params,
}: PublicLandingLayoutProps) {
  const { slug } = await params;
  const tenant = await resolveTenantBySlug(slug);
  const theme = await getThemeSettingsByTenantId(tenant.tenantId);

  const themeVariables: CSSProperties = {
    ["--tenant-primary" as string]: theme.primaryColor,
    ["--tenant-accent" as string]: theme.accentColor,
    ["--tenant-background" as string]: theme.backgroundColor,
    ["--tenant-surface" as string]: theme.surfaceColor,
    ["--tenant-text" as string]: theme.textColor,
    ["--tenant-muted" as string]: theme.mutedTextColor,
  };

  const basePath = `/${tenant.slug}`;

  return (
    <div
      style={themeVariables}
      className="min-h-screen bg-[var(--tenant-background)] text-[var(--tenant-text)]"
    >
      <header className="sticky top-0 z-10 border-b border-black/10 bg-[var(--tenant-surface)]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href={basePath} className="text-lg font-semibold tracking-tight">
            {theme.brandName}
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href={basePath} className="hover:opacity-70">
              Inicio
            </Link>
            <Link href={`${basePath}/galeria`} className="hover:opacity-70">
              Galería
            </Link>
            <Link
              href={`${basePath}/reservar`}
              className="rounded-full bg-[var(--tenant-primary)] px-4 py-2 text-white"
            >
              Reservar
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>

      <footer className="mt-auto border-t border-black/10 bg-[var(--tenant-surface)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-[var(--tenant-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {theme.brandName}</p>
          <p>Barbería premium · Reservas online</p>
        </div>
      </footer>
    </div>
  );
}