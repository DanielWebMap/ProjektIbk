//Menü Grundlage

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('nav-open');
});
