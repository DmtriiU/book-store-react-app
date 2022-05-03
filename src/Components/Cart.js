import React, { useState, useEffect } from 'react'
import { cartItems } from './cartItems'
import { authors } from './authors'
import { NavBar } from '..'
import { Header } from '..'
import { Footer } from '..'
import axios from 'axios'

//компонент корзины
function Cart() {
  const [items, setItems] = useState(
    cartItems.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    )
  )
  const totalPrice = items.reduce((a, c) => a + c.price * c.count, 0)
  const removeFromCart = (id) => {
    let newCartItems = items.filter((item) => item.id !== id)
    console.log(newCartItems)
    setItems(newCartItems)
  }
  const incrementCount = (id) => {
    let product = items.find((item) => item.id === id)
    if (product) {
      setItems(
        items.map((item) =>
          item.id == id
            ? { ...product, count: product.count + 1 }
            : item
        )
      )
    }
  }
  const decrementCount = (id) => {
    let product = items.find((item) => item.id === id)
    if (product) {
      setItems(
        items.map((item) =>
          item.id == id
            ? { ...product, count: product.count - 1 }
            : item
        )
      )
    }
  }
  const confirmOrder = () => {
    let now = new Date()
    console.log(now)
     axios
       .post('https://localhost:7200/api/Order', {
         price: totalPrice,
         dataTime: now,
         bookID: 2,
       })
       .then((res) => {
         console.log(res)
       })
       .catch((err) => {
         console.log(err)
       })
  }
  return (
    <>
      <Header />
      <NavBar />
      <div>
        {items.length === 0 && (
          <p>
            Корзина пуста, добавьте книги, иначе он придет за вами
            <img
              src="https://i.kym-cdn.com/photos/images/original/001/352/921/c49.jpg_large"
              alt=""
            />
          </p>
        )}
      </div>
      {items.length !== 0 && (
        <div className="cart">
          <table>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
            {items.map((item, index) => (
              <tr key={index} className="item">
                <td>
                  "{item.title}"
                  ({
                    authors.find((author) => author.id === item.authorId)
                      .name
                  }{' '}
                  {
                    authors.find((author) => author.id === item.authorId)
                      .patronymic
                  }{' '}
                  {
                    authors.find((author) => author.id === item.authorId)
                      .surname
                  })
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
                <td>{item.price * item.count}</td>
              </tr>
            ))}
          </table>
          <p>Итог: {totalPrice}</p>
          <button id="submit" type="submit" onClick={() => confirmOrder()}>
            Оформить заказ
          </button>
        </div>
      )}
      <Footer />
    </>
  )
}

export default Cart
