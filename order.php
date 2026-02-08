<?php include_once('./header.php') ?>
<link rel="stylesheet" href="/css/swiper-bundle.min.css">
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
<link rel="stylesheet" href="/css/order.css">

<div class="order_details">
    <div class="order_contanier">
        <div class="product_search">
            <h1 class="product_search_title">Sparklers</h1>
            <p class="product_search_desc">Brighten up your celebration with our premium sparklers.</p>
            <form class="product_search_form">
                <input class="search_box" placeholder="Search in Sparklers...">
            </form>
        </div>

        <div class="product_cat_filter">
            <div class="product_cat_filter_left">
                <div class="product_cat_slider swiper">
                    <div class="swiper-wrapper cat_tabs">
                        <!-- Slides -->
                        <a class="swiper-slide tab active" data-id="">All Sparklers</a>

                    </div>
                    <!-- If we need scrollbar -->
                    <div class="swiper-scrollbar"></div>
                </div>

            </div>
            <div class="product_cat_filter_right">
                <a class="grid_view active"><i class="fa-solid fa-grip"></i></a>
                <a class="list_view"><i class="fa-solid fa-list"></i></a>
                <select class="product_filter">
                    <option value="latest">Latest</option>
                    <option value="low_to_high">Low to High</option>
                    <option value="high_to_low">High to Low</option>
                </select>
            </div>
        </div>

        <div class="product_list">
            <div class="_row">

            </div>
            <div class="overall_total">Overall Total : <span class="overall_totals">₹ 0</span></div>

             <div class="place_order_div"><a class="place_order">Place Order</a></div>
        </div>
    </div>
</div>


<script src="/js/libs/jquery-4.0.0.min.js"></script>
<script src="/js/libs/swiper-bundle.min.js"></script>
<script src="/js/libs/sweetalert2.js"></script>
<script src="/js/config.js"></script>
<script src="/js/script.js"></script>
<?php include_once('./footer.php') ?>