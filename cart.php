<?php include_once('./header.php') ?>
<link rel="stylesheet" href="/css/swiper-bundle.min.css">
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
<link rel="stylesheet" href="/css/order.css">

<div class="cart_details">
    <div class="order_contanier">
        <table class="table table_secondary table_striped cth">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>MRP Price</th>
                    <th>Discount Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="cart_list">
            </tbody>
        </table>

        <div class="cart_form">
            <form class="customer_details">
                <div class="_form_row">
                    <div class="_col _col_2">
                        <div class="_form_group">
                            <label for="customer_name">Name </label>
                            <input class="form_control" id="customer_name" name="customer_name" type="text" placeholder="Enter Your Name" />
                        </div>
                    </div>
                    <div class="_col _col_2">
                        <div class="_form_group">
                            <div class="_form_group">
                                <label for="number">Number </label>
                                <input class="form_control" id="number" name="number" type="number" placeholder="Enter Your Number..." />
                            </div>
                        </div>
                    </div>
                    <div class="_col _col_2">
                        <div class="_form_group">
                            <label for="Whatsapp ">Whatsapp</label>
                            <input class="form_control" id="whatsapp " name="whatsapp" type="text" placeholder="Enter Your Whatapp..." />
                        </div>
                    </div>
                    <div class="_col _col_2">
                        <div class="_form_group">
                            <label for="Whatsapp ">E-Mail</label>
                            <input class="form_control" id="email " name="email" type="email" placeholder="Enter Your E-Mail..." />
                        </div>
                    </div>
                    <div class="_col _col_2">
                        <div class="_form_group">
                            <label for="address ">Address </label>
                            <textarea class="form_control" id="address " name="address" placeholder="Enter Your Address..."></textarea>
                        </div>
                    </div>
                    <div class="_col _col_2">
                        <div class="_form_group">
                            <label for="state ">Select State</label>
                            <select id="email " class="form_control" name="state">
                                <option value="">Select State</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="cart_coupon_code">
            <a class="promation_code">Have Promotion Code ?</a>
            <form class="coupon_code_form">
                <input type="text" name="code" class="coupon_code" />
                <input type="submit" value="Apply" class="coupon_code_submit" />
                <a class="coupon_code_clear">Clear</a>
            </form>
        </div>
        <div class="cart_summary">
            <div class="min_order">Minimum Order : <span></span></div>
            <div class="tol_qty">Total Quantity : <span></span></div>
            <div class="cart_total">Total : <span></span></div>
            <div class="packing_charge">Packing Charge : <span></span></div>
            <div class="promotion_discount">Promotion Discount : <span></span></div>
            <div class="overall_total_cart ">Overall Total : <span></span></div>
        </div>
        <div class="cart_btns">
            <a class="" href="/order.php">Continue Shopping</a>
            <a class="confirm_order">Confirm Order</a>
        </div>
    </div>
</div>


<script src="/js/libs/jquery-4.0.0.min.js"></script>
<script src="/js/libs/swiper-bundle.min.js"></script>
<script src="/js/libs/sweetalert2.js"></script>
<script src="/js/config.js"></script>
<script src="/js/script.js"></script>
<?php include_once('./footer.php') ?>