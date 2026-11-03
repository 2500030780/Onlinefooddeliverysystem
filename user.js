/* =====================================================
   FOODEXPRESS USER JAVASCRIPT
   ===================================================== */


/* =====================================================
   LOGIN SYSTEM
   ===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const savedUsername =
                localStorage.getItem(
                    "foodUsername"
                );


            const savedPassword =
                localStorage.getItem(
                    "foodPassword"
                );


            const loginError =
                document.getElementById(
                    "loginError"
                );


            if (
                username === savedUsername &&
                password === savedPassword
            ) {

                localStorage.setItem(
                    "foodLoggedIn",
                    "true"
                );


                localStorage.setItem(
                    "foodCurrentUser",
                    username
                );


                window.location.href =
                    "user.html";

            }

            else {

                loginError.textContent =
                    "Invalid username or password.";

            }

        }
    );

}


/* =====================================================
   SIGN UP
   ===================================================== */

function showSignup() {

    const signupBox =
        document.getElementById(
            "signupBox"
        );


    if (signupBox) {

        signupBox.style.display =
            "block";

    }

}


function signup() {

    const username =
        document
            .getElementById(
                "signupUsername"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "signupPassword"
            )
            .value;


    const message =
        document.getElementById(
            "signupMessage"
        );


    if (
        username === "" ||
        password === ""
    ) {

        message.textContent =
            "Please enter username and password.";

        message.style.color =
            "#e53935";

        return;

    }


    if (password.length < 4) {

        message.textContent =
            "Password must be at least 4 characters.";

        message.style.color =
            "#e53935";

        return;

    }


    localStorage.setItem(
        "foodUsername",
        username
    );


    localStorage.setItem(
        "foodPassword",
        password
    );


    message.textContent =
        "Account created successfully! Please login.";

    message.style.color =
        "#2e7d32";


    document.getElementById(
        "signupUsername"
    ).value = "";


    document.getElementById(
        "signupPassword"
    ).value = "";

}


/* =====================================================
   LOGOUT
   ===================================================== */

function logout() {

    localStorage.removeItem(
        "foodLoggedIn"
    );


    localStorage.removeItem(
        "foodCurrentUser"
    );


    window.location.href =
        "login.html";

}


/* =====================================================
   SHOW LOGGED-IN USER
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const loggedUser =
            document.getElementById(
                "loggedUser"
            );


        if (loggedUser) {

            const username =
                localStorage.getItem(
                    "foodCurrentUser"
                );


            if (username) {

                loggedUser.textContent =
                    "👤 " + username;

            }

        }

    }
);


/* =====================================================
   FOOD DATA
   ===================================================== */

let foods =
    JSON.parse(
        localStorage.getItem(
            "foods"
        )
    ) || [

        {
            id: 1,
            name: "Margherita Pizza",
            category: "Pizza",
            restaurant: "Pizza Palace",
            price: 299,
            rating: 4.5,
            emoji: "🍕"
        },

        {
            id: 2,
            name: "Chicken Burger",
            category: "Burger",
            restaurant: "Burger House",
            price: 199,
            rating: 4.4,
            emoji: "🍔"
        },

        {
            id: 3,
            name: "Chicken Biryani",
            category: "Biryani",
            restaurant: "Biryani Point",
            price: 249,
            rating: 4.7,
            emoji: "🍛"
        },

        {
            id: 4,
            name: "Veg Noodles",
            category: "Chinese",
            restaurant: "Chinese Wok",
            price: 179,
            rating: 4.2,
            emoji: "🥡"
        },

        {
            id: 5,
            name: "Chocolate Cake",
            category: "Dessert",
            restaurant: "Sweet Corner",
            price: 149,
            rating: 4.6,
            emoji: "🍰"
        },

        {
            id: 6,
            name: "Paneer Pizza",
            category: "Pizza",
            restaurant: "Pizza Palace",
            price: 329,
            rating: 4.5,
            emoji: "🍕"
        },

        {
            id: 7,
            name: "Veg Burger",
            category: "Burger",
            restaurant: "Burger House",
            price: 159,
            rating: 4.3,
            emoji: "🍔"
        },

        {
            id: 8,
            name: "Mutton Biryani",
            category: "Biryani",
            restaurant: "Biryani Point",
            price: 329,
            rating: 4.8,
            emoji: "🍛"
        }

    ];


/* =====================================================
   CART
   ===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem(
            "cart"
        )
    ) || [];


/* =====================================================
   LOAD FOOD
   ===================================================== */

function loadFoods(foodList = foods) {

    const container =
        document.getElementById(
            "foodContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    foodList.forEach(
        function(food) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "food-card";


            card.innerHTML = `

                <div class="food-image">
                    ${food.emoji}
                </div>

                <div class="food-info">

                    <h3>
                        ${food.name}
                    </h3>

                    <p class="restaurant">
                        ${food.restaurant}
                    </p>

                    <div class="food-rating">
                        ⭐ ${food.rating}
                    </div>

                    <div class="food-price">
                        ₹${food.price}
                    </div>

                    <button
                        class="add-button"
                        onclick="addToCart(${food.id})"
                    >
                        Add to Cart
                    </button>

                </div>
            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   CATEGORY FILTER
   ===================================================== */

function filterCategory(category) {

    if (category === "All") {

        loadFoods(foods);

        return;

    }


    const filtered =
        foods.filter(
            function(food) {

                return food.category === category;

            }
        );


    loadFoods(filtered);

}


/* =====================================================
   SEARCH
   ===================================================== */

function searchFood() {

    const input =
        document
            .getElementById(
                "searchInput"
            );


    if (!input) {
        return;
    }


    const search =
        input.value
            .toLowerCase()
            .trim();


    const filtered =
        foods.filter(
            function(food) {

                return (
                    food.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    food.restaurant
                        .toLowerCase()
                        .includes(search)

                    ||

                    food.category
                        .toLowerCase()
                        .includes(search)
                );

            }
        );


    loadFoods(filtered);

}


/* =====================================================
   SORT FOOD
   ===================================================== */

function sortFood() {

    const select =
        document.getElementById(
            "sortFood"
        );


    if (!select) {
        return;
    }


    const value =
        select.value;


    let sortedFoods =
        [...foods];


    if (value === "low") {

        sortedFoods.sort(
            function(a, b) {

                return a.price - b.price;

            }
        );

    }


    if (value === "high") {

        sortedFoods.sort(
            function(a, b) {

                return b.price - a.price;

            }
        );

    }


    loadFoods(sortedFoods);

}


/* =====================================================
   ADD TO CART
   ===================================================== */

function addToCart(foodId) {

    const food =
        foods.find(
            function(item) {

                return item.id === foodId;

            }
        );


    if (!food) {
        return;
    }


    const existing =
        cart.find(
            function(item) {

                return item.id === foodId;

            }
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            ...food,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(
        food.name +
        " added to cart!"
    );

}


/* =====================================================
   SAVE CART
   ===================================================== */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   CART COUNT
   ===================================================== */

function updateCartCount() {

    const count =
        document.getElementById(
            "cartCount"
        );


    if (!count) {
        return;
    }


    const total =
        cart.reduce(
            function(sum, item) {

                return sum +
                    item.quantity;

            },
            0
        );


    count.textContent =
        total;

}


/* =====================================================
   OPEN CART
   ===================================================== */

function openCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );


    if (!modal) {
        return;
    }


    modal.style.display =
        "block";


    renderCart();

}


/* =====================================================
   CLOSE CART
   ===================================================== */

function closeCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =====================================================
   RENDER CART
   ===================================================== */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty.</p>";

        if (totalElement) {

            totalElement.textContent =
                "0";

        }

        return;

    }


    let total = 0;


    cart.forEach(
        function(item, index) {

            const itemTotal =
                item.price *
                item.quantity;


            total += itemTotal;


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "cart-item";


            div.innerHTML = `

                <div class="cart-item-info">

                    <h4>
                        ${item.emoji}
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price}
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            `;


            container.appendChild(
                div
            );

        }
    );


    if (totalElement) {

        totalElement.textContent =
            total;

    }

}


/* =====================================================
   INCREASE QUANTITY
   ===================================================== */

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    renderCart();

    updateCartCount();

}


/* =====================================================
   DECREASE QUANTITY
   ===================================================== */

function decreaseQuantity(index) {

    if (
        cart[index].quantity > 1
    ) {

        cart[index].quantity--;

    }

    else {

        cart.splice(
            index,
            1
        );

    }


    saveCart();

    renderCart();

    updateCartCount();

}


/* =====================================================
   REMOVE CART ITEM
   ===================================================== */

function removeFromCart(index) {

    cart.splice(
        index,
        1
    );


    saveCart();

    renderCart();

    updateCartCount();

}


/* =====================================================
   CHECKOUT
   ===================================================== */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    closeCart();


    const modal =
        document.getElementById(
            "checkoutModal"
        );


    if (modal) {

        modal.style.display =
            "block";

    }

}


/* =====================================================
   CLOSE CHECKOUT
   ===================================================== */

function closeCheckout() {

    const modal =
        document.getElementById(
            "checkoutModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =====================================================
   PLACE ORDER
   ===================================================== */

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const payment =
        document.getElementById(
            "paymentMethod"
        ).value;


    let total = 0;


    cart.forEach(
        function(item) {

            total +=
                item.price *
                item.quantity;

        }
    );


    const order = {

        id:
            "ORD" +
            Date.now(),

        customer:
            customerName,

        username:
            localStorage.getItem(
                "foodCurrentUser"
            ),

        address:
            address,

        phone:
            phone,

        payment:
            payment,

        items:
            [...cart],

        total:
            total,

        status:
            "Order Placed",

        date:
            new Date().toLocaleString()

    };


    const orders =
        JSON.parse(
            localStorage.getItem(
                "orders"
            )
        ) || [];


    orders.push(
        order
    );


    localStorage.setItem(
        "orders",
        JSON.stringify(
            orders
        )
    );


    cart = [];


    saveCart();

    updateCartCount();

    closeCheckout();

    renderOrders();


    document
        .getElementById(
            "checkoutForm"
        )
        .reset();


    alert(
        "Order placed successfully! 🎉"
    );

}


/* =====================================================
   RENDER ORDERS
   ===================================================== */

function renderOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );


    if (!container) {
        return;
    }


    const username =
        localStorage.getItem(
            "foodCurrentUser"
        );


    const allOrders =
        JSON.parse(
            localStorage.getItem(
                "orders"
            )
        ) || [];


    const orders =
        allOrders.filter(
            function(order) {

                return (
                    order.username ===
                    username
                );

            }
        );


    container.innerHTML = "";


    if (orders.length === 0) {

        container.innerHTML =
            `
            <p class="no-orders">
                No orders placed yet.
            </p>
            `;

        return;

    }


    orders
        .slice()
        .reverse()
        .forEach(
            function(order) {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "order-card";


                const itemNames =
                    order.items
                        .map(
                            function(item) {

                                return (
                                    item.emoji +
                                    " " +
                                    item.name +
                                    " x" +
                                    item.quantity
                                );

                            }
                        )
                        .join(", ");


                div.innerHTML = `

                    <div class="order-header">

                        <strong>
                            ${order.id}
                        </strong>

                        <span class="status">
                            ${order.status}
                        </span>

                    </div>


                    <p>
                        ${itemNames}
                    </p>


                    <p>
                        <strong>
                            Total: ₹${order.total}
                        </strong>
                    </p>


                    <p>
                        Payment:
                        ${order.payment}
                    </p>


                    <p>
                        ${order.date}
                    </p>


                    <div class="progress">

                        <div class="progress-step active">
                            ✓
                            <br>
                            Placed
                        </div>

                        <div class="progress-step">
                            👨‍🍳
                            <br>
                            Preparing
                        </div>

                        <div class="progress-step">
                            🚴
                            <br>
                            Out for Delivery
                        </div>

                        <div class="progress-step">
                            🏠
                            <br>
                            Delivered
                        </div>

                    </div>

                `;


                container.appendChild(
                    div
                );

            }
        );

}


/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
   ===================================================== */

window.addEventListener(
    "click",
    function(event) {

        const cartModal =
            document.getElementById(
                "cartModal"
            );


        const checkoutModal =
            document.getElementById(
                "checkoutModal"
            );


        if (
            event.target ===
            cartModal
        ) {

            closeCart();

        }


        if (
            event.target ===
            checkoutModal
        ) {

            closeCheckout();

        }

    }
);


/* =====================================================
   INITIAL LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadFoods();

        updateCartCount();

        renderOrders();

    }
);