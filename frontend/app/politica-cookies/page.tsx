// src/app/politica-cookies/page.tsx
import { politicaCookies } from "@/data";

export default function PoliticaCookiesPage() {
  return (
    <main className="mt-[0px] text-sm leading-relaxed text-darkBg">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">Política de Cookies</h1>
        <div
          className="text-justify space-y-4"
          dangerouslySetInnerHTML={{ __html: politicaCookies }}
        />
      </div>
    </main>
  );
}
