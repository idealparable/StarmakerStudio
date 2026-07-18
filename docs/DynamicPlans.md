# Starmaker Studio Architecture Notes

## Current Direction

The next goal is to make the Studio more modular so that each page can
be developed independently instead of growing one large `studio.js`
file.

## Page Modules

-   Keep `studio.js` small.
-   `studio.js` should handle:
    -   top navigation
    -   shared utilities (`showPage()`, breadcrumbs, etc.)
    -   loading page modules
-   Each workspace page becomes its own JavaScript file.

Example:

``` text
media/
    Pages/
        blocks.js
        media.js
        build.js
        project.js
        studio.js
```

Working on a page should normally require editing only its own file.

## Configuration vs Code

Separate three concepts:

### Git Repository

Application definition.

Examples: - menus - built-in pages - default block types - themes -
shortcuts

### D1 Database

User-created data.

Examples: - projects - blocks - media - collections - user settings

### Built Output

Generated artifacts.

Examples:

``` text
BuiltBlocks/
BuiltProjects/
```

## JSON Configuration

Configuration that changes structure rather than behavior should
eventually live in JSON files.

Possible examples:

-   top menu
-   Studio menu
-   block categories
-   themes
-   shortcuts

Behavior stays in JavaScript.

## Blocks Page

The Blocks page will be the first test of this modular architecture.

Plan:

1.  Move the Blocks page into its own page module.
2.  Give it its own internal tab bar.
3.  Initial tabs:
    -   Library
    -   Collections
    -   Create
4.  Initially use temporary local data.
5.  After the page structure is working, connect it to D1.

## Long-Term Block Vision

Blocks are stored as database entries.

An "atom" block is the smallest building block.

Atoms may contain:

-   metadata
-   optional executable code
-   optional UI code
-   build information
-   relationships to other blocks

Higher-level blocks are composed from atoms.

Conceptually:

-   atoms = basic elements
-   groups = molecules

## Immediate Next Step

Do **not** redesign the entire Studio yet.

Instead:

-   modularize the Blocks page
-   prove the page-module approach works
-   then consider applying the same architecture to the Studio menus and
    other pages
