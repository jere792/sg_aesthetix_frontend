"use client";

import { useState } from "react";
import { Building2, PencilLine, Plus, Trash2 } from "lucide-react";
import { ConfirmationModal } from "@/components/dashboard/confirmation-modal";

type BusinessRecord = {
  id: string;
  name: string;
  link: string;
  category: string;
  status: "Activo" | "Inactivo";
};

const initialBusinesses: BusinessRecord[] = [
  { id: "barberia-central", name: "Barberia Central", link: "barberia-central", category: "Barberia", status: "Activo" },
  { id: "gentlemen-cut", name: "Gentlemen Cut", link: "gentlemen-cut", category: "Barberia", status: "Inactivo" },
];

const emptyDraft: BusinessRecord = {
  id: "",
  name: "",
  link: "",
  category: "Barberia",
  status: "Activo",
};

const inputClassName =
  "w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--foreground)]";

export function BusinessManagement() {
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [selectedId, setSelectedId] = useState(initialBusinesses[0]?.id ?? "");
  const [draft, setDraft] = useState(initialBusinesses[0] ?? emptyDraft);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const selectedBusiness = businesses.find((business) => business.id === selectedId);

  const handleSelect = (business: BusinessRecord) => {
    setSelectedId(business.id);
    setDraft(business);
  };

  const handleCreateMode = () => {
    setSelectedId("");
    setDraft(emptyDraft);
  };

  const handleSave = () => {
    if (!draft.name || !draft.link) {
      return;
    }

    if (!selectedId) {
      const nextBusiness = { ...draft, id: slugify(draft.link) };
      setBusinesses((current) => [nextBusiness, ...current]);
      setSelectedId(nextBusiness.id);
      setDraft(nextBusiness);
      return;
    }

    setBusinesses((current) =>
      current.map((business) => (business.id === selectedId ? { ...draft, id: selectedId } : business)),
    );
  };

  const handleDelete = () => {
    if (!selectedId) {
      return;
    }

    const nextBusinesses = businesses.filter((business) => business.id !== selectedId);
    setBusinesses(nextBusinesses);

    if (nextBusinesses.length === 0) {
      setSelectedId("");
      setDraft(emptyDraft);
      return;
    }

    setSelectedId(nextBusinesses[0].id);
    setDraft(nextBusinesses[0]);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.95fr]">
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCreateMode}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--button-primary)] px-4 py-2 text-sm font-semibold text-[var(--button-primary-foreground)] transition hover:opacity-90"
          >
            <Plus size={16} />
            Nuevo negocio
          </button>
        </div>

        <div className="grid gap-4">
          {businesses.map((business) => (
            <article
              key={business.id}
              onClick={() => handleSelect(business)}
              className={`cursor-pointer rounded-3xl border p-5 shadow-sm transition ${
                selectedId === business.id
                  ? "border-[var(--hover)]/30 bg-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--background-secondary)] hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-[var(--foreground)]">{business.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{business.link}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${business.status === "Activo" ? "bg-[var(--hover)]/15 text-[var(--hover)]" : "bg-[var(--background)] text-[var(--foreground)]"}`}>
                  {business.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[var(--background-secondary)] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Rubro</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{business.category}</p>
                </div>
                <div className="rounded-2xl bg-[var(--background-secondary)] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Enlace</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{business.id}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--background-secondary)] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[var(--background)] p-3">
              <Building2 size={18} className="text-[var(--foreground)]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {selectedId ? "Editar negocio" : "Crear negocio"}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Cambia los datos principales de forma simple.</p>
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
            <Field label="Enlace">
              <input
                className={inputClassName}
                value={draft.link}
                onChange={(event) => setDraft((current) => ({ ...current, link: event.target.value }))}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Rubro">
                <select
                  className={inputClassName}
                  value={draft.category}
                  onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
                >
                  <option>Barberia</option>
                  <option>Salon</option>
                  <option>Estetica</option>
                </select>
              </Field>
              <Field label="Estado">
                <select
                  className={inputClassName}
                  value={draft.status}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      status: event.target.value as BusinessRecord["status"],
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
              onClick={() => setIsConfirmOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--button-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--button-primary-foreground)] transition hover:opacity-90"
            >
              <PencilLine size={16} />
              {selectedId ? "Guardar negocio" : "Crear negocio"}
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteConfirmOpen(true)}
              disabled={!selectedBusiness}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--destructive-border)] px-5 py-2.5 text-sm font-semibold text-[var(--destructive)] transition enabled:hover:bg-[var(--destructive-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
        </div>
      </aside>

      <ConfirmationModal
        open={isConfirmOpen}
        title={selectedId ? "Confirmar cambios" : "Confirmar nuevo negocio"}
        description={
          selectedId
            ? "Se guardaran los cambios hechos en este negocio."
            : "Se creara un nuevo negocio con los datos que llenaste."
        }
        confirmLabel={selectedId ? "Si, guardar" : "Si, crear"}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          handleSave();
          setIsConfirmOpen(false);
        }}
      />

      <ConfirmationModal
        open={isDeleteConfirmOpen}
        title="Confirmar eliminacion"
        description="Este negocio se eliminara de la lista actual."
        confirmLabel="Si, eliminar"
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => {
          handleDelete();
          setIsDeleteConfirmOpen(false);
        }}
      />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-[var(--foreground)]">{label}</span>
      {children}
    </label>
  );
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}
