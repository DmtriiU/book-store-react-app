import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './Styles/BookForm.css'
import App from './Components/App'
import reportWebVitals from './reportWebVitals'
import { books } from './Components/books'
import { cartItems } from './Components/cartItems'
import BookForm from './Components/BookForm'
import Book from './Components/Book'
import Cart from './Components/Cart'
import axios from 'axios'

//компонент каталога
function Catalog() {
  const [catalog, setCatalog] = useState(books)

  // useEffect(() => {
  //   console.log(catalog)
  // }, [catalog])

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
    console.log(newCatalog)
    setCatalog(newCatalog)
  }

  const addToCart = (id) => {
    let item = catalog.find((item) => item.id === id)
    item.count += 1
    cartItems.push(item)
  }
  return (
    <>
      <Header />
      <NavBar />
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
      <Footer />
    </>
  )
}

//компонент добавления автора
const AuthorForm = () => {
  const [author, setAuthor] = useState('')
  function handleChange(e) {
    setAuthor(e.target.value)
  }
  function handleSubmit(e) {
    axios
      .post('https://localhost:7200/api/Author', {
        name: author,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    // authors.unshift(author)
    // setAuthor('')
    // console.log(authors)
    e.preventDefault()
  }
  return (
    <div className="authorform">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">ФИО автора:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={author}
          onChange={handleChange}
        />
        <input type="submit" value="Добавить" />
      </form>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="header">
      <p>GlobGlobGabgalab book basement</p>
    </div>
  )
}

export const Footer = () => {
  return (
    <div className="footer">
      <p></p>
    </div>
  )
}

function BookPage() {
  return (
    <>
      <Header />
      <NavBar />
      <BookForm></BookForm>
      <Footer />
    </>
  )
}

function AuthorPage() {
  return (
    <>
      <Header />
      <NavBar />
      <AuthorForm></AuthorForm>
      <Footer />
    </>
  )
}

//компонент меню
export function NavBar() {
  function openBookPage() {
    ReactDOM.render(<BookPage />, document.getElementById('root'))
  }
  function openAuthorPage() {
    ReactDOM.render(<AuthorPage />, document.getElementById('root'))
  }
  function openCatalogPage() {
    ReactDOM.render(<Catalog />, document.getElementById('root'))
  }
  function openCart() {
    ReactDOM.render(<Cart />, document.getElementById('root'))
  }
  return (
    <ul className="navbar">
      <li>
        <a href="#" onClick={openCart}>
          Корзина
        </a>
      </li>
      <li style={{ float: 'left' }}>
        <a href="#" onClick={openCatalogPage}>
          Каталог
        </a>
      </li>
      <li>
        <a href="#" onClick={openBookPage}>
          Добавить книгу
        </a>
      </li>
      <li>
        <a href="#" onClick={openAuthorPage}>
          Добавить автора
        </a>
      </li>
    </ul>
  )
}

// ReactDOM.render(
//   <React.StrictMode>
//   </React.StrictMode>,
//   document.getElementById('root')
// )

ReactDOM.render(<Catalog />, document.getElementById('root'))

export default Catalog

reportWebVitals()
