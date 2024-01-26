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
    Object.values(inventoryItems).forEach(item => {
        if (item.items_category == categoryID) {
        let itemName = item.items_name || "";
        let itemDescription = item.items_description || "";
        let itemPrice = item.items_price || "";
        htmlContent += `<span onclick="addItemToOrder(` + item.items_ID + `)">
                            <div class="card mt-2">
                                <div class="card-body">
                                    <div class="row">    
                                        <div class="col">
                                            <h5 class="card-title">${itemName}</h5>
                                            <p class="card-text">${itemDescription}</p>
                                        </div>
                                    
                                        <div class="col d-flex justify-content-end align-items-center">
                                            <h5>${itemPrice} €</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>`;
        }
    });
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