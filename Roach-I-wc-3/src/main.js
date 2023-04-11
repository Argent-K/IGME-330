import { MyBookmark } from "./myBookmark.js";

const bookmarks = [
    {
      text: "Bing",
      url: "https://www.bing.com",
      comments: "Bing is a web search engine owned and operated by Microsoft."
    },
    {
      text: "Google",
      url: "https://www.google.com",
      comments: "Google Search is a search engine provided and operated by Google."
    },
    {
      text: "DuckDuckGo",
      url: "https://duckduckgo.com/",
      comments: "DuckDuckGo (DDG) is an internet search engine that emphasizes protecting searchers' privacy."
    }
  ];

window.onload = () => {
    // // Create a MyBookmark and add it to the list
    // const bing = document.createElement("my-bookmark");
    for (let i = 0; i < bookmarks.length; i++)
    {
        let el = document.createElement("my-bookmark");
        el.dataset.text = bookmarks[i].text;
        el.dataset.url = bookmarks[i].url;
        
        el.dataset.comments = bookmarks[i].comments;

        let newLi = document.createElement("li");
        newLi.appendChild(el);
        document.querySelector("#bookmarks").appendChild(newLi);
    }

    // // ANOTHER way to set custom attributes, the .dataset property
    // // note that these 2 lines of code will also trigger attributeChangedCallback()
    // bing.dataset.text = "Bing";
    // bing.dataset.url = "https://www.bing.com/";

    // const newLI = document.createElement("li");
    // newLI.appendChild(bing);
    // document.querySelector("#bookmarks").appendChild(newLI);
};
