// DEFAULT MENU

let adminFoods = JSON.parse(
    localStorage.getItem("adminFoods")
) || [

    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        restaurant: "Italiano Restaurant",
        price: 249,
        emoji: "🍕"
    },

    {
        id: 2,
        name: "Chicken Burger",
        category: "Burger",
        restaurant: "Burger House",
        price: 179,
        emoji: "🍔"
    },

    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        restaurant: "Hyderabad Biryani",
        price: 299,
        emoji: "🍛"
    },

    {
        id: 4,
        name: "Veg Biryani",
        category: "Biryani",
        restaurant: "Spice Kitchen",
        price: 199,
        emoji: "🍛"
    },

    {
        id: 5,
        name: "Paneer Pizza",
        category: "Pizza",
        restaurant: "Italiano Restaurant",
        price: 279,
        emoji: "🍕"
    },

    {
        id: 6,
        name: "Cheese Burger",
        category: "Burger",
        restaurant: "Burger House",
        price: 159,
        emoji: "🍔"
    },

    {
        id: 7,
        name: "Fried Rice",
        category: "Chinese",
        restaurant: "China Town",
        price: 189,
        emoji: "🥡"
    },

    {
        id: 8,
        name: "Noodles",
        category: "Chinese",
        restaurant: "China Town",
        price: 169,
        emoji: "🍜"
    },

    {
        id: 9,
        name: "Chocolate Cake",
        category: "Dessert",
        restaurant: "Sweet Corner",
        price: 129,
        emoji: "🍰"
    },

    {
        id: 10,
        name: "Ice Cream",
        category: "Dessert",
        restaurant: "Sweet Corner",
        price: 99,
        emoji: "🍨"
    },

    {
        id: 11,
        name: "Farmhouse Pizza",
        category: "Pizza",
        restaurant: "Pizza Point",
        price: 299,
        emoji: "🍕"
    },

    {
        id: 12,
        name: "Double Cheese Burger",
        category: "Burger",
        restaurant: "Burger House",
        price: 229,
        emoji: "🍔"
    }

];


// SAVE MENU

function saveFoods() {

    localStorage.setItem(
        "adminFoods",
        JSON.stringify(adminFoods)
    );

}


// LOAD ORDERS

function loadOrders() {

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    const table =
        document.getElementById("ordersTable");


    table.innerHTML = "";


    if (orders.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="7"
                    style="text-align:center;padding:30px;">

                    No orders available.

                </td>

            </tr>

        `;

        updateStats([]);

        return;
    }


    orders.slice().reverse().forEach(order => {

        const items =
            order.items
                .map(
                    item =>
                        `${item.name} × ${item.quantity}`
                )
                .join(", ");


        table.innerHTML += `

            <tr>

                <td>
                    <strong>${order.id}</strong>
                </td>

                <td>
                    ${order.customer}
                </td>

                <td>
                    ${items}
                </td>

                <td>
                    ₹${order.total}
                </td>

                <td>
                    ${order.payment}
                </td>

                <td>

                    <select
                        class="status-select"
                        onchange="updateOrderStatus('${order.id}', this.value)"
                    >

                        <option
                            value="Order Placed"
                            ${order.status === "Order Placed" ? "selected" : ""}
                        >
                            Order Placed
                        </option>

                        <option
                            value="Preparing"
                            ${order.status === "Preparing" ? "selected" : ""}
                        >
                            Preparing
                        </option>

                        <option
                            value="Out for Delivery"
                            ${order.status === "Out for Delivery" ? "selected" : ""}
                        >
                            Out for Delivery
                        </option>

                        <option
                            value="Delivered"
                            ${order.status === "Delivered" ? "selected" : ""}
                        >
                            Delivered
                        </option>

                    </select>

                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteOrder('${order.id}')"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `;
    });


    updateStats(orders);

}


// UPDATE ORDER STATUS

function updateOrderStatus(id, status) {

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    const order =
        orders.find(
            item => item.id === id
        );


    if (order) {

        order.status = status;

    }


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadOrders();

}


// DELETE ORDER

function deleteOrder(id) {

    if (
        !confirm(
            "Are you sure you want to delete this order?"
        )
    ) {

        return;

    }


    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    orders =
        orders.filter(
            order => order.id !== id
        );


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadOrders();

}


// UPDATE STATISTICS

function updateStats(orders) {

    document.getElementById(
        "totalOrders"
    ).textContent = orders.length;


    const revenue =
        orders.reduce(
            (total, order) =>
                total + Number(order.total),
            0
        );


    document.getElementById(
        "totalRevenue"
    ).textContent =
        "₹" + revenue;


    document.getElementById(
        "totalMenuItems"
    ).textContent =
        adminFoods.length;


    const customers =
        new Set(
            orders.map(
                order => order.customer
            )
        );


    document.getElementById(
        "totalCustomers"
    ).textContent =
        customers.size;

}


// DISPLAY MENU

function displayAdminFoods() {

    const container =
        document.getElementById(
            "adminFoodContainer"
        );


    container.innerHTML = "";


    adminFoods.forEach(food => {

        container.innerHTML += `

            <div class="admin-food-card">

                <div class="admin-food-image">
                    ${food.emoji}
                </div>

                <h3>
                    ${food.name}
                </h3>

                <p>
                    ${food.category}
                </p>

                <p>
                    ${food.restaurant}
                </p>

                <div class="food-price">
                    ₹${food.price}
                </div>

                <button
                    class="delete-btn"
                    onclick="deleteFood(${food.id})"
                >
                    Delete
                </button>

            </div>

        `;
    });

}


// OPEN ADD FOOD

function openAddFood() {

    document.getElementById(
        "foodModal"
    ).style.display = "block";

}


// CLOSE FOOD MODAL

function closeFoodModal() {

    document.getElementById(
        "foodModal"
    ).style.display = "none";

}


// ADD FOOD

function addFood(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "foodName"
        ).value;


    const category =
        document.getElementById(
            "foodCategory"
        ).value;


    const restaurant =
        document.getElementById(
            "foodRestaurant"
        ).value;


    const price =
        Number(
            document.getElementById(
                "foodPrice"
            ).value
        );


    const emoji =
        document.getElementById(
            "foodEmoji"
        ).value;


    const newFood = {

        id: Date.now(),

        name: name,

        category: category,

        restaurant: restaurant,

        price: price,

        emoji: emoji

    };


    adminFoods.push(newFood);


    saveFoods();

    displayAdminFoods();


    document
        .getElementById("foodForm")
        .reset();


    closeFoodModal();


    alert(
        "Food item added successfully! 🍔"
    );


    updateStats(
        JSON.parse(
            localStorage.getItem("orders")
        ) || []
    );

}


// DELETE FOOD

function deleteFood(id) {

    if (
        !confirm(
            "Delete this food item?"
        )
    ) {

        return;

    }


    adminFoods =
        adminFoods.filter(
            food => food.id !== id
        );


    saveFoods();

    displayAdminFoods();


    document.getElementById(
        "totalMenuItems"
    ).textContent =
        adminFoods.length;

}


// CLOSE MODAL WHEN OUTSIDE CLICK

window.onclick = function(event) {

    const modal =
        document.getElementById(
            "foodModal"
        );


    if (event.target === modal) {

        closeFoodModal();

    }

};


// INITIAL LOAD

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadOrders();

        displayAdminFoods();

    }
);
