function showBlocksDesignerPage() {

    const workspace = document.getElementById("blocks-workspace");

    workspace.innerHTML = "";


    addBreadcrumb(workspace, [
        {
            name: "Blocks"
        },
        {
            name: "Designer"
        }
    ]);


    const heading = document.createElement("h1");

    heading.textContent = "Blocks: Designer";

    workspace.appendChild(heading);

}