class Pantry {
  constructor(userIngredients, allIngredients) {
    this.contents = userIngredients;
    this.allIngredients = allIngredients;
  }

  evaluatePantryForRecipe(recipe) {
    let result;
    let ingredientsAvailable = [];
    // const contents = this.contents.map(content => {
    //   return content.ingredient
    // })
    const recipeIngredients = recipe.ingredients.map(ingredient => {
      return ingredient.id
    })

    const ingredientEvaluation = this.contents.forEach(content => {
      if (recipeIngredients.includes(content.ingredient)) {
        ingredientsAvailable.push(content)
        result = ingredientsAvailable;
      }
      if(!recipeIngredients.includes(content.ingredient)) {
        result = 'You dont have enough ingredients for this recipe';
      }
    })

    return result

  }

   determineAmountOfIngredientsMissing(recipe) {
       //if the recipe ingredient ID matches the pantry ingredient ID return 


       //iterate over the ingredients and
       //
       //return value is an object and the object is going to have ingredient id as
   }


}

export default Pantry;
