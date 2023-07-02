import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      let cartTotal
      if (!showEmptyView) {
        cartTotal =
          cartList.length === 1
            ? cartList[0].price * cartList[0].quantity
            : cartList
                .map(each => each.quantity * each.price)
                .reduce((a, b) => a + b)
      }
      const removeAllCartItem = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  onClick={removeAllCartItem}
                  className="cart-remove-all-button"
                  type="button"
                  data-testid="remove"
                >
                  Remove All
                </button>
                <CartListView />
                <div className="cart-total-price-container">
                  <div className="cart-price-container">
                    <h1 className="cart-total-price-total-para">
                      Order Total:
                    </h1>
                    <p className="cart-total-price-price-para">
                      Rs {cartTotal}/-
                    </p>
                  </div>
                  <p className="cart-total-price-quantity-para">
                    {cartList.length} Items in cart
                  </p>
                  <button className="cart-total-price-button" type="button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
