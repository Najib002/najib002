import './meal-item';

class MealList extends HTMLElement {
  set meals(meals) {
    this._meals = meals;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `<h2 class="text-muted text-center my-3">${message}</h2>`;
  }

  render() {
    this.innerHTML = '';
    this._meals.forEach((meal) => {
      const mealItemElement = document.createElement('meal-item');
      mealItemElement.meal = meal;
      this.appendChild(mealItemElement);
    });
  }
}

customElements.define('meal-list', MealList);
