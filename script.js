const another_line = document.createElement("span");

another_line.className("abc");

another_line.style.marginLeft = "60px";
another_line.style.height = "200px";
another_line.style.width = "1px";
another_line.style.backgroundColor = "black";

document.body.append(another_line);

const container = document.querySelector("#container"),  
    tile = document.querySelector(".tile");

for(let i = 0; i < 1599; i++) {
  container.appendChild(tile.cloneNode());
}

// another_line.style.marginLeft = "60px";