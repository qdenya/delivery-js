const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// day1
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");

let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}
// функция авторизации
function autorized() {
  function logOut() {
    login = "";
    buttonAuth.style.display = "";
    userName.style.display = '';
    buttonOut.style.display = ''; 
    buttonOut.removeEventListener('click', logOut);
    localStorage.removeItem("gloDelivery");
    checkAuth();
  }
  console.log("Auto");
  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = 'inline';
  buttonOut.style.display = 'block'; 
  buttonOut.addEventListener('click', logOut);
}

// функция, когда пользователь не авторизован
function notAutorized() {
  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;
    if(login == "") {
      alert("Введите действительынй логин");
    } else {
      localStorage.setItem("gloDelivery", login);
      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);
      logInForm.reset();
      checkAuth();
    }
  }
  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

// функция проверки авторизации
function checkAuth() {
  if(login) {
  autorized();
} else {
  notAutorized();
}
}
checkAuth();