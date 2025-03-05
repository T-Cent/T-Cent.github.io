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


    Link1.textContent = "SPT " + index;
    Link2.textContent = "SPT " + index + " Solutions"

    Link1.setAttribute("href", `./SPTs/SPT_${index}.pdf`)
    Link2.setAttribute("href", `./SPTs/SPT_${index}_Solutions.pdf`)
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

const lists = document.querySelector(".SPT_list_qp")

function add_qp(index) {
    let el = document.createElement('li');
    let bt = document.createElement('button');
    let li = document.createElement('a');

    li.setAttribute("class", "links");
    bt.setAttribute("class", "buttons");

    li.textContent = "SPT " + index;
    bt.appendChild(li);
    el.appendChild(bt);
    
    lists.appendChild(el);
}

const num_spt = 16
for (let i = 0; i < num_spt; i++) {

    add_row(num_spt-i);
    // add_qp(i);

}