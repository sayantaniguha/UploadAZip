// displayMeals is accessible globally - so is - whatever is returned by it
var displayMeals = (function () {
    let meals = [];
    let filteredMeals = []; // to store the filtered meals
    // let favouriteMeals = JSON.parse(localStorage.getItem("favouriteMeals")) || []; // to store the favourite meals
    let favouriteMeals = [];
    let mealList = document.getElementById("cards-holder-1");
    let addMealInput = document.getElementById("add");
  
    console.log("Working");
  
    async function fetchMeals() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s"
        );
        const data = await response.json();
        console.log(data);
        meals = data.meals;
        filteredMeals = meals; // initialize filteredMeals with all meals
        // renderMealList();
      } catch (error) {
        console.log(error);
      }
    }
  
    //adding a single meal to DOM
    function addMealtoDOM(meal) {
        const color = Object.values(favouriteMeals).some(obj => obj.id === `${meal.idMeal}`) ? 'red' : 'gray';
        mealList.innerHTML +=
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
                <i class="fa-solid fa-heart" id="${meal.idMeal}" style="color: ${color};"></i>
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
  
    function renderMealList() {
      mealList.innerHTML = ""; //clears entire lists of meals
      
      //Rendering the filtered meals
      if (filteredMeals.length === 0) {
        mealList.innerHTML = "<p>No meals found.</p>";
      } else {
        for (let meal of filteredMeals) 
             addMealtoDOM(meal);
      }
    }
  
    function filterMeals(searchString) {
      if(!searchString) //For empty input field, all meals in API would be generated
         filteredMeals = meals;
      else 
         filteredMeals = meals.filter((meal) =>
         meal.strMeal.toLowerCase().includes(searchString.toLowerCase())
      );
      renderMealList();
    }

    function showMealDetailsModal(event) 
    {
        event.preventDefault();
        // let mealId = event.target.dataset.mealId;
        // const mealId = event.target.getAttribute('data-meal-id');
        // console.log("jhb ",mealId);

        //GET Request  [get data from the server]
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)   //returns a promise
        .then(response => response.json())
        .then(data => {
            console.log(data.meals.length);
            var modal = document.getElementsByClassName("modal")[0];
            
            const color = Object.values(favouriteMeals).some(obj => obj.id === `${data.meals[0].idMeal}`) ? 'red' : 'gray';
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
                        <i class="fa-solid fa-heart" id="${data.meals[0].idMeal}" style="color: ${color};"></i>
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
  
    // function addFavMealtoDOM(meal){
    //     favmealList.innerHTML +=
    //     `
    //     <div class="card" data-meal-id="${meal.idMeal}">
    //       <div class="card-top">
    //         <div class="dish-photo">
    //             <img src="${meal.strMealThumb}" alt="">
    //         </div>
    //         <div class="dish-name">
    //             ${meal.strMeal}
    //         </div>
    //         <div class="dish-details">
    //             <span class="button" data-meal-id="${meal.idMeal}">Details</span>
    //         </div>
    //       </div>
    //       <div class="card-bottom">
    //         <div class="like">
    //             <i class="fa-solid fa-heart" id="${meal.idMeal}"></i>
    //         </div>
    //         <div class="play">
    //             <a href="${meal.strYoutube}" target="_blank">
    //                 <i class="fa-brands fa-youtube"></i>
    //             </a>
    //         </div>
    //       </div>
    //     </div>
    //     `;
    // }

    // function renderFavList() {
    //     favmealList.innerHTML = ""; //clears entire lists of favourite meals
        
    //     //Rendering the filtered meals
    //     if (favouriteMeals.length === 0) {
    //       favmealList.innerHTML = "<p>No meals added to favourites yet.</p>";
    //     } else {
    //       for (let meal of favouriteMeals) 
    //            addFavMealtoDOM(meal);
    //     }
    //   }

    function addToFavourites(favId) {
      console.log(favouriteMeals);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favId}`)
          .then(response => response.json())
          .then(data => {
            let favMeal = data.meals[0];
            if (favMeal) {
                 favouriteMeals.push(favMeal)
                //  favouriteMeals = {...favouriteMeals, ...favMeal};
                 alert("Task added to Favourites List successfully");

              // localStorage.setItem("favouriteMeals", JSON.stringify(favouriteMeals));
              // renderFavList();              
            } else {
              !isFav ? alert("Task cannot be added to Favourites List") : alert("Task cannot be removed from Favourites List");
            }
          })
          .catch(error => {
            console.error(error);
          });
    }      

    function removeFromFavourites(favId) 
    {
      console.log(favouriteMeals);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favId}`)
        .then(response => response.json())
        .then(data => {
          let favMeal = data.meals[0];
          if (favMeal) {
            f = favouriteMeals.filter(meal => {
              console.log('meal:', meal);
              console.log('favMeal:', favMeal);
              return meal !== favMeal;
            });
            
              console.log(f);
              favouriteMeals=f;
              alert("Task removed from Favourites List successfully");

            // localStorage.setItem("favouriteMeals", JSON.stringify(favouriteMeals));
            // renderFavList();              
          } else {
            alert("Task cannot be removed from Favourites List");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    function handleInputKeyPress(event) {
        if (event.key === "Enter") {
            const searchTerm = event.target.value.trim(); // remove any leading or trailing whitespace
            // if (!searchTerm) {
            //    showNotification("Search term cannot be empty!");
            //    return;
            // }
            filterMeals(searchTerm);
            // event.target.value = ''; // empty input field after pressing enter
        }
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

        if(heartIcon.style.color=="red"){
           heartIcon.style.color="gray";
           removeFromFavourites(favId);
        }
        else{
           heartIcon.style.color="red";
           addToFavourites(favId);
        }
      }
      
    }
  
    function initializeApp() {
      fetchMeals();
      addMealInput.addEventListener('keyup', handleInputKeyPress);
      document.addEventListener('click', handleClickListener);
    }
  
    return {
      // favouriteMeals: favouriteMeals,
      initialize: initializeApp,
    };
  })();  

  //need to export 'favouriteMeals' from here to script2.js