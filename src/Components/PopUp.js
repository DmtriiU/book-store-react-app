import React from 'react'

function PopUp(props) {
  function closePopUp () {
    props.closeWindow()
  }
  return (
    <div id="popup" class="popups">
      <div class="content">
        <h2>{props.book.title}</h2>
        <h4>{props.book.author}</h4>
        <a class="close" href="#" onClick={closePopUp}>
          &times;
        </a>
        <p>{props.book.description}</p>
        <p>Стоимость: {props.book.price} &#8381;</p>
      </div>
    </div>
  )
}

export default PopUp