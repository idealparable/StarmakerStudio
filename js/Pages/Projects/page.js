function showProjectsPage() {

    const page = document.createElement("section");

    page.className = "studio-page";


    addBreadcrumb(page, [
        {
            name: "Studio",
            action: showStudioMenu
        },
        {
            name: "Projects"
        }
    ]);


    const heading = document.createElement("h1");

    heading.textContent = "Projects";

    page.appendChild(heading);


    const intro = document.createElement("p");

    intro.textContent =
        "Create worlds, games, and more with intuitive visual coding blocks.";

    page.appendChild(intro);


    const newButton = document.createElement("button");

    newButton.textContent = "Create New Project";

    newButton.onclick = createNewProject;

    page.appendChild(newButton);


    const projectTitle = document.createElement("h2");

    projectTitle.textContent = "Existing Projects";

    page.appendChild(projectTitle);


    const projectList = document.createElement("div");

    projectList.textContent = "Loading projects...";

    page.appendChild(projectList);


    loadProjectsInto(projectList);


    showPage(page);

}