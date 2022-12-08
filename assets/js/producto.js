import { items } from "./db.js";
import { number  } from "./number.js";
import { cart, showProducts } from "./carrito.js";

export const db = {
    items: window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')): items,
    methods: {
        find: (id) => {
            return db.items.find(item => item.id === id)
        },
        getAll: () => {
            return db.items
        },
        remove: (items) => {
            items.forEach(item => {
                const product = db.methods.find(item.id)
                product.quantity = product.quantity - item.quantity
            })
        }
    }
}
export const VerProducto = () => {
    const productoContainer = document.querySelector('#products .products_content')
    const products = db.methods.getAll()
    let html = ''
    products.forEach(product => {
        html += `
        <article class="products_card ${product.category}">
            <div class="products_shape">
              <img class="pro_img" src="${product.image}" alt="${product.name}">
            </div>
            <div class="products_data">
              <h2 class="products_price">
              ${number(product.price)}
                <span class="products_quantity">| Existencias: ${product.quantity}</font>
                </span>
              </h2>
              <h3 class="products_name">
              ${product.name}
              </h3>
              <button class="btn_products" data-id="${product.id}">
                <i class="bx bx-plus"></i>
              </button>
            </div>
          </article>
        `
    })
    productoContainer.innerHTML += html

    const productBTN = document.querySelectorAll('.btn_products')
    productBTN.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'))
            const product = db.methods.find(id)

            if (product && product.quantity > 0) {
                cart.methods.add(id,1)
                showProducts()
            }else {
                window.alert('No hay stock del producto')
            }            
        })
    })
    window.localStorage.setItem('products', JSON.stringify(db.items))
}