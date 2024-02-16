inventoryItems = [];

async function fetchInventory() {
    try {
        const response = await fetch("http://localhost/restaurang/api/InventoryAPI.php");
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const inventory = await response.json();
        inventoryItems = inventory;
    } catch (error) {
        console.error("Could not fetch inventory:", error);
    }
}

fetchInventory();

async function updateOrderState(orderKey, newState) {
    const orderStr = localStorage.getItem(orderKey);
    if (orderStr) {
        const order = JSON.parse(orderStr);
        order.order_state = newState;
        localStorage.setItem(orderKey, JSON.stringify(order));
        printSessionOrders(); // Refresh the display after state update
    }
}

async function printSessionOrders() {
    await fetchInventory(); // Ensure inventory is fetched

    // Define the container IDs for different order states
    const containers = {
        'awaiting_work': 'awaiting_orders',
        'undergoing_work': 'undergoing_work_orders',
        'completed': 'completed_orders'
    };

    // Clear existing order details to avoid duplication
    Object.values(containers).forEach(containerId => {
        document.getElementById(containerId).innerHTML = '<div class="row"></div>'; // Prepare a row container
    });

    const orderCount = parseInt(localStorage.getItem('orderCount'), 10);
    for (let i = 1; i <= orderCount; i++) {
        const key = `order${i}`;
        const orderStr = localStorage.getItem(key);
        
        const order = JSON.parse(orderStr);
        const containerId = containers[order.order_state];
        if (!containerId) {
            console.error(`Unknown order state for key ${key}: ${order.order_state}`);
            continue; // Skip this order if the state doesn't match
        }

        order.items.forEach(item => {
            const itemIndex = parseInt(item.itemID, 10);
            const inventoryItem = inventoryItems[itemIndex];
        
            if (inventoryItem) {
                const card = document.createElement('div');
                card.classList.add('card', 'col-sm-4');
                let buttonsHTML = '';
                if (order.order_state !== 'awaiting_work') {
                    buttonsHTML += `<button class="btn btn-primary mt-2" onclick="updateOrderState('${key}', 'awaiting_work')">Flytta till väntande</button>`;
                }
                if (order.order_state !== 'undergoing_work') {
                    buttonsHTML += `<button class="btn btn-secondary mt-2" onclick="updateOrderState('${key}', 'undergoing_work')">Flytta till påbörjade</button>`;
                }
                if (order.order_state !== 'completed') {
                    buttonsHTML += `<button class="btn btn-success mt-2" onclick="updateOrderState('${key}', 'completed')">Flytta till slutförda</button>`;
                }

                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">Item Name: ${inventoryItem.items_name}</h5>
                        <p class="card-text">Amount: ${item.itemAmount}</p>
                        <p class="card-text">Additional Information: ${item.itemAdditionalInformation || 'None'}</p>
                        <div class="card-buttons">${buttonsHTML}</div>
                    </div>
                `;

                document.querySelector(`#${containerId} .row`).appendChild(card);
            }
        });
    }
}

printSessionOrders();
