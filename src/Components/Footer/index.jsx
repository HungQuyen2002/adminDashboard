import Typography from "antd/es/typography/Typography";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="h-[50px] flex justify-evenly items-center border-t border-gray-400">
        <Typography.Link href="tel:0123456789">Tel: 012345678</Typography.Link>
        <Typography.Link href="https://www.google.com" target={"_blank"}>
          Privacy Policy
        </Typography.Link>
        <Typography.Link href="https://www.google.com" target={"_blank"}>
          Terms of Use
        </Typography.Link>
      </div>
    </div>
  );
};

export default Footer;
