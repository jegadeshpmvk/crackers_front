<?php include_once('./header.php') ?>
<link rel="stylesheet" href="/css/swiper-bundle.min.css">
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
<link rel="stylesheet" href="/css/order.css?v=<?= time()?>">

<div class="cart_details">
    <div class="order_confirm_contanier">
        <div class="cart_btns">
            <a class="confirm_order_download" target="_blank" download href="">Download</a>
              <a class="" href="/order.php">Back</a>
        </div>
        <div class="order_confirm_pdf"></div>
    </div>
</div>


<script src="/js/libs/jquery-4.0.0.min.js"></script>
<script src="/js/libs/swiper-bundle.min.js"></script>
<script src="/js/libs/sweetalert2.js"></script>
<script src="/js/config.js?v=<?= time()?>"></script>
<script src="/js/script.js?v=<?= time()?>"></script>
<?php include_once('./footer.php') ?>