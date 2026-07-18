function showMediaPage() {

    const page = createPage(
        "Media",
        "Images, audio, and other assets will appear here."
    );

    addBreadcrumb(page, [
        {
            name: "Media"
        }
    ]);

    showPage(page);

}

