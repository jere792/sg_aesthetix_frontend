"use client";

import { useState } from "react";
import { Building2, PencilLine, Plus, Trash2 } from "lucide-react";

type TenantRecord = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  status: "Activo" | "Inactivo";
};

const initialTenants: TenantRecord[] = [
  { id: "tenant-01", name: "Barberia Central", slug: "barberia-central", plan: "PRO", status: "Activo" },
  { id: "tenant-02", name: "Gentlemen Cut", slug: "gentlemen-cut", plan: "BASIC", status: "Inactivo" },
];

const emptyDraft: TenantRecord = {
  id: "",
  name: "",
  slug: "",
  plan: "BASIC",
  status: "Activo",
};

const inputClassName =
  "w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900";

export function BusinessManagement() {
  const [tenants, setTenants] = useState(initialTenants);
  const [selectedId, setSelectedId] = useState(initialTenants[0]?.id ?? "");
  const [draft, setDraft] = useState(initialTenants[0] ?? emptyDraft);

  const selectedTenant = tenants.find((tenant) => tenant.id === selectedId);

  const handleSelect = (tenant: TenantRecord) => {
    setSelectedId(tenant.id);
    setDraft(tenant);
  };

  const handleCreateMode = () => {
    setSelectedId("");
    setDraft(emptyDraft);
  };

  const handleSave = () => {
    if (!draft.name || !draft.slug) {
      return;
    }

    if (!selectedId) {
      const nextTenant = { ...draft, id: slugify(draft.slug) };
      setTenants((current) => [nextTenant, ...current]);
      setSelectedId(nextTenant.id);
      setDraft(nextTenant);
      return;
    }

    setTenants((current) =>
      current.map((tenant) => (tenant.id === selectedId ? { ...draft, id: selectedId } : tenant)),
    );
  };

  const handleDelete = () => {
    if (!selectedId) {
      return;
    }

    const nextTenants = tenants.filter((tenant) => tenant.id !== selectedId);
    setTenants(nextTenants);

    if (nextTenants.length === 0) {
      setSelectedId("");
      setDraft(emptyDraft);
      return;
    }

    setSelectedId(nextTenants[0].id);
    setDraft(nextTenants[0]);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.95fr]">
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCreateMode}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            <Plus size={16} />
            Nuevo tenant
          </button>
        </div>

        <div className="grid gap-4">
          {tenants.map((tenant) => (
            <article
              key={tenant.id}
              onClick={() => handleSelect(tenant)}
              className={`cursor-pointer rounded-3xl border p-5 shadow-sm transition ${
                selectedId === tenant.id
                  ? "border-violet-300 bg-gradient-to-br from-violet-50 to-fuchsia-50"
                  : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-zinc-900">{tenant.name}</p>
                  <p className="mt-1 text-sm text-zinc-600">{tenant.slug}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tenant.status === "Activo" ? "bg-emerald-100 text-emerald-900" : "bg-zinc-100 text-zinc-700"}`}>
                  {tenant.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Plan</p>
                  <p className="mt-2 text-sm font-semibold text-zinc-900">{tenant.plan}</p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Tenant ID</p>
                  <p className="mt-2 text-sm font-semibold text-zinc-900">{tenant.id}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-zinc-100 p-3">
              <Building2 size={18} className="text-zinc-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                {selectedId ? "Editar tenant" : "Crear tenant"}
              </p>
              <p className="text-sm text-zinc-600">CRUD visual listo para integrarse con backend.</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <Field label="Nombre">
              <input
                className={inputClassName}
                value={draft.name}
                onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              />
            </Field>
            <Field label="Slug">
              <input
                className={inputClassName}
                value={draft.slug}
                onChange={(event) => setDraft((current) => ({ ...current, slug: event.target.value }))}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Plan">
                <select
                  className={inputClassName}
                  value={draft.plan}
                  onChange={(event) => setDraft((current) => ({ ...current, plan: event.target.value }))}
                >
                  <option>BASIC</option>
                  <option>PRO</option>
                  <option>ENTERPRISE</option>
                </select>
              </Field>
              <Field label="Estado">
                <select
                  className={inputClassName}
                  value={draft.status}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      status: event.target.value as TenantRecord["status"],
                    }))
                  }
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </Field>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <PencilLine size={16} />
              {selectedId ? "Guardar tenant" : "Crear tenant"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={!selectedTenant}
              className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-700 transition enabled:hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
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

function slugify(value: string) {
  return `tenant-${value.toLowerCase().trim().replace(/\s+/g, "-")}`;
}
