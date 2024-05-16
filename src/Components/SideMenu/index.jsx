import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { AiOutlineAppstore } from "react-icons/ai";
import React, { useState , useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideMenu = () => {
  // đồng bộ hóa và cập nhật giao diện với đường dẫn hiện tại
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  //điều hướng (navigate) giữa các đường dẫn trong ứng dụng React Router
  const navigate = useNavigate();
  return (
    <div>
      <div className="SideMenu flex justify-start items-start">
        <Menu
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          SelectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashboard",
              icon: <AiOutlineAppstore />,
              key: "/",
            },
            {
              label: "Inventory",
              icon: <ShopOutlined />,
              key: "/inventory",
            },
            {
              label: "Orders",
              icon: <ShoppingCartOutlined />,
              key: "/orders",
            },
            {
              label: "Customers",
              icon: <UserOutlined />,
              key: "/customers",
            },
          ]}
        ></Menu>
      </div>
    </div>
  );
};

export default SideMenu;
