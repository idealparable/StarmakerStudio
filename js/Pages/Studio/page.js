function showStudioPage() {

    const page = createPage(
        "Studio",
        "Studio settings and application controls."
    );

    addBreadcrumb(page, [
        {
            name: "Studio"
        }
    ]);

    addStudioButtons(page);

    showPage(page);

}


function addStudioButtons(page) {

    const buttons = [
        "Projects",
        "File",
        "Edit",
        "Help",
        "Settings"
    ];


    buttons.forEach(name => {

        const button = document.createElement("button");

        button.textContent = name;

        button.style.display = "block";

        button.style.margin = "8px 0";


        button.onclick = function() {

            switch(name) {

                case "Projects":
                    showProjectsMenu();
                    break;

                case "File":
                    showFileMenu();
                    break;

                case "Edit":
                    showEditMenu();
                    break;

                case "Help":
                    showHelpMenu();
                    break;

                case "Settings":
                    showSettingsMenu();
                    break;

            }

        };


        page.appendChild(button);

    });


}