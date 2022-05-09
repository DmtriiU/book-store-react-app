import React, { useState, useEffect } from 'react'
import Catalog from './Catalog'
import BookForm from './BookForm'
import AuthorForm from './AuthorForm'
import Cart from './Cart'
import { Header } from '..'
import { Footer } from '..'
import { NavBar } from '..'
// import './Styles/App.css';

function App() {
  const [catalog, setCatalog] = useState(true)
  const [bookform, setBookForm] = useState(false)
  const [authorform, setAuthorForm] = useState(false)
  const [cart, setCart] = useState(false)
  function showCatalog() {
    setCatalog(true)
    setBookForm(false)
    setAuthorForm(false)
    setCart(false)
  }
  function showBookForm() {
    setBookForm(true)
    setCatalog(false)
    setAuthorForm(false)
    setCart(false)
  }
  function showAuthorForm() {
    setAuthorForm(true)
    setBookForm(false)
    setCatalog(false)
    setCart(false)
  }
  function showCart() {
    setCart(true)
    setCatalog(false)
    setBookForm(false)
    setAuthorForm(false)
  }
  return (
    <>
      <Header />
      <NavBar
        showCatalog={showCatalog}
        showBookForm={showBookForm}
        showAuthorForm={showAuthorForm}
        showCart={showCart}
      />
      {catalog && <Catalog />}
      {bookform && <BookForm showCatalog={showCatalog} />}
      {authorform && <AuthorForm showBookForm={showBookForm} />}
      {cart && <Cart />}
      <Footer />
    </>
  )
}

export default App
