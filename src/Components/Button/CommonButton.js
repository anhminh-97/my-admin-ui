import React from "react";
import { Link } from "react-scroll";

import "./CommonButton.Style.less";

const CommonButton = ({ title, href }) => {
  return (
    <Link spy={true} smooth={true} to={href} className="button-wrapper">
      {title}
    </Link>
  );
};

export default CommonButton;
