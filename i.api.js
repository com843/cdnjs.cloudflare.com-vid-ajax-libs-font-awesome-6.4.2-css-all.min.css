document.addEventListener("DOMContentLoaded", function () {
const hamburgerMenu = document.getElementById("hamburger-menu");
const hamburgerIcon = document.getElementById("hamburger-icon");
const hamburgerOpen = document.getElementById("hamburger-open");

hamburgerMenu.addEventListener("click", () => {
hamburgerOpen.classList.toggle("active");
hamburgerIcon.classList.toggle("fa-bars");
hamburgerIcon.classList.toggle("fa-times");
});

document.addEventListener("click", (event) => {
if (!hamburgerMenu.contains(event.target) && !hamburgerOpen.contains(event.target)) {
hamburgerOpen.classList.remove("active");
hamburgerIcon.classList.add("fa-bars");
hamburgerIcon.classList.remove("fa-times");
}
});

loadUserInfo();
});

function openModal() {
const savedName = localStorage.getItem("username");
const savedPic = localStorage.getItem("profilePic");

if (!savedName || !savedPic) {
document.getElementById("userModal").classList.add("active");
} else {
showSnackbar("You have already set your profile. Changes are not allowed.");
}
}

function saveUserInfo() {
const username = document.getElementById("username").value;
const profilePic = document.getElementById("profilePic").files[0];

if (!username || !profilePic) {
showSnackbar("Please enter your name and upload a profile picture.");
return;
}

localStorage.setItem("username", username);
document.getElementById("displayName").innerText = `Hello, ${username}!`;

const reader = new FileReader();
reader.onload = function (e) {
localStorage.setItem("profilePic", e.target.result);
document.getElementById("displayPic").src = e.target.result;
};
reader.readAsDataURL(profilePic);

document.getElementById("userModal").classList.remove("active");
}

function loadUserInfo() {
const savedName = localStorage.getItem("username");
const savedPic = localStorage.getItem("profilePic");

if (savedName) {
document.getElementById("displayName").innerText = `Hello, ${savedName}!`;
}
if (savedPic) {
document.getElementById("displayPic").src = savedPic;
}

if (!savedName || !savedPic) {
document.getElementById("userModal").classList.add("active");
}
}

// Snackbar function
function showSnackbar(message) {
const snackbar = document.createElement("div");
snackbar.className = "snackbar";
snackbar.innerText = message;
document.body.appendChild(snackbar);

setTimeout(() => {
snackbar.classList.add("show");
}, 100);

setTimeout(() => {
snackbar.classList.remove("show");
setTimeout(() => document.body.removeChild(snackbar), 300);
}, 3000);
}
