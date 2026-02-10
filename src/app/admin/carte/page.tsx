import AdminMenuList from "@/components/admin/AdminMenuList";

export default function AdminCartePage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-bistro/10 bg-chalk p-5 shadow-sm sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mountain-dark">Carte</p>
        <h1 className="mt-1 font-heading text-3xl text-bistro sm:text-4xl">Gestion des produits</h1>
        <p className="mt-2 text-sm text-slate">
          Un produit en rupture est retire de la carte publique, mais reste ici pour etre remis en ligne rapidement.
        </p>
      </header>
      <AdminMenuList />
    </div>
  );
}
