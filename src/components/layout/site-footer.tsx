import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const SiteFooter = () => (
  <footer className="border-t border-white/10 bg-[#030915] py-10 text-white/70">
    <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
        <p className="mt-2 text-sm text-white/60">{siteConfig.tagline}</p>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
          Navigation
        </p>
        <ul className="mt-3 space-y-2 text-sm text-white/60">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
          Contact
        </p>
        <ul className="mt-3 space-y-1 text-sm text-white/60">
          <li>{siteConfig.contact.email}</li>
          <li>{siteConfig.contact.phone}</li>
          <li>{siteConfig.contact.address}</li>
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
          Compliance
        </p>
        <p className="mt-3 text-sm text-white/60">
          Research-use only. Orders require confirmation of ChemPort&apos;s compliance
          statement and documentation upload before fulfillment.
        </p>
      </div>
    </div>
    <div className="mt-8 text-center text-xs text-white/50">
      © {new Date().getFullYear()} ChemPort. All rights reserved.
    </div>
  </footer>
);
