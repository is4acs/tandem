"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

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
      if (!res.ok) { setError("Mot de passe incorrect"); setLoading(false); return; }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erreur de connexion");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-terracotta font-bold mb-2">Le Tandem</h1>
          <p className="text-wood-light">Espace administration</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gold/10">
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-wood mb-1">Mot de passe</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-gold/30 bg-cream focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta text-wood" placeholder="Entrez le mot de passe" />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
