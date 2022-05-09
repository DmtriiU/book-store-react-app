import React, { useState, useEffect } from 'react'
import Book from './Book'
import { books } from './books'
import { cartItems } from './cartItems'
import { Header } from '..'
import { Footer } from '..'
import { NavBar } from '..'
import axios from 'axios'

//компонент каталога
function Catalog() {
  const [catalog, setCatalog] = useState(books)

  useEffect(() => {
    axios
      .get('https://localhost:7200/api/Book')
      .then((response) => {
        setCatalog(response.data)
      })
      .catch((err) => console.log(err))
  }, [books])

  async function removeBook(id) {
    await axios
      .delete(`https://localhost:7200/api/Book?id=${id}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    let newCatalog = catalog.filter((book) => book.id !== id)
    setCatalog(newCatalog)
  }

  const addToCart = (id) => {
    let book = catalog.find((item) => item.id === id)
    let item = cartItems.find((item) => item.id === id)
    if (item) {
      let items = cartItems.map((book) =>
        book.id == id ? { ...item, count: item.count + 1 } : book
      )
      cartItems.length = 0
      items.map((item) => cartItems.push(item))
    } else {
      book.count += 1
      cartItems.unshift(book)
      console.log('cartItemss', cartItems)
    }
  }
  return (
    <>
      {/* <Header />
      <NavBar /> */}
      <div className="catalog">
        {catalog.map((book, index) => {
          return (
            <Book
              key={index}
              book={book}
              handleRemove={removeBook}
              addToCart={addToCart}
            ></Book>
          )
        })}
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Catalog
