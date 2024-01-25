let inventoryItems;
let orderItems;

function addItemToOrder(itemID) {
    let objectItemID = 0;
    for (let i = 0; i < inventoryItems.length; i++) {
        if (inventoryItems[i].items_ID == itemID) {
            objectItemID = i;
            break;
        }
    }
    if (inventoryItems[objectItemID].items_potato_options == 1) {
        document.getElementById('potatoSelectionContainer').style.display = "block";
    } else {
        document.getElementById('potatoSelectionContainer').style.display = "none";
    }

    if (inventoryItems[objectItemID].items_doneness_options == 1) {
        document.getElementById('donenessSelectionContainer').style.display = "flex";
        document.getElementById('donenessSelectionHeading').style.display = "block";
        document.getElementById('donenessSelectionContainer').style.justifyContent = "center";
    } else {
        document.getElementById('donenessSelectionContainer').style.display = "none";
        document.getElementById('donenessSelectionHeading').style.display = "none";
    }
    let selectionModal = new bootstrap.Modal(document.getElementById('selectionModal'));
    document.getElementById('modalTitle').innerHTML = inventoryItems[objectItemID].items_name;
    selectionModal.show();
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