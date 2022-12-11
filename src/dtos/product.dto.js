class ProductDto {
    constructor(product) {
        this.id = product.id || product._id
        this.nombre = product.nombre
        this.precio = product.precio
        this.fotoURl = product.fotoURl
        this.descripcion = product.descripcion
        this.stock = product.stock
    }

    build() { 
        return this
    }
}

export default ProductDto