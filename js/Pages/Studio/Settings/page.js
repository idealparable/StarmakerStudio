function showSettingsPage() {

    const page = createPage(
        "Settings",
        "Studio and user settings will appear here."
    );

    addBreadcrumb(page, [
        {
            name: "Studio",
            action: showStudioMenu
        },
        {
            name: "Settings"
        }
    ]);

    showPage(page);

}