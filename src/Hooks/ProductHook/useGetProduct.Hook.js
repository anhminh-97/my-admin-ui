import { getAllProducts } from "Features/Product/ProductSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return {};
};

export default useGetProduct;
