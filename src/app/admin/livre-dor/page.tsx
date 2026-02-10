import GuestbookModeration from "@/components/admin/GuestbookModeration";

export default function AdminLivreDorPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-bistro/10 bg-chalk p-5 shadow-sm sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mountain-dark">Livre d&apos;Or</p>
        <h1 className="mt-1 font-heading text-3xl text-bistro sm:text-4xl">Moderation</h1>
        <p className="mt-2 text-sm text-slate">
          Valide les messages clients avant publication, puis masque ou supprime si necessaire.
        </p>
      </header>
      <GuestbookModeration />
    </div>
  );
}
