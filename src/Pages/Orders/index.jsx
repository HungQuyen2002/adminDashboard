import { Typography, Table, Avatar, Rate } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      if (res && res.products) {
        // Kiểm tra xem res có tồn tại và có thuộc tính 'products' không
        setDataSource(res.products);
        // console.log(dataSource);
      } else {
        setDataSource([]); // Nếu không có dữ liệu, gán một mảng rỗng cho dataSource
      }
      console.log(dataSource);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="Title py-4">
        <Typography.Title level={4}>Orders</Typography.Title>
      </div>
      <Table className="w-[90%]"
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total",
            dataIndex: "total",
          },

          {
            title: "DiscountedPrice",
            dataIndex: "discountedPrice",
            render: (value) => <span>${value}</span>,
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={{
          pageSize: 6,
        }}
      ></Table>
    </div>
  );
};

export default Orders;
