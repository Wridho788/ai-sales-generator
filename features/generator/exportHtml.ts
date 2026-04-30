import { SalesPage } from "./types";

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderFeatures(items: SalesPage["features"]): string {
  if (!items || items.length === 0) return "";
  return `
  <section style="padding: 80px 20px; background: #fff;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <h2 style="font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a2e;">Everything You Need</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        ${items.slice(0, 6).map((item) => `
        <div style="padding: 24px; border-radius: 16px; border: 1px solid #e5e7eb; background: #f9fafb;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #ede9fe; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h3 style="font-size: 16px; font-weight: 600; color: #1a1a2e; margin-bottom: 8px;">${escapeHtml(item.title)}</h3>
          <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">${escapeHtml(item.description)}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>`;
}

function renderPricing(items: SalesPage["pricing"]): string {
  if (!items || items.length === 0) return "";
  return `
  <section style="padding: 80px 20px; background: #f9fafb;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <h2 style="font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a2e;">Simple, Transparent Pricing</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: start;">
        ${items.slice(0, 3).map((plan) => `
        <div style="padding: 32px; border-radius: 20px; border: ${plan.recommended ? "2px solid #7c3aed" : "1px solid #e5e7eb"}; background: ${plan.recommended ? "linear-gradient(180deg, #f5f3ff, #fff)" : "#fff"}; ${plan.recommended ? "transform: scale(1.02); box-shadow: 0 10px 40px -10px rgba(124, 58, 237, 0.3);" : ""}">
          ${plan.recommended ? '<div style="text-align: center; margin-bottom: 12px;"><span style="display: inline-block; padding: 4px 12px; border-radius: 99px; background: #7c3aed; color: white; font-size: 12px; font-weight: 600;">Recommended</span></div>' : ""}
          <h3 style="font-size: 18px; font-weight: 600; color: #1a1a2e; margin-bottom: 8px;">${escapeHtml(plan.title)}</h3>
          <div style="margin-bottom: 24px;">
            <span style="font-size: 36px; font-weight: 800; color: ${plan.recommended ? "#7c3aed" : "#1a1a2e"};">${escapeHtml(plan.price)}</span>
            <span style="font-size: 14px; color: #9ca3af; margin-left: 4px;">${escapeHtml(plan.period)}</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0 0 24px; flex: 1;">
            ${(plan.features || []).slice(0, 5).map((f) => `
            <li style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 12px; font-size: 14px; color: #4b5563;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"/></svg>
              ${escapeHtml(f)}
            </li>`).join("")}
          </ul>
          <button style="width: 100%; padding: 12px; border-radius: 12px; font-weight: 600; font-size: 14px; cursor: pointer; border: none; ${plan.recommended ? "background: #7c3aed; color: white;" : "background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;"}">
            ${escapeHtml(plan.cta)}
          </button>
        </div>`).join("")}
      </div>
    </div>
  </section>`;
}

function renderTestimonials(items: SalesPage["testimonials"]): string {
  if (!items || items.length === 0) return "";
  return `
  <section style="padding: 80px 20px; background: #fff;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <h2 style="font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a2e;">Loved by Teams Worldwide</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        ${items.slice(0, 3).map((t) => `
        <div style="padding: 24px; border-radius: 16px; border: 1px solid #e5e7eb;">
          <div style="display: flex; gap: 2px; margin-bottom: 12px;">
            ${[...Array(5)].map(() => '<svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>').join("")}
          </div>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.7; font-style: italic; margin-bottom: 20px;">"${escapeHtml(t.content)}"</p>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 10px; background: #ede9fe; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #7c3aed; flex-shrink: 0;">${escapeHtml(t.avatar || t.name.slice(0, 2).toUpperCase())}</div>
            <div>
              <p style="font-size: 14px; font-weight: 600; color: #1a1a2e;">${escapeHtml(t.name)}</p>
              <p style="font-size: 12px; color: #9ca3af;">${escapeHtml(t.role)}</p>
            </div>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>`;
}

function renderFaq(items: SalesPage["faq"]): string {
  if (!items || items.length === 0) return "";
  return `
  <section style="padding: 80px 20px; background: #f9fafb;">
    <div style="max-width: 800px; margin: 0 auto;">
      <h2 style="font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a2e;">Frequently Asked Questions</h2>
      <div style="space-y: 12px;">
        ${items.slice(0, 4).map((item) => `
        <details style="border-radius: 16px; border: 1px solid #e5e7eb; background: #fff; overflow: hidden; margin-bottom: 12px;">
          <summary style="padding: 20px 24px; font-weight: 600; font-size: 15px; color: #1a1a2e; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center;">
            ${escapeHtml(item.question)}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div style="padding: 0 24px 20px; font-size: 14px; color: #6b7280; line-height: 1.7;">
            ${escapeHtml(item.answer)}
          </div>
        </details>`).join("")}
      </div>
    </div>
  </section>`;
}

function renderCta(data: SalesPage["cta"]): string {
  if (!data) return "";
  return `
  <section style="padding: 80px 20px; background: linear-gradient(135deg, #7c3aed, #6d28d9); text-align: center;">
    <div style="max-width: 700px; margin: 0 auto;">
      <h2 style="font-size: 32px; font-weight: 700; color: #fff; margin-bottom: 16px;">${escapeHtml(data.headline)}</h2>
      ${data.subheadline ? `<p style="font-size: 18px; color: rgba(255,255,255,0.85); margin-bottom: 32px; line-height: 1.6;">${escapeHtml(data.subheadline)}</p>` : ""}
      <button style="padding: 16px 40px; border-radius: 14px; background: #fff; color: #7c3aed; font-size: 16px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
        ${escapeHtml(data.buttonText)}
      </button>
    </div>
  </section>`;
}

export function generateHTML(data: SalesPage): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(data?.hero?.headline || "Landing Page")}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #1a1a2e; line-height: 1.6; -webkit-font-smoothing: antialiased; }
    ::selection { background: rgba(124, 58, 237, 0.2); }
    img { max-width: 100%; height: auto; }
    @media (max-width: 768px) {
      section { padding: 60px 16px !important; }
      h2 { font-size: 26px !important; }
    }
  </style>
</head>
<body>

  <!-- HERO -->
  <section style="position: relative; overflow: hidden; padding: 100px 20px; background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); text-align: center;">
    ${data.hero?.imageUrl ? `<div style="position: absolute; inset: 0; opacity: 0.08;"><img src="${escapeHtml(data.hero.imageUrl)}" alt="" style="width:100%;height:100%;object-fit:cover;" /></div>` : ""}
    <div style="position: relative; max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 48px; font-weight: 800; color: #1a1a2e; line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.02em;">
        ${escapeHtml(data.hero?.headline || "")}
      </h1>
      <p style="font-size: 20px; color: #6b7280; max-width: 600px; margin: 0 auto 36px; line-height: 1.6;">
        ${escapeHtml(data.hero?.subheadline || "")}
      </p>
      <button style="padding: 16px 36px; border-radius: 14px; background: #7c3aed; color: white; font-size: 16px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35); transition: transform 0.2s, box-shadow 0.2s;">
        ${escapeHtml(data.hero?.cta || "Get Started")}
      </button>
    </div>
  </section>

  ${renderFeatures(data.features)}
  ${renderPricing(data.pricing)}
  ${renderTestimonials(data.testimonials)}
  ${renderFaq(data.faq)}
  ${renderCta(data.cta)}

  <!-- FOOTER -->
  <footer style="padding: 32px 20px; background: #1a1a2e; text-align: center;">
    <p style="font-size: 14px; color: rgba(255,255,255,0.4);">
      Generated with SalesForge AI
    </p>
  </footer>

</body>
</html>`;
}

export function downloadHTML(data: SalesPage): void {
  const html = generateHTML(data);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `landing-page-${Date.now()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}