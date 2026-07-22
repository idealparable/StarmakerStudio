// ================================
// Starmaker Studio Local State
// ================================

const STUDIO_STATE_KEY = "starmakerStudioState";


// ================================
// Save Studio State
// ================================

function saveStudioState() {

    localStorage.setItem(
        STUDIO_STATE_KEY,
        JSON.stringify(studioData)
    );

}


// ================================
// Load Studio State
// ================================

function loadStudioState() {

    const savedState =
        localStorage.getItem(STUDIO_STATE_KEY);


    if (!savedState) {

        return;

    }


    try {

        const parsedState =
            JSON.parse(savedState);


        if (
            parsedState &&
            typeof parsedState === "object"
        ) {

            studioData = {

                ...studioData,

                ...parsedState

            };

        }

    }

    catch (error) {

        console.error(
            "Could not load saved Studio state.",
            error
        );

    }

}


// ================================
// Set Current Location
// ================================

function setStudioLocation(section, page) {

    studioData.currentLocation = {

        section: section,

        page: page

    };


    saveStudioState();

}


// ================================
// Restore Last Studio Location
// ================================

function restoreStudioLocation() {

    const location =
        studioData.currentLocation;


    if (
        !location ||
        !location.section ||
        !location.page
    ) {

        showProjectsMenu();

        return;

    }


    if (
        location.section === "Project" &&
        studioData.currentProject
    ) {

        setActiveMenu("Project");

        showProjectPage();

        return;

    }


    if (
        location.section === "Studio" &&
        location.page === "Projects"
    ) {

        setActiveMenu("Studio");

        showProjectsPage();

        return;

    }


    if (
        location.section === "Studio" &&
        location.page === "Studio"
    ) {

        setActiveMenu("Studio");

        showStudioPage();

        return;

    }


    if (
        location.section === "Blocks" &&
        location.page === "Blocks"
    ) {

        setActiveMenu("Blocks");

        showBlocksPage();

        return;

    }


    if (
        location.section === "Media" &&
        location.page === "Media"
    ) {

        setActiveMenu("Media");

        showMediaPage();

        return;

    }


    if (
        location.section === "Build" &&
        location.page === "Build"
    ) {

        setActiveMenu("Build");

        showBuildPage();

        return;

    }


    // If the saved location is unknown,
    // fall back to Projects.

    showProjectsMenu();

}