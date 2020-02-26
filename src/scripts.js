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
let toCookButton = $('.view-to-cook');
let homeButton = $('.home');
let cardArea = $('.all-cards');
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
toCookButton.on('click', viewRecipesToCook);

const loadPageHandler = () => {
  generateUser(userData);
  populateCards(recipeData);
  greetUser();
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

function viewRecipesToCook() {
  if (cardArea.hasClass('all')) {
    cardArea.removeClass('all');
  }

  if (!user.recipesToCook.length) {
    toCookButton.text('You have no pending recipes!');
    populateCards(cookbook.recipes);
    return;
  }

  toCookButton.text('Refresh Your Recipes');
  cardArea.empty();
  user.recipesToCook.forEach(recipe => {
    domUpdates.createRecipeCard(recipe, true).appendTo(cardArea);
  });
  getRecipesToCook();
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

function addRecipeToDo(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.id)) {
      return recipe;
    }
  })
  if (!$(event.target.parentElement).hasClass('todo-active')) {
    $(event.target.parentElement).addClass('todo-active');
    $(favButton).text('View Favorites');
    user.saveRecipesToCook(specificRecipe);
  } else if ($(event.target.parentElement).hasClass('todo-active')) {
    $(event.target.parentElement).removeClass('todo-active');
  }
}

function cardButtonConditionals(event) {
  if ($(event.target).hasClass('favorite')) {
    favoriteCard(event);
  } else if ($(event.target).hasClass('card-picture')) {
    displayDirections(event);
  } else if ($(event.target).hasClass('home')) {
    $(favButton).html('View Favorites');
    $(toCookButton).html('View Your Recipes');
    populateCards(cookbook.recipes);
  } else if
  ($(event.target).hasClass('add-button')) {
    addRecipeToDo(event)
  }
}

function displayDirections(event) {
  cookbook = new Cookbook(recipeData);
  let newRecipeInfo = cookbook.recipes.find(recipe => {
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

function getRecipesToCook() {
  if (user.recipesToCook.length) {
    user.recipesToCook.forEach(recipe => {
      $(`.add-button${recipe.id}`).addClass('todo-active')
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
  getRecipesToCook();
}
