function showEditPage() {

    const page = createPage(
        "Edit",
        "Undo, redo, copy, paste, and editing tools will appear here."
    );

    addBreadcrumb(page, [
        {
            name: "Studio",
            action: showStudioMenu
        },
        {
            name: "Edit"
        }
    ]);

    showPage(page);

}