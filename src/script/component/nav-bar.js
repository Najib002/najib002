class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickevent(event) {
    this._clickevent = event;
    this.render();
  }

  get value() {
    return this.querySelector('#searchElement').value;
  }

  render() {
    this.innerHTML = `
        <nav class="navbar sticky-top navbar-dark bg-dark mb-4">
            <span class="py-2 text-light font-weight-bold h3"> Know Your Meals</span>
            <div class="form-inline">
                <input class="form-control mr-sm-2" id="searchElement" type="search" placeholder="Search Meal" autofocus>
                <button class="btn btn-primary" id="searchButtonElement" type="submit">Search</button>
            </div> 
        </nav>
        `;

    this.querySelector('#searchButtonElement').addEventListener('click', this._clickevent);
  }
}
customElements.define('nav-bar', NavBar);
