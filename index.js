document.addEventListener('DOMContentLoaded', () => {
    const tacoMenu = document.getElementById('taco-menu');
    const tacoTitle = document.getElementById('taco-title');
    const tacoImage = document.getElementById('taco-image');
    const tacoRating = document.getElementById('taco-rating');
    const tacoComment = document.getElementById('taco-comment');
    const newTacoForm = document.getElementById('new-taco');
    const editTacoForm = document.getElementById('edit-taco');

    let currentTacoId = null; // To store the ID of the taco being edited

    // Function to fetch tacos and display them
    function displayTacos() {
        fetch('http://localhost:3000/tacos')
            .then(response => response.json())
            .then(data => {
                tacoMenu.innerHTML = '';
                data.forEach(taco => {
                    const tacoItem = document.createElement('div');
                    tacoItem.classList.add('taco-item');
                    tacoItem.innerHTML = `
                        <h3>${taco.name}</h3>
                        <img src="${taco.image}" alt="${taco.name}">
                        <button onclick="showTacoDetails(${taco.id})">Details</button>
                    `;
                    tacoMenu.appendChild(tacoItem);
                });
            });
    }

    // Function to show taco details
    window.showTacoDetails = function(id) {
        fetch(`http://localhost:3000/tacos/${id}`)
            .then(response => response.json())
            .then(taco => {
                tacoTitle.innerText = taco.name;
                tacoImage.src = taco.image;
                tacoRating.value = taco.rating; // Set the value for the update form
                tacoComment.value = taco.comment; // Set the value for the update form
                currentTacoId = taco.id; // Store the ID for updates
            });
    };

    // Handle new taco submission
    newTacoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const tacoName = document.getElementById('new-taco-name').value;
        const tacoImage = document.getElementById('new-taco-image').value;

        fetch('http://localhost:3000/tacos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: tacoName, image: tacoImage })
        }).then(() => {
            displayTacos();
            newTacoForm.reset();
        });
    });

    // Handle update taco submission
    editTacoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const rating = document.getElementById('new-rating').value;
        const comment = document.getElementById('new-comment').value;

        fetch(`http://localhost:3000/tacos/${currentTacoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: rating, comment: comment })
        }).then(() => {
            displayTacos();
            editTacoForm.reset();
        });
    });

    // Initial display
    displayTacos();
});

