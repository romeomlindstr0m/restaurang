let inventoryItems;
let orderItems = [];

function sendOrderToSessionStorage() {
    const orderCount = getOrderCount() + 1;
    const orderKey = `order${orderCount}`;
    const orderWithState = {
        items: orderItems,
        order_state: "awaiting_work"
    };
    const orders = JSON.stringify(orderWithState);
    sessionStorage.setItem(orderKey, orders);
    sessionStorage.setItem('orderCount', orderCount.toString());
    orderItems = [];
}

function getOrderCount() {
    const count = sessionStorage.getItem('orderCount');
    return count ? parseInt(count, 10) : 0;
}

document.getElementById('orderConfirmationButton').addEventListener('click', sendOrderToSessionStorage);

function displayOrderList() {
    let inventoryContainer = document.getElementById("ordersModalBody");
    let htmlContent = "";

    const donenessOptions = {
        "0": "Rare",
        "1": "Medium",
        "2": "Well Done"
    };

    const potatoOptions = {
        "0": "Klyftpotatis",
        "1": "Pommes Frites",
        "2": "Rostad Potatis",
        "3": "Smörstekt Potatis"
    };

    Object.values(orderItems).forEach((item, index) => {
        let itemName = inventoryItems[item.itemID].items_name || "";
        let itemTotalPrice = inventoryItems[item.itemID].items_price * item.itemAmount || "";
        let itemDonenessOption = item.itemDonenessOption !== null && item.itemDonenessOption in donenessOptions ? donenessOptions[item.itemDonenessOption] : null;
        let itemPotatoOption = item.itemPotatoOption !== null && item.itemPotatoOption in potatoOptions ? potatoOptions[item.itemPotatoOption] : null;
        let itemAdditionalInformation = item.itemAdditionalInformation;

        htmlContent += `
        <div class="card mt-2">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                    <h5 class="card-title">${itemName} (x${item.itemAmount}) <i class="bi bi-trash ms-3" onclick="removeItemFromOrder(${index})"></i></h5>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center">
                        <h5>${itemTotalPrice} €</h5>
                    </div>
                </div>`;

        if (itemDonenessOption || itemPotatoOption || itemAdditionalInformation) {
            htmlContent += `
                <div class="accordion" id="accordionExample${index}">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                                More Details
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample${index}">
                            <div class="accordion-body">`;

            if (itemAdditionalInformation) {
                htmlContent += `<strong>Tilläggsinformation:</strong> ${itemAdditionalInformation}<br>`;
            }
            if (itemDonenessOption) {
                htmlContent += `<strong>Stekningsgrad:</strong> ${itemDonenessOption}<br>`;
            }
            if (itemPotatoOption) {
                htmlContent += `<strong>Potatis alternativ:</strong> ${itemPotatoOption}<br>`;
            }

            htmlContent += `
                            </div>
                        </div>
                    </div>
                </div>`;
        }

        htmlContent += `
            </div>
        </div>`;
    });
    inventoryContainer.innerHTML = htmlContent;
}

function removeItemFromOrder(index) {
    orderItems.splice(index, 1);
    displayOrderList();
}

function addItemToOrder() {
    let confirmBtn = document.getElementById('confirmOrder');
    let itemID = confirmBtn.getAttribute('order-object-id');
    let itemAmount = document.getElementById('amountInput').value;
    let itemAdditionalInformation = document.getElementById('additionalInformation').value;
    let itemPotatoOption = null;
    let itemDonenessOption = null;

    if (inventoryItems[itemID].items_potato_options == 1) {
        let potatoSelectionRadio = document.querySelector('input[name="potatoSelectionRadios"]:checked');
        itemPotatoOption = potatoSelectionRadio.value;
    }

    if (inventoryItems[itemID].items_doneness_options == 1) {
        let donenessSelectionRadio = document.querySelector('input[name="donenessSelectionRadios"]:checked');
        itemDonenessOption = donenessSelectionRadio.value;
    }

    let order = {itemID, itemAmount, itemAdditionalInformation, itemPotatoOption, itemDonenessOption};
    orderItems.push(order);
}

function displayItemToOrder(itemID) {
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
    let confirmBtn = document.getElementById('confirmOrder');
    confirmBtn.setAttribute('order-object-id', objectItemID);
    document.getElementById('amountInput').value = '1';
    document.getElementById('additionalInformation').value = '';
    document.getElementById('donenessSelectionRadios1').checked = true;
    document.getElementById('potatoSelectionRadios1').checked = true;
    selectionModal.show();
}

document.getElementById('confirmOrder').addEventListener("click", addItemToOrder);

document.getElementById('order_button').addEventListener('click', displayOrderList);

function printInventory(categoryID) {
    let inventoryContainer = document.getElementById("inventoryContainer");
    let htmlContent = "";
    Object.values(inventoryItems).forEach(item => {
        if (item.items_category == categoryID) {
        let itemName = item.items_name || "";
        let itemDescription = item.items_description || "";
        let itemPrice = item.items_price || "";
        htmlContent += `<span onclick="displayItemToOrder(` + item.items_ID + `)">
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