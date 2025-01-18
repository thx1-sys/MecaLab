import React from "react";
import "./Cart.css";

const Cart = ({ open, handleClose, cart, materialInfo }) => {
  if (!open) return null;

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal-container">
        <button onClick={handleClose} className="cart-modal-close-button">
          &times;
        </button>
        {materialInfo ? (
          <div className="material-info">
            <h2>{materialInfo.material}</h2>
            <img src={materialInfo.image} alt={materialInfo.material} />
          </div>
        ) : (
          <div className="cart-info">
            <h2>Carrito</h2>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {`Material: ${item.material}, Cantidad: ${item.quantity}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
