'use strict';

window.addEventListener('load', function () {
    const bookmarksContainer = document.querySelector('.bookmark-list');

    function setBookmark() {
        let name = this.elements['domainName'].value;
        let url = this.elements['url'].value.toLowerCase();

        if (!(url.includes('https://') || url.includes('http://'))) {
            alert('Not Valid URL');
            return false;
        }

        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        if (!bookmarks)
            bookmarks = {};

        bookmarks[name] = url;
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        this.reset();
        this.elements['domainName'].focus();

        updateBookmarkList(name, url);

        return false;
    }

    function getBookmark() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        for (let name in bookmarks) {
            const span = document.createElement('span');
            span.setAttribute('class', 'remove-bookmark');
            span.innerHTML = '&times;';
            span.onclick = removeBookmark;

            const li = document.createElement('li');
            let listContent = `<h2>${name}</h2>` +
                `<a href="${bookmarks[name]}" target="_blank">${bookmarks[name]}</a>`;

            li.innerHTML = listContent;
            li.appendChild(span);

            bookmarksContainer.appendChild(li);
        }

    }

    // update <ul class="bookmark-list"></ul> content
    function updateBookmarkList(name, url) {
        const span = document.createElement('span');
        span.setAttribute('class', 'remove-bookmark');
        span.innerHTML = '&times;';
        span.onclick = removeBookmark;

        const li = document.createElement('li');
        let listContent = `<h2>${name}</h2>` +
            `<a href="${url}" target="_blank">${url}</a>`;

        li.innerHTML = listContent;
        li.appendChild(span);

        bookmarksContainer.appendChild(li);
    }

    function removeBookmark() {
        const confirmDeletion = confirm('Are you sure you want to delete bookmark?');

        if (!confirmDeletion)
            return;

        bookmarksContainer.removeChild(this.parentNode);

        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        delete bookmarks[this.parentNode.firstChild.textContent];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }


    document.getElementById('bookmarkForm').onsubmit = setBookmark;

    getBookmark();
});