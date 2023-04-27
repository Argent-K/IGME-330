class MyFooter extends HTMLElement {

    constructor() {
        super();
        this.name = "Iain Roach";
        this.year = "2023";
    }

    static get observedAttributes() {
        return ["data-name", "data-year"];
    }

    connectedCallback()
    {
        this.render();
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        console.log(attributeName, oldValue, newValue);
        if (oldValue === newValue) return;
        if (attributeName == "data-name") {
            this.name = newValue;
        }
        if (attributeName == "data-year") {
            this.year =newValue;
        }
        this.render();
    }


    render() {
        this.innerHTML = `<p>&copy;</p> `;
        this.textContent += `${this.name} ${this.year}`;
    }
    

}

customElements.define("my-footer", MyFooter);