import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';
import User from '../src/user.js';
import Pantry from '../src/pantry.js'

let pantry;
let user;
let userIngredients;
let allIngredients;
// let ingredientsData;
let recipe1;
let recipe2;

beforeEach(() => {
  user = new User(1, 'Boba', [
    {
      'ingredient': 1077,
      'amount': 1
    },
    {
      'ingredient': 14412,
      'amount': 1
    },
    {
      'ingredient': 19304,
      'amount': 3
    },
    {'ingredient': 1041009,
    'amount': 1
    },
    {
    'ingredient': 10018413,
    'amount': 1
    },
    {
    'ingredient': 2044,
    'amount': 1
    },
    {
    'ingredient': 10111529,
    'amount': 0.5
    },
    {
    'ingredient': 4053,
    'amount': 1
    },
    {
    'ingredient': 11477,
    'amount': 1
    }
  ])

  userIngredients = user.pantry;
  pantry = new Pantry(userIngredients, allIngredients);
  allIngredients = ingredientsData;
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

describe('pantry', () => {

  it('should be an instance of pantry', () => {
    expect(pantry).to.be.an.instanceOf(Pantry)
  })

  it('should contain contents', () => {
    expect(pantry.contents).to.deep.equal([
      {
        'ingredient': 1077,
        'amount': 1
      },
      {
        'ingredient': 14412,
        'amount': 1
      },
      {
        'ingredient': 19304,
        'amount': 3
      },
      {'ingredient': 1041009,
      'amount': 1
      },
      {
      'ingredient': 10018413,
      'amount': 1
      },
      {
      'ingredient': 2044,
      'amount': 1
      },
      {
      'ingredient': 10111529,
      'amount': 0.5
      },
      {
      'ingredient': 4053,
      'amount': 1
      },
      {
      'ingredient': 11477,
      'amount': 1
      }
      ])
  })

  it('should have access to all ingredients', () => {
    expect(pantry.allIngredients).to.deep.equal(allIngredients)
  })

  it('should evaluate if there are enough ingredients for a recipe', () => {
    pantry.evaluatePantryForRecipe(recipe1);
    expect(pantry.evaluatePantryForRecipe(recipe1)).to.equal('You dont have enough ingredients for this recipe');
    pantry.evaluatePantryForRecipe(recipe2);
    expect(pantry.evaluatePantryForRecipe(recipe2)).to.deep.equal([
          { ingredient: 1041009, amount: 1 },
          { ingredient: 10018413, amount: 1 },
          { ingredient: 2044, amount: 1 },
          { ingredient: 10111529, amount: 0.5 },
          { ingredient: 4053, amount: 1 },
          { ingredient: 11477, amount: 1 }
    ])

  })

  it('should determine the amount of ingrdients are missing', () => {
    pantry.determineAmountOfIngredientsMissing(recipe2)
    expect(pantry.determineAmountOfIngredientsMissing(recipe2)).to.deep.equal([
      {'name': 'fresh basil',
      'amountMissing': 2},
      {'name': 'cheese' ,
      'amountMissing': 1}
    ])
  })

  it('should determine the cost of missing ingredients', () => {
    pantry.determineCostOfMissingIngredients(recipe2)
    expect(pantry.determineCostOfMissingIngredients(recipe2)).to.deep.equal([
      {'ingredient': 'fresh basil',
      'cost': 4.06},
      {'ingredient': 'cheese' ,
      'cost': 8.5}
    ])
  })

  it('should add required ingredients to users pantry', () => {
    pantry.addRequiredIngredientsToPantry(recipe2);
    expect(pantry.contents).to.deep.equal([
      { ingredient: 1077, amount: 1 },
      { ingredient: 14412, amount: 1 },
      { ingredient: 19304, amount: 3 },
      { ingredient: 1041009, amount: 1 },
      { ingredient: 10018413, amount: 1 },
      { ingredient: 2044, amount: 1 },
      { ingredient: 10111529, amount: 0.5 },
      { ingredient: 4053, amount: 1 },
      { ingredient: 11477, amount: 1 },
      { ingredient: 2044, amount: 3 },
      { ingredient: 1041009, amount: 2 }
    ]);
  })

  it.skip('should remove recipe ingredients from pantry after cooking', () => {
    pantry.removeIngredientsAfterCooking(recipe2);
    expect(pantry.contents).to.deep.equal([]);
  })


});
