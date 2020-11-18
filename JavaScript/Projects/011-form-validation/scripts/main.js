'use strict';

window.addEventListener('load', () => {

    const registerForm = document.forms['registerForm'];

    registerForm.onsubmit = function(e) {
        e.preventDefault();

        alert('Fields Validated and Valid');
    };

    registerForm['fullName'].oninput = function () {
        this.setCustomValidity('');

        if (!this.checkValidity()) {
            this.setCustomValidity('Alphabets only.');
        }
    };

    registerForm['zipCode'].oninput = function () {
        this.setCustomValidity('');

        if (!this.checkValidity()) {
            this.setCustomValidity('Numeric only.');
        }
    };

    const selectCountry = registerForm['country'];
    for (const country of countries) {
        const option = document.createElement('option');
        option.setAttribute('value', country);
        option.textContent = country;
        selectCountry.appendChild(option);
    }

});