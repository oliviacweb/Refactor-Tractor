class Pantry {
  constructor(userIngredients, allIngredients) {
    this.contents = userIngredients;
    this.allIngredients = allIngredients;
  }
 
  evaluatePantryForRecipe(recipe) {
    let result;
    const contents = this.contents.map(content => {
      return content.ingredient
    })
    const recipeIngredients = recipe.ingredients.map(ingredient => {
      return ingredient.id
    })
   
    const ingredientEvaluation = contents.forEach(content => {
      if (recipeIngredients.includes(content)) {
        result = true;
      } else {
        result = false;
      }
    })
    return result
  }

}

export default Pantry;
 