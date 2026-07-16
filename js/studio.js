// Starmaker Studio core


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

function showProjectPage() {


    const page = createPage(
        studioData.currentProject.name,
        "Current project workspace."
    );


    showPage(page);

}



// Project list

function showProjects() {


    const page = createPage(
        "Projects",
        "Recent projects will appear here."
    );


    showPage(page);

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