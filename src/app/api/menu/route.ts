import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeHidden = searchParams.get("include_hidden") === "true";
  const canSeeHidden = includeHidden && isAuthenticatedFromRequest(request);

  let query = supabaseAdmin
    .from("menu_items")
    .select("*");

  if (!canSeeHidden) {
    query = query.eq("visible", true);
  }

  const { data, error } = await query
    .order("ordre", { ascending: true })
    .order("nom", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { categorie, nom, description, prix, promo, prix_promo, ordre, visible } = body;
    if (!categorie || !nom || prix == null) {
      return NextResponse.json({ error: "Catégorie, nom et prix sont requis" }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("menu_items")
      .insert({
        categorie, nom,
        description: description || null,
        prix: parseFloat(prix),
        promo: promo || false,
        prix_promo: promo && prix_promo ? parseFloat(prix_promo) : null,
        ordre: ordre || 0,
        visible: visible ?? true,
      })
      .select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
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
    const { id, ...rawUpdates } = body;
    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });
    const updates = { ...rawUpdates };

    if (updates.prix != null) updates.prix = parseFloat(updates.prix);
    if (updates.prix_promo != null) {
      updates.prix_promo = updates.prix_promo === "" ? null : parseFloat(updates.prix_promo);
    }
    if ("promo" in updates && !updates.promo) updates.prix_promo = null;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("menu_items").update(updates).eq("id", id).select().single();
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
  const { error } = await supabaseAdmin.from("menu_items").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
