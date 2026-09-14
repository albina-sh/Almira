import './App.css'
import logo from './assets/almira_logo-removebg-preview.png'

import sk2 from './assets/products/sk2.jpg'
import lk1 from './assets/products/lk1.jpg'
import ck3 from './assets/products/ck3.jpg'
import ak3 from './assets/products/ak3.jpg'

import sk3 from './assets/products/sk3.jpg'
import lk2 from './assets/products/lk2.jpg'
import ak2 from './assets/products/ak2.jpg'

import { Search, UserRound, ShoppingBag, X, Minus, Plus } from 'lucide-react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './pages/Shop'
import About from './pages/About'
import Support from './pages/Support'
import Admin from './pages/Admin'
import { useState } from 'react'


function App() {

  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginMode, setLoginMode] = useState('login')
  const [loggedInUser, setLoggedInUser] = useState(null)

  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )


  const cartTotal = cart.reduce(
    (total, item) => {
      const price = Number(
        item.price.replace('Rs. ', '').replace(',', '')
      )

      return total + price * item.quantity
    },
    0
  )


  const updateQuantity = (index, change) => {

    setCart(
      cart
        .map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change)
              }
            : item
        )
    )

  }


  const removeFromCart = (index) => {

    setCart(
      cart.filter((_, itemIndex) => itemIndex !== index)
    )

  }

  const handleLogin = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const email = formData.get('email')
  const password = formData.get('password')

  const savedUser = JSON.parse(
    localStorage.getItem('almiraUser')
  )

  if (
    savedUser &&
    savedUser.email === email &&
    savedUser.password === password
  ) {
    setLoggedInUser(savedUser)
    setLoginOpen(false)

    alert('Welcome back, ' + savedUser.name + '!')
  } else {
    alert('Invalid email or password.')
  }
}

  const handleRegister = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    const user = {
      name: name,
      email: email,
      password: password
    }

    localStorage.setItem(
      'almiraUser',
      JSON.stringify(user)
    )

    setLoggedInUser(user)
    setLoginOpen(false)

    alert('Account created successfully!')
  }

    const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  })


const placeOrder = async (event) => {
  event.preventDefault()

  const orderItems = cart
    .map(
      (item) =>
        `${item.name} (${item.size}) × ${item.quantity}`
    )
    .join(', ')

  try {
    const response = await fetch(
      'http://localhost:5000/send-order-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: checkoutDetails.name,
          email: checkoutDetails.email,
          phone: checkoutDetails.phone,
          address: checkoutDetails.address,
          city: checkoutDetails.city,
          orderItems: orderItems,
          orderTotal: `Rs. ${cartTotal.toLocaleString()}`
        })
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Email could not be sent')
    }

    setOrderPlaced(true)
    setCheckoutOpen(false)
    setCart([])

  } catch (error) {
    console.error('Order error:', error)
    alert('Order could not be placed. Please try again.')
  }
}

  return (

    <BrowserRouter>

      <div className="app">


        {/* NAVBAR */}

        <nav className="navbar">

          <div className="logo-container">
            <img src={logo} alt="Almira logo" />
          </div>


          <div className="nav-links">

            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/about">About</a>
            <a href="/support">Support</a>

          </div>


          <div className="nav-icons">

            <Search
              size={20}
              strokeWidth={1.7}
              onClick={() => alert('Search feature coming soon!')}
            />

            <UserRound
              size={20}
              strokeWidth={1.7}
              onClick={() => {
                if (loggedInUser) {
                  alert('Logged in as ' + loggedInUser.name)
                } else {
                  setLoginOpen(true)
                }
              }}
            />


            <button
              className="cart-icon-button"
              onClick={() => setCartOpen(true)}
            >

              <ShoppingBag
                size={20}
                strokeWidth={1.7}
              />

              {cartItemCount > 0 && (

                <span className="cart-count">
                  {cartItemCount}
                </span>

              )}

            </button>

          </div>

        </nav>


        {/* PAGES */}

        <Routes>
          
          <Route path="/admin" element={<Admin />} />

          <Route path="/about" element={<About />} />

          <Route path="/support" element={<Support />} />

          <Route
            path="/"
            element={

              <main>

                {/* Hero Section */}

                <section className="hero">

                  <div className="hero-content">

                    <p className="hero-small">
                      THE ALMIRA COLLECTION
                    </p>

                    <h1>
                      Where tradition meets elegance.
                    </h1>

                    <p>
                      Discover timeless kurtis designed to celebrate
                      tradition with a modern touch.
                    </p>

                    <button onClick={() => {
                          window.location.href = '/shop'
                        }}
                      >
                      SHOP NOW
                    </button>

                  </div>

                </section>


                {/* Categories */}

                <section className="categories">

                  <p className="section-label">
                    EXPLORE
                  </p>

                  <h2>
                    Shop by Category
                  </h2>


                  <div className="category-grid">

                    <div className="category-card">

                      <img
                        src={sk2}
                        alt="Short Kurti"
                      />

                      <h3>
                        Short Kurtis
                      </h3>

                    </div>


                    <div className="category-card">

                      <img
                        src={lk1}
                        alt="Long Kurti"
                      />

                      <h3>
                        Long Kurtis
                      </h3>

                    </div>


                    <div className="category-card">

                      <img
                        src={ck3}
                        alt="Co-ord Set"
                      />

                      <h3>
                        Co-ord Set
                      </h3>

                    </div>


                    <div className="category-card">

                      <img
                        src={ak3}
                        alt="Anarkali Set"
                      />

                      <h3>
                        Anarkali Set
                      </h3>

                    </div>

                  </div>

                </section>


                {/* Most Loved */}

                <section className="products">

                  <p className="section-label">
                    OUR FAVORITES
                  </p>

                  <h2>
                    Most Loved
                  </h2>


                  <div className="product-grid">

                    <div className="product-card">

                      <img
                        src={sk3}
                        alt="Elegant Short Kurti"
                      />

                      <h3>
                        Elegant Short Kurti
                      </h3>

                      <p>
                        Rs. 1,499
                      </p>

                    </div>


                    <div className="product-card">

                      <img
                        src={lk2}
                        alt="Classic Long Kurti"
                      />

                      <h3>
                        Classic Long Kurti
                      </h3>

                      <p>
                        Rs. 2,799
                      </p>

                    </div>


                    <div className="product-card">

                      <img
                        src={ak2}
                        alt="Elegant Co-ord Set"
                      />

                      <h3>
                        Elegant Co-ord Set
                      </h3>

                      <p>
                        Rs. 3,199
                      </p>

                    </div>

                  </div>

                </section>

              </main>

            }
          />


          <Route
            path="/shop"
            element={
              <Shop
                cart={cart}
                setCart={setCart}
              />
            }
          />

        </Routes>


        {/* FOOTER */}

        <footer className="footer">

          <div className="footer-content">

            <div className="footer-brand">

              <h2>
                ALMIRA
              </h2>

              <p>
                Where tradition meets elegance.
              </p>

            </div>


            <div className="footer-section">

              <h3>
                Quick Links
              </h3>

              <a href="/">
                Home
              </a>

              <a href="/shop">
                Shop
              </a>

              <a href="/about">
                About
              </a>

              <a href="/support">
                Support
              </a>

            </div>


            <div className="footer-section">

              <h3>
                Customer Care
              </h3>

              <a href="#">
                Contact Us
              </a>

              <a href="#">
                Shipping & Delivery
              </a>

              <a href="#">
                Returns
              </a>

            </div>


            <div className="footer-section">

              <h3>
                Follow Almira
              </h3>

              <p>
                Discover our latest collections and styles.
              </p>

            </div>

          </div>


          <div className="footer-bottom">

            <p>
              © 2026 Almira. All rights reserved.
            </p>

          </div>

        </footer>


        {/* CART OVERLAY */}

        {cartOpen && (

          <div
            className="cart-overlay"
            onClick={() => setCartOpen(false)}
          >

            <div
              className="cart-panel"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="cart-header">

                <h2>
                  Your Cart
                </h2>

                <button
                  className="cart-close"
                  onClick={() => setCartOpen(false)}
                >

                  <X size={22} />

                </button>

              </div>


              {cart.length === 0 ? (

                <div className="empty-cart">

                  <ShoppingBag size={38} strokeWidth={1.3} />

                  <p>
                    Your cart is empty.
                  </p>

                  <button
                    onClick={() => setCartOpen(false)}
                  >
                    CONTINUE SHOPPING
                  </button>

                </div>

              ) : (

                <>

                  <div className="cart-items">

                    {cart.map((item, index) => (

                      <div
                        className="cart-item"
                        key={`${item.id}-${item.size}-${index}`}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                        />


                        <div className="cart-item-details">

                          <h3>
                            {item.name}
                          </h3>

                          <p>
                            Size: {item.size}
                          </p>

                          <p>
                            {item.price}
                          </p>


                          <div className="cart-quantity">

                            <button
                              onClick={() =>
                                updateQuantity(index, -1)
                              }
                            >
                              <Minus size={14} />
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(index, 1)
                              }
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                        </div>


                        <button
                          className="cart-remove"
                          onClick={() =>
                            removeFromCart(index)
                          }
                        >
                          <X size={16} />
                        </button>

                      </div>

                    ))}

                  </div>


                  <div className="cart-bottom">

                    <div className="cart-total">

                      <span>
                        Total
                      </span>

                      <strong>
                        Rs. {cartTotal.toLocaleString()}
                      </strong>

                    </div>


                    <button
                      className="checkout-button"
                      onClick={() => {
                        setCartOpen(false)
                        setCheckoutOpen(true)
                      }}
                    >
                      CHECKOUT
                    </button>

                  </div>

                </>

              )}

            </div>

          </div>

                )}


        {/* CHECKOUT OVERLAY */}

        {checkoutOpen && (

          <div
            className="checkout-overlay"
            onClick={() => setCheckoutOpen(false)}
          >

            <div
              className="checkout-panel"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="checkout-header">

                <h2>
                  Checkout
                </h2>

                <button
                  className="checkout-close"
                  onClick={() => setCheckoutOpen(false)}
                >
                  <X size={22} />
                </button>

              </div>


              <form onSubmit={placeOrder}>

                <div className="checkout-form">

                  <label>
                    Full Name

                    <input
                      type="text"
                      value={checkoutDetails.name}
                      onChange={(event) =>
                        setCheckoutDetails({
                          ...checkoutDetails,
                          name: event.target.value
                        })
                      }
                      required
                    />

                  </label>

                  <label>
                     Email Address

                    <input
                      type="email"
                      value={checkoutDetails.email}
                      onChange={(event) =>
                        setCheckoutDetails({
                          ...checkoutDetails,
                          email: event.target.value
                        })
                      }
                      required
                    />

                  </label>

                  <label>
                    Phone Number

                    <input
                      type="tel"
                      value={checkoutDetails.phone}
                      onChange={(event) =>
                        setCheckoutDetails({
                          ...checkoutDetails,
                          phone: event.target.value
                        })
                      }
                      required
                    />

                  </label>


                  <label>
                    Address

                    <input
                      type="text"
                      value={checkoutDetails.address}
                      onChange={(event) =>
                        setCheckoutDetails({
                          ...checkoutDetails,
                          address: event.target.value
                        })
                      }
                      required
                    />

                  </label>


                  <label>
                    City

                    <input
                      type="text"
                      value={checkoutDetails.city}
                      onChange={(event) =>
                        setCheckoutDetails({
                          ...checkoutDetails,
                          city: event.target.value
                        })
                      }
                      required
                    />

                  </label>

                </div>


                <div className="checkout-summary">

                  <h3>
                    Order Summary
                  </h3>

                  {cart.map((item, index) => (

                    <div
                      className="checkout-item"
                      key={`${item.id}-${item.size}-${index}`}
                    >

                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        {item.price}
                      </span>

                    </div>

                  ))}


                  <div className="checkout-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      Rs. {cartTotal.toLocaleString()}
                    </strong>

                  </div>

                </div>


                <button
                  type="submit"
                  className="place-order-button"
                >
                  PLACE ORDER
                </button>

              </form>

            </div>

          </div>

        )}

                {/* ORDER CONFIRMATION */}
        
        {loginOpen && (
          <div className="login-overlay">
            <div className="login-panel">

              <button
                className="login-close"
                onClick={() => setLoginOpen(false)}
              >
                <X size={20} />
              </button>

              <p className="login-small-title">
                WELCOME TO ALMIRA
              </p>

              <h2>
                {loginMode === 'login'
                  ? 'Welcome Back'
                  : 'Create Account'}
              </h2>

              <p className="login-subtitle">
                {loginMode === 'login'
                  ? 'Sign in to continue shopping with us.'
                  : 'Create an account to enjoy a better shopping experience.'}
              </p>

              <form
                onSubmit={
                  loginMode === 'login'
                    ? handleLogin
                    : handleRegister
                }
              >

                {loginMode === 'register' && (
                  <label>
                    Full Name

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </label>
                )}

                <label>
                  Email Address

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </label>

                <label>
                  Password

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="login-submit"
                >
                  {loginMode === 'login'
                    ? 'LOGIN'
                    : 'CREATE ACCOUNT'}
                </button>

              </form>

              <div className="login-switch">

                {loginMode === 'login' ? (
                  <>
                    <span>
                      Don't have an account?
                    </span>

                    <button
                      type="button"
                      onClick={() => setLoginMode('register')}
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      Already have an account?
                    </span>

                    <button
                      type="button"
                      onClick={() => setLoginMode('login')}
                    >
                      Login
                    </button>
                  </>
                )}

              </div>

            </div>
          </div>
        )}

        {orderPlaced && (

          <div className="confirmation-overlay">

            <div className="confirmation-panel">

              <div className="confirmation-icon">
                ✓
              </div>

              <h2>
                Order Placed Successfully!
              </h2>

              <p>
                Thank you for shopping with Almira.
              </p>

              <button
                onClick={() => setOrderPlaced(false)}
              >
                CONTINUE SHOPPING
              </button>

            </div>

          </div>

        )}

      </div>

    </BrowserRouter>

  )

}


export default App