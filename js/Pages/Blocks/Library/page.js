function showBlocksLibraryPage() {

    const workspace = document.getElementById("blocks-workspace");

    workspace.innerHTML = "";

    const content = document.createElement("div");

    content.className = "page-content";

    workspace.appendChild(content);

    addBreadcrumb(content, [
        {
            name: "Blocks"
        },
        {
            name: "Library"
        }
    ]);


    const heading = document.createElement("h1");

    heading.textContent = "Blocks: Library";

    content.appendChild(heading);

    const help = document.createElement("p");

    help.className = "page-help";

    help.textContent =
        "Click a cell to edit it. Press Enter or click elsewhere to save. Press Escape to cancel.";

    content.appendChild(help);

    const tableWrapper = document.createElement("div");

    tableWrapper.className = "library-table-wrapper";

    const table = document.createElement("table");

    table.className = "library-table";

    tableWrapper.appendChild(table);

    content.appendChild(tableWrapper);

    const bottomBar = document.createElement("div");

    bottomBar.className = "library-bottom-bar";

    const status = document.createElement("span");

    status.className = "library-status";

    bottomBar.appendChild(status);

    libraryStatus = status;


    const controls = document.createElement("div");

    controls.className = "library-controls";

    bottomBar.appendChild(controls);

    const newButton = document.createElement("button");

    newButton.textContent = "New Block";

    newButton.onclick = function () {

        alert("New Block coming soon!");

    };

    controls.appendChild(newButton);


    workspace.appendChild(bottomBar);

    loadBlocksInto(table);

}