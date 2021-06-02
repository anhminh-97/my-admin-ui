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
        leftTitle="Phí cài đặt (Thanh toán một lần duy nhất)"
        rightTitle="Phí vận hành (Thanh toán hằng tháng)"
      />
      <BlockItem
        title="Chi phí của trang trại cao cấp"
        subTitle="Chọn số lượng bò quản lý mỗi tháng của bạn"
        isBackground
        value={40000000}
        topPrice={80}
        bottomPrice={125}
        leftTitle="Chi phí đầu tư một lần"
        rightTitle="Chi phí vận hành hằng ngày"
      />
      <BlockPayment />
    </>
  );
};

export default Home;
