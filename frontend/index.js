//variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDom = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

//cart
let cart = [];
let buttonsDOM = [];
//get products

class Products{
    async getProducts(){
        try {
            let result = await fetch("http://127.0.0.1:3000/products/");
            let products = await result.json();
            return products; 
        } catch (error) {
            console.log(error);
        }
        
    }

}

//ui 
class UI{
    displayProducts(products){
        let result = '';
        products.forEach(products => {
            result +=`
            <article class="product">
                <div class="img-container">
                    <img src=${products.image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${products.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
                </div>
                <h3>${products.name}</h3>
                <h4>$${products.price}</h4>
            </article>
            `;
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = buttons;
        buttons.forEach(button =>{
            let itemId = button.dataset.id;
            
            let inCart = cart.find(item => item.id === itemId);
            if(inCart){
                button.innerText = "In Cart";
                button.disabled = true;
            } 
                button.addEventListener('click', (event)=>{
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    //get product from products
                    let cartItem = {...Storage.getProduct(itemId), quantity:1};
                    
                    //add product to cart
                    cart = [...cart,cartItem];
                    //save cart in local storage
                    Storage.saveCart(cart);
                    //set cart values
                    this.setCartValues(cart);
                    // dsiplay cart item, upload json back to api to store in cart tabele
                    this.addCartitem(cartItem)
                    //show cart
                    this.showCart();

                });
            
        });
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.quantity;
            itemsTotal += item.quantity;
        })
        cartTotal.innerText = tempTotal;
        cartItems.innerText = itemsTotal;
        
    }
    addCartitem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}" alt="S600">
                <div>
                    <h4>${item.name}</h4>
                    <h5>$${item.price}</h5>
                    <span class="remove-item" data-id=${item.id}>remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id=${item.id}></i>
                    <p class="item-amount">${item.quantity}</p>
                    <i class="fas fa-chevron-down" data-id=${item.id}></i>
                </div>
        `;
        cartContent.appendChild(div);
        fetch('http://127.0.0.1:3000/cart_items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({product_id: item.id,
            quantity: item.quantity,
        carts_id: 1})
        }).then(response => response.json()).then(newCartItem => {
            console.log(newCartItem)
        });

    }
    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDom.classList.add('showCart');

    }
    setupApp(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart);
    }
    populateCart(cart){
        cart.forEach(item => this.addCartitem(item));
    }
    hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDom.classList.remove('showCart');
    }
    cartLogic(){
        clearCartBtn.addEventListener('click', ()=> {
            this.clearCart();

        })
        cartContent.addEventListener('click', event=>{
            if(event.target.classList.contains('remove-item')){
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            }
            else if(event.target.classList.contains('fa-chevron-up')){
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id == id);
                tempItem.quantity = tempItem.quantity + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.quantity
            }
            else if(event.target.classList.contains('fa-chevron-down')){
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id == id);
                tempItem.quantity = tempItem.quantity - 1;
                if(tempItem.quantity > 0){
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.quantity;
                }
                else{
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        })
    }
    clearCart(){
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        while(cartContent.children.length > 0){
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart();
    }
    removeItem(id){
        //fetch('http://127.0.0.1:3000/cart_items', {
        //    method: 'DELETE',
        //}).then(res => res.text()) .then(res => console.log(res));
        cart = cart.filter(item => item.id != id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`
        
    }
    getSingleButton(id){
        return buttonsDOM.find(button => button.dataset.id == id);
    }
}

//storage
class Storage{
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products));
    };
    static getProduct(itemId){
        let products = JSON.parse(localStorage.getItem('products'));
        
        return products.find(product => product.id == itemId);
        
    };
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart));
        
    };
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')) : [];
    }
}
const ui = new UI();
const products = new Products();
ui.setupApp();
products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
}).then(() =>{
    ui.getBagButtons();
    ui.cartLogic();
});
