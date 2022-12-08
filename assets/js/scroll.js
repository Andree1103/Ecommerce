export function headerScroll () {
const header = document.querySelector("header")
window.addEventListener("scroll", ()=> {
  if(window.scrollY >=50) {
    header.classList.add("scroll-bg")
  } else {
    header.classList.remove("scroll-bg")
  }
})
}
