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

}