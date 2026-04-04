"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Boxes, PackagePlus, Search, TrendingDown, TrendingUp } from "lucide-react";

type InventoryItem = {
  sku: string;
  product: string;
  category: string;
  stock: number;
  minStock: number;
  supplier: string;
  lastMovement: string;
};

const initialInventory: InventoryItem[] = [
  {
    sku: "EST-001",
    product: "Cera mate",
    category: "Estilizado",
    stock: 12,
    minStock: 10,
    supplier: "Studio Pro",
    lastMovement: "-4 hoy",
  },
  {
    sku: "LAV-003",
    product: "Shampoo detox",
    category: "Lavado",
    stock: 4,
    minStock: 8,
    supplier: "Hair Lab",
    lastMovement: "-2 ayer",
  },
  {
    sku: "HER-011",
    product: "Navajas",
    category: "Herramientas",
    stock: 22,
    minStock: 15,
    supplier: "Blade House",
    lastMovement: "+10 esta semana",
  },
];

const emptyDraft: InventoryItem = {
  sku: "",
  product: "",
  category: "",
  stock: 0,
  minStock: 0,
  supplier: "",
  lastMovement: "",
};

const inputClassName =
  "w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900";

export function InventoryManagement() {
  const [inventory, setInventory] = useState(initialInventory);
  const [query, setQuery] = useState("");
  const [selectedSku, setSelectedSku] = useState(initialInventory[0]?.sku ?? "");
  const [draft, setDraft] = useState(initialInventory[0] ?? emptyDraft);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      return (
        item.product.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.sku.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [inventory, query]);

  const selectedItem = inventory.find((item) => item.sku === selectedSku);

  const saveItem = () => {
    if (!draft.sku || !draft.product) {
      return;
    }

    if (selectedSku) {
      setInventory((current) => current.map((item) => (item.sku === selectedSku ? draft : item)));
      return;
    }

    setInventory((current) => [draft, ...current]);
    setSelectedSku(draft.sku);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.92fr]">
      <div className="space-y-4">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Control de stock</p>
              <p className="mt-1 text-sm text-zinc-600">
                Gestiona productos, minimos y movimientos con una interfaz ya preparada para API.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedSku("");
                setDraft(emptyDraft);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <PackagePlus size={16} />
              Nuevo item
            </button>
          </div>

          <label className="mt-4 flex items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3">
            <Search size={16} className="text-zinc-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
              placeholder="Buscar por producto, categoria o SKU"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {filteredInventory.map((item) => {
            const lowStock = item.stock <= item.minStock;

            return (
              <article
                key={item.sku}
                className={`rounded-3xl border bg-white p-5 shadow-sm transition ${
                  selectedSku === item.sku
                    ? "border-zinc-900 shadow-md"
                    : "border-zinc-200 hover:-translate-y-1 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-zinc-900">{item.product}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {item.category}
                    </p>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                    {item.sku}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-zinc-600">
                  <p className="flex items-center gap-2">
                    <Boxes size={15} />
                    Stock actual: {item.stock}
                  </p>
                  <p className="flex items-center gap-2">
                    {lowStock ? <TrendingDown size={15} /> : <TrendingUp size={15} />}
                    Minimo: {item.minStock}
                  </p>
                </div>

                {lowStock ? (
                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-amber-50 px-3 py-3 text-sm text-amber-900">
                    <AlertTriangle size={16} />
                    Requiere reposicion
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSku(item.sku);
                    setDraft(item);
                  }}
                  className="mt-5 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                >
                  Editar item
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">
            {selectedSku ? "Editar producto" : "Registrar producto"}
          </p>
          <div className="mt-4 grid gap-3">
            <Field label="SKU">
              <input
                className={inputClassName}
                value={draft.sku}
                onChange={(event) => setDraft((current) => ({ ...current, sku: event.target.value }))}
              />
            </Field>
            <Field label="Producto">
              <input
                className={inputClassName}
                value={draft.product}
                onChange={(event) => setDraft((current) => ({ ...current, product: event.target.value }))}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Categoria">
                <input
                  className={inputClassName}
                  value={draft.category}
                  onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
                />
              </Field>
              <Field label="Proveedor">
                <input
                  className={inputClassName}
                  value={draft.supplier}
                  onChange={(event) => setDraft((current) => ({ ...current, supplier: event.target.value }))}
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Stock actual">
                <input
                  type="number"
                  className={inputClassName}
                  value={draft.stock}
                  onChange={(event) => setDraft((current) => ({ ...current, stock: Number(event.target.value) }))}
                />
              </Field>
              <Field label="Stock minimo">
                <input
                  type="number"
                  className={inputClassName}
                  value={draft.minStock}
                  onChange={(event) => setDraft((current) => ({ ...current, minStock: Number(event.target.value) }))}
                />
              </Field>
            </div>
            <Field label="Ultimo movimiento">
              <input
                className={inputClassName}
                value={draft.lastMovement}
                onChange={(event) => setDraft((current) => ({ ...current, lastMovement: event.target.value }))}
                placeholder="+10 esta semana / -2 hoy"
              />
            </Field>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveItem}
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              {selectedSku ? "Guardar item" : "Crear item"}
            </button>
            <button
              type="button"
              onClick={() => setDraft(selectedItem ?? emptyDraft)}
              className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Restablecer
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">Conexiones esperadas</p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>Listado por tenant y busqueda por SKU</li>
            <li>Mutaciones para entrada, salida y ajuste</li>
            <li>Alertas de stock minimo y auditoria por usuario</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      {children}
    </label>
  );
}
