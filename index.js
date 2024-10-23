// Fetch existing ramen data
async function fetchRamens() {
    try {
        const response = await fetch('http://localhost:3000/ramens');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Return the ramen array
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to display ramens
async function displayRamens() {
    const ramens = await fetchRamens();
    const ramenMenuDiv = document.getElementById('ramen-menu');

    if (ramens) {
        ramens.forEach(ramen => {
            const ramenItem = document.createElement('div');
            ramenItem.className = 'ramen-item';
            ramenItem.innerHTML = `<img src="${ramen.image}" alt="${ramen.name}"><p>${ramen.name}</p>`;
            ramenItem.addEventListener('click', () => handleClick(ramen));
            ramenMenuDiv.appendChild(ramenItem);
        });
    }
}

// Handle click event on ramen images
function handleClick(ramen) {
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
}

// Add a new ramen entry when the form is submitted
function addSubmitListener(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const newRamen = {
            name: form['new-name'].value,
            restaurant: form['new-restaurant'].value,
            image: form['new-image'].value,
            rating: form['new-rating'].value,
            comment: form['new-comment'].value,
        };

        // Update the menu with the new ramen
        addRamenToMenu(newRamen);
        
        // Reset form fields
        form.reset();
    });
}

// Function to add new ramen to the menu
function addRamenToMenu(ramen) {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    const ramenItem = document.createElement('div');
    ramenItem.className = 'ramen-item';
    ramenItem.innerHTML = `<img src="${ramen.image}" alt="${ramen.name}"><p>${ramen.name}</p>`;
    ramenItem.addEventListener('click', () => handleClick(ramen));
    ramenMenuDiv.appendChild(ramenItem);

    // Send POST request to add new ramen to the JSON Server
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ramen),
    })
    .then(response => response.json())
    .then(data => console.log('New ramen added:', data))
    .catch(error => console.error('Error adding new ramen:', error));
}

// Initialize application on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    const ramenForm = document.getElementById('new-ramen');
    addSubmitListener(ramenForm);
});



