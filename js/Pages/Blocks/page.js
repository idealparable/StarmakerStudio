function showBlocksPage() {

    const page = document.createElement("section");

    page.className = "studio-page";


    const tabBar = createTabBar();

    page.appendChild(tabBar);


    const tabs = [

        {
            name: "Designer",
            action: showBlocksDesignerPage
        },

        {
            name: "Collections",
            action: showBlocksCollectionsPage
        },

        {
            name: "Library",
            action: showBlocksLibraryPage
        }

    ];


    tabs.forEach(tab => {

        const button = document.createElement("button");

        button.textContent = tab.name;

        button.onclick = function() {

            setActiveTab(tabBar, button);

            tab.action();

        };

        tabBar.appendChild(button);

    });


    const workspace = document.createElement("div");

    workspace.id = "blocks-workspace";

    page.appendChild(workspace);


    const firstTab = tabBar.querySelector("button");

    setActiveTab(tabBar, firstTab);


    showPage(page);

    showBlocksDesignerPage();

}