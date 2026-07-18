function showHelpPage() {

    const page = createPage(
        "Help",
        "Starmaker Studio help system."
    );

    addBreadcrumb(page, [
        {
            name: "Studio",
            action: showStudioMenu
        },
        {
            name: "Help"
        }
    ]);

    showPage(page);

}