import sk1 from '../assets/products/sk1.jpg'
import sk2 from '../assets/products/sk2.jpg'
import sk3 from '../assets/products/sk3.jpg'

import lk1 from '../assets/products/lk1.jpg'
import lk2 from '../assets/products/lk2.jpg'
import lk3 from '../assets/products/lk3.jpg'

import ck1 from '../assets/products/ck1.jpg'
import ck2 from '../assets/products/ck2.jpg'
import ck3 from '../assets/products/ck3.jpg'

import ak1 from '../assets/products/ak1.jpg'
import ak2 from '../assets/products/ak2.jpg'
import ak3 from '../assets/products/ak3.jpg'

import { useState } from 'react'


const products = [

  {
    id: 1,
    image: sk1,
    name: 'Elegant Short Kurti',
    price: 'Rs. 1,499',
    category: 'Short Kurtis'
  },

  {
    id: 2,
    image: sk2,
    name: 'Classic Short Kurti',
    price: 'Rs. 1,599',
    category: 'Short Kurtis'
  },

  {
    id: 3,
    image: sk3,
    name: 'Printed Short Kurti',
    price: 'Rs. 1,199',
    category: 'Short Kurtis'
  },

  {
    id: 4,
    image: lk1,
    name: 'Classic Long Kurti',
    price: 'Rs. 2,799',
    category: 'Long Kurtis'
  },

  {
    id: 5,
    image: lk2,
    name: 'Elegant Long Kurti',
    price: 'Rs. 2,899',
    category: 'Long Kurtis'
  },

  {
    id: 6,
    image: lk3,
    name: 'Printed Long Kurti',
    price: 'Rs. 2,999',
    category: 'Long Kurtis'
  },

  {
    id: 7,
    image: ck1,
    name: 'Elegant Co-ord Set',
    price: 'Rs. 3,199',
    category: 'Co-ord Sets'
  },

  {
    id: 8,
    image: ck2,
    name: 'Classic Co-ord Set',
    price: 'Rs. 3,299',
    category: 'Co-ord Sets'
  },

  {
    id: 9,
    image: ck3,
    name: 'Printed Co-ord Set',
    price: 'Rs. 3,399',
    category: 'Co-ord Sets'
  },

  {
    id: 10,
    image: ak1,
    name: 'Elegant Anarkali Set',
    price: 'Rs. 3,499',
    category: 'Anarkali Sets'
  },

  {
    id: 11,
    image: ak2,
    name: 'Traditional Anarkali Set',
    price: 'Rs. 3,599',
    category: 'Anarkali Sets'
  },

  {
    id: 12,
    image: ak3,
    name: 'Designer Anarkali Set',
    price: 'Rs. 3,799',
    category: 'Anarkali Sets'
  }

]


function Shop({ cart, setCart }) {

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)


  const addToCart = () => {

  if (!selectedSize) {
    alert('Please select a size.')
    return
  }

  const existingItem = cart.find(
    item =>
      item.id === selectedProduct.id &&
      item.size === selectedSize
  )


  if (existingItem) {

    const updatedCart = cart.map(item =>
      item.id === selectedProduct.id &&
      item.size === selectedSize
        ? {
            ...item,
            quantity: item.quantity + quantity
          }
        : item
    )

    setCart(updatedCart)

  } else {

    const cartItem = {
      ...selectedProduct,
      size: selectedSize,
      quantity: quantity
    }

    setCart([...cart, cartItem])

  }


  setSelectedProduct(null)
  setSelectedSize('')
  setQuantity(1)

}

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(
          product => product.category === selectedCategory
        )


  return (

    <div className="shop-page">

      <section className="shop-header">

        <p>THE ALMIRA COLLECTION</p>

        <h1>Shop</h1>

        <span>
          Discover styles made for every occasion.
        </span>

      </section>


      <section className="shop-products">

        <div className="shop-category">

          <button
            className={selectedCategory === 'All' ? 'active' : ''}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>

          <button
            className={selectedCategory === 'Short Kurtis' ? 'active' : ''}
            onClick={() => setSelectedCategory('Short Kurtis')}
          >
            Short Kurtis
          </button>

          <button
            className={selectedCategory === 'Long Kurtis' ? 'active' : ''}
            onClick={() => setSelectedCategory('Long Kurtis')}
          >
            Long Kurtis
          </button>

          <button
            className={selectedCategory === 'Co-ord Sets' ? 'active' : ''}
            onClick={() => setSelectedCategory('Co-ord Sets')}
          >
            Co-ord Sets
          </button>

          <button
            className={selectedCategory === 'Anarkali Sets' ? 'active' : ''}
            onClick={() => setSelectedCategory('Anarkali Sets')}
          >
            Anarkali Sets
          </button>

        </div>


        <div className="shop-grid">

          {filteredProducts.map(product => (

            <div
              className="shop-card"
              key={product.id}
              onClick={() => setSelectedProduct(product)}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>{product.price}</p>

            </div>

          ))}

        </div>

      </section>


      {selectedProduct && (

        <div
          className="product-modal"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="product-modal-content"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>


            <div className="modal-image">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

            </div>


            <div className="modal-details">

              <p className="modal-category">
                {selectedProduct.category}
              </p>

              <h2>
                {selectedProduct.name}
              </h2>

              <p className="modal-price">
                {selectedProduct.price}
              </p>

              <p className="modal-description">
                A timeless piece designed to bring together
                traditional elegance and modern style.
              </p>


              <div className="size-section">

                <p>Size</p>

                <div className="size-options">

                  <button
                    className={selectedSize === 'S' ? 'selected' : ''}
                    onClick={() => setSelectedSize('S')}
                  >
                    S
                  </button>

                  <button
                    className={selectedSize === 'M' ? 'selected' : ''}
                    onClick={() => setSelectedSize('M')}
                  >
                    M
                  </button>

                  <button
                    className={selectedSize === 'L' ? 'selected' : ''}
                    onClick={() => setSelectedSize('L')}
                  >
                    L
                  </button>

                  <button
                    className={selectedSize === 'XL' ? 'selected' : ''}
                    onClick={() => setSelectedSize('XL')}
                  >
                    XL
                  </button>

                </div>

              </div>


              <div className="quantity-section">

                <p>Quantity</p>

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      setQuantity(quantity > 1 ? quantity - 1 : 1)
                    }
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>

                </div>

              </div>


              <button
                className="add-cart-button"
                onClick={addToCart}
              >
                ADD TO CART
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}


export default Shop