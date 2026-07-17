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



    if (request.method === "GET") {


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


      const project = await request.json();


      const result = await env.DB
        .prepare(
          `
          INSERT INTO Projects
          (name, type, data, created, modified)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `
        )
        .bind(
          project.name,
          project.type,
          project.data
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


      const project = await request.json();


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
          project.name,
          project.type,
          project.id
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


      const project = await request.json();


      await env.DB
        .prepare(
          `
          DELETE FROM Projects
          WHERE id = ?
          `
        )
        .bind(
          project.id
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