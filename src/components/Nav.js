import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/reducers/users/users.thunk";
import { getCartByUser } from "../services/cart.service";

const Nav = () => {
  const dispatch = useDispatch();
  const { isLogin, displayName, email, uid } = useSelector(
    (state) => state.user
  );

  const [cartList, setCartList] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const handleLogout = async () => {
    await dispatch(logout());
  };

  const countItemCart = () => {
    if (!cartList) return 0;
    if(!cartList.length) return 0;
    return cartList.map((cart) => cart.Qty).reduce((a, b) => parseInt(a)+parseInt(b));
  };

  useEffect(() => {
    getCartByUser(uid).on("value", (snapshot) => {
      const carts = snapshot.val();
      let cartList = [];
      for (let id in carts) {
        setTotalItem(0);

        cartList.push({ id, ...carts[id] });
      }

      setCartList(cartList);
    });
  }, [uid, totalItem]);

  return (
    <div className="flex align-center justify-between py-6 mb-4">
      <Link to="/" className="font-mono font-bold text-4xl text-yellow-500">
        tokoku.
      </Link>

      <div>
        {isLogin && (
          <span className="inline-flex gap-4">
            <span className="text-lg font-semibold">
              {displayName || email}
            </span>
            <button onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
            <Link to="/cart" className="relative inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {countItemCart()}
              </span>
            </Link>
          </span>
        )}

        {!isLogin && (
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
