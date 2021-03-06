// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    //const devourBtn = document.querySelectorAll('.devour');
    const burgerList = document.querySelector("#burgersList");

    if (burgerList) {
    
        burgerList.addEventListener("click", function(e){
            if (e.target.matches(".devourBtn")) {
                const id = e.target.getAttribute('data-id');
                const devoured = e.target.getAttribute('data-devoured');

                const burgerState = {
                    devoured: true,
                };

                fetch(`/api/burgers/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(burgerState),
                }).then((response) => {
                    // Reload the page so the user can see the changes
                    if (response.ok) {
                        location.reload('/');
                    } else {
                        alert('Something went wrong...');
                    }
                });
            }
        });
    }
    
    const createBurgerBtn = document.getElementById('create-form');

    if (createBurgerBtn) {

        createBurgerBtn.addEventListener('submit', (e) => {
            e.preventDefault();

            const newBurger = {
                burger_name: document.getElementById('burger-input').value.trim(),
                // devoured: document.getElementById('false').checked,
                devoured: false,
            };

            fetch('/api/burgers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(newBurger),
            }).then(() => {
                document.getElementById('burger-input').value = '';

                // Reload the page so the user can see the new quote
                console.log('Created a new burger!');
                location.reload();
            });
        });
    };

    const devouredList = document.querySelector("#devouredList");

    if (devouredList) {

        devouredList.addEventListener("click", function(e){
            if (e.target.matches(".origBtn")) {
                const id = e.target.getAttribute('data-id');
                const devoured = e.target.getAttribute('data-original');
                const burgerState = {
                    devoured: false,
                };
                fetch(`/api/burgers/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(burgerState),
                }).then((response) => {
                    // Reload the page so the user can see the changes
                    if (response.ok) {
                        location.reload('/');
                    } else {
                        alert('Something went wrong...');
                    }
                });
            }
        });
    };
});