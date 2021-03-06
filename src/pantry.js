class Pantry {
  constructor(userIngredients, allIngredients) {
    this.contents = userIngredients;
    this.allIngredients = allIngredients;
  }

  evaluatePantryForRecipe(recipe) {
    let result;
    let ingredientsAvailable = [];
    const recipeIngredients = recipe.ingredients.map(ingredient => {
      return ingredient.id
    })

    const ingredientEvaluation = this.contents.forEach(content => {
      if (recipeIngredients.includes(content.ingredient)) {
        ingredientsAvailable.push(content)
        result = ingredientsAvailable;
      }
      if (!recipeIngredients.includes(content.ingredient)) {
        result = 'You dont have enough ingredients for this recipe';
      }
    })
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
      if (!missingItems.amountMissing <= 0) {
        itemsToBuy.push(missingItems);
      }
      i++;
      return itemsToBuy;
    }, [])
  }


  determineCostOfMissingIngredients(recipe) {
    let cost;
    const missingIngredients = this.determineAmountOfIngredientsMissing(recipe);
    const ingName = missingIngredients.map(misIng => {
      this.allIngredients.forEach(ingredient => {
        if (misIng.name === ingredient.name) {
          cost = ingredient.estimatedCostInCents
        }
      })
      return {
        ingredient: misIng.name,
        cost: (cost * misIng.amountMissing) / 100
      }
    })
    return ingName;
  }

  addRequiredIngredientsToPantry(recipe) {
    //need to have another array returned out of the evaluatePantryForRecipe(recipe) method
    //concat the two arrays, and then resume functionality
    let x;
    let updateIng;
    let insufficientIngredients = this.determineAmountOfIngredientsMissing(recipe);
    insufficientIngredients.map(insufficientIng => {
      this.allIngredients.forEach(ingredient => {
        if(insufficientIng.name === ingredient.name) {
           x = ingredient;
        }
      })
      updateIng = this.contents.find(content => {
        return content.ingredient === x.id;
      })
      this.contents.forEach(content => {
        if(content.ingredient === x.id) {
          this.contents.splice(this.contents.indexOf(content), 1, {
            ingredient: x.id,
            amount: insufficientIng.amountMissing + updateIng.amount
          });
        }
      })
    });
  }

  removeIngredientsAfterCooking(user, recipe) {
    let usedIng;
    if(user.cookedRecipes.includes(recipe)) {
      recipe.ingredients.forEach(ingredient => {
        usedIng = this.contents.find(content => content.ingredient === ingredient.id),
        this.contents.splice(this.contents.indexOf(usedIng), 1, {
          ingredient: content.ingredient,
          amount: usedIng.amount - ingredient.quantity.amount
        });
      });
    }
  }
}

export default Pantry;
