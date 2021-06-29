import { Spin } from "antd";
import { ProductProvider } from "Context/SimpleProductContext";
import React from "react";
import { useSelector } from "react-redux";
import AddProductForm from "./AddProductForm.Component";

const AddProduct = () => {
  // Redux
  const loading = useSelector((state) => state.product.loading);

  return (
    <Spin spinning={loading} tip="Loading..." className="spin-loading">
      <ProductProvider>
        <AddProductForm />
      </ProductProvider>
    </Spin>
  );
};

export default AddProduct;
