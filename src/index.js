// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen');
  ramenForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: ramenForm.querySelector('#new-name').value,
      restaurant: ramenForm.querySelector('#new-restaurant').value,
      image: ramenForm.querySelector('#new-image').value,
      rating: ramenForm.querySelector('#new-rating').value,
      comment: ramenForm.querySelector('#new-comment').value,
    };

    const ramenMenuDiv = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenuDiv.appendChild(img);

    ramenForm.reset();
  });
};

const displayRamens = async () => {
  const response = await fetch('http://localhost:3000/ramens');
  const ramens = await response.json();
  const ramenMenuDiv = document.getElementById('ramen-menu');

  ramens.forEach(ramen => {
    const img = document.createElement('img');
    img.src = "./assets/ramen/" + ramen.image; // Adjust the path here
    img.alt = ramen.name;
    img.addEventListener('click', () => handleClick(ramen));
    ramenMenuDiv.appendChild(img);
  });

  if (ramens.length > 0) {
    handleClick(ramens[0]); // Show the first ramen's details
  }
};

const addEditFormListener = () => {
  const editForm = document.getElementById('edit-ramen');
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const updatedRating = editForm.querySelector('#edit-rating').value;
    const updatedComment = editForm.querySelector('#edit-comment').value;

    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");

    detailsRating.textContent = updatedRating;
    detailsComment.textContent = updatedComment;

    editForm.reset();
  });
};

const main = () => {
  displayRamens();
  addSubmitListener();
  addEditFormListener();
};

document.addEventListener('DOMContentLoaded', main);
