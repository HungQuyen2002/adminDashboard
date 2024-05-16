import { Typography,Table, Avatar, Rate } from "antd";
import  { useEffect, useState } from "react";
import { getInventory } from "../../API";

const Inventory = () => {

  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
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
        <Typography.Title level={4}>Inventory</Typography.Title>
      </div>
      <Table className="w-[90%]"
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
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
            title: "Rating",
            dataIndex: "rating",
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Stock",
            dataIndex: "stock",
          },

          {
            title: "Brand",
            dataIndex: "brand",
          },
          {
            title: "Category",
            dataIndex: "category",
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

export default Inventory;
