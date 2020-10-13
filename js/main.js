'use strict';
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurans = document.querySelector(".cards-restaurants");

const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo  = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');

function toggleModal() {
  modal.classList.toggle("is-open");
}
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


//day 2

function createCardRestaurant() {
  const card = `
  <a class="card card-restaurant">
    <img src="img/pizza-burger/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
          <h3 class="card-title">PizzaBurger</h3>
          <span class="card-tag tag">45 мин</span>
      </div>
      <div class="card-info">
        <div class="rating">4.5</div>
        <div class="price">От 700 ₽</div>
        <div class="category">Пицца</div>
      </div>
    </div>
	</a>
  `;
  cardsRestaurans.insertAdjacentHTML('beforeend', card);
}


function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
						<img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Везувий</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
									«Халапенье», соус «Тобаско», томаты.
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">545 ₽</strong>
							</div>

  `);
  cardsMenu.insertAdjacentElement('beforeend',card);
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  if(restaurant) {
    if(login) {
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      cardsMenu.textContent = '';
      createCardGood();     
    } else {
      toggleModalAuth();
    }
  } 
}

cardsRestaurans.addEventListener('click', openGoods);

logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
   menu.classList.add('hide');
})

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

checkAuth();
createCardRestaurant();