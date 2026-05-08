import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productContext } from "../utils/Context";
import axios from "../utils/axios";
import Loading from "./Loading";
import { toast } from "react-toastify";

function Details() {
  const [products, setproducts] = useContext(productContext);
  const {id} = useParams();
  const [product, setproduct] = useState(null);

  const navigate = useNavigate();

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setproduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getSingleProduct();  
  // }, []);

  const productDeleteHandler = (id) => {
    const removedproducts = products.filter((p) => p.id != id);
    setproducts(removedproducts);
    localStorage.setItem("products", JSON.stringify(removedproducts));
    navigate("/");
    toast.success("Product Deleted Successfully");
  }

  useEffect(() => {
    if(!product) {
      setproduct(products.filter((p) => p.id == id)[0]);
    }
  }, []);

  return product ? (
    <div className="w-[80%] h-full m-auto p-[10%] flex justify-between items-center">
      <img 
        className="w-[40%] h-[80%] object-contain"
        src={`${product.image}`}
        alt=""
      />
      <div className="content w-[50%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-3">{product.category}</h3>
        <h2 className="text-green-500 font-bold text-2xl mb-5">
          $ {product.price}
        </h2>
        <p className="mb-5">{product.description}</p>
        <Link to={`/edit/${product.id}`} className="px-5 py-2 border bg-blue-500 rounded-full text-white mr-10">
          Edit
        </Link>
        <button onClick={() => productDeleteHandler(product.id)} className="px-5 py-2 border bg-red-500 rounded-full text-white">
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
