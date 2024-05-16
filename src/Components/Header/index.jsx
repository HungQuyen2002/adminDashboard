import React from "react";
import logo from "../../assets/logo.jpg";
import { BsBellFill } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";
import { Badge, Drawer, List, Typography } from "antd";
import { getComments, getOrders } from "../../API";
import { useState, useEffect } from "react";
const Header = () => {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  useEffect(() => {
    getComments().then((res) => {
      if (res && res.comments) {
        // Kiểm tra xem res có tồn tại và có thuộc tính 'products' không
        setComments(res.comments);
      } else {
        setComments([]); // Nếu không có dữ liệu, gán một mảng rỗng cho dataSource
      }
    });

    getOrders().then((res) => {
      if (res && res.products) {
        // Kiểm tra xem res có tồn tại và có thuộc tính 'products' không
        setOrders(res.products);
      } else {
        setOrders([]); // Nếu không có dữ liệu, gán một mảng rỗng cho dataSource
      }
    });
  }, []);
  return (
    <div>
      <div className="header flex justify-between items-center py-1 pr-[20px] pl-3 w-full border-b border-gray-400">
        <div className="logo cursor-pointer pl-3">
          <img src={logo} alt="" className="w-[60px] rounded-full" />
        </div>
        <h1 className="text-3xl font-bold">ADMIN DASHBOARD</h1>
        <div className="leftHeader pr-3">
          <div>
            <Badge count={comments.length} dot className="pr-2">
              <MdMailOutline
                className="text-2xl"
                onClick={() => {
                  setCommentsOpen(true);
                }}
              />
            </Badge>
            <Badge count={orders.length} className="pr-2">
              <BsBellFill
                className="text-2xl"
                onClick={() => {
                  setNotificationsOpen(true);
                }}
              />
            </Badge>
          </div>
          <Drawer
            title="Comments"
            open={commentsOpen}
            onClose={() => {
              setCommentsOpen(false);
            }}
            maskClosable
          >
            <List
              dataSource={comments}
              renderItem={(item) => {
                return <List.Item>{item.body}</List.Item>;
              }}
            ></List>
          </Drawer>

          <Drawer
            title="Notifications"
            open={notificationsOpen}
            onClose={() => {
              setNotificationsOpen(false);
            }}
            maskClosable
          >
            <List
              dataSource={orders}
              renderItem={(item) => {
                return (
                  <List.Item>
                    {" "}
                    <Typography.Text strong>{item.title}</Typography.Text> has
                    been ordered!!
                  </List.Item>
                );
              }}
            ></List>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Header;
