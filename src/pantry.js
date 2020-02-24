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

    // console.log(this.contents)
    return result

  }

  determineAmountOfIngredientsMissing(recipe) {
       const availableIngredients = this.evaluatePantryForRecipe(recipe);
       recipe.ingredients.sort((a, b) => {
         return a.id - b.id;
       })
       availableIngredients.sort((a, b) => {
         return a.ingredient - b.ingredient;
       })
       return recipe.ingredients.reduce((itemsToBuy, ingredient) => {
         let i = 0;
           let missingItems = {
              name: ingredient.name,
              amountMissing: Math.round(ingredient.quantity.amount - availableIngredients[i].amount)
            }
          if(!missingItems.amountMissing <= 0) {
            itemsToBuy.push(missingItems);
          }
           i++;
         return itemsToBuy;
       }, [])
    }
  determineCostOfMissingIngredients(recipe) {
    const missingIngredients = this.determineAmountOfIngredientsMissing(recipe);
    // console.log(this.allIngredients.name);
    // missingIngredients.filter(ingredient => {
    //   if(ingredient.name === )
    })
  }
}

export default Pantry;
