async function loadBlocksInto(table) {


    const response = await fetch(BLOCK_API);

    const data = await response.json();


    table.innerHTML = "";


    const header = document.createElement("tr");


    [
        "ID",
        "GUIN",
        "Name",
        "Modified"
    ].forEach(text => {

        const cell = document.createElement("th");

        cell.textContent = text;

        header.appendChild(cell);

    });


    table.appendChild(header);



    data.results.forEach(block => {


        const row = document.createElement("tr");


        [
            block.id,
            block.guin,
            block.name,
            block.modified
        ].forEach(value => {


            const cell = document.createElement("td");

            cell.textContent = value || "";

            row.appendChild(cell);


        });


        table.appendChild(row);


    });


}