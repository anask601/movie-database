const modalMovie = document.getElementById("add-modal");
const startAddModalBtn = document.querySelector("header button");
const backdropFunction = document.getElementById("backdrop");
const cancelBtnModal = document.querySelector(".btn--passive");
const addMovieBtn = document.querySelector(".btn--success");
const userInput = modalMovie.querySelectorAll("input");
const enteryText = document.getElementById("entry-text");
// const movieList = document.getElementById("movie-list");
const deleteElement = document.getElementById("delete-modal");
const cancelDeletionBtn = deleteElement.querySelector(".btn--passive");
let yesDeletionBtn = deleteElement.querySelector(".btn--danger");
const movieDatabase = [];

const updateUI = () => {
  if (movieDatabase.length === 0) {
    enteryText.style.display = "block";
  } else {
    enteryText.style.display = "none";
  }
};
const toggleBackdropModal = () => {
  backdropFunction.classList.toggle("visible");
};

const closeMovieModal = () => {
  modalMovie.classList.remove("visible");
};
const showMovieModal = () => {
  modalMovie.classList.add("visible");
  toggleBackdropModal();
};

const clearMovie = () => {
  // change
  // userInput[0].value = "";
  for (const usrId of userInput) {
    usrId.value = "";
  }
};

const cancelBtnFunction = () => {
  closeMovieModal();
  toggleBackdropModal(); // change
  clearMovie();
};

const closeDeletionModal = () => {
  toggleBackdropModal();
  deleteElement.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movieDatabase) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movieDatabase.splice(movieIndex, 1);
  const listElement = document.getElementById("movie-list");
  listElement.children[movieIndex].remove();
  // deleteMovieHandler();
  closeDeletionModal();
  updateUI();
};

const deleteMovieHandler = (movieId) => {
  deleteElement.classList.add("visible");
  toggleBackdropModal();
  // yesDeletionBtn.replaceWith(yesDeletionBtn.cloneNode(true));
  cancelDeletionBtn.removeEventListener("click", closeDeletionModal);
  yesDeletionBtn = deleteElement.querySelector(".btn--danger");
  cancelDeletionBtn.addEventListener("click", closeDeletionModal);
  yesDeletionBtn.addEventListener("click", deleteMovie.bind(null, movieId));
};

const renderMovie = (id, tittle, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
  <img src="${imageUrl}" alt="${tittle}"/>
  </div>
  <div class="movie-element__info">
  <h2>${tittle}</h2>
  <p>${rating}/5 Stars 💻</p>
  </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listElement = document.getElementById("movie-list");
  listElement.append(newMovieElement);
};

const addMovieBtnFunction = () => {
  const tittleValue = userInput[0].value;
  const imageUrl = userInput[1].value;
  const ratingValue = userInput[2].value;

  if (
    tittleValue.trim() === "" ||
    imageUrl.trim() === "" ||
    ratingValue.trim() === "" ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert("Please provide right details");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    tittle: tittleValue,
    image: imageUrl,
    rating: ratingValue,
  };
  movieDatabase.push(newMovie);
  console.log(newMovie);
  closeMovieModal();
  toggleBackdropModal();
  clearMovie();
  renderMovie(newMovie.id, newMovie.tittle, newMovie.image, newMovie.rating);
  updateUI();
};

const backdropHandler = () => {
  closeMovieModal();
  closeDeletionModal();
};

startAddModalBtn.addEventListener("click", showMovieModal);
backdropFunction.addEventListener("click", backdropHandler);
cancelBtnModal.addEventListener("click", cancelBtnFunction);
addMovieBtn.addEventListener("click", addMovieBtnFunction);
