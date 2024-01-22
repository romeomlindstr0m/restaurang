let inventoryItems;

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

function printInventory(categoryID) {
    for (let i = 0; i < inventoryItems.length; i++) {
        if (inventoryItems[i].items_category === categoryID) {
        console.log(inventoryItems[i]);
        }
    }
}