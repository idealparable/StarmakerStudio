function showBlocksPage() {

    const page = createPage(
        "Blocks",
        "The block library will appear here."
    );

    addBreadcrumb(page, [
        {
            name: "Blocks"
        }
    ]);

    showPage(page);

}