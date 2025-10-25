const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav').querySelector('ul');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
});
