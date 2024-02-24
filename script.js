//This project aims to solve the problem of managing a grocery shopping list efficiently. Its capabilities include adding products with their quantities and prices, calculating total prices, and allowing users to download the list for reference. 

//Functions and features:
//- Adding products with quantities and prices
//- Automatic calculation of total prices
//- Downloading the list in a text file format

//Libraries and frameworks used:
//- **jsPDF**: For generating PDF files.
//- **html2canvas**: For capturing screenshots of HTML content.

//This project is useful for individuals or families who want to keep track of their grocery items, prices, and total expenses. Users can benefit by:
//- Having an organized shopping list that can be easily updated and managed.
//- Keeping track of total expenses to stay within budget.
//- Conveniently downloading the list for reference while shopping.

function addProduct() {
    var productName = prompt("Enter the product name:");
    var quantity = parseFloat(prompt("Enter the quantity:"));
    var pricePerUnit = parseFloat(prompt("Enter the price per unit:"));
    
    if (isNaN(quantity) || isNaN(pricePerUnit)) {
        alert("Invalid input. Please enter valid numbers.");
        return;
    }
    
    var total = quantity * pricePerUnit;
    
    var table = document.getElementById("shoppingList");
    var row = table.insertRow(-1);
    var productNameCell = row.insertCell(0);
    var quantityCell = row.insertCell(1);
    var pricePerUnitCell = row.insertCell(2);
    var totalPriceCell = row.insertCell(3);
    
    productNameCell.innerHTML = productName;
    quantityCell.innerHTML = quantity;
    pricePerUnitCell.innerHTML = "$" + pricePerUnit.toFixed(2);
    totalPriceCell.innerHTML = "$" + total.toFixed(2);
    
    updateTotalAmount(total);
}

function updateTotalAmount(amount) {
    var totalAmountElement = document.getElementById("totalAmount");
    var currentTotal = parseFloat(totalAmountElement.textContent.split("$")[1]);
    var newTotal = currentTotal + amount;
    totalAmountElement.textContent = "Total Amount: $" + newTotal.toFixed(2);
}

function downloadList() {
    var table = document.getElementById("shoppingList");
    var rows = table.rows;
    var listContent = "";

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells;
        for (var j = 0; j < cells.length; j++) {
            listContent += cells[j].innerText + "\t";
        }
        listContent += "\n";
    }

    var blob = new Blob([listContent], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "shopping_list.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
