import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/data/mock-data";
import { siteConfig } from "@/lib/site-config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const productId = body?.productId;
  const quantity = Number(body?.quantity ?? 1);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 400 },
    );
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!stripeSecret) {
    return NextResponse.json(
      {
        error: "Stripe not configured.",
        message:
          "Set STRIPE_SECRET_KEY to enable live checkout or reach out to ChemPort sales.",
      },
      { status: 200 },
    );
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2024-06-20",
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    allow_promotion_codes: true,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            metadata: {
              chemport_product_id: product.id,
            },
            description: product.summary,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "DE", "AU"],
    },
    metadata: {
      chemport_supplier_id: product.supplierId,
      chemport_category: product.category,
    },
    success_url: `${siteUrl}/dashboard?checkout=success`,
    cancel_url: `${siteUrl}/products/${product.slug}`,
    customer_email: body?.email,
    consent_collection: {
      terms_of_service: "required",
    },
    custom_text: {
      submit: {
        message:
          "By continuing you confirm this purchase is for research use only per ChemPort compliance.",
      },
    },
  });

  return NextResponse.json({
    url: session.url,
    message: `Redirecting to Stripe for ${siteConfig.name}`,
  });
}
