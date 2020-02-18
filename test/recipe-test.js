import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

let recipe;

beforeEach(() => {
  recipe = new Recipe(recipeData[47], ingredientsData);
});

describe('Recipe', () => {

    it.skip('should be an instance of recipe', () => {

    });

    it.skip('should be have an id', () => {

    });

    it.skip('should be have a name', () => {

    });
    //
    it.skip('Should hold its own ingredient data', () => {
      // expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
    });
    //

    describe('ingredients data', () => {
        it.skip('should be an object', () => {

        });
    //
        it.skip('should have a name', () => {

        });
    //
        it.skip('should have an id', () => {

        });

        it.skip('should have a quantity', () => {

        });
        describe('quantity', () => {
          it.skip('should have an amount', () => {

          });

          it.skip('should have a unit', () => {

          });
    
        });

      it.skip('should have instructions', () => {

      });
        describe('instructions', () => {
          it.skip('should be an object', () => {

          })

          it.skip('should have a number', () => {

          });

          it.skip('should an instruction', () => {

          })
        });

        it.skip('should have tags that are an array of strings', () => {

        });

        it.skip('should have have an image', () => {

        });


  })
})
