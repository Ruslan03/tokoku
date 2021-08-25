import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartByUser, removeCartById } from "../services/cart.service";

const Cart = () => {
  const [cartList, setCartList] = useState(null);
  const { uid } = useSelector((state) => state.user);

  const handleRemoveItem = (id) => {
    removeCartById(uid, id);
  };

  const countItemCart = () => {
    if (!cartList) return 0;
    if (!cartList.length) return 0;
    return cartList
      .map((cart) => cart.Qty)
      .reduce((a, b) => parseInt(a) + parseInt(b));
  };

  useEffect(() => {
    getCartByUser(uid).on("value", (snapshot) => {
      const carts = snapshot.val();
      let cartList = [];
      for (let id in carts) {
            cartList.push({ id, ...carts[id] })
        };
      setCartList(cartList);
    });
  }, [uid]);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Cart</h1>
      <p>
        {countItemCart() > 0
          ? `Yeaay, Kamu punya ${countItemCart()} total item`
          : `Yuk isi penuh keranjang nya :)`}
      </p>
      <div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
            Product Details
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
            Quantity
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
            Price
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
            Total
          </h3>
        </div>

        {cartList &&
          cartList.map((cart, index) => {
            return (
              <div
                key={cart.id}
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
              >
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={cart.ProductThumbnail} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">
                      {cart.ProductName}
                    </span>
                    <span className="text-red-500 text-xs">&nbsp;</span>
                    <button
                      className="font-semibold text-left hover:text-red-500 text-gray-500 text-sm"
                      onClick={() => handleRemoveItem(cart.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  {/* <svg
                    className="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                    onClick={() => handleCounterQty(cart.id, "dec")}
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg> */}

                  {/* <input
                    className="mx-2 border text-center w-10"
                    type="text"
                    onChange={(e) => handleChangeQty(e, index)}
                  /> */}

                  <span className="text-center w-1/5 font-semibold text-sm">
                    {cart.Qty}
                  </span>

                  {/* <svg
                    onClick={() => handleCounterQty(cart.id, "inc")}
                    className="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg> */}
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {cart.ProductPrice}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {cart.ProductPrice * cart.Qty}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cart;
