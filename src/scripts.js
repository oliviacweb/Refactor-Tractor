import './css/base.scss';
import './css/styles.scss';

import recipeData from './data/recipes';
import ingredientData from './data/ingredients';
import users from './data/users';
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import domUpdates from './domUpdates';

let favButton = $('.view-favorites');
let homeButton = $('.home');
let cardArea = $('.all-cards');
let cookbook = new Cookbook(recipeData);
let user, pantry;

homeButton.on('click', cardButtonConditionals);
favButton.on('click', viewFavorites);
cardArea.on('click', cardButtonConditionals);

$(document).ready(function() {
  let userId = (Math.floor(Math.random() * 49) + 1)
  let newUser = users.find(user => {
    return user.id === Number(userId);
  });
  user = new User(userId, newUser.name, newUser.pantry)
  pantry = new Pantry(newUser.pantry)
  populateCards(cookbook.recipes);
  greetUser();
});

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
    ${ingredient.name}</li></ul>`);
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
