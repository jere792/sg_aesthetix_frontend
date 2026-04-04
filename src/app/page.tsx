import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Frontend barberia listo para landing multi-tenant</h1>
      <p className="max-w-xl text-sm text-zinc-600">
        Para ver una landing publica basica entra a un slug, o prueba los paneles internos.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/demo-barber" className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">
          Abrir /demo-barber
        </Link>
        <Link href="/admin" className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900">
          Abrir /admin
        </Link>
        <Link href="/empleado" className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900">
          Abrir /empleado
        </Link>
      </div>
    </main>
  );
}
