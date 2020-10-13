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
// ----
const restaurantTitle = document.querySelector(".restaurant-title");
const rating = document.querySelector(".rating");
const minPrice = document.querySelector(".price");
const category = document.querySelector(".category");

let login = localStorage.getItem('gloDelivery');

const getData = async function(url) {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, 
    статус ошибка ${response.status}.`)
  }

  return await response.json();
};

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

function createCardRestaurant(restaurant) {

  const { image, 
          kitchen, 
          name, 
          price, 
          products, 
          stars, 
          time_of_delivery 
        } = restaurant;

  const card = `
  <a class="card card-restaurant" data-products="${products}"
  data-info="${[name, price, stars, kitchen]}"
  >
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${time_of_delivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">${stars}</div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
	</a>
  `;
  cardsRestaurans.insertAdjacentHTML('beforeend', card);
}


function createCardGood({ id, description, name, price, image }) {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>

  `);
  cardsMenu.insertAdjacentElement('beforeend',card);
}

// открывает меню ресторана

function openGoods(event) {
  const target = event.target;
  if(login) {
    const restaurant = target.closest('.card-restaurant');
    if(restaurant) {


        const info = restaurant.dataset.info.split(',');
        const [ name, price, stars, kitchen ] = info;

        cardsMenu.textContent = '';
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');

        restaurantTitle.textContent = name;
        rating.textContent = stars;
        minPrice.textContent = `От ${price} Р`;
        category.textContent = kitchen;
        
        getData(`./db/${restaurant.dataset.products}`).then(function(data) {
        data.forEach(createCardGood);});

    } 
  } else {
      toggleModalAuth();
  }
}


function init() {
  getData('./db/partners.json').then(function(data) {
  data.forEach(createCardRestaurant);
  });

  cardsRestaurans.addEventListener('click', openGoods);

  logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
   menu.classList.add('hide');
  })

  cartButton.addEventListener("click", toggleModal);

  close.addEventListener("click", toggleModal);

  checkAuth();
}

init();