// Simple Node.js + Express single-file frontend that reproduces the provided layout.
// How to run:
// 1. npm init -y
// 2. npm i express
// 3. node node_frontend_app.js
// Then open http://localhost:3000

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// NOTE: The image uploaded by you is referenced below by its local path. The system
// that integrates this example will map that local path to a served URL so the
// browser can load it. If you run locally, replace the imageUrl with a public URL
// or copy the image into a "public" folder and serve it with express.static.
const imageUrl = 'https://via.placeholder.com/600x300.png?text=Banner';


app.get('/', (req, res) => {
  res.send(`<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Apple Gold - Demo Frontend</title>
  <style>
    :root{--orange:#f57c00;--light:#f4f4f4;--muted:#999}
    body{font-family: Arial, Helvetica, sans-serif;margin:0;background:#efefef;color:#333}
    header{background:#fff;padding:10px 20px;display:flex;align-items:center;gap:20px;border-bottom:1px solid #ddd}
    .logo{display:flex;align-items:center;gap:10px}
    .logo img{height:42px}
    .top-actions{margin-left:auto;display:flex;gap:12px;align-items:center}
    .container{max-width:1100px;margin:18px auto}

    /* layout */
    .hero{display:flex;gap:20px}
    aside{width:220px;background:linear-gradient(180deg,#f7f7f7,#ededed);padding:14px;border-radius:4px}
    aside .menu-item{padding:12px;border-radius:4px;margin-bottom:6px;background:#fff;display:flex;align-items:center;gap:10px;cursor:pointer}
    aside .menu-item.active{background:var(--orange);color:#fff}

    .main{flex:1}
    .big-banner{background:#fff;padding:12px;border-radius:4px;display:flex;gap:12px}
    .banner-left{flex:1;background:linear-gradient(#fff,#fafafa);display:flex;align-items:center;justify-content:center}
    .banner-left img{max-width:100%;height:220px;object-fit:contain}
    .banner-right{width:220px;background:#fff;padding:6px;border-left:1px solid #eee}

    /* products */
    .section-title{display:flex;justify-content:space-between;align-items:center;margin:16px 0;color:var(--muted)}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
    .card{background:#fff;padding:10px;border-radius:4px;border:1px solid #e6e6e6}
    .card img{width:100%;height:140px;object-fit:contain}
    .price{color:var(--orange);font-weight:700;margin-top:8px}
    .hot{position:absolute;background:var(--orange);color:#fff;padding:4px 8px;border-radius:2px;font-size:12px;right:10px;top:10px}

    /* responsive */
    @media (max-width:1000px){.grid{grid-template-columns:repeat(3,1fr)}}
    @media (max-width:760px){.hero{flex-direction:column}aside{width:100%;order:2}.big-banner{order:1}.grid{grid-template-columns:repeat(2,1fr)}}
  </style>
</head>
<body>
  <header>
    <div class="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="logo"><div><strong>Apple Gold</strong><div style="font-size:12px;color:var(--muted)">Đại lý ủy quyền Apple</div></div></div>
    <div class="top-actions">
      <div style="font-size:14px;color:var(--muted)">Giao hàng miễn phí toàn quốc</div>
      <button style="background:var(--orange);border:none;color:#fff;padding:8px 12px;border-radius:4px;cursor:pointer">Đăng nhập</button>
    </div>
  </header>

  <div class="container">
    <div class="hero">
      <aside>
        <div class="menu-item active">iPhone</div>
        <div class="menu-item">iPad</div>
        <div class="menu-item">Apple Watch</div>
        <div class="menu-item">Máy tính Apple</div>
        <div class="menu-item">Phụ kiện</div>
      </aside>

      <div class="main">
        <div class="big-banner">
          <div class="banner-left">
            <!-- image from uploaded file (local path) -->
            <img src="${imageUrl}" alt="banner">
          </div>
          <div class="banner-right">
            <div style="font-weight:700;margin-bottom:8px">Macbook 12\"</div>
            <div style="font-size:20px;color:var(--orange);font-weight:700">29.990.000 ₫</div>
            <div style="margin-top:12px;font-size:13px;color:var(--muted)">Pre-Order</div>
            <div style="height:6px"></div>
            <div style="background:#fafafa;padding:8px;border-radius:4px;border:1px solid #eee;margin-top:10px">MUA IPHONE 6</div>
          </div>
        </div>

        <div class="section-title"><h3 style="margin:0;color:#f57c00">Sản phẩm HOT</h3><a href="#" style="font-size:13px;color:var(--muted)">Xem thêm</a></div>

        <div class="grid">
          ${generateProductCard('Apple Macbook Pro Retina - ME664...','45.000.000 ₫')}
          ${generateProductCard('Apple Macbook Pro Retina - MF840...','30.900.000 ₫')}
          ${generateProductCard('Apple iPhone 6 - 64GB (FPT)','20.400.000 ₫')}
          ${generateProductCard('Apple iPhone 5C - 16GB','5.490.000 ₫')}
          ${generateProductCard('Apple iPhone 4S - 8GB (FPT)','3.450.000 ₫')}
          ${generateProductCard('Apple iPhone 6 Plus - 128GB','20.990.000 ₫')}
          ${generateProductCard('Apple iPhone 6 - 16GB','14.590.000 ₫')}
          ${generateProductCard('iPhone 6 16Gb (Like New)','11.500.000 ₫')}
        </div>

      </div>
    </div>
  </div>

</body>
</html>`);
});

// small helper to keep HTML generation tidy
function generateProductCard(title, price){
  return `
    <div class="card" style="position:relative">
      <div class="hot">HOT SALE</div>
      <img src="https://via.placeholder.com/300x180.png?text=Product" alt="product">
      <div style="font-size:14px;margin-top:8px">${title}</div>
      <div class="price">${price}</div>
    </div>
  `;
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend demo running on port ${PORT}`);
});
