import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { productContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

function Home() {
  const [products] = useContext(productContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filterproducts, setfilterproducts] = useState(null);

  // const getproductcategory = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/category/${category}`);
  //     setfilterproducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!filterproducts || category == "undefined") setfilterproducts(products);
    if (category != "undefined") {
      // getproductcategory()
      setfilterproducts(products.filter((p) => p.category == category));
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filterproducts &&
          filterproducts.map((p, i) => {
            return (
              <Link
                to={`/details/${p.id}`}
                key={i}
                className="card mr-3 mb-3 p-3 border shadow rounded w-[19%] h-[30vh] flex flex-col items-center justify-center"
              >
                <div
                  className="image w-full h-[80%] bg-contain bg-no-repeat bg-center mb-5 hover:scale-110"
                  style={{
                    backgroundImage: `url(${p.image})`,
                  }}
                ></div>
                <h1 className="hover:text-blue-300">{p.title}</h1>
              </Link>
            );
          })}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
