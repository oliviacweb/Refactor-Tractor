import './css/base.scss';
import './css/styles.scss';

// import recipeData from './data/recipes';
// import ingredientData from './data/ingredients';
// import users from './data/users';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';


const fetchedUsers = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData');
const fetchedIngredients = fetch(' https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData');
const fetchedRecipes = fetch(' https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData');

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
// let cookbook = new Cookbook(recipeData);
let user, pantry;

window.onload = onStartup();

homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);

function onStartup() {
  // let userId = (Math.floor(Math.random() * 49) + 1)
  // let newUser = users.find(user => {
  //   return user.id === Number(userId);
  // });
  //new user needs to be fetched here
  //fetch the url for the user dataset
  //then parse the data returned
  //then do something with the data
      //map over the dataset
      //for each user, instantiate a new user
      //then instantiate their pantry
//**We want a random new user each time on page load

let myPromise = Promise.all([fetchedUsers, fetchedIngredients, fetchedRecipes])
  .then(values => {
    return Promise.all(values.map(response =>
      response.json()))
  })
  .then(([fetchedUsers, fetchedIngredients, fetchedRecipes]) => {
    //This is probably where we'll need to instantiate the new user/ingredients/recipe by mapping the data onto each class
  //And probably call another function to display the data onto the page
      //call a function to display the users
      //won't need recipes initially, so do I need to instantiate recipes and ingredients right away


    user = new User(fetchedUsers.wcUsersData[0].id, fetchedUsers.wcUsersData[0].name, fetchedUsers.wcUsersData[0].pantry)
    pantry = new Pantry(fetchedUsers.wcUsersData[0].pantry);
    // recipes = new Recipe(fetchedRecipesfetchedIngredients);

      console.log(user, pantry);
    // populateCards()
    // console.log(fetchedIngredients.ingredientsData)
    // console.log(fetchedRecipes.recipeData)
  })
  .catch(error => console.log(error.message))

  // .then(response => response.json())
  // .then(userData => console.log(data))
  // .catch(error => console.log(err.message));
  //For the catch, create a function that displays the error on the page to the user

  //then do another fetch for recipes?? (should this be at the same time or separate??)
  //instantiate the recipes?? or do I just pass the data as an argument for the cookbook??
  // user = new User(userId, newUser.name, newUser.pantry)
  // pantry = new Pantry(newUser.pantry)
  // populateCards(cookbook.recipes);
  // greetUser();
}

function viewFavorites() {
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
    populateCards(cookbook.recipes);
    return
  } else {
    favButton.innerHTML = 'Refresh Favorites'
    cardArea.innerHTML = '';
    user.favoriteRecipes.forEach(recipe => {
      cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
      class='card'>
      <header id='${recipe.id}' class='card-header'>
      <label for='add-button' class='hidden'>Click to add recipe</label>
      <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
      <img id='${recipe.id}' class='add'
      src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
      recipes to cook'></button>
      <label for='favorite-button' class='hidden'>Click to favorite recipe
      </label>
      <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite-active card-button'>
      </button></header>
      <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
      <img id='${recipe.id}' tabindex='0' class='card-picture'
      src='${recipe.image}' alt='Food from recipe'>
      </div>`)
    })
  }
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
  user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
}

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.id)) {
      return recipe;
    }
  })
  if (!event.target.classList.contains('favorite-active')) {
    event.target.classList.add('favorite-active');
    favButton.innerHTML = 'View Favorites';
    user.addToFavorites(specificRecipe);
  } else if (event.target.classList.contains('favorite-active')) {
    event.target.classList.remove('favorite-active');
    user.removeFromFavorites(specificRecipe)
  }
}

function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('card-picture')) {
    displayDirections(event);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    populateCards(cookbook.recipes);
  }
}

function displayDirections(event) {
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.id)) {
      return recipe;
    }
  })
  let recipeObject = new Recipe(newRecipeInfo, ingredientData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  cardArea.classList.add('all');
  cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
  <p class='all-recipe-info'>
  <strong>It will cost: </strong><span class='cost recipe-info'>
  $${costInDollars}</span><br><br>
  <strong>You will need: </strong><span class='ingredients recipe-info'></span>
  <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
  </span></ol>
  </p>`;
  let ingredientsSpan = document.querySelector('.ingredients');
  let instructionsSpan = document.querySelector('.instructions');
  recipeObject.ingredients.forEach(ingredient => {
    ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}</li></ul>
    `)
  })
  recipeObject.instructions.forEach(instruction => {
    instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>
    `)
  })
}

function getFavorites() {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
    })
  } else return
}

function populateCards(recipes) {
  cardArea.innerHTML = '';
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  recipes.forEach(recipe => {
    cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
    class='card'>
        <header id='${recipe.id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
            <img id='${recipe.id} favorite' class='add'
            src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
            recipes to cook'>
          </button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe
          </label>
          <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'></button>
        </header>
          <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
          <img id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
    </div>`)
  })
  getFavorites();
};
