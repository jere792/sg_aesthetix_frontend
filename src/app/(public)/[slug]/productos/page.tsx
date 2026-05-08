import Link from "next/link";

type ProductosPageProps = {
  params: Promise<{ slug: string }>;
};

const products = [
  {
    name: "Pomada Mate",
    category: "Fijación",
    price: "$12",
    description: "Fijación fuerte, acabado mate sin brillo. Ideal para cortes texturizados.",
    badge: "Más vendido",
    featured: true,
  },
  {
    name: "Aceite de Barba",
    category: "Barba",
    price: "$18",
    description: "Hidrata, suaviza y da brillo natural a tu barba. Aroma a cedro y menta.",
    badge: null,
    featured: false,
  },
  {
    name: "Crema de Afeitar",
    category: "Afeitado",
    price: "$10",
    description: "Espuma densa para un deslizamiento suave. Con aloe vera y vitamina E.",
    badge: null,
    featured: false,
  },
  {
    name: "Cera Moldeable",
    category: "Fijación",
    price: "$14",
    description: "Control flexible todo el día. Fijación media con acabado natural.",
    badge: "Nuevo",
    featured: false,
  },
  {
    name: "Loción Post-Afeitado",
    category: "Afeitado",
    price: "$16",
    description: "Calma la irritación y refresca la piel al instante después del afeitado.",
    badge: null,
    featured: false,
  },
  {
    name: "Shampoo para Barba",
    category: "Barba",
    price: "$13",
    description: "Limpieza profunda sin resecar. Mantiene la barba suave y sin caspa.",
    badge: null,
    featured: false,
  },
];

const categories = ["Todos", "Fijación", "Barba", "Afeitado"];

export default async function ProductosPage({ params }: ProductosPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-10">

      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--tenant-muted)]">
            Tienda
          </p>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">
            Productos
          </h1>
          <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-[var(--tenant-muted)]">
            Todo lo que usamos en el local, disponible para llevarte a casa.
          </p>
        </div>

        {/* Filtros categoría */}
        <div className="flex flex-wrap gap-[2px]">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition ${
                i === 0
                  ? "bg-[var(--tenant-primary)] text-white"
                  : "bg-[var(--tenant-surface)] text-[var(--tenant-muted)] hover:bg-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-[2px] sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--tenant-border, #e5e5e5)" }}>
        {products.map((product, index) => (
          <article
            key={index}
            className={`group relative flex flex-col justify-between p-8 transition hover:-translate-y-px ${
              product.featured
                ? "bg-neutral-900 text-white"
                : "bg-[var(--tenant-surface)]"
            }`}
          >
            {/* Badge */}
            {product.badge && (
              <span
                className={`absolute right-6 top-6 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                  product.featured
                    ? "bg-[var(--tenant-primary)] text-white"
                    : "bg-[var(--tenant-primary)] text-white"
                }`}
              >
                {product.badge}
              </span>
            )}

            {/* Número decorativo */}
            <span
              className={`absolute bottom-6 right-6 font-black leading-none ${
                product.featured ? "text-white/5" : "text-black/5"
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "80px" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="space-y-4">
              {/* Categoría */}
              <p
                className={`text-[9px] font-semibold uppercase tracking-[0.22em] ${
                  product.featured ? "text-[var(--tenant-primary)]" : "text-[var(--tenant-muted)]"
                }`}
              >
                {product.category}
              </p>

              {/* Nombre */}
              <h2
                className={`text-2xl font-black uppercase tracking-tight ${
                  product.featured ? "text-white" : "text-neutral-900"
                }`}
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px,3vw,30px)" }}
              >
                {product.name}
              </h2>

              {/* Descripción */}
              <p
                className={`text-sm font-light leading-relaxed ${
                  product.featured ? "text-white/55" : "text-[var(--tenant-muted)]"
                }`}
              >
                {product.description}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-end justify-between">
              <span
                className={`font-black leading-none ${
                  product.featured ? "text-white" : "text-[var(--tenant-primary)]"
                }`}
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "44px" }}
              >
                {product.price}
              </span>

              <button
                className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition ${
                  product.featured
                    ? "bg-white text-black hover:bg-neutral-200"
                    : "bg-neutral-900 text-white hover:bg-neutral-700"
                }`}
              >
                Agregar
              </button>
            </div>
          </article>
        ))}
      </div>
     

      {/* Volver */}
      <Link
        href={`/${slug}`}
        className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--tenant-muted)] transition hover:text-[var(--tenant-primary)]"
      >
        {"← Volver al inicio"}
      </Link>

    </section>
  );
}