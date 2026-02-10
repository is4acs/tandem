"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function GuestbookForm() {
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, message, honeypot }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      setStatus("success");
      setNom("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <h3 className="text-lg font-medium text-green-800 mb-1">Merci pour votre message !</h3>
        <p className="text-green-600 text-sm">Il sera publié après validation par notre équipe.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 text-sm text-accent hover:underline">Laisser un autre message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-mountain/10">
      <h3 className="font-heading text-xl text-bistro mb-4">Laissez-nous un message</h3>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-bistro mb-1">Votre prénom</label>
          <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required maxLength={100} className="w-full px-4 py-2.5 rounded-lg border border-mountain/30 bg-cream focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-bistro" placeholder="Jean" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-bistro mb-1">Votre message</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required maxLength={1000} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-mountain/30 bg-cream focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-bistro resize-none" placeholder="Un super restaurant, merci pour cette soirée !" />
          <p className="text-xs text-bistro/40 mt-1">{message.length}/1000</p>
        </div>
        {status === "error" && <p className="text-red-600 text-sm">{errorMsg}</p>}
        <Button type="submit" disabled={status === "loading"} className="w-full">
          {status === "loading" ? "Envoi en cours..." : "Envoyer mon message"}
        </Button>
      </div>
    </form>
  );
}
