import { MyBookmark } from "./myBookmark.js";
import { Favorite } from "./favorite.js";




const submitClicked = (e) => {
  console.log("submitClicked");
  e.preventDefault();
  return false;
}

const clearFormFields = (e) => {
  document.querySelector("#favorite-text").value = "";
  document.querySelector("#favorite-url").value = "";
  document.querySelector("#favorite-comments").value = "";
  e.preventDefault();
  return false;
}

const createBookmarkComponent = (fid, text, url, comments) => {
  const bm = document.createElement("my-bookmark");
  //bm._text = text;
  bm._fid = fid;
  //bm._url = url;
  //bm._comments = comments;

  bm.setAttribute("data-url", url);
  bm.setAttribute("data-text", text);
  bm.setAttribute("data-comments", comments);
  

  document.querySelector("#bookmarks").appendChild(bm);
}

const loadFavoritesFromStorage = () => {
  for(let i = 0; i < favorites.length; i++)
  {
    createBookmarkComponent(favorites[i].fid, favorites[i].text, favorites[i].url, favorites[i].comments);
  }
}


  document.querySelector("#favorite-submit-button").addEventListener("click", submitClicked);
  document.querySelector("#favorite-cancel-button").addEventListener("click", clearFormFields);
  let favorites = [];
  
  let fav = new Favorite(
    crypto.randomUUID(),
    "RIT",
    "https://www.rit.edu",
    "A private university located near Rochester, NY."
  );

  // Find way to use this instead?
  // {
  //   fid: crypto.randomUUID(), // or just hard-code "d2e7e357-1b1f-4eea-b8f9-25af8aa17138"
  //   text: "RIT", 
  //   url: "https://www.rit.edu", 
  //   comments: "A private university located near Rochester, NY."
  // }

  favorites[0] = fav;
  console.log(favorites);


  loadFavoritesFromStorage();
  // createBookmarkComponent(crypto.randomUUID(),
  // "RIT",
  // "https://www.rit.edu",
  // "A private university located near Rochester, NY.");


// const bookmarks = [
//     {
//       text: "Bing",
//       url: "https://www.bing.com",
//       comments: "Bing is a web search engine owned and operated by Microsoft."
//     },
//     {
//       text: "Google",
//       url: "https://www.google.com",
//       comments: "Google Search is a search engine provided and operated by Google."
//     },
//     {
//       text: "DuckDuckGo",
//       url: "https://duckduckgo.com/",
//       comments: "DuckDuckGo (DDG) is an internet search engine that emphasizes protecting searchers' privacy."
//     }
//   ];

// window.onload = () => {
//     // // Create a MyBookmark and add it to the list
//     // const bing = document.createElement("my-bookmark");
//     for (let i = 0; i < bookmarks.length; i++)
//     {
//         let el = document.createElement("my-bookmark");
//         el.dataset.text = bookmarks[i].text;
//         el.dataset.url = bookmarks[i].url;
        
//         el.dataset.comments = bookmarks[i].comments;

//         let newLi = document.createElement("li");
//         newLi.appendChild(el);
//         document.querySelector("#bookmarks").appendChild(newLi);
//     }

//     // // ANOTHER way to set custom attributes, the .dataset property
//     // // note that these 2 lines of code will also trigger attributeChangedCallback()
//     // bing.dataset.text = "Bing";
//     // bing.dataset.url = "https://www.bing.com/";

//     // const newLI = document.createElement("li");
//     // newLI.appendChild(bing);
//     // document.querySelector("#bookmarks").appendChild(newLI);
// };
