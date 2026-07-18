## Checking D1 Database

Open VSC terminal.

Go to worker folder:

cd worker

List tables:

wrangler d1 execute StarmakerStudio --remote --command "SELECT name FROM sqlite_master WHERE type='table';"

View a table:

wrangler d1 execute StarmakerStudio --remote --command "PRAGMA table_info(TableName);"


## Updating Worker

1. Edit dbworker.js
2. Save
3. Commit and push to GitHub
4. In VSC terminal, inside worker folder:

wrangler deploy

5. Worker updates on Cloudflare