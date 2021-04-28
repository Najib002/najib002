import '../component/meal-list';
import '../component/nav-bar';
import Source from '../data/source';

const main = () => {
  const searchElement = document.querySelector('nav-bar');
  const mealListElement = document.querySelector('meal-list');

  const renderResult = (results) => {
    mealListElement.meals = results;
  };

  const fallbackResult = (message) => {
    mealListElement.renderError(message);
  };

  const OnButtonSearchClicked = () => {
    Source.searchMeal(searchElement.value)
      .then(renderResult)
      .catch(fallbackResult);
  };

  searchElement.clickevent = OnButtonSearchClicked;
};

export default main;
