export function darkThemeChange () {
    const themeBtn = document.getElementById('theme-btn')
    const body = document.body
    if ( themeBtn.classList.contains('bx-moon')) {
      themeBtn.classList.replace('bx-moon','bx-sun')
    } else {
      themeBtn.classList.replace('bx-sun','bx-moon')
    }
    body.classList.toggle('dark')
    
  //Forma 2
    /*const dark = 'dark'
    const icon = 'bx-sun'
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle(dark)
      themeBtn.classList.toggle(icon)*/
  }
themeBtn.addEventListener("click", ()=> darkThemeChange())