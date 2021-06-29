import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductDetailForm from "./ProductDetailForm.Component";
import { getProduct } from "Features/Product/ProductSlice";
import { ProductProvider } from "Context/SimpleProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // Redux
  const loading = useSelector((state) => state.product.loading);
  const productDetail = useSelector((state) => state.product.productDetail);

  return (
    <>
      {productDetail.id !== id ? (
        <Spin tip="Loading..." className="spin-loading" />
      ) : (
        <Spin spinning={loading} tip="Loading..." className="spin-loading">
          <ProductProvider>
            <ProductDetailForm />
          </ProductProvider>
        </Spin>
      )}
    </>
  );
};

export default ProductDetail;
