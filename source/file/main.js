let navbar = document.querySelector('.navbar')
document.querySelector('.nav-but').onclick = () => {
  navbar.classList.toggle('active')
}
window.onscroll = () => {
  navbar.classList.remove('active')
}
