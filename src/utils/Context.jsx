import axios from './axios';
import { createContext, useEffect, useState } from 'react';


export const productContext = createContext();


function Context(props) {
    const [products, setproducts] = useState(JSON.parse(localStorage.getItem("products")) || null);



  return (
    <productContext.Provider value={[products, setproducts]}>
        {props.children}
    </productContext.Provider>
  );
};

export default Context
