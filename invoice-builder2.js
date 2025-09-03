
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item");
    const invoice = document.getElementById("invoice");

    items.forEach(item => {
        item.addEventListener("dragstart", dragStart);
    });

    invoice.addEventListener("dragover", dragOver);
    invoice.addEventListener("drop", drop);

    function dragStart(e) {
        e.dataTransfer.setData("type", e.target.dataset.type);
    }

    function dragOver(e) {
        e.preventDefault();
        invoice.classList.add("drag-over");
    }

    function drop(e) {
        e.preventDefault();
        invoice.classList.remove("drag-over");

        const type = e.dataTransfer.getData("type");
        addComponent(type);
    }

    function addComponent(type) {
        // placeholder remove
        const placeholder = invoice.querySelector(".placeholder");
        if (placeholder) placeholder.remove();

        let element;
        switch (type) {
            case "text":
                element = document.createElement("p");
                element.contentEditable = true;
                element.textContent = "Editable text...";
                break;

            case "date":
                element = document.createElement("p");
                element.textContent = `Date: ${new Date().toLocaleDateString()}`;
                break;

            case "table":
                element = document.createElement("table");
                element.border = "1";
                element.style.width = "100%";
                element.innerHTML = `
          <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
          <tr><td>Sample</td><td>1</td><td>$100</td></tr>
        `;
                break;

            case "signature":
                element = document.createElement("p");
                element.textContent = "______________________ (Signature)";
                break;
        }

        if (element) invoice.appendChild(element);
    }
});
