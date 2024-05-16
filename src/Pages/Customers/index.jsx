import { Typography, Table, Avatar, Rate } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      if (res && res.users) {
        // Kiểm tra xem res có tồn tại và có thuộc tính 'products' không
        setDataSource(res.users);
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
        <Typography.Title level={4}>Customers</Typography.Title>
      </div>

      <Table
        className="w-[90%]"
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "Last Name",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },

          {
            title: "Phone",
            dataIndex: "phone",
          },

          {
            title: "Address",
            dataIndex: "address",
            render: (address) => {
              return (
                <span>
                  {address.address}, {address.city}
                </span>
              );
            },
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

export default Customers;
