document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item");
    const invoiceBody = document.getElementById("invoice-body");
    const grandTotalCell = document.getElementById("grand-total");

    //--- Drag start ---
    items.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("name", item.dataset.name);
            e.dataTransfer.setData("price", item.dataset.price);
        });
    });

    //--- Allow Drop ---
    const invoice = document.querySelector(".invoice");
    invoice.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    //--- Drop Item ---
    invoice.addEventListener("drop", (e) => {
        e.preventDefault();
        const name = e.dataTransfer.getData("name");
        const price = parseFloat(e.dataTransfer.getData("price"));

        addInvoiceRow(name, price);
    });

    // --- Add row to invoice ---
    function addInvoiceRow(name, price) {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td><input type="number" value="1" min="1" class="qty"></td>
        <td class="total">${price}</td>
    `;

        invoiceBody.appendChild(row);

        // Quantity change event
        row.querySelector(".qty").addEventListener("input", (e) => {
            const qty = parseInt(e.target.value) || 1;
            const totalCell = row.querySelector(".total");
            totalCell.textContent = price * qty;
            updateGrandTotal();
        });

        updateGrandTotal();
    }


    //--- Update Grand Total ---
    function updateGrandTotal() {
        let sum = 0;
        document.querySelectorAll(".total").forEach(cell => {
            sum += parseFloat(cell.textContent);
        });
        grandTotalCell.textContent = sum;
    }
});
