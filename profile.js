const profilePicture = document.querySelector('.profilePicture');
const profileDropdown = document.querySelector('#profileDropdown');

profilePicture.addEventListener('click', function() {
    profileDropdown.classList.toggle('d-none');
    profileDropdown.classList.toggle('d-flex');
})