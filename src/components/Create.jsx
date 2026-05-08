import React, { useContext, useState } from "react";
import { productContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const navigate = useNavigate();

  const [products, setproducts] = useContext(productContext);

  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Each and every input must have atleast 4 character");
      return;
    }

    const pr = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, pr]);
    localStorage.setItem("products", JSON.stringify([...products, pr]));
    toast.success("Product Added Successfully");
    navigate("/");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="w-1/2 mb-5 text-3xl">Add New Product</h1>

      <input
        className="text-2xl p-3 bg-zinc-100 rounded p-3 w-1/2 mb-3"
        type="url"
        placeholder="Image url"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />

      <input
        className="text-2xl p-3 bg-zinc-100 rounded p-3 w-1/2 mb-3"
        type="text"
        placeholder="Title"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          className="text-1xl p-3 bg-zinc-100 rounded p-3 w-[48%] mb-3"
          type="text"
          placeholder="Category"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />

        <input
          className="text-1xl p-3 bg-zinc-100 rounded p-3 w-[48%] mb-3"
          type="number"
          placeholder="Price"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>

      <textarea
        className="text-2xl p-3 bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows="10"
        placeholder="Enter Product Description"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
      ></textarea>

      <div className="w-1/2">
        <button className="px-5 py-3 border bg-blue-500 rounded text-white font-bold">
          Add New Product
        </button>
      </div>
    </form>
  );
}

export default Create;
