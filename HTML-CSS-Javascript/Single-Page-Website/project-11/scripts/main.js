"use strict";

let rsvpBtn = document.querySelector(".btn-rsvp");
rsvpBtn.onclick = function () {
    let rsvpModal = document.querySelector(".rsvp-modal");
    rsvpModal.classList.add("show-rsvp-modal");
};

