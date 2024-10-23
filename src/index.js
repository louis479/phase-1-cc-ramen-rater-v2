// index.js

// Mock data for testing
const testResponseData = [
    {
        "id": 1,
        "name": "Shoyu Ramen",
        "restaurant": "Nonono",
        "image": "./assets/ramen/shoyu.jpg",
        "rating": 7,
        "comment": "Delish. Can't go wrong with a classic!"
    },
    {
        "id": 2,
        "name": "Naruto Ramen",
        "restaurant": "Naruto",
        "image": "./assets/ramen/naruto.jpg",
        "rating": 10,
        "comment": "My absolute fave!"
    },
    // Add other ramens as needed...
];

// Function to display ramens
export const displayRamens = async () => {
    const response = await fetch('/api/ramens'); // Mocked fetch, replace with actual API
    const ramens = await response.json();
    const ramenMenuDiv = document.getElementById('ramen-menu');
    
    ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name; // Add alt for accessibility
        img.addEventListener('click', (event) => handleClick(ramen, event));
        ramenMenuDiv.appendChild(img);
    });
};

// Function to handle ramen image click
export const handleClick = (ramen, event) => {
    const detailImg = document.querySelector("#ramen-detail > .detail-image");
    const detailName = document.querySelector("#ramen-detail > .name");
    const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");

    detailImg.src = ramen.image;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailsRating.textContent = ramen.rating;
    detailsComment.textContent = ramen.comment;
};

// Function to add submit listener for the form
export const addSubmitListener = (form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const newRamen = {
            name: form.elements['new-name'].value,
            restaurant: form.elements['new-restaurant'].value,
            image: form.elements['new-image'].value,
            rating: form.elements['new-rating'].value,
            comment: form.elements['new-comment'].value,
        };

        const ramenMenuDiv = document.getElementById('ramen-menu');
        const img = document.createElement('img');
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener('click', (event) => handleClick(newRamen, event));
        ramenMenuDiv.appendChild(img);
        
        form.reset(); // Reset the form after submission
    });
};

// Main function to initialize the app
export const main = () => {
    const ramenForm = document.getElementById('new-ramen');
    displayRamens();
    addSubmitListener(ramenForm);
};

document.addEventListener('DOMContentLoaded', main);

