import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './Styles/BookForm.css'
import App from './Components/App'

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

//компонент меню
export function NavBar(props) {
  function showBookForm() {
    props.showBookForm()
  }
  function showAuthorForm() {
    props.showAuthorForm()
  }
  function showCatalog() {
    props.showCatalog()
  }
  function showCart() {
    props.showCart()
  }
  return (
    <ul className="navbar">
      <li>
        <a href="#" onClick={showCart}>
          Корзина
        </a>
      </li>
      <li style={{ float: 'left' }}>
        <a href="#" onClick={showCatalog}>
          Каталог
        </a>
      </li>
      <li>
        <a href="#" onClick={showBookForm}>
          Добавить книгу
        </a>
      </li>
      <li>
        <a href="#" onClick={showAuthorForm}>
          Добавить автора
        </a>
      </li>
    </ul>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
