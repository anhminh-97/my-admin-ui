import React from "react";

import BlockItem from "Components/Layout/BlockItem";
import BlockPayment from "Components/Layout/BlockPayment";

const Home = () => {
  return (
    <>
      <BlockItem
        title="Chi phí của trang trại cơ bản"
        subTitle="Chọn số lượng bò quản lý mỗi tháng của bạn"
        value={20000000}
        topPrice={70}
        bottomPrice={115}
      />
      <BlockItem
        title="Chi phí của trang trại cao cấp"
        subTitle="Chọn số lượng bò quản lý mỗi tháng của bạn"
        isBackground
        value={40000000}
        topPrice={80}
        bottomPrice={125}
      />
      <BlockPayment />
    </>
  );
};

export default Home;
