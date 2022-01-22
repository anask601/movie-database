const addMovieBtn = document.getElementById("add-movie-btn");

const movieModal = document.getElementById("add-modal");

const backdrop = document.getElementById("backdrop");

const cancelBtn = movieModal.querySelector(".btn--passive");

const addBtn = cancelBtn.nextElementSibling;

const userInputs = movieModal.querySelectorAll("input");
const enteryText = document.getElementById("entry-text");

const deleteModal = document.getElementById("delete-modal");

const dangerBtn = document.getElementById("btn-danger");

let successBtn = document.getElementById("btn-success");

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const removeBackdrop = () => {
  clearUsrInputs();
  closeMovieModal();
  cancelMovieDeletion();
};

const clearUsrInputs = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const cancelAddMovie = () => {
  toggleBackdrop();
  closeMovieModal();
  clearUsrInputs();
};

const updateUi = () => {
  if (movies.length == "") {
    enteryText.style.display = "block";
  } else {
    enteryText.style.display = "none";
  }
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteModal.classList.remove("visible");
};

const deleteMovieElement = (movieId) => {
  deleteModal.classList.add("visible");
  toggleBackdrop();
  successBtn.replaceWith(successBtn.cloneNode(true));
  successBtn = document.getElementById("btn-success");
  dangerBtn.addEventListener("click", cancelDeletionModal);
  successBtn.addEventListener(
    "click",
    deleteMovieConfirmation.bind(null, movieId)
  );
};

const deleteMovieConfirmation = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const newMovielist = document.getElementById("movie-list");
  newMovielist.children[movieIndex].remove();
  cancelMovieDeletion();
  updateUi();
};

const renderMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
     <div class="movie-element__image">
     <img src="${imageUrl}" alt="${title}"> 
     </div>
     <div class="movie-element__info">
     <h2>${title}</h2>
     <p>${rating}/ 5 stars</p>
     </div>
    `;
  newMovieElement.addEventListener("click", deleteMovieElement.bind(null, id));
  const newMovielist = document.getElementById("movie-list");
  newMovielist.append(newMovieElement);
};

const closeMovieModal = () => {
  movieModal.classList.remove("visible");
};

const addMovieModal = () => {
  movieModal.classList.add("visible");
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue === "" ||
    imageValue === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please Enter a Valid Input");
    return;
  }
  let newMovies = {
    id: Math.random(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };
  movies.push(newMovies);
  console.log(movies);

  closeMovieModal();
  toggleBackdrop();
  renderMovieElement(
    newMovies.id,
    newMovies.title,
    newMovies.image,
    newMovies.rating
  );
  clearUsrInputs();
  updateUi();
};

const cancelDeletionModal = () => {
  deleteModal.classList.remove("visible");
  toggleBackdrop();
};

addMovieBtn.addEventListener("click", addMovieModal);

backdrop.addEventListener("click", removeBackdrop);

cancelBtn.addEventListener("click", cancelAddMovie);

addBtn.addEventListener("click", addMovieHandler);
