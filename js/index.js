let inventoryItems;
let orderItems;

function addItemToOrder(itemID) {
    console.log(itemID);
}

function printInventory(categoryID) {
    let inventoryContainer = document.getElementById("inventoryContainer");
    let htmlContent = "";
    for (let i = 0; i < inventoryItems.length; i++) {
        if (inventoryItems[i].items_category === categoryID) {
            htmlContent += '<div class="card mt-2"> <span onclick="addItemToOrder(' + inventoryItems[i].items_ID + ')"> <div class="card-body"> <h5 class="card-title">' + inventoryItems[i].items_name + '</h5>';
            
            if (inventoryItems[i].items_description !== null) {
                htmlContent += '<p class="card-text">' + inventoryItems[i].items_description + '</p>';
            }

            htmlContent += '</div> </span> </div>';
        }
    }
    inventoryContainer.innerHTML = htmlContent;
}

async function fetchInventory() {
    try {
        const response = await fetch("http://localhost/restaurang/api/InventoryAPI.php");
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const inventory = await response.json();
        inventoryItems = inventory;
        printInventory(1);
    } catch (error) {
        console.error("Could not fetch inventory:", error);
    }
}

fetchInventory();