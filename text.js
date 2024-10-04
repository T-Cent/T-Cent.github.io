const letters_foreground = "ABCDEFWXYZ0123456789";

let interval = null;

const list_items = document.querySelectorAll(".listitem");

list_items.forEach(element => {
  element.onmouseover = event => {  
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters_foreground[Math.floor(Math.random() * letters_foreground.length)]
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1;
    }, 100);
  }
  // element.target.innerText = element.target.dataset.value;
});


const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∀∃₍ⅦⅩⅬ∄ⅧⅳⅫↀ∂∈∋∆∉∌∑∜∯∬∭∰∤∣∵∲∹";

const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
      randomString = length => Array.from(Array(length)).map(randomChar).join("");

const card = document.querySelector("#card"),
      letters = card.querySelector(".card-letters");

const handleOnMove = e => {
  const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;


  letters.innerText = randomString(1500);    
}

letters.innerText = randomString(Math.floor(window.innerHeight * window.innerWidth / 150));
card.onmousemove = (e) => {letters.innerText = randomString(Math.floor(window.innerHeight * window.innerWidth / 150));}