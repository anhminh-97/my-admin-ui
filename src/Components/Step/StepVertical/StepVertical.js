import { Steps } from "antd";
import React from "react";

import "./StepVertical.Style.less";

const { Step } = Steps;

const StepVertical = () => {
  return (
    <div className="step-vertical-wrapper">
      <Steps progressDot current={3} direction="vertical">
        <Step
          title="Cuối tháng"
          description="Hệ thống xuất báo cáo năng suất bò trong tháng"
        />
        <Step
          title="+1 ngày"
          description="Hệ thống gửi hóa đơn thanh toán cho khách hàng qua email"
        />
        <Step title="+7 ngày" description="Thời gian khách hàng thanh toán" />
        <Step
          title="+9 ngày"
          description="Hệ thống gửi xác nhận thanh toán email cho khách hàng"
        />
      </Steps>
    </div>
  );
};

export default StepVertical;
