const blockColumns = [

    {
        key: "id",
        label: "ID",
        editable: false
    },

    {
        key: "guin",
        label: "GUIN",
        editable: true
    },

    {
        key: "name",
        label: "Name",
        editable: true
    },

    {
        key: "description",
        label: "Description",
        editable: true
    },

    {
        key: "js",
        label: "JS",
        editable: true
    },

    {
        key: "text",
        label: "Text",
        editable: true
    },

    {
        key: "data",
        label: "Data",
        editable: true
    },

    {
        key: "path",
        label: "Path",
        editable: true
    },

    {
        key: "created",
        label: "Created",
        editable: false
    },

    {
        key: "modified",
        label: "Modified",
        editable: false
    }

];


async function loadBlocksInto(table) {

    const response = await fetch(BLOCK_API);

    const data = await response.json();

    table.innerHTML = "";


    // Header row

    const header = document.createElement("tr");

    blockColumns.forEach(column => {

        const cell = document.createElement("td");

        cell.textContent = block[column.key] || "";


        if (column.editable) {

            cell.onclick = function() {

                editBlockCell(cell, block, column);

            };

        }


        row.appendChild(cell);

    });

    table.appendChild(header);


    // Data rows

    data.results.forEach(block => {

        const row = document.createElement("tr");

        blockColumns.forEach(column => {

            const cell = document.createElement("td");

            cell.textContent = block[column.key] || "";

            row.appendChild(cell);

        });

        table.appendChild(row);

    });

}



function editBlockCell(cell, block, column) {

    if (cell.querySelector("input")) {

        return;

    }


    const input = document.createElement("input");

    input.value = block[column.key] || "";


    cell.textContent = "";

    cell.appendChild(input);


    input.focus();


    function finishEdit() {

        const newValue = input.value;

        block[column.key] = newValue;

        cell.textContent = newValue;

    }


    input.onblur = finishEdit;


    input.onkeydown = function(event) {

        if (event.key === "Enter") {

            finishEdit();

        }

        if (event.key === "Escape") {

            cell.textContent = block[column.key] || "";

        }

    };

}
