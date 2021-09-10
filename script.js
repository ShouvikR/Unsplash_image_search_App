const app = {};


app.url = "https://api.unsplash.com/search/photos";

app.key = "jEsjMg7PpAI17QH3vITsw-CnYXjOZnxmNYSTltBlzHM";

app.getPhotos = (searchParam) => {
  const apiUrl = new URL(app.url);

  apiUrl.search = new URLSearchParams({
    client_id: app.key,
    query: searchParam,
    per_page: 30,
    orientation: "squarish",
  });

//   const variable = await fetch(apiUrl);

//   if (variable.ok) {
//     const anotherVariable = await variable.json();

//     return anotherVariable;
//   } else {
//     return new Error("Sorry the API is not available now");
//   }

fetch(apiUrl)
  .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
          return new Error('Sorry the API is not working now!')
      }
    // return response.json();
  })
  .then((jsonData) => {
    console.log(jsonData);

    document.querySelector(".wallpaper").innerHTML = "";
    app.displayPhotos(jsonData.results);
  });

};

app.displayPhotos = (storedPhotos) => {
  storedPhotos.forEach((photos) => {
    const ul = document.createElement("ul");
    const list = document.createElement("li");
    const img = document.createElement("img");

    img.src = photos.urls.regular;
    img.alt = photos.alt_description;

    // const para = document.createElement("p");

    list.appendChild(img);

    ul.appendChild(list);

    const gallery = document.querySelector(".wallpaper");

    gallery.appendChild(ul);
  });
};

app.eventListener = () => {

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const input = document.querySelector("#search");

    const inputValue = input.value;

    app.getPhotos(inputValue);

    input.value = "";
  });
};


app.init = function () {
  app.getPhotos();
//   .then((jsonData) => {
//     console.log(jsonData);

//     document.querySelector(".wallpaper").innerHTML = "";
//     app.displayPhotos(jsonData.results);
//   });

  app.eventListener();
};


app.init();
