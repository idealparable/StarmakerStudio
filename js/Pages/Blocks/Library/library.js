const blockColumns = [

    {
        key: "id",
        label: "ID",
        editable: false
    },

    {
        key: "guin",
        label: "GUIN",
        editable: true,
        editorHeight: 40
    },

    {
        key: "name",
        label: "Name",
        editable: true,
        editorHeight: 40
    },

    {
        key: "description",
        label: "Description",
        editable: true,
        editorHeight: 180
    },

    {
        key: "js",
        label: "JS",
        editable: true,
        editorHeight: 350
    },

    {
        key: "text",
        label: "Text",
        editable: true,
        editorHeight: 250
    },

    {
        key: "data",
        label: "Data",
        editable: true,
        editorHeight: 180
    },

    {
        key: "path",
        label: "Path",
        editable: true,
        editorHeight: 60
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


let activeEditor = null;

let libraryStatus = null;


async function loadBlocksInto(table) {

    showLibraryStatus("Loading...", false);

    try {

                const response = await fetch(BLOCK_API);

                const data = await response.json();

                showLibraryStatus("Loaded.");

            table.innerHTML = "";


            // Table header

            const thead = document.createElement("thead");

            const header = document.createElement("tr");

            blockColumns.forEach(column => {

                const cell = document.createElement("th");

                cell.textContent = column.label;

                header.appendChild(cell);

            });

            thead.appendChild(header);

            table.appendChild(thead);


            // Table body

            const tbody = document.createElement("tbody");

            table.appendChild(tbody);


            // Data rows

            data.results.forEach(block => {

                const row = document.createElement("tr");

                row.cellsByColumn = {};

                blockColumns.forEach(column => {

                    const cell = document.createElement("td");

                    cell.textContent = block[column.key] || "";

                    if (column.editable) {

                        cell.onclick = function () {

                            editBlockCell(cell, block, column);

                        };

                    }

                    row.appendChild(cell);

                    row.cellsByColumn[column.key] = cell;

                });

                block.row = row;

                tbody.appendChild(row);

            });

    }

    catch {

        showLibraryStatus("Load failed.");

    }
}


async function saveBlock(block) {

    const response = await fetch(BLOCK_API, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(block)

    });

    return await response.json();

}


function editBlockCell(cell, block, column) {

    if (activeEditor) {

        activeEditor.blur();

    }

    if (cell.querySelector("textarea")) {

        return;

    }


    const input = document.createElement("textarea");

    const style = getComputedStyle(cell);

    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);

    const width =
        cell.clientWidth -
        paddingLeft -
        paddingRight;


    input.value = block[column.key] || "";

    input.style.width = width + "px";

    cell.textContent = "";

    cell.appendChild(input);

    resizeEditor(input, column);

    input.oninput = function () {

        resizeEditor(input, column);

    };

    input.style.height = "auto";

    const maxHeight = column.editorHeight || 180;

    input.style.height =
        Math.min(input.scrollHeight, maxHeight) + "px";

    input.style.maxHeight = maxHeight + "px";
    


    


    input.focus();

    activeEditor = input;


    async function finishEdit() {

        activeEditor = null;

        const newValue = input.value;

        block[column.key] = newValue;

        cell.textContent = newValue;

        showLibraryStatus("Saving...", false);

        try {

            await saveBlock(block);

            block.modified = new Date().toISOString().replace("T", " ").substring(0, 19);

            block.row.cellsByColumn.modified.textContent = block.modified;

            showLibraryStatus("Saved.");
        }

        catch {

            showLibraryStatus("Save failed.");        }

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

function resizeEditor(input, column) {

    input.style.height = "auto";

    input.style.height =
        Math.min(
            input.scrollHeight,
            column.editorHeight || 180
        ) + "px";

}


function showLibraryStatus(text, clearAfter = true) {

    libraryStatus.textContent = text;

    if (!clearAfter) {

        return;

    }

    setTimeout(function () {

        if (libraryStatus.textContent === text) {

            libraryStatus.textContent = "";

        }

    }, 1500);

}