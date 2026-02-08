<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sparklers UI</title>

  <style>
    :root {
      --primary-color: #111111;
      --secondary-color: #ff6a3d;
      --light-gray: #f5f7fa;
      --border-color: #e6e6e6;
    }

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #fff;
      color: var(--primary-color);
    }

    .container {
      max-width: 1200px;
      margin: auto;
      padding: 30px;
    }

    /* Header */
    h1 {
      font-size: 40px;
      margin-bottom: 5px;
    }

    p {
      color: #888;
      margin-bottom: 20px;
    }

    /* Search */
    .search-box {
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      font-size: 16px;
      outline: none;
    }

    /* Tabs */
    .tabs {
      margin: 25px 0;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .tab {
      padding: 10px 18px;
      border-radius: 25px;
      border: 1px solid var(--border-color);
      cursor: pointer;
      font-weight: 600;
      background: white;
    }

    .tab.active {
      background: var(--secondary-color);
      color: white;
      border-color: var(--secondary-color);
    }

    /* Products Grid */
    .products {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    /* Product Card */
    .card {
      border: 1px solid var(--border-color);
      border-radius: 14px;
      overflow: hidden;
      background: white;
      position: relative;
    }

    .card img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      background: var(--light-gray);
    }

    /* Discount Badge */
    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #d9fbe5;
      color: #0a7a35;
      font-size: 13px;
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 8px;
    }

    .card-content {
      padding: 15px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
      margin: 5px 0;
    }

    .card-sub {
      font-size: 14px;
      color: #999;
      margin-bottom: 10px;
    }

    /* Price */
    .price {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 12px;
    }

    .old-price {
      text-decoration: line-through;
      color: #aaa;
      font-size: 14px;
    }

    .new-price {
      color: var(--secondary-color);
      font-size: 20px;
      font-weight: bold;
    }

    /* Button */
    .btn {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
      font-size: 15px;
    }

    .btn.add {
      background: #fff4ea;
      color: var(--primary-color);
    }

    .btn.qty {
      background: var(--secondary-color);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 14px;
    }

    .btn.qty span {
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>

<body>
  <div class="container">

    <!-- Header -->
    <h1>Sparklers</h1>
    <p>Brighten up your celebration with our premium sparklers.</p>

    <!-- Search -->
    <input class="search-box" placeholder="Search in Sparklers..." />

    <!-- Tabs -->
    <div class="tabs">
      <div class="tab active">All Sparklers</div>
      <div class="tab">Electric</div>
      <div class="tab">Colored</div>
      <div class="tab">Crackling</div>
      <div class="tab">Giant (50cm+)</div>
      <div class="tab">Budget Packs</div>
      <div class="tab">Combos</div>
    </div>

    <!-- Product Grid -->
    <div class="products">

      <!-- Card 1 -->
      <div class="card">
        <span class="badge">40% OFF</span>
        <img src="https://picsum.photos/300/200?1" alt="">
        <div class="card-content">
          <div class="card-title">15cm Electric Sparklers</div>
          <div class="card-sub">Box of 10 Pcs</div>

          <div class="price">
            <span class="old-price">₹120</span>
            <span class="new-price">₹72</span>
          </div>

          <button class="btn qty">
            <span>-</span> 1 <span>+</span>
          </button>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="card" style="border:2px solid var(--secondary-color);">
        <img src="https://picsum.photos/300/200?2" alt="">
        <div class="card-content">
          <div class="card-title">15cm Red Sparklers</div>
          <div class="card-sub">Box of 10 Pcs</div>

          <div class="price">
            <span class="old-price">₹110</span>
            <span class="new-price">₹65</span>
          </div>

          <button class="btn qty">
            <span>-</span> 1 <span>+</span>
          </button>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="card">
        <img src="https://picsum.photos/300/200?3" alt="">
        <div class="card-content">
          <div class="card-title">15cm Green Sparklers</div>
          <div class="card-sub">Box of 10 Pcs</div>

          <div class="price">
            <span class="new-price">₹65</span>
          </div>

          <button class="btn add">Add</button>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="card">
        <span class="badge">20% OFF</span>
        <img src="https://picsum.photos/300/200?4" alt="">
        <div class="card-content">
          <div class="card-title">30cm Electric Sparklers</div>
          <div class="card-sub">Box of 5 Pcs</div>

          <div class="price">
            <span class="old-price">₹180</span>
            <span class="new-price">₹144</span>
          </div>

          <button class="btn add">Add</button>
        </div>
      </div>

    </div>
  </div>
</body>
</html>
