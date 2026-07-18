/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env) {


    if (request.method === "OPTIONS") {

      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        }
      });

    }


    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Content-Type": "application/json"
    };

    const url = new URL(request.url);

    const path = url.pathname;



    if (request.method === "GET") {


        if (path === "/blocks") {


            const result = await env.DB
                .prepare(
                    "SELECT * FROM Blocks ORDER BY modified DESC"
                )
                .all();


            return new Response(
                JSON.stringify(result),
                { headers }
            );


        }


        const result = await env.DB
            .prepare(
                "SELECT * FROM Projects ORDER BY modified DESC"
            )
            .all();


        return new Response(
            JSON.stringify(result),
            { headers }
        );

    }



    if (request.method === "POST") {


        const data = await request.json();


        if (path === "/blocks") {


            const result = await env.DB
                .prepare(
                    `
                    INSERT INTO Blocks
                    (
                        guin,
                        name,
                        description,
                        text,
                        code,
                        path,
                        filename,
                        data,
                        created,
                        modified
                    )
                    VALUES
                    (
                        ?, ?, ?, ?, ?, ?, ?, ?,
                        CURRENT_TIMESTAMP,
                        CURRENT_TIMESTAMP
                    )
                    `
                )
                .bind(
                    data.guin,
                    data.name,
                    data.description,
                    data.text,
                    data.code,
                    data.path,
                    data.filename,
                    data.data
                )
                .run();


            return new Response(
                JSON.stringify({
                    success: true,
                    id: result.meta.last_row_id
                }),
                { headers }
            );

        }


        const result = await env.DB
            .prepare(
                `
                INSERT INTO Projects
                (name, type, data, created, modified)
                VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `
            )
            .bind(
                data.name,
                data.type,
                data.data
            )
            .run();


        return new Response(
            JSON.stringify({
                success: true,
                id: result.meta.last_row_id
            }),
            { headers }
        );

    }



    if (request.method === "PUT") {


        const data = await request.json();


        if (path === "/blocks") {


            await env.DB
                .prepare(
                    `
                    UPDATE Blocks
                    SET
                        guin = ?,
                        name = ?,
                        description = ?,
                        text = ?,
                        code = ?,
                        path = ?,
                        filename = ?,
                        data = ?,
                        modified = CURRENT_TIMESTAMP
                    WHERE id = ?
                    `
                )
                .bind(
                    data.guin,
                    data.name,
                    data.description,
                    data.text,
                    data.code,
                    data.path,
                    data.filename,
                    data.data,
                    data.id
                )
                .run();


            return new Response(
                JSON.stringify({
                    success: true
                }),
                { headers }
            );

        }



        await env.DB
            .prepare(
                `
                UPDATE Projects
                SET name = ?,
                    type = ?,
                    modified = CURRENT_TIMESTAMP
                WHERE id = ?
                `
            )
            .bind(
                data.name,
                data.type,
                data.id
            )
            .run();



        return new Response(
            JSON.stringify({
                success: true
            }),
            { headers }
        );

    }



    if (request.method === "DELETE") {


        const data = await request.json();


        if (path === "/blocks") {


            await env.DB
                .prepare(
                    `
                    DELETE FROM Blocks
                    WHERE id = ?
                    `
                )
                .bind(
                    data.id
                )
                .run();


            return new Response(
                JSON.stringify({
                    success: true
                }),
                { headers }
            );

        }



        await env.DB
            .prepare(
                `
                DELETE FROM Projects
                WHERE id = ?
                `
            )
            .bind(
                data.id
            )
            .run();



        return new Response(
            JSON.stringify({
                success: true
            }),
            { headers }
        );

    }



    return new Response(
      JSON.stringify({
        error:"Unsupported method"
      }),
      { headers }
    );


  },
};