import React, { useState, useEffect } from 'react'
import { cartItems } from './cartItems'
import { authors } from './authors'
import { books } from './books'
import { NavBar } from '..'
import { Header } from '..'
import { Footer } from '..'
import axios from 'axios'

//компонент корзины
function Cart() {
  const [items, setItems] = useState(
    // cartItems.reduce(
    //   (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    //   []
    // )
    cartItems.filter((el, id) => cartItems.indexOf(el) === id)
  )
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  console.log('items', items)
  console.log(orderConfirmed)
  let orderId = 1
  const totalPrice = items.reduce((a, c) => a + c.price * c.count, 0)

  const removeFromCart = (id) => {
    let newCartItems = items.filter((item) => item.id !== id)
    setItems(newCartItems)
    cartItems.length = 0
    newCartItems.map((item) => cartItems.push(item))
    let book = books.find((book) => book.id === id)
    if (book) {
      let newBooks = books.map((item) =>
        item.id == id ? { ...book, count: 0 } : item
      )
      books.length = 0
      newBooks.map((book) => books.push(book))
      console.log('newCartItems', cartItems)
    }
  }

  const incrementCount = (id) => {
    let product = items.find((item) => item.id === id)
    // let book = books.find((book) => book.id === id)
    // if (book) {
    //   let newBooks = books.map((item) =>
    //     item.id == id ? { ...book, count: book.count + 1 } : item
    //   )
    //   books.length = 0
    //   newBooks.map((book) => books.push(book))
    // }
    if (product) {
      let newItems = items.map((item) =>
        item.id == id ? { ...product, count: product.count + 1 } : item
      )
      setItems(newItems)
      cartItems.length = 0
      newItems.map((item) => cartItems.push(item))
      console.log('books', books)
      console.log('newCartItems+', cartItems)
    }
  }

  const decrementCount = (id) => {
    let product = items.find((item) => item.id === id)
    if (product) {
      let newItems = items.map((item) =>
        item.id == id ? { ...product, count: product.count - 1 } : item
      )
      setItems(newItems)
      cartItems.length = 0
      newItems.map((item) => cartItems.push(item))
      console.log('books', books)
      console.log('newCartItems+', cartItems)
    }
  }

  const confirmOrder = () => {
    let now = new Date()
    items.map((item, index) =>
      axios
        .post('https://localhost:7200/api/Order', {
          id: orderId,
          price: totalPrice,
          dataTime: now,
          items: [item.id],
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    )
    orderId += 1
    cartItems.length = 0
    setItems([])
    setOrderConfirmed(true)
  }

  return (
    <>
      {/* <Header />
      <NavBar /> */}
      <div>
        {!orderConfirmed && items.length === 0  && (
          <p>
            Корзина пуста, добавьте книги, иначе он придет за вами
            <img
              src="https://i.kym-cdn.com/photos/images/original/001/352/921/c49.jpg_large"
              alt=""
            />
          </p>
        )}
      </div>
      <div>{orderConfirmed && <p>Спасибо за заказ!!!</p>}</div>
      {items.length !== 0 && (
        <div className="cart">
          <table>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
            {items.map((item, index) => (
              <tr key={index} className="item">
                <td>
                  "{item.title}" (
                  {authors.find((author) => author.id === item.authorId).name}{' '}
                  {
                    authors.find((author) => author.id === item.authorId)
                      .patronymic
                  }{' '}
                  {
                    authors.find((author) => author.id === item.authorId)
                      .surname
                  }
                  )
                  <button
                    type="submit"
                    {...(item.count === 0 && removeFromCart(item.id))}
                    onClick={() => removeFromCart(item.id)}
                  >
                    удалить
                  </button>
                </td>
                <td>
                  {item.count}
                  <button type="submit" onClick={() => incrementCount(item.id)}>
                    +
                  </button>
                  <button type="submit" onClick={() => decrementCount(item.id)}>
                    -
                  </button>
                </td>
                <td>{item.price * item.count} &#8381;</td>
              </tr>
            ))}
          </table>
          <p>Итог: {totalPrice} &#8381;</p>
          <button id="submit" type="submit" onClick={() => confirmOrder()}>
            Оформить заказ
          </button>
        </div>
      )}
      {/* <Footer /> */}
    </>
  )
}

export default Cart
