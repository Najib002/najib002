class MealItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set meal(meal) {
    this._meal = meal;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="container">
            <div class="row justify-content-center">
                <div class="card shadow mb-5 mx-3 bg-white rounded">
                    <div class="row no-gutters">
                        <div class="col-sm-6">
                            <picture>
                                <img class="img-fluid rounded" src="${this._meal.strMealThumb}" alt="Meal Image">
                            </picture>
                        </div>

                        <div class="col-sm-6">
                            <div class="card-body overflow-auto text-justify">
                                <h5 class="card-title font-weight-bold text-center">${this._meal.strMeal}</h5>
                                <div class="card-text"> Category : ${this._meal.strCategory} </div>
                                <div class="card-text"> Country : ${this._meal.strArea} </div>
                                <div class="card-text text-left"> Source : 
                                    <a href="${this._meal.strYoutube}" target="new" >${this._meal.strYoutube}</a>
                                </div>
                                <div class="card-text"> Instructions :  </br>
                                    <div style="text-indent: 10%;">${this._meal.strInstructions}</div>
                                </div>
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </div>
        `;
  }
}

customElements.define('meal-item', MealItem);
