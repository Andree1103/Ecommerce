 export function load () {
    /*const loader = document.getElementById('loader')
    setTimeout( () =>{
      loader.classList.add('view')
      console.log('Ya pasaron 3s')
    }, 1000)*/
    const load = document.getElementById('loader')
    if (load) {
        setTimeout(() => {
            load.style.display = 'none'
        }, 1500)
    }
  }