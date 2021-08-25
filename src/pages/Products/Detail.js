import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addCart } from "../../services/cart.service";
import { getProductByID } from "../../services/products.service";

const Detail = () => {
  const [product, setProduct] = useState(null);
  const [inserting, setInserting] = useState(false);
  const { code } = useParams();
  const { uid } = useSelector((state) => state.user);
  const [qty, setQty] = useState(1);

  const addToChart = () => {
    setInserting(true);
    addCart(uid, {
      ...product,
      Qty: qty,
    })
      .then(() => setInserting(false))
      .catch((err) => console.log(err));
  };

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  useEffect(() => {
    getProductByID(code).on("value", (snapshot) => {
      setProduct(snapshot.val());
    });
  }, [code]);

  return (
    <>
      {product ? (
        <div class="flex flex-wrap">
          <img
            alt="ecommerce"
            class="lg:w-1/2 w-full object-fill object-center rounded border border-gray-200"
            src={product.ProductThumbnail}
          />
          <div class="flex flex-col justify-between lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div>
                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                    {product.ProductName}
                </h1>
                <p class="leading-relaxed mt-4">
                    {product.ProductDescription}
                </p>

                <span class="title-font font-medium text-2xl w-2/3  text-gray-900">
                    {kFormatter(product.ProductPrice)}
                </span>
            </div>
            
            <div class="flex gap-1">
              
              <input
                type="number"
                class="w-full px-4 rounded-lg border-2 focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                placeholder="Quantity..."
                required
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                />
              <button onClick={addToChart} class="flex flex-shrink-0 ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
              {inserting ? "Memasukan ke keranjang..." : "Add To Cart"}
              </button>
              
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Detail;
