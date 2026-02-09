import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const showPending = searchParams.get("pending") === "true";

  if (showPending) {
    if (!isAuthenticatedFromRequest(request)) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const { data, error } = await supabaseAdmin
      .from("guestbook").select("*").eq("approved", false)
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const { data, error } = await supabaseAdmin
    .from("guestbook").select("*").eq("approved", true)
    .order("created_at", { ascending: false }).limit(50);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, message, honeypot } = body;
    if (honeypot) return NextResponse.json({ success: true }, { status: 201 });
    if (!nom || !message) return NextResponse.json({ error: "Nom et message sont requis" }, { status: 400 });
    if (nom.length > 100) return NextResponse.json({ error: "Le nom ne doit pas dépasser 100 caractères" }, { status: 400 });
    if (message.length > 1000) return NextResponse.json({ error: "Le message ne doit pas dépasser 1000 caractères" }, { status: 400 });
    const { error } = await supabaseAdmin
      .from("guestbook").insert({ nom: nom.trim(), message: message.trim(), approved: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, approved } = body;
    if (!id || approved == null) return NextResponse.json({ error: "ID et statut requis" }, { status: 400 });
    const { data, error } = await supabaseAdmin
      .from("guestbook").update({ approved }).eq("id", id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });
  const { error } = await supabaseAdmin.from("guestbook").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
