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

    cancelButton.onclick = showProjects;

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


    showProjects();

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

    saveButton.className = "studio-button";


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


        showProjects();

    };


    page.appendChild(saveButton);



    const cancelButton = document.createElement("button");

    cancelButton.textContent="Cancel";

    cancelButton.className = "studio-button";

    cancelButton.onclick=showProjects;

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


    showProjects();

}
