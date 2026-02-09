import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabaseAdmin
    .from("evenements").select("*").eq("visible", true)
    .gte("date", today).order("date", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!isAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { date, titre, description, image_url } = body;
    if (!date || !titre) return NextResponse.json({ error: "Date et titre sont requis" }, { status: 400 });
    const { data, error } = await supabaseAdmin
      .from("evenements")
      .insert({ date, titre, description: description || null, image_url: image_url || null, visible: true })
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
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });
    const { data, error } = await supabaseAdmin
      .from("evenements").update(updates).eq("id", id).select().single();
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
  const { error } = await supabaseAdmin.from("evenements").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
