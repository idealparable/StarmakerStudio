function showProjectPage() {

    const page = createPage(
        "Project",
        "Project settings and files will appear here."
    );

    addBreadcrumb(page, [
        {
            name: "Project"
        }
    ]);

    showPage(page);

}