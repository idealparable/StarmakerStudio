function showBuildPage() {

    const page = createPage(
        "Build",
        "Build and export options will appear here."
    );

    addBreadcrumb(page, [
        {
            name: "Build"
        }
    ]);

    showPage(page);

}


