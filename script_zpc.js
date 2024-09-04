//! Handling documents

const body = document.querySelector(".table tbody");

function add_row(index) {
    let new_row = document.createElement('tr');
    let Cell1 = document.createElement('td');
    let Button1 = document.createElement('button');
    let Link1 = document.createElement('a');
    let Cell2 = document.createElement('td');
    let Button2 = document.createElement('button');
    let Link2 = document.createElement('a');


    Link1.textContent = "ZPC " + index;
    Link2.textContent = "ZPC " + index + " Solutions"

    Link1.setAttribute("href", `./ZPCs/ZPC_${index}.pdf`)
    Link2.setAttribute("href", `./ZPCs/ZPC_${index}_Solutions.pdf`)
    Link1.setAttribute("class", "links");
    Link2.setAttribute("class", "links");

    Button1.setAttribute("class", "buttons")
    Button2.setAttribute("class", "buttons")

    Button1.appendChild(Link1);
    Cell1.appendChild(Button1)

    Button2.appendChild(Link2);
    Cell2.appendChild(Button2);

    new_row.appendChild(Cell1);
    new_row.appendChild(Cell2)

    body.appendChild(new_row);
}

const lists = document.querySelector(".zpc_list_qp")

function add_qp(index) {
    let el = document.createElement('li');
    let bt = document.createElement('button');
    let li = document.createElement('a');

    li.setAttribute("class", "links");
    bt.setAttribute("class", "buttons");

    li.textContent = "ZPC " + index;
    bt.appendChild(li);
    el.appendChild(bt);
    
    lists.appendChild(el);
}

const num_zpc = 30
for (let i = 0; i < num_zpc; i++) {

    add_row(num_zpc-i);
    // add_qp(i);

}