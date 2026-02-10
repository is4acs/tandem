"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import TandemBike from "@/components/ui/TandemBike";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Mot de passe incorrect");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erreur de connexion");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,rgba(107,163,196,0.16),transparent_50%),linear-gradient(180deg,#f4f1ea_0%,#f8f6f2_100%)] px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 rounded-2xl border border-bistro/10 bg-chalk p-6 text-center shadow-sm">
          <TandemBike className="mx-auto h-9 w-24 text-mountain-dark" />
          <h1 className="mt-2 font-heading text-4xl text-bistro">Le Tandem</h1>
          <p className="mt-1 text-sm text-slate">Espace administration</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-bistro/10 bg-chalk p-6 shadow-sm sm:p-7"
        >
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-bistro">
            Mot de passe admin
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-bistro/20 bg-cream px-4 py-2.5 text-bistro placeholder:text-slate-light focus:border-mountain focus:outline-none focus:ring-2 focus:ring-mountain/20"
            placeholder="Entrez le mot de passe"
          />

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading} className="mt-5 w-full">
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
