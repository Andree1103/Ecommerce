import { number } from "./number.js";
import { db } from "./producto.js";

export const cart  = {
    items: window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')): [],
    methods: {
        add: (id,quantity) => {
            const cartItem = cart.methods.get(id)
            if (cartItem) {
                if (cart.methods.hasInventory(id,quantity + cartItem.quantity)) {
                    cartItem.quantity += quantity
                } else {
                    window.alert('No Stock')
                }
            } else {
                cart.items.push({id, quantity})
            }
        },
        remove: (id,quantity) => {
            const cartItem = cart.methods.get(id)
            if (cartItem.quantity - quantity > 0){
                cartItem.quantity -= quantity
            } else {
                cart.items = cart.items.filter(item => item.id !== id)
            }
        },
        removeALL: (id) => {
            cart.items = cart.items.filter(item => item.id !== id)
        },
        count: () => {
            return cart.items.reduce((acc,item) => acc + item.quantity, 0)
        },
        get: (id) => {
            const index = cart.items.findIndex(item => item.id === id)
            return index >= 0 ? cart.items[index] : null
        },
        getAll: ()=> {
            return cart.items
        },
        getTotal: ()=> {
            const total = cart.items.reduce((acc,item) => {
                const itemdb = db.methods.find(item.id)
                return acc + (itemdb.price * item.quantity)
            }, 0)
            return total
        },
        hasInventory: (id,quantity) => {
            return db.methods.find(id).quantity -quantity >= 0
        },
        purchase: ()=> {
            db.methods.remove(cart.items)
            cart.items = []
        }
    }
}
export function showProducts () {
    const content = document.getElementById("cart-content")
    const cartItems = cart.methods.getAll()
    let fragment =""
    if(cartItems.length > 0){
        cartItems.forEach(item => {
            const product = db.methods.find(item.id)
                fragment += `
                <article class="cart_card">
                <div class="cart_box">
                    <img src="${product.image}" alt="${product.image}" class="cart_img">
                </div>
                <div class="cart_details">
                    <h3 class="cart_tittle">${product.name}</h3>
                    <span class="cart_stock">Stock: ${product.quantity} | <span class="cart_price">${number(product.price)}</span></span>
                    <span class="cart_subtotal">
                        Subtotal: ${number(item.quantity * product.price)}
                    </span>
                    <div class="cart_amount">
                        <div class="cart_amount-content">
                            <span class="cart_amount-box minus" data-id="${product.id}">
                                <i class="bx bx-minus"></i>
                            </span>
                            <span class="cart_amount-number">${product.quantitySelected} units</span>
                            <span class="cart_amount-box plus" data-id="${product.id}">
                                <i class="bx bx-plus"></i>
                            </span>
                        </div>
                        <i class="bx bx-trash-alt cart_amount-trash" data-id="${product.id}"></i>
                    </div>
                </div>
            </article>
                `
              })
    } else {
        fragment += `
        <div class="cart_empty">
            <img src="./assets/images/empty-cart.png" alt="Imagen no encontrada">
            <h2 class="cart_vacio">Tu carrito esta vacío</h2>
            <p>Por favor rellenar el carrito con los productos dando clic en el botón + en la pagina del producto</p>
        </div>
        `
    }
    content.innerHTML = fragment
    const cartCounter = document.getElementById('cart-counter')
    const itemsCount = document.getElementById('items-count')
    cartCounter.innerHTML = cart.methods.count()
    itemsCount.innerHTML = cart.methods.count()
    const minusItem = document.querySelectorAll ('.minus')
    const plusItem = document.querySelectorAll ('.plus')
    const deletebtn = document.querySelectorAll ('.cart_amount-trash')
    const totalcontainer = document.getElementById('cart-total')
    const checkbtn = document.getElementById('cart-checkout')
    minusItem.forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.getAttribute('data-id'))
            cart.methods.remove(id,1)
            showProducts()
        })
    })
    plusItem.forEach(item => {
        item.addEventListener('click', ()=> {
            const id = parseInt(item.getAttribute('data-id'))
            cart.methods.add(id,1)
            showProducts()
        })
    })
    deletebtn.forEach(btn => {
        btn.addEventListener('click',()=> {
            const id= parseInt(btn.getAttribute('data-id'))
            cart.methods.removeALL(id)
            showProducts()
        })
    })
    const total = cart.methods.getTotal()
    totalcontainer.innerHTML=number(total)
    if (cart.items.length > 0) {
        checkbtn.removeAttribute('disabled')
    } else {
        checkbtn.setAttribute('disabled', 'disabled')
    }
    checkbtn.addEventListener('click', () => {
        cart.methods.purchase()
        showProducts()
    })
    window.localStorage.setItem('products' ,JSON.stringify(db.items))
    window.localStorage.setItem('cart',JSON.stringify(cart.items))
}
