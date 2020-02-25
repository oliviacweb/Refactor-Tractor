import './css/base.scss';
import './css/styles.scss';
import $ from 'jquery';
import fetchData from './index.js';


import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import domUpdates from './domUpdates';

let favButton = $('.view-favorites');
let homeButton = $('.home');
let cardArea = $('.all-cards');
// let cookbook = new Cookbook(recipeData);
let user;
let userData;
let pantry;
let index;
let cookbook;
let ingredientsData;
let recipeData;


homeButton.on('click', cardButtonConditionals);
favButton.on('click', viewFavorites);
cardArea.on('click', cardButtonConditionals);

const loadPageHandler = () => {
  generateUser(userData);
  populateCards(recipeData);
  greetUser();
  console.log(user)
}

fetchData().then(data => {
  userData = data.userData;
  ingredientsData = data.ingredientsData;
  recipeData = data.recipeData;
})
  .then(loadPageHandler)
  .catch(error => console.log(error.message))

function generateUser(userData) {
  index = (Math.floor(Math.random() * 48) + 1);
  let randomUser = userData[index];
  console.log(randomUser);
  user = new User(randomUser.id, randomUser.name, randomUser.pantry);
  pantry = new Pantry(randomUser.pantry);
  cookbook = new Cookbook(recipeData);
}

// $(document).ready(function() {
//   Promise.all([fetchedUsers, fetchedRecipes])
//     .then(values => {
//       return Promise.all(values.map(response =>
//         response.json()))
//     })
//     // .then(([fetchedUsers, fetchedRecipes]) => {
//       // index = (Math.floor(Math.random() * 48) + 1)
//       // user = new User(fetchedUsers.wcUsersData[index].id, fetchedUsers.wcUsersData[index].name, fetchedUsers.wcUsersData[index].pantry);
//       // pantry = new Pantry(user.pantry);
//       // cookbook = new Cookbook(fetchedRecipes.recipeData);
//       // populateCards(cookbook.recipes);
//       // greetUser();
//     })
//     // .catch(error => console.log(error.message))
// });

function viewFavorites() {
  if (cardArea.hasClass('all')) {
    cardArea.removeClass('all');
  }

  if (!user.favoriteRecipes.length) {
    favButton.text('You have no favorites!');
    populateCards(cookbook.recipes);
    return;
  }

  favButton.text('Refresh Favorites');
  cardArea.empty();
  user.favoriteRecipes.forEach(recipe => {
    domUpdates.createRecipeCard(recipe, true).appendTo(cardArea);
  });
  getFavorites();
}

function greetUser() {
  $('.user-name').text(user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0]);
};


function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.id)) {
      return recipe;
    }
  })
  if (!$(event.target).hasClass('favorite-active')) {
    $(event.target).addClass('favorite-active');
    $(favButton).text('View Favorites');
    user.addToFavorites(specificRecipe);
  } else if ($(event.target).hasClass('favorite-active')) {
    $(event.target).removeClass('favorite-active');
    user.removeFromFavorites(specificRecipe)
  }
}

function cardButtonConditionals(event) {
  if ($(event.target).hasClass('favorite')) {
    favoriteCard(event);
  } else if ($(event.target).hasClass('card-picture')) {
    displayDirections(event);
  } else if ($(event.target).hasClass('home')) {
    $(favButton).html('View Favorites');
    populateCards(cookbook.recipes);
  }
}

function displayDirections(event) {
  cookbook = new Cookbook(recipeData);
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    // if (recipe.id === Number(event.target.id))
     if (recipe.id === Number(event.target.id)){
      return recipe;
    }
  })
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  $('.all-cards').addClass('all');
  $('.all-cards').html(`<h3>${recipeObject.name}</h3>
    <p class='all-recipe-info'>
    <strong>It will cost: </strong><span class='cost recipe-info'>
    $${costInDollars}</span><br><br>
    <strong>You will need: </strong><span class='ingredients recipe-info'></span>
    <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
    </span></ol>
    </p>`);
  recipeObject.ingredients.forEach(ingredient => {
    $('.ingredients').append(`<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${recipeObject.getRecipeIngredientName(ingredient.id)}</li></ul>`);
  });
  recipeObject.instructions.forEach(instruction => {
    $('.instructions').append(`<li>
    ${instruction.instruction}</li>`);
  });
}

function getFavorites() {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      $(`.favorite${recipe.id}`).addClass('favorite-active')
    });
  }
}


// createCards(recipeData);
function populateCards(recipes) {
  cardArea.empty();
  if (cardArea.hasClass('all')) {
    cardArea.removeClass('all');
  }

  recipes.forEach(recipe => {
    domUpdates.createRecipeCard(recipe).appendTo(cardArea);
  });
  getFavorites();
}
