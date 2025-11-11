import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, organization, intent, message } = payload;
  if (!name || !email || !organization || !intent || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  console.log("ChemPort contact request", payload);

  return NextResponse.json({
    ok: true,
    message:
      "Contact request captured. Wire this route to Resend or your CRM to finalize.",
  });
}
