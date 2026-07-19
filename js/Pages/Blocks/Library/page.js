function showBlocksLibraryPage() {

    const workspace = document.getElementById("blocks-workspace");

    workspace.innerHTML = "";


    addBreadcrumb(workspace, [
        {
            name: "Blocks"
        },
        {
            name: "Library"
        }
    ]);


    const heading = document.createElement("h1");

    heading.textContent = "Blocks: Library";

    workspace.appendChild(heading);



    const newButton = document.createElement("button");

    newButton.textContent = "New Block";

    newButton.onclick = function() {

        alert("New Block coming soon!");

    };

    workspace.appendChild(newButton);



    const tableWrapper = document.createElement("div");

    tableWrapper.className = "library-table-wrapper";

    const table = document.createElement("table");

    table.className = "library-table";

    tableWrapper.appendChild(table);

    workspace.appendChild(tableWrapper);

    loadBlocksInto(table);

}