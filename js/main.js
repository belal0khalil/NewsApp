// HTml collection
var News = document.querySelector(".News-container");
var placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpZaeWxczipxrTdSIThz5hmwrRYhEeeAl5A&s";
var countryLinks = document.querySelectorAll("nav ul li a");
var categoryLinks = document.querySelectorAll("aside ul li a");
// App varaibles 
var currentCountryCode ="us";
var currentCountryCategory="business"
// funcations
 async function getNews(category , countryCode) {
    var response =  await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=3250e826c1e84d2290ce862f935035fa`);
    var data =  await response.json()
    console.log(data);
    displayArticles(data.articles)
}

function displayArticles(arr) {
    News.innerHTML = ""
    for( var i= 0 ; i< arr.length ; i++) {
     News.innerHTML += `
      <article class="col-md-4">
        <div class="inner shadow">
          <img 
             src="${arr[i].urlToImage || placeholderImage}" 
             alt="" 
             class="w-100"
            />
         <div class="article-content p-2">
          <h2 class="h5">${arr[i].title?.split("").splice(0,8) .join("")}</h2> 
          <p>${arr[i].description.split(" ").splice(0, 15).join(" ")}</p>
          <a href="${arr[i].url}" class="btn btn-primary" target = "_blank">Read More</a>
          </div>
         </div>
     </article>
     
     `
    }
};
getNews("business" ,"us")

// events

for( var i = 0 ; i< countryLinks.length ; i++) {
    countryLinks[i].addEventListener("click" , function(e) {
        var activeLink = document.querySelector("nav ul li a.active");
        activeLink.classList.remove("active"); 
        e.target.classList.add("active");
         currentCountryCode = e.target.getAttribute("data-country")
         console.log(currentCountryCategory , currentCountryCode)
        getNews(currentCountryCategory , currentCountryCode)
    })
}

for( var i = 0 ; i< categoryLinks.length ; i++ ) {
    categoryLinks[i].addEventListener("click" , function(e) {
        var categoryLink = document.querySelector("aside ul li a.active");
        categoryLink.classList.remove("active");
        e.target.classList.add("active");
        currentCountryCategory = e.target.getAttribute("data-category")
        console.log(currentCountryCategory , currentCountryCode)
        getNews( currentCountryCategory , currentCountryCode)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

