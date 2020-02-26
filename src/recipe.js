class Recipe {
  constructor(recipe, ingredientsData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
    this.image = recipe.image;
  }

  getRecipeInstructions () {
    return this.instructions
  }

  calculateCost() {
    let costCounter = 0;
    let result;
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity.amount))
          result = costCounter
        }
      })
    });
    return result;
    // does the DOM handle converting this to dollars?
  }
  getRecipeIngredientName(id) {
    let ingredientName;
    let ingredient = this.ingredientsData.find(ingredient => {
      return id === ingredient.id
    })
    return ingredientName = ingredient.name
  }

}

export default Recipe;
