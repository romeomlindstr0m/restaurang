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
        document.getElementById(containerId).innerHTML = '';
    });

    const orderCount = parseInt(sessionStorage.getItem('orderCount'), 10);
    for (let i = 1; i <= orderCount; i++) {
        const key = `order${i}`;
        const orderStr = sessionStorage.getItem(key);
        
        const order = JSON.parse(orderStr);
        const containerId = containers[order.order_state];
        if (!containerId) {
            console.error(`Unknown order state for key ${key}: ${order.order_state}`);
            continue; // If the order state doesn't match, skip this order
        }

        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order', `order-${i}`);

        order.items.forEach(item => {
            const itemIndex = parseInt(item.itemID, 10); // Convert itemID to an integer index
            const inventoryItem = inventoryItems.find(it => it.items_ID === item.itemID);
        
            // Check if the item exists at that index
            if (inventoryItem) {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
        
                itemElement.innerHTML = `
                    <p>Item Name: ${inventoryItem.items_name}</p>
                    <p>Amount: ${item.itemAmount}</p>
                    <p>Additional Information: ${item.itemAdditionalInformation || 'None'}</p>
                `;
        
                orderDiv.appendChild(itemElement);
            } else {
                // If there is no item at that index, display a not found message
                const itemElement = document.createElement('p');
                itemElement.textContent = `Item with index ${itemIndex} not found`;
                orderDiv.appendChild(itemElement);
            }
        });
    }
}
        

printSessionOrders();