import { SalesPage } from "./types";

export function generateHTML(data: SalesPage): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.hero.headline}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px;
    }
    
    .hero {
      margin-bottom: 60px;
    }
    
    .hero h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #1a1a1a;
    }
    
    .hero p {
      font-size: 20px;
      color: #666;
      margin-bottom: 32px;
      max-width: 600px;
    }
    
    .btn {
      display: inline-block;
      background: #6C63FF;
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.3s;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
    
    .btn:hover {
      background: #5a52d5;
    }
    
    .benefits {
      margin-top: 60px;
    }
    
    .benefits h2 {
      font-size: 32px;
      margin-bottom: 32px;
      color: #1a1a1a;
    }
    
    .benefit-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    
    .benefit-item {
      border: 1px solid #ddd;
      padding: 24px;
      border-radius: 12px;
      background: #f9f9f9;
    }
    
    .benefit-item h3 {
      font-size: 20px;
      margin-bottom: 8px;
      color: #6C63FF;
    }
    
    .benefit-item p {
      color: #666;
      font-size: 16px;
    }
  </style>
</head>

<body>
<div class="container">
  <section class="hero">
    <h1>${data.hero.headline}</h1>
    <p>${data.hero.subheadline}</p>
    <button class="btn">${data.hero.cta}</button>
  </section>

  <section class="benefits">
    <h2>Benefits</h2>
    <div class="benefit-grid">
      ${data.benefits
        .map(
          (b) => `
      <div class="benefit-item">
        <h3>${b.title}</h3>
        <p>${b.description}</p>
      </div>
      `
        )
        .join("")}
    </div>
  </section>
</div>
</body>
</html>
`;
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
