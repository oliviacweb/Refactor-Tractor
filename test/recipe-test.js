import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

let recipe;

beforeEach(() => {
  recipe = new Recipe(recipeData[47], ingredientsData);
});

describe('Recipe', () => {

    it('should be an instance of recipe', () => {
      expect(recipe).to.be.an.instanceOf(Recipe);
    });

    it('should be have an id', () => {
      expect(recipe.id).to.equal(601216);
    });

    it('should be have a name', () => {
      expect(recipe.name).to.equal("Farmer’s Market Flatbread Pizza");
    });

    it('Should hold its own ingredient data', () => {
      expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
    });

    describe('ingredients data', () => {
        it('should be an array', () => {
          expect(recipe.ingredients).to.be.a('array');
        });

        it('should have a name', () => {
          expect(recipe.ingredients[0].name).to.equal('cheese');
        });
        
        it('should have an id', () => {
          expect(recipe.ingredients[0].id).to.equal(1041009);
        });

        it('should have a quantity', () => {
          expect(recipe.ingredients[0].quantity).to.deep.equal({amount: 2, unit: 'tablespoons'});
        });

      it('should have instructions', () => {
        expect(recipe.instructions).to.deep.equal([{
          number: 1,
          instruction: 'Saute the zucchini in the olive oil on high heat. Season generously with salt and pepper. Stir and leave alone for a little while, so you get a little bit of texture from the browning on the zucchini.While you’re sauteing, toast the flatbread in the oven at 400 degrees.When the zucchini is soft and just slightly browned, remove from the heat. Take the flatbread out of the oven and spread the zucchini on the flatbread.Top with the fresh tomatoes, cheese, and fresh basil.'
        },
        { number: 2, instruction: 'Cut, serve, and enjoy!' }]);
            });

        it('should have tags that are an array of strings', () => {
          expect(recipe.tags).to.deep.equal([ 'side dish' ]);
        });

        it('should have have an image', () => {
          expect(recipe.image).to.equal('https://spoonacular.com/recipeImages/601216-556x370.jpg')
        });
  })
})
