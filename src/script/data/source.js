class Source {
  static searchMeal(keyword) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.meals) {
          return Promise.resolve(responseJson.meals);
        }
        return Promise.reject(new Error(`Whoopsie! Your keyword "${keyword}" is not found.`));
      });
  }
}

export default Source;
