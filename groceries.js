// Go Back
function goBack() {
    window.location.href = "index.html";
}


// -------- ADD ITEMS --------
function showAddItem() {

    document.getElementById("groceryDisplay").innerHTML = `
        <form onsubmit="saveItem(event)">
            <input type="text" id="itemName" placeholder="Item Name" required>
            <input type="number" id="quantity" placeholder="Quantity" required>
            <input type="number" id="price" placeholder="Price" required>
            <input type="number" id="expiryDays" placeholder="Expires in (days) - Optional">
            <button type="submit">Save Item</button>
        </form>
    `;
}


// -------- SAVE ITEM --------
function saveItem(event) {
    event.preventDefault();

    const name = document.getElementById("itemName").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const expiryDaysValue = document.getElementById("expiryDays").value;

    let expiryDate = null;

    if (expiryDaysValue !== "") {
        const today = new Date();
        expiryDate = new Date();
        expiryDate.setDate(today.getDate() + parseInt(expiryDaysValue));
    }

    let groceries = JSON.parse(localStorage.getItem("groceries")) || [];

    groceries.push({
        name,
        quantity,
        price,
        expiryDate: expiryDate ? expiryDate.toISOString() : null
    });

    localStorage.setItem("groceries", JSON.stringify(groceries));

    alert("Item Added Successfully!");
    viewItems();
}



// -------- VIEW ITEMS --------
function viewItems() {

    let groceries = JSON.parse(localStorage.getItem("groceries")) || [];

    if (groceries.length === 0) {
        document.getElementById("groceryDisplay").innerHTML = "<p>No items added.</p>";
        return;
    }

    let output = "";

    groceries.forEach((item, index) => {
        output += `
            <div style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.1); border-radius:10px;">
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Expiry Date: ${
    item.expiryDate 
    ? new Date(item.expiryDate).toDateString() 
    : "Not specified"
}</p>
                <div style="margin-top:10px; text-align:center;">
                    <button onclick="editItem(${index})" style="margin-right:10px; padding:5px 10px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">Edit</button>
                    <button onclick="deleteItem(${index})" style="padding:5px 10px; background:#f44336; color:white; border:none; border-radius:5px; cursor:pointer;">Delete</button>
                </div>
            </div>
        `;
    });

    document.getElementById("groceryDisplay").innerHTML = output;
}


// -------- EDIT ITEM --------
function editItem(index) {
    let groceries = JSON.parse(localStorage.getItem("groceries")) || [];
    let item = groceries[index];

    let expiryDaysValue = "";
    if (item.expiryDate) {
        const expiryDate = new Date(item.expiryDate);
        const today = new Date();
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        expiryDaysValue = diffDays > 0 ? diffDays : "";
    }

    document.getElementById("groceryDisplay").innerHTML = `
        <form onsubmit="updateItem(event, ${index})">
            <input type="text" id="itemName" placeholder="Item Name" value="${item.name}" required>
            <input type="number" id="quantity" placeholder="Quantity" value="${item.quantity}" required>
            <input type="number" id="price" placeholder="Price" value="${item.price}" required>
            <input type="number" id="expiryDays" placeholder="Expires in (days) - Optional" value="${expiryDaysValue}">
            <button type="submit" style="padding:5px 10px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">Update Item</button>
            <button type="button" onclick="viewItems()" style="margin-left:10px; padding:5px 10px; background:#008CBA; color:white; border:none; border-radius:5px; cursor:pointer;">Cancel</button>
            <button type="button" onclick="deleteItem(${index})" style="margin-left:10px; padding:5px 10px; background:#f44336; color:white; border:none; border-radius:5px; cursor:pointer;">Delete</button>
        </form>
    `;
}

// -------- UPDATE ITEM --------
function updateItem(event, index) {
    event.preventDefault();

    const name = document.getElementById("itemName").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const expiryDaysValue = document.getElementById("expiryDays").value;

    let expiryDate = null;

    if (expiryDaysValue !== "") {
        const today = new Date();
        expiryDate = new Date();
        expiryDate.setDate(today.getDate() + parseInt(expiryDaysValue));
    }

    let groceries = JSON.parse(localStorage.getItem("groceries")) || [];

    groceries[index] = {
        name,
        quantity,
        price,
        expiryDate: expiryDate ? expiryDate.toISOString() : null
    };

    localStorage.setItem("groceries", JSON.stringify(groceries));

    alert("Item Updated Successfully!");
    viewItems();
}

// -------- DELETE ITEM --------
function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        let groceries = JSON.parse(localStorage.getItem("groceries")) || [];
        groceries.splice(index, 1);
        localStorage.setItem("groceries", JSON.stringify(groceries));
        alert("Item Deleted Successfully!");
        viewItems();
    }
}

// -------- EXPIRING ITEMS (Next 5 Days Sorted) --------
function showExpiringItems() {

    let groceries = JSON.parse(localStorage.getItem("groceries")) || [];

    const today = new Date();

    // Filter items expiring in next 5 days
    let expiring = groceries
    .filter(item => item.expiryDate)   // ignore items without expiry
    .map(item => {

        const expiryDate = new Date(item.expiryDate);
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return { ...item, diffDays };

    }).filter(item => item.diffDays >= 0 && item.diffDays <= 5);

    // Sort from 1 day → 5 days
    expiring.sort((a, b) => a.diffDays - b.diffDays);

    if (expiring.length === 0) {
        document.getElementById("groceryDisplay").innerHTML = "<p>No items expiring in next 5 days.</p>";
        return;
    }

    let output = "";

    expiring.forEach(item => {
        output += `
            <div style="margin-bottom:15px; padding:10px; background:rgba(255,0,0,0.2); border-radius:10px;">
                <p><strong>${item.name}</strong></p>
                <p>Expires in: ${item.diffDays} day(s)</p>
            </div>
        `;
    });

    document.getElementById("groceryDisplay").innerHTML = output;
}