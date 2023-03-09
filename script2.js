// displayFavMeals is accessible globally - so is - whatever is returned by it
var displayFavMeals = (function () {
    let favoriteMeals = displayMeals.favouriteMeals; //variable imported from script1.js to display the favourite meals
    console.log(favoriteMeals);
    let favmealList = document.getElementById("cards-holder-2"); //from favorites.html
  
    console.log("Working");

    function showMealDetailsModal(event) 
    {
        event.preventDefault();
        // let mealId = event.target.dataset.mealId;
        const mealId = event.target.getAttribute('data-meal-id');
        console.log("jhb ",mealId);

        //GET Request  [get data from the server]
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)   //returns a promise
        .then(response => response.json())
        .then(data => {
            console.log(data.meals.length);
            var modal = document.getElementsByClassName("modal")[0];
            
            modal.innerHTML=``;
            modal.innerHTML +=
            `
            <div class="item-details">
                <span class="close">&times;</span>
    
                <div class="item-details-image">
                <img src="${data.meals[0].strMealThumb}" alt="">
                </div>
                
                <div class="item-name">
                    <strong>Name: </strong>
                    <span class="item-text">
                    ${data.meals[0].strMeal}
                    </span>
                </div>
                <div class="item-category">
                    <strong>Category: </strong>
                    <span class="item-text">
                    ${data.meals[0].strCategory}
                    </span>
                </div>
                <div class="item-ingrident">
                    <strong>Ingredient: </strong>
                    <span class="item-text">
                    ${data.meals[0].strIngredient1},${data.meals[0].strIngredient2},
                    ${data.meals[0].strIngredient3},${data.meals[0].strIngredient4}
                    </span>
                </div>
                <div class="item-instruction">
                    <strong>Instructions: </strong>
                    <span class="item-text">
                    ${data.meals[0].strInstructions}
                    </span>
                </div>
                <div class="item-controls">
                    <div class="modal-like">
                        <i class="fa-solid fa-heart" id="${data.meals[0].idMeal}"></i>
                    </div>
                    <div class="modal-play">
                        <a href="${data.meals[0].strYoutube}" target="_blank">
                            <i class="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>
                
            </div>  
            `;

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            event.target.onclick = function() {
            modal.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                   if (event.target == modal)
                       modal.style.display = "none";
            }
        })
        .catch(function (error) {
                console.log('error ' , error);
        })
    }
  
    function addFavMealtoDOM(meal){
        favmealList.innerHTML +=
        `
        <div class="card" data-meal-id="${meal.idMeal}">
          <div class="card-top">
            <div class="dish-photo">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="dish-name">
                ${meal.strMeal}
            </div>
            <div class="dish-details">
                <span class="button" data-meal-id="${meal.idMeal}">Details</span>
            </div>
          </div>
          <div class="card-bottom">
            <div class="like">
                <i class="fa-solid fa-heart" id="${meal.idMeal}"></i>
            </div>
            <div class="play">
                <a href="${meal.strYoutube}" target="_blank">
                    <i class="fa-brands fa-youtube"></i>
                </a>
            </div>
          </div>
        </div>
        `;
    }

    function renderFavList() {
        favmealList.innerHTML = ""; //clears entire lists of favourite meals
        
        //Rendering the filtered meals
        if (favoriteMeals.length === 0) {
          favmealList.innerHTML = "<p>No meals added to favourites yet.</p>";
        } else {
          for (let meal of favoriteMeals) 
               addFavMealtoDOM(meal);
        }
    }

    function removeFromFavourites(favId) 
    {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favId}`)
        .then(response => response.json())
        .then(data => {
          let favMeal = data.meals[0];
          if (favMeal) {
            favoriteMeals = favoriteMeals.filter(meal => meal != favMeal);
            alert("Task removed from Favourites List successfully");

            // localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
            renderFavList();              
          } else {
          alert("Task cannot be removed from Favourites List");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }      
  
    function handleClickListener(event) {
      const target = event.target;
      console.log(target);

      if(target.className === "button" || (!target.classList.value.includes("fa-") && target.className === "card"))
      {
         console.log("wf");
         showMealDetailsModal(event);
      }
      else if(target.className === "fa-solid fa-heart")
      {
        const favId = target.id;

        // Get the heart icon element by its id
        const heartIcon = document.getElementById(`${favId}`);

        heartIcon.style.color="gray";
        removeFromFavourites(favId);
      }
      
    }
  
    function initializeApp() {
      renderFavList();
      document.addEventListener('click', handleClickListener);
    }
  
    return {
      initialize: initializeApp
    };
})();  