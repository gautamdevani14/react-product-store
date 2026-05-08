import React from "react";
import Home from "./components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const { search, pathname } = useLocation();

  return (
    <div className="h-screen w-sreen flex">
      {(pathname != "/" || search.length > 0) && (
        <Link
          className="bg-red-300 border rounded-md h-fit w-fit px-3 py-2 absolute top-5 left-[17.5%]"
          to={"/"}
        >
          Home
        </Link>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}
export default App;
