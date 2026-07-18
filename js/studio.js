// ================================
// Starmaker Studio Core
// ================================

const PROJECT_API = "https://proud-pine-7dab.idealparable.workers.dev/";
const BLOCK_API = "https://proud-pine-7dab.idealparable.workers.dev/blocks";

const workspace = document.getElementById("workspace");




// ================================
// Studio State
// ================================



let studioData = {

    recentProjects: [],

    currentProject: null

};



// ================================
// Shared Page Utilities
// ================================

function showPage(content) {

    workspace.innerHTML = "";

    workspace.appendChild(content);

}


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

function addBreadcrumb(page, crumbs) {

    const breadcrumb = document.createElement("p");

    breadcrumb.className = "breadcrumb";


    crumbs.forEach((crumb, index) => {

        const link = document.createElement("span");

        link.textContent = crumb.name;


        if (crumb.action) {

            link.style.cursor = "pointer";

            link.onclick = crumb.action;

            link.style.textDecoration = "underline";

        }


        breadcrumb.appendChild(link);


        if (index < crumbs.length - 1) {

            const separator = document.createElement("span");

            separator.textContent = " > ";

            breadcrumb.appendChild(separator);

        }

    });


    page.insertBefore(breadcrumb, page.firstChild);

}

function createTabBar() {

    const tabBar = document.createElement("nav");

    tabBar.className = "tab-bar";

    return tabBar;

}

function setActiveTab(tabBar, activeButton) {

    const buttons = tabBar.querySelectorAll("button");

    buttons.forEach(button => {

        button.classList.remove("active-tab");

    });


    activeButton.classList.add("active-tab");

}



// ================================
// Navigation
// ================================


function setActiveMenu(name) {

    const buttons = document.querySelectorAll("nav button");

    buttons.forEach(button => {

        if (button.textContent === name) {
            button.classList.add("active-menu");
        } else {
            button.classList.remove("active-menu");
        }

    });

}


function showProjectMenu() {

    

    if (studioData.currentProject) {

        setActiveMenu("Project");

        showProjectPage();

    } else {

        setActiveMenu("Studio");

        showProjectsPage();

    }

}


function showProjectsMenu() {

    setActiveMenu("Studio");

    showProjectsPage();

}


function showBlocksMenu() {

    setActiveMenu("Blocks");

    showBlocksPage();

}


function showMediaMenu() {

    setActiveMenu("Media");

    showMediaPage();

}


function showBuildMenu() {

    setActiveMenu("Build");

    showBuildPage();

}


function showStudioMenu() {

    setActiveMenu("Studio");

    showStudioPage();

}


function showFileMenu() {

    setActiveMenu("Studio");

    showFilePage();

}


function showEditMenu() {

    setActiveMenu("Studio");

    showEditPage();

}


function showHelpMenu() {

    setActiveMenu("Studio");

    showHelpPage();

}


function showSettingsMenu() {

    setActiveMenu("Studio");

    showSettingsPage();

}



// ================================
// Top Bar Setup
// ================================


function setupMenus() {


    const buttons = document.querySelectorAll("nav button");


    buttons.forEach(button => {


        button.onclick = function() {


            const name = button.textContent;


            switch(name) {

                case "Project":

                    showProjectMenu();

                    break;


                case "Blocks":

                    showBlocksMenu();

                    break;


                case "Media":

                    showMediaMenu();

                    break;


                case "Build":

                    showBuildMenu();

                    break;


                case "Studio":

                    showStudioMenu();

                    break;


            }

        };


    });

}




// ================================
// Startup
// ================================


setupMenus();

showProjectsMenu();