class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav class="navbar fixed-bottom navbar-dark bg-dark">
            <div class="mx-auto py-1 text-light font-weight-bold"> All rights reserved &copy; 2021 - Nazhif Alfarizi </div>
        </nav>
        `;
  }
}

customElements.define('footer-bar', FooterBar);
