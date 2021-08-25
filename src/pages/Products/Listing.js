import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../services/products.service";
import { addCart } from "../../services/cart.service";
import { useHistory } from "react-router-dom";

const Listing = () => {
  const history = useHistory();
  const [productList, setProductList] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const { uid, isLogin } = useSelector((state) => state.user);

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const addToChart = (product) => {
    if (!isLogin) {
      history.push("/login");
    }
    delete product["id"];
    addCart(uid, {
      ...product,
      Qty: 1,
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllProduct().on("value", (snapshot) => {
      const products = snapshot.val();

      let productList = [];
      for (let id in products) productList.push({ id, ...products[id] });

      setProductList(productList);
      setLoadingProduct(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Semua Produk</h1>
      <p>Semua produk yang anda cari ada disini!</p>

      <div className="flex flex-wrap justify-between gap-1 w-full mt-8">
        {loadingProduct && "Sebentar, lg disiapin :D"}

        {productList &&
          productList.map((product) => {
            return (
              <div className="my-4" key={product.id}>
                <div className="flex max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                  <div
                    className="w-1/3 bg-cover"
                    style={{
                      backgroundImage: `url(${product.ProductThumbnail})`,
                    }}
                  ></div>
                  <div className="w-2/3 p-4">
                    <h1 title={product.ProductName} className="text-gray-900 font-bold text-2xl truncate">
                      {product.ProductName}
                    </h1>
                    <p title={product.ProductDescription} className="mt-2 text-gray-600 text-sm truncate items-center justify-center">
                      {product.ProductDescription}
                    </p>
                    <div className="flex item-center justify-between mt-3">
                      <h1 className="text-gray-700 font-bold text-xl">
                        {kFormatter(product.ProductPrice)}
                      </h1>
                      <div className="inline-flex">
                        <Link
                          to={`/p/${product.id}`}
                          className="px-3 py-2 mr-1 bg-gray-800 text-white text-xs font-bold uppercase rounded"
                        >
                          Detail
                        </Link>
                        <button
                          onClick={() => addToChart(product)}
                          className="px-3 py-2 bg-yellow-500 text-white text-xs font-bold uppercase rounded"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Listing;
