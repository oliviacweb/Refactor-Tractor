import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js';

let user1

describe('User', () => {
  beforeEach(() => {
    user1 = new User(1, 'Boba', [
      {
        'ingredient': 1077,
        'amount': 1
      },
      {
        'ingredient': 14412,
        'amount': 1
      },
      {
        'ingredient': 1009054,
        'amount': 3
      }]
    );
  });
  it('Should be a function', () => {
    expect(user1).to.be.an.instanceOf(User);
  });
  it('Should have an id', () => {
    expect(user1.id).to.eql(1);
  });
  it('Should have a name', () => {
    expect(user1.name).to.eql('Boba');
  });
  it('Should have a pantry', () => {
    expect(user1.pantry).to.deep.eql([
      {
        'ingredient': 1077,
        'amount': 1
      },
      {
        'ingredient': 14412,
        'amount': 1
      },
      {
        'ingredient': 1009054,
        'amount': 3
      }]);
  });

  it('Should have a property of favoriteRecipes with a default value', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });
  it('Should have a property of recipesToCook with a default value', () => {
    expect(user1.recipesToCook).to.eql([]);
  });
  it('Should have a property of cookedRecipes with a default value', () => {
    expect(user1.cookedRecipes).to.eql([]);
  });

  it('Should be able to add recipes to favoriteRecipes', () =>{
    user1.addToFavorites(recipeData[0])
    expect(user1.favoriteRecipes.includes(recipeData[0])).to.eql(true);
  });

  it('Should be able to remove recipes from favoriteRecipes', () =>{
    user1.removeFromFavorites(recipeData);
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.eql([recipeData[0]]);
  });

  it('Should be able to search favoriteRecipes by name or ingredient', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
  });
  //
  // it('Should be able to check ingredients in User/s pantry for a given recipe', () => {
  //   console.log(ingredientData);
  //   expect(user1.checkPantry(recipeData)).to.eql('You have the ingredients!')
  //
  // });
  //
  // it('Should inform User if they lack required ingredients for a given recipe', () => {
  //   expect(user1.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
  // });
});
