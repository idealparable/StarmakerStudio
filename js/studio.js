// Starmaker Studio core

const PROJECT_API = "https://proud-pine-7dab.idealparable.workers.dev/";

const workspace = document.getElementById("workspace");


// Basic Studio memory

let studioData = {

    recentProjects: [],

    currentProject: null

};



// Change what appears in the workspace

function showPage(content) {

    workspace.innerHTML = "";

    workspace.appendChild(content);

}



// Create a simple page container

function createPage(title, text = "") {

    const page = document.createElement("section");

    page.className = "studio-page";


    const heading = document.createElement("h1");

    heading.textContent = title;


    page.appendChild(heading);


    if (text) {

        const paragraph = document.createElement("p");

        paragraph.textContent = text;

        page.appendChild(paragraph);

    }


    return page;

}



// Welcome screen

function showWelcome() {

    const page = createPage(
        "Welcome to Starmaker Studio",
        "Create worlds, games, and more with intuitive visual coding blocks."
    );


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



// Create project

function createNewProject() {

    const page = createPage(
        "Create New Project",
        "Set up your project details."
    );


    const nameLabel = document.createElement("p");
    nameLabel.textContent = "Project Name:";

    page.appendChild(nameLabel);


    const nameInput = document.createElement("input");

    nameInput.value = "Untitled Project";

    page.appendChild(nameInput);



    const typeLabel = document.createElement("p");

    typeLabel.textContent = "Project Type:";

    page.appendChild(typeLabel);



    const typeInput = document.createElement("input");

    typeInput.value = "game";

    page.appendChild(typeInput);



    const createButton = document.createElement("button");

    createButton.textContent = "Create";

    createButton.onclick = async function() {

        await saveNewProject(
            nameInput.value,
            typeInput.value
        );

    };


    page.appendChild(createButton);



    const cancelButton = document.createElement("button");

    cancelButton.textContent = "Cancel";

    cancelButton.onclick = showWelcome;

    page.appendChild(cancelButton);


    showPage(page);

}

async function saveNewProject(name, type) {


    const project = {

        name: name,

        type: type,

        data: JSON.stringify({
            blocks: []
        })

    };


    const response = await fetch(
        PROJECT_API,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(project)
        }
    );


    const result = await response.json();


    console.log(result);


    showWelcome();

}



// Project page

async function loadProjectsInto(container) {

    try {

        const response = await fetch(PROJECT_API);

        const data = await response.json();


        container.innerHTML = "";


        if (data.results.length === 0) {

            container.textContent = "No projects found.";

            return;

        }


        data.results.forEach(project => {


            const card = document.createElement("div");

            card.className = "project-card";



            const button = document.createElement("button");

            button.textContent = project.name;


            button.onclick = function() {

                studioData.currentProject = project;

                showProjectPage();

            };


            card.appendChild(button);



            const info = document.createElement("p");

            info.textContent =
                `${project.type || "Unknown type"} | Modified: ${project.modified || "Unknown"}`;


            card.appendChild(info);



            const controls = document.createElement("div");

            controls.className = "project-controls";



            const editButton = document.createElement("button");

            editButton.textContent = "Edit";

            editButton.onclick = function() {

                editProject(project);

            };


            controls.appendChild(editButton);



            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.onclick = function() {

                deleteProject(project);

            };


            controls.appendChild(deleteButton);



            card.appendChild(controls);


            container.appendChild(card);


        });


    } catch(error) {

        container.textContent =
            "Could not connect to Starmaker cloud storage.";

        console.error(error);

    }

}

async function showProjects() {

    const page = createPage(
        "Projects"
    );


    const backButton = document.createElement("button");

    backButton.textContent = "← Back";

    backButton.onclick = showWelcome;

    page.appendChild(backButton);


    const list = document.createElement("div");

    list.textContent = "Loading projects...";

    page.appendChild(list);


    showPage(page);


    loadProjectsInto(list);

}

function editProject(project) {


    const page = createPage(
        "Edit Project"
    );


    const nameInput = document.createElement("input");

    nameInput.value = project.name;

    page.appendChild(nameInput);



    const typeInput = document.createElement("input");

    typeInput.value = project.type;

    page.appendChild(typeInput);



    const saveButton = document.createElement("button");

    saveButton.textContent = "Save";


    saveButton.onclick = async function() {


        await fetch(
            PROJECT_API,
            {
                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    id:project.id,
                    name:nameInput.value,
                    type:typeInput.value
                })
            }
        );


        showWelcome();

    };


    page.appendChild(saveButton);



    const cancelButton = document.createElement("button");

    cancelButton.textContent="Cancel";

    cancelButton.onclick=showWelcome;

    page.appendChild(cancelButton);



    showPage(page);

}

async function deleteProject(project) {


    const confirmed = confirm(
        "Delete " + project.name + "?"
    );


    if (!confirmed) {

        return;

    }


    await fetch(
        PROJECT_API,
        {
            method:"DELETE",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                id:project.id
            })
        }
    );


    showWelcome();

}


// Menu system

function setupMenus() {


    const buttons = document.querySelectorAll("nav button");


    buttons.forEach(button => {


        button.onclick = function() {


            const name = button.textContent;


            switch(name) {


                case "File":

                    showFileMenu();

                    break;


                case "Blocks":

                    showBlocksMenu();

                    break;


                case "Project":

                    if (studioData.currentProject) {

                        showProjectPage();

                    } else {

                        showWelcome();

                    }

                    break;


                case "Help":

                    showHelp();

                    break;


                default:

                    showPage(
                        createPage(name)
                    );

            }

        };


    });

}



// Basic menus

function showFileMenu() {

    showPage(
        createPage(
            "File",
            "New, open, save, and project management."
        )
    );

}



function showBlocksMenu() {

    showPage(
        createPage(
            "Blocks",
            "The block library will appear here."
        )
    );

}



function showHelp() {

    showPage(
        createPage(
            "Help",
            "Starmaker Studio help system."
        )
    );

}



// Start Studio

setupMenus();

showWelcome();