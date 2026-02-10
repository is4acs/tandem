import AdminEventList from "@/components/admin/AdminEventList";

export default function AdminEvenementsPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-bistro/10 bg-chalk p-5 shadow-sm sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mountain-dark">Evenements</p>
        <h1 className="mt-1 font-heading text-3xl text-bistro sm:text-4xl">Programmation</h1>
        <p className="mt-2 text-sm text-slate">
          Ajoute, modifie et organise les dates a venir affichees sur le site.
        </p>
      </header>
      <AdminEventList />
    </div>
  );
}
