# Starmaker Studio Setup Guide

This guide explains how to set up a new copy of Starmaker Studio from scratch.

---

# Requirements

Install:

* Git
* GitHub Desktop (optional but recommended)
* Visual Studio Code
* A GitHub account
* A Cloudflare account

---

# 1. Create the GitHub Repository

Create a new GitHub repository.

Example:

```
starmakerstudio
```

Clone it to your computer.

---

# 2. Connect Cloudflare Pages

In Cloudflare:

Workers & Pages

→ Create

→ Pages

→ Connect to Git

Select the repository.

Build command:

*(leave blank)*

Build output directory:

*(leave blank)*

Deploy.

Cloudflare will provide a URL similar to:

```
https://starmakerstudio.<something>.workers.dev/
```

---

# 3. Create the Initial Files

Create the following structure:

```
icons/
js/
worker/
docs/

index.html
style.css

js/studio.js

worker/dbworker.js

docs/Setup.md
docs/Architecture.md
```

Copy the project files into the repository.

Commit and push.

---

# 4. Create the Database

Cloudflare Dashboard

Storage & Databases

→ D1 SQL Database

Create:

```
StarmakerStudio
```

---

# 5. Create the Projects Table

Run:

```sql
CREATE TABLE "Projects"(
  "id" TEXT,
  "name" TEXT,
  "type" TEXT,
  "data" TEXT,
  "created" TEXT,
  "modified" TEXT
);
```

---

# 6. Create the Worker

Cloudflare

Workers & Pages

→ Create

→ Worker

Hello World template

Replace the generated code with the contents of:

```
worker/dbworker.js
```

Deploy.

---

# 7. Bind the Database

Worker

Settings

Bindings

Add Binding

Type:

```
D1 Database
```

Variable name:

```
DB
```

Select:

```
StarmakerStudio
```

Save.

Redeploy the Worker if necessary.

---

# 8. Connect the Studio

In:

```
js/studio.js
```

Set:

```javascript
const PROJECT_API =
    "https://your-worker-url.workers.dev/";
```

Replace the URL with your own Worker URL.

---

# 9. Test

Open the Studio.

Create a project.

Verify that:

* the project appears immediately
* refreshing still shows it
* another browser or device also sees it

Test:

* Create
* Edit
* Delete

If all three work, the database connection is functioning correctly.

---

# Current Architecture

```
Browser

↓

studio.js

↓

Cloudflare Worker

↓

Cloudflare D1 Database
```

Projects are stored in the D1 database.

The browser contains no permanent project data except temporary working memory.

---

# Future Plans

Planned additions include:

* User authentication
* Automatic login
* Cloudflare R2 storage for images and other large assets
* Automatic project loading
* Live synchronization between devices
* Visual coding blocks
* Project builder
* Build system
* Exporting finished applications
