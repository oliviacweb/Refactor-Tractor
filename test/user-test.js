import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js';

let user1;
let recipe1;
let recipe2;

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
    recipe1 = {
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "name": "all purpose flour",
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "name": "baking soda",
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "name": "egg",
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "name": "granulated sugar",
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "name": "instant vanilla pudding mix",
          "id": 19206,
          "quantity": {
            "amount": 3,
            "unit": "Tbsp"
          }
        },
        {
          "name": "light brown sugar",
          "id": 19334,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "name": "salt",
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "name": "sea salt",
          "id": 1012047,
          "quantity": {
            "amount": 24,
            "unit": "servings"
          }
        },
        {
          "name": "semisweet chocolate chips",
          "id": 10019903,
          "quantity": {
            "amount": 2,
            "unit": "c"
          }
        },
        {
          "name": "unsalted butter",
          "id": 1145,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "name": "vanilla extract",
          "id": 2050,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        }
      ],
      "instructions": [
        {
          "number": 1,
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy."
        },
        {
          "number": 2,
          "instruction": "Add egg and vanilla and mix until combined."
        },
        {
          "number": 3,
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees."
        },
        {
          "number": 4,
          "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt."
        },
        {
          "number": 5,
          "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown."
        },
        {
          "number": 6,
          "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce."
        }
      ],
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    };
    recipe2 = {
      "name": "Farmer’s Market Flatbread Pizza",
      "id": 601216,
      "image": "https://spoonacular.com/recipeImages/601216-556x370.jpg",
      "ingredients": [
        {
          "name": "cheese",
          "id": 1041009,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "name": "flatbread",
          "id": 10018413,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "name": "fresh basil",
          "id": 2044,
          "quantity": {
            "amount": 3,
            "unit": "leaves"
          }
        },
        {
          "name": "grape tomatoes",
          "id": 10111529,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "name": "olive oil",
          "id": 4053,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "name": "zucchini",
          "id": 11477,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "number": 1,
          "instruction": "Saute the zucchini in the olive oil on high heat. Season generously with salt and pepper. Stir and leave alone for a little while, so you get a little bit of texture from the browning on the zucchini.While you’re sauteing, toast the flatbread in the oven at 400 degrees.When the zucchini is soft and just slightly browned, remove from the heat. Take the flatbread out of the oven and spread the zucchini on the flatbread.Top with the fresh tomatoes, cheese, and fresh basil."
        },
        {
          "number": 2,
          "instruction": "Cut, serve, and enjoy!"
        }
      ],
      "tags": [
        "side dish"
      ]
    }
      
      
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

  it('should be able to save recipes to cook', () => {
    user1.saveRecipesToCook(recipeData[0])
    expect(user1.recipesToCook).to.deep.equal([recipe1])
    user1.saveRecipesToCook(recipeData[47])
    expect(user1.recipesToCook).to.deep.equal([recipe1, recipe2])
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