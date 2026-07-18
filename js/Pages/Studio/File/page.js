function showFilePage() {

    const page = createPage(
        "File",
        "New, open, save, and project management."
    );

    addBreadcrumb(page, [
        {
            name: "Studio",
            action: showStudioMenu
        },
        {
            name: "File"
        }
    ]);

    showPage(page);

}