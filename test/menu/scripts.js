// Get elements
const menuButton = document.getElementById('menuButton');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');

// Open the menu when the button is clicked
menuButton.addEventListener('click', function() {
    sideMenu.classList.add('open');
});


// Close the menu when the close button is clicked
closeBtn.addEventListener('click', function() {
    sideMenu.classList.remove('open');
});


const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∀∃₍ⅦⅩⅬ∄ⅧⅳⅫↀ∂∈∋∆∉∌∑∜∯∬∭∰∤∣∵∲∹";

const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
      randomString = length => Array.from(Array(length)).map(randomChar).join("");

const letters = document.querySelector(".card-letters");

letters.innerText = randomString(Math.floor(window.innerHeight * window.innerWidth / 150));
letters.onmousemove = (e) => {letters.innerText = randomString(Math.floor(window.innerHeight * window.innerWidth / 150));}