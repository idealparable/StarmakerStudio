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



    const table = document.createElement("table");

    table.id = "blocks-table";

    workspace.appendChild(table);



    loadBlocksInto(table);

}