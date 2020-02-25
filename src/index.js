function fetchData() {
  let userData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData')
    .then((response) => response.json())
    .catch(error => console.log(error.message));
  let recipeData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData')
    .then((response) => response.json())
    .catch(error => console.log(error.message))
  let ingredientsData = fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData')
    .then((response) => response.json())
    .catch(error => console.log(error.message));
  return Promise.all([userData, recipeData, ingredientsData])
    .then(response => {
      let dataObj = {};
      dataObj.userData = response[0].wcUsersData;
      dataObj.recipeData = response[1].recipeData;
      dataObj.ingredientsData = response[2].ingredientsData;
      return dataObj
    })
    .catch(error => console.log(error.message));
}
export default fetchData;