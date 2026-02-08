$(function () {
    let typingTimer;

    $('body').on('click', '.swiper-slide.tab', function (e) {
        e.preventDefault();

    });

    $('body').on('click', '.list_view, .grid_view', function (e) {
        e.preventDefault();
        var el = $(this);
        el.closest('.product_cat_filter_right').find('a').removeClass('active');
        el.addClass('active');
        $('.product_list').toggleClass('list');
    });

    $('body').on('input change', '.search_box, .product_filter', function (e) {
        e.preventDefault();
        clearTimeout(typingTimer);

        typingTimer = setTimeout(function () {
            order.getProducts(); // ✅ called after typing stops
        }, 500);
    });

    $('body').on('click', '.swiper-slide.tab', function (e) {
        e.preventDefault();
        var el = $(this);
        $('.swiper-slide.tab').removeClass('active');
        el.addClass('active');
        order.getProducts();
    });

    $('body').on('click', '.product_button.add', function (e) {
        e.preventDefault();
        var el = $(this);
        order.addQuantity(el, 'add');
    });

    $('body').on('click', '.place_order', function (e) {
        e.preventDefault();
        order.placeOrder();
    });

    $('body').on('click', '.product_quantity', function (e) {
        e.preventDefault();
        var el = $(this);
        order.addQuantity(el, el.attr('data-type'));
    });

    $('body').on('input', '.qty_input', function (e) {
        e.preventDefault();
        var el = $(this);
        order.addQuantity(el, 'quantity');
    });

    $('body').on('click', '.delete_item', function (e) {
        e.preventDefault();
        var el = $(this), id = el.attr('data-id');
        order.deleteCartItems(id);
    });

    $('body').on('click', '.promation_code', function (e) {
        e.preventDefault();
        var el = $(this), form = el.next('.coupon_code_form');
        if (form.is(":visible")) {
            form.slideUp();
        } else {
            form.css("display", "flex").hide().slideDown();
        }
    });

    $('body').on('submit', '.coupon_code_form', async function (e) {
        e.preventDefault();
        var el = $(this);
        console.log(el.serialize());
        const response = await fetch(ENV.API_URL + '/get-coupon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: el.serialize()
        });
        const result = await response.json();
        if (result?.status) {
            Swal.fire({
                title: 'Coupon Code Applied Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if (res.isConfirmed) {
                    let grandTotal = order.cart.reduce((sum, item) => sum + item.total_price, 0);
                    let percentage = result.data.discount, 
                    discountAmount = ((grandTotal * percentage) / 100);
                    order.promotion_discount = discountAmount;
                    order.getCartSummary();
                }
            })
        } else {
            Swal.fire({
                title: 'Invalid Code! - No Discount',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    });

    order.setup(1);
});


var order = {
    cart: [],
    promotion_discount: 0,
    setup: function (init) {
        if (init === 1) {
            order.loadCart();
            order.categorySlider();
            order.getCategories();
            order.getProducts();
            order.getCartDetails();
            order.getCartSummary();
        }
    },
    categorySlider: function () {
        if ($(".product_cat_slider").length) {
            const swiper = new Swiper('.product_cat_slider', {
                // Optional parameters
                slidesPerView: 'auto',
                spaceBetween: 10, // Optional: add space between slides
                loop: false,
                scrollbar: {
                    el: '.swiper-scrollbar',
                    hide: true, // This hides the scrollbar
                },
            });
        }
    },
    getCategories: async function () {
        if ($('.product_cat_slider').length) {
            $('.product_cat_slider').addClass('loading');
            const response = await fetch(ENV.API_URL + '/get-categories', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();
            let html = `<a class="swiper-slide tab active" data-id="">All Sparklers</a>`;
            if (result.status === 200) {
                console.log(result.data);
                $.each(result.data, function (index, category) {
                    html += `<a href="#" class="swiper-slide tab" data-id="${category.id}">${category.name}</a>`;
                });
                $(".cat_tabs").html(html);
            }
            $('.product_cat_slider').removeClass('loading');
        }
    },
    getProducts: async function () {
        if ($('.product_list').length) {
            $('.product_list').addClass('loading');
            let d = { search: $('.search_box').val(), cat_id: $('.swiper-slide.tab.active').attr('data-id'), sort: $('.product_filter').val() };
            let query = new URLSearchParams(d).toString();
            const response = await fetch(ENV.API_URL + '/get-products?' + query, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();
            let html = ``;
            if (result.status === 200) {
                console.log(result.data.length);
                if (result.data.length > 0) {
                    $.each(result.data, function (index, product) {
                        let cartItem = order.cart.find(item => item.id == product.id);
                        // Default values
                        let qty = cartItem ? cartItem.qty : 0;
                        let total = cartItem ? cartItem.total_price : 0;

                        // Button Group HTML (Add OR Quantity)
                        let buttonHtml = '';

                        if (qty > 0) {
                            buttonHtml = `
                                <a class="product_quantity" data-type="decrement">
                                    <i class="fa fa-minus"></i>
                                </a>
                                <input type="number" value="${qty}" class="form_control qty_input"/>
                                <a class="product_quantity" data-type="increment">
                                    <i class="fa fa-plus"></i>
                                </a>
                            `;
                        } else {
                            buttonHtml = `<button class="product_button add">Add</button>`;
                        }
                        html += `<div class="_col _col_4">
                    <div class="product_con">
                        <div class="product_image">
                            <div class="probgCon">
                            ${product.images && product.images.length > 0 ? `<div class="probgimage" style="background-image: url('${product.images[0].url.file}')"></div>` : `<div class="probgimage" style="background-image: url('')"></div>`}
                                
                            </div>
                        </div>
                        <div class="product_content" data-id="${product.id}" 
                            data-price="${product.price}"
                            data-mrp="${product.mrp}"
                             data-image="${product.images && product.images.length > 0 ? product.images[0].url.file : ''}"
                            data-name="${product.name}">
                            <div class="product_title" >${product.name}</div>
                            <div class="product_desc">Box of 10 Pcs</div>
                            <div class="product_price_group">
                                <div class="product_price">
                                    <span class="old_price">${order.formatINR(product.mrp)}</span>
                                    <span class="new_price" data-price="${product.price}">${order.formatINR(product.price)}</span>
                                </div>
                                <div class="product_total_price hide">${order.formatINR(total)}</div>
                            </div>
                            <div class="button_group ${qty > 0 ? 'quantity' : 'add'}"> ${buttonHtml}</div>
                            <div class="product_total_price hide">${order.formatINR(total)}</div>
                        </div>
                    </div>
                </div>`;
                    });
                } else {
                    html = '<div class="no_data">No Products Found</div>';
                }
                $(".product_list ._row").html(html);
            }
            $('.product_list').removeClass('loading');
        }
    },
    addQuantity: async function (el, type) {
        var btn = '<button class="product_button add">Add</button>';
        var quantity = '<a class="product_quantity" data-type="decrement"><i class="fa fa-minus"></i></a><input type="number" value="1" class="form_control qty_input"/><a class="product_quantity" data-type="increment"><i class="fa fa-plus"></i></a>';
        // Product container
        var product = $(el).closest('.product_content'),
            id = product.attr('data-id'),
            name = product.attr('data-name'),
            image = product.attr('data-image'),
            price = product.attr('data-price'),
            mrp = product.attr('data-mrp');

        // Price from data-price
        var price = parseFloat(product.find('.new_price').attr('data-price'));
        var input = product.find(".qty_input");
        var currentQty = parseInt(input.val());
        // Total price element
        var totalBox = product.find('.product_total_price');
        if (type === 'add') {
            product.find(".button_group").html(quantity);
            currentQty = 1;
        } else if (type === "increment") {
            currentQty += 1;
            input.val(currentQty);
        } else if (type === "decrement") {
            if (currentQty > 1) {
                currentQty -= 1;
                input.val(currentQty);
            }

            if (currentQty === 1) {
                currentQty = 0;
                type = 'add';
                product.find(".button_group").html(btn);
            }
        } else if (type === "quantity") {
            if (currentQty < 1) {
                currentQty = 0;
                type = 'add';
                product.find(".button_group").html(btn);
            }
        }

        product.find('.button_group').attr("class", "button_group").addClass(type);
        var total = currentQty * price;
        totalBox.html(order.formatINR(total));

        let existingIndex = order.cart.findIndex(item => item.id == id);
        if (currentQty > 0) {
            if (existingIndex > -1) {
                order.cart[existingIndex].qty = currentQty;
                order.cart[existingIndex].total_price = total;
            } else {
                order.cart.push({
                    id: id,
                    name: name,
                    image: image,
                    mrp: mrp,
                    qty: currentQty,
                    price: price,
                    total_price: total
                });
            }
        } else {
            if (existingIndex > -1) {
                order.cart.splice(existingIndex, 1);
            }
        }
        order.grandTotal();
    },
    deleteCartItems: function (id) {
        let existingIndex = order.cart.findIndex(item => item.id == id);
        if (existingIndex > -1) {
            order.cart.splice(existingIndex, 1);
            order.grandTotal();
            order.getCartDetails();
        }
        if (order.cart.length === 0) {
            window.location.href = '/order.php';
        }
    },
    loadCart: function () {
        let savedCart = order.getCart();

        if (savedCart) {
            order.cart = JSON.parse(savedCart);
        } else {
            order.cart = [];
        }
    },
    grandTotal: function () {
        let grandTotal = order.cart.reduce((sum, item) => sum + item.total_price, 0);
        $(".overall_totals").html(order.formatINR(grandTotal));
        order.saveCart();
    },
    saveCart: function () {
        localStorage.setItem("cart", JSON.stringify(order.cart));
    },
    getCart: function () {
        return localStorage.getItem("cart")
    },
    formatINR: function (amount) {
        return amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0
        });
    },
    placeOrder: async function () {
        let grandTotal = order.cart.reduce((sum, item) => sum + item.total_price, 0);
        if (grandTotal < ENV.MIN_ORDER) {
            Swal.fire({
                title: 'Your Minimum Order value must be : ' + order.formatINR(ENV.MIN_ORDER),
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } else {
            Swal.fire({
                title: 'Your Order Value is : ' + order.formatINR(grandTotal),
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    window.location.href = "cart.php";
                }
            })
        }
    },
    getCartDetails: async function () {
        if ($('.cart_list').length) {
            let cartBox = $(".cart_list");

            // Clear old cart UI
            cartBox.html("");

            // If cart empty
            if (order.cart.length === 0) {
                cartBox.append("<tr><td colspan='7'>Your cart is empty</td></tr>");
                return;
            }

            // Loop cart items
            $.each(order.cart, function (index, item) {
                cartBox.append(`
                <tr>
                    <td>${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}</td>
                    <td>${item.name}</td>
                    <td><s>${order.formatINR(item.mrp)}</s></td>
                    <td>${order.formatINR(item.price)}</td>
                    <td class="cr_cart_qty">
                        <div class="cr_cart_qty_plus_minus">
                            <a type="button"><i class="fa fa-minus"></i></a>
                            <input type="text" value="${item.qty}">
                            <a type="button" ><i class="fa fa-plus"></i></a>
                        </div
                    </td>
                    <td><span class="">${order.formatINR(item.total_price)}</span></td>
                    <td>
                        <a href="#" class="delete_item" data-id="${item.id}"><i class="fa fa-trash"></i></a>
                    </td>
                </tr>
        `);
            });
        }
    },
    getCartSummary: function () {
        if ($('.cart_list').length) {
            let min_order = ENV.MIN_ORDER;
            let tol_qty = order.cart.reduce((sum, item) => sum + item.qty, 0);
            let cart_total = order.cart.reduce((sum, item) => sum + item.total_price, 0);
            let packing_charge = 0;
            let promotion_discount = order.promotion_discount;
            console.log(promotion_discount);
            let overall_totals = (cart_total + packing_charge) - promotion_discount;

            $('.min_order span').html(order.formatINR(min_order));
            $('.tol_qty span').html(tol_qty);
            $('.cart_total span').html(order.formatINR(cart_total));
            $('.packing_charge span').html(order.formatINR(packing_charge));
            $('.promotion_discount span').html(order.formatINR(promotion_discount));
            $('.overall_total_cart span').html(order.formatINR(overall_totals));
        }
    }
}