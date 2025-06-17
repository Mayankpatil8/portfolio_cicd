'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

// Black color shades
const colors = [
  "#000000", "#111111", "#222222", "#333333", "#444444", "#555555",
  "#666666", "#777777", "#888888", "#999999", "#AAAAAA", "#BBBBBB",
  "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF" // Light gray to white transition
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();


// === Chatbot Functionality ===
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Show/hide chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotContainer.style.display = 'flex';
  chatbotToggle.style.display = 'none';
});
chatbotClose.addEventListener('click', () => {
  chatbotContainer.style.display = 'none';
  chatbotToggle.style.display = 'flex';
});

// Add message to chat window
function addMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.className = `chatbot-msg ${sender}`;
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// === Chatbot Portfolio Access & Custom Greeting ===
function getBotResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi')) return 'Hello! 👋 You can chat with me about my portfolio, skills, experience, education, or projects.';
  if (msg.includes('portfolio')) return 'You are viewing my portfolio! Ask me about my skills, experience, education, or projects.';
  if (msg.includes('contact')) return 'You can use the contact form below or ask me anything here!';
  if (msg.includes('project')) return 'Here are some of my projects: <br>- AWS S3 <br>- Django Notes App <br>- Expenses Tracker WebApp <br>- Two Tier Flask App <br>- Auto Scaling <br>...and more! Ask for details about any project.';
  if (msg.includes('skill')) return 'My skills include Web Development, DevOps, AWS Cloud, Linux, Shell-Scripting, and more.';
  if (msg.includes('experience')) return 'I have interned at Borgward Technology India and Coding Saavy, working on DevOps, AWS, and Web Development.';
  if (msg.includes('education')) return 'I am pursuing BE in Information Technology at Savitribai Phule Pune University.';
  if (msg.includes('resume') || msg.includes('cv')) return 'You can download my resume from the Resume section or <a href="assets/resume/Kartik_Pawar_IT.pdf" target="_blank">click here</a>.';
  if (msg.includes('about')) return 'I am Kartik Pawar, passionate about continuous learning, innovation, and problem-solving in IT.';
  if (msg.includes('chat') || msg.includes('talk')) return 'Yes, you can chat with me! Ask me anything about my portfolio or just say hi.';
  if (msg.includes('send')) return 'Sure! If you want to send a message, just type it below and press Send.';
  return "I'm your portfolio assistant! Ask me about my skills, experience, education, projects, or how to contact me.";
}

// Handle form submit
chatbotForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const userMsg = chatbotInput.value.trim();
  if (!userMsg) return;
  addMessage(userMsg, 'user');
  chatbotInput.value = '';
  setTimeout(() => {
    addMessage(getBotResponse(userMsg), 'bot');
  }, 600);
});

// Greet on open
chatbotToggle.addEventListener('click', () => {
  if (!chatbotMessages.hasChildNodes()) {
    setTimeout(() => {
      addMessage('Hi! I am your portfolio assistant 🤖. How can I help you?','bot');
    }, 400);
  }
});