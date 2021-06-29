import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [simpleProduct, setSimpleProduct] = useState({});
  const [variableProduct, setVariableProduct] = useState([]);

  return (
    <ProductContext.Provider value={{ simpleProduct, setSimpleProduct, variableProduct, setVariableProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
