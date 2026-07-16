// Starmaker Studio core

// alert("NEW STUDIO FILE LOADED");

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



    const openButton = document.createElement("button");

    openButton.textContent = "Open Existing Project";


    openButton.onclick = showProjects;


    page.appendChild(openButton);



    showPage(page);

}



// Create project

function createNewProject() {


    const project = {

        name: "Untitled Project",

        type: null,

        blocks: []

    };


    studioData.currentProject = project;


    showProjectPage();

}



// Project page

async function showProjects() {

    const page = createPage(
        "Projects",
        "Loading projects..."
    );

    showPage(page);


    try {

        const response = await fetch(PROJECT_API);

        const data = await response.json();


        page.innerHTML = "";


        const heading = document.createElement("h1");
        heading.textContent = "Projects";

        page.appendChild(heading);


        if (data.results.length === 0) {

            const empty = document.createElement("p");

            empty.textContent = "No projects found.";

            page.appendChild(empty);

            return;

        }


        data.results.forEach(project => {


            const button = document.createElement("button");

            button.textContent = project.name;


            button.onclick = function() {

                studioData.currentProject = project;

                showProjectPage();

            };


            page.appendChild(button);


        });


    } catch (error) {


        page.innerHTML = "";

        const heading = document.createElement("h1");

        heading.textContent = "Projects";

        page.appendChild(heading);


        const message = document.createElement("p");

        message.textContent =
            "Could not connect to Starmaker cloud storage.";

        page.appendChild(message);


        console.error(error);

    }

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