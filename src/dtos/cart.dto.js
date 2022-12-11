class CartDto {
    constructor(cart) {
        this.id = cart.id || cart._id
        this.products = cart.products
    }

    build() {
        return this
    }
}

export default CartDto