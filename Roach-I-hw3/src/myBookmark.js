import { favorites } from "./main.js";
import * as storage from "./storage.js";

const template = document.createElement("template");
        template.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
            <style>
                :host {
                    display: inline-block;
                    height: 3rem;
                    line-height: 3rem;
                }
                #link {
                    display: inline-block;
                    width: 8rem;
                }
                #buttons {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: normal;
                }
                a {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: normal;
                }
            </style>
            <div class="has-background-link pl-1 pr-1">
                <span id="link" class="is-family-sans-serif">
                    <a href="" class="has-text-light" target="_blank">???</a>
                </span>
                <span id="buttons">
                    <button class="button is-success is-small" disabled>
                        <span class="icon is-small">
                            <i class="fas fa-check"></i>
                        </span>
                    <span>Favorite</span>
                </button>
                <button class="button is-warning is-small">
                    <span class="icon is-small">
                        <i class="fas fa-times"></i>
                    </span>
                </button>
            </span>
            </div>
        `;

        class MyBookmark extends HTMLElement {
            // called when the component is first created, but before it is added to the DOM
            constructor() {
                super();
                this._text = "RIT";
                this._url = "https://www.rit.edu/";
                this._comments ="No Comments found";

                // Attach a showdow DOM tree to this instance - this creates `.shadowRoot` for us
                this.attachShadow({ mode: "open" });

                // Clone `template and append it
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            }

            // tell the component what attributes to "watch"
            static get observedAttributes() {
                return ["data-text", "data-url", "data-comments"];
            }

            // ** lifecycle events **

            // called when the component is inserted into the DOM
            connectedCallback() {
                this.render();

                this.shadowRoot.querySelector("#buttons").querySelector(".is-warning").addEventListener("click", (e) => {
                    //delete favorite in here?
                    //console.log(document.querySelector('my-bookmark[data-fid="123"]').getAttribute("data-fid"));
                    //console.log(this.shadowRoot.host.dataset.fid);
                    //console.log(e.shadowRoot.host);
                    deleteFavorite(this.shadowRoot.host.dataset.fid, Array.from(document.querySelector("#bookmarks").children));
                });
            }

            // this method is invoked each time one of the component's "watched" attributes changes
            attributeChangedCallback(attributeName, oldValue, newValue) {
                console.log(attributeName, oldValue, newValue);
                if (oldValue === newValue) return;
                if (attributeName == "data-text") {
                    this._text = newValue;
                }
                if (attributeName == "data-url") {
                    this._url = newValue;
                }
                if (attributeName == "data-comments") {
                    this._comments = newValue;
                }
                if(attributeName == "data-fid")
                {
                    this._fid = newValue;
                }
                this.render();
            }

            // helper method
            render() {
                //this.innerHTML = `<span><a href="${this._url}">${this._text}</a></span>`;
                // Is the template loaded?
                let a = this.shadowRoot.querySelector("a");

                // if so, update the shadowDom
                if(a) {
                    a.href = this._url;
                    a.textContent = this._text;
                    a.title = this._comments;
                }
            }
        }


        const deleteFavorite = (fid, _list) => {
            // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
            let index = -1;
            for (let i = 0; i < _list.length; i++) {
                if (_list[i].dataset.fid == fid) {
                    index = i;
                }
            }

            if (index > -1) {
                _list.splice(index, 1);
            }

            index = -1;
            for(let i = 0; i < favorites.length; i++)
            {
                if(favorites[i].fid == fid)
                {
                    index = i;
                }
            }

            if(index > -1) {
                favorites.splice(index, 1);
            }



            document.querySelector("#favnum").innerHTML = `Number of favorites: ${_list.length}`;


            let mark = document.querySelector("#bookmarks");

            mark.childNodes.forEach(a => {
                if (a.dataset.fid == fid) {
                    a.remove();
                }
            });

            storage.setFavorites(favorites);
        }


        
        customElements.define('my-bookmark', MyBookmark);

        export {MyBookmark, deleteFavorite}; 
