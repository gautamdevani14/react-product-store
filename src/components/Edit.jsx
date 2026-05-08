import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [products, setproducts] = useContext(productContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setproduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const changeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
    
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
    
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every input must have atleast 4 character");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copydata = [...products];
    copydata[pi] = { ...products[pi], ...product };
    setproducts(copydata);
    localStorage.setItem("products", JSON.stringify(copydata));
    navigate(-1);

  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="w-1/2 mb-5 text-3xl">Edit Product</h1>

      <input
        className="text-2xl p-3 bg-zinc-100 rounded p-3 w-1/2 mb-3"
        type="url"
        placeholder="Image url"
        name="image"
        onChange={changeHandler}
        value={product && product.image}
      />

      <input
        className="text-2xl p-3 bg-zinc-100 rounded p-3 w-1/2 mb-3"
        type="text"
        placeholder="Title"
        name="title"
        onChange={changeHandler}
        value={product && product.title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          className="text-1xl p-3 bg-zinc-100 rounded p-3 w-[48%] mb-3"
          type="text"
          placeholder="Category"
          name="category"
          onChange={changeHandler}
          value={product && product.category}
        />

        <input
          className="text-1xl p-3 bg-zinc-100 rounded p-3 w-[48%] mb-3"
          type="number"
          placeholder="Price"
          name="price"
          onChange={changeHandler}
          value={product && product.price}
        />
      </div>

      <textarea
        className="text-2xl p-3 bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows="10"
        placeholder="Enter Product Description"
        name="description"
        onChange={changeHandler}
        value={product && product.description}
      ></textarea>

      <div className="w-1/2">
        <button  className="px-5 py-3 border bg-blue-500 rounded text-white font-bold">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Edit;
