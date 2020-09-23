"use strict";

function subscribe(thisBtn) {
    let subscribeModal = document.querySelector(".subscribe-modal-overlay");

    subscribeModal.style.zIndex = "1";
    subscribeModal.style.opacity = "1";
};


function likePost(thisBtn) {
    if (thisBtn.innerHTML.slice(2, 7) == "Liked") {
        thisBtn.innerHTML = '<i class="fa fa-thumbs-up"></i>Like';
    } else {
        thisBtn.innerHTML = "&#10003; Liked";
    }
}


function showComments(thisBtn) {
    let comments = thisBtn.parentNode.nextElementSibling;

    if (comments.style.display == "block") {
        comments.style.display = "none";
    } else {
        comments.style.display = "block";
    }
};