function showBlocksCollectionsPage() {

    const workspace = document.getElementById("blocks-workspace");

    workspace.innerHTML = "";

    addBreadcrumb(workspace, [
        {
            name: "Blocks"
        },
        {
            name: "Collections"
        }
    ]);


    const heading = document.createElement("h1");

    heading.textContent = "Blocks: Collections";

    workspace.appendChild(heading);

}