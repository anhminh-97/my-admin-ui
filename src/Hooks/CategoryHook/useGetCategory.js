import { getAllCategories } from "Features/Category/CategorySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return {};
};

export default useGetCategory;
