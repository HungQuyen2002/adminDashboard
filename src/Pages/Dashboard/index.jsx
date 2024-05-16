import {
  DollarCircleOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Table, Typography, Statistic } from "antd";
import React, { useState, useEffect } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashBoard = () => {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      if (res && res.total) {
        // Kiểm tra xem res có tồn tại và có thuộc tính 'products' không
        setOrders(res.total);
        setRevenue(res.discountedTotal);
        // console.log(dataSource);
      } else {
        setOrders([]); // Nếu không có dữ liệu, gán một mảng rỗng cho dataSource
        setRevenue([]);
      }
      console.log(orders);
    });

    getInventory().then((res) => {
      if (res && res.total) {
        // Kiểm tra xem res có tồn tại và có thuộc tính 'products' không
        setInventory(res.total);
      } else {
        setInventory([]); // Nếu không có dữ liệu, gán một mảng rỗng cho dataSource
      }
      console.log(inventory);
    });

    getCustomers().then((res) => {
      if (res && res.total) {
        // Kiểm tra xem res có tồn tại và có thuộc tính 'products' không
        setCustomers(res.total);
        // console.log(dataSource);
      } else {
        setCustomers([]); // Nếu không có dữ liệu, gán một mảng rỗng cho dataSource
      }
      console.log(customers);
    });
  }, []);

  return (
    <div className="grid">
      <div className="Title py-4">
        <Typography.Title level={4}>DashBoard</Typography.Title>
      </div>
      <Space direction="horizontal" className="py-2">
        <DashBoardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Orders"}
          value={orders}
        />
        <DashBoardCard
          icon={
            <ShopOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Inventory"}
          value={inventory}
        />
        <DashBoardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={customers}
        />
        <DashBoardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Revenue"}
          value={revenue}
        />
      </Space>

      <Space>
        <RecentOrders />
        <DashBoardChart />
      </Space>
    </div>
  );
};
function DashBoardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <>
      {/* <Typography.Text>Recent Orders</Typography.Text> */}
      <h2 className="text-xl pb-2">Recent Order</h2>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
      ></Table>
    </>
  );
}

function DashBoardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 0.75)",
          },
        ],
      };

      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  //Fake data
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Card style={{ width: 600, height: 300 }}>
      <Bar options={options} data={revenueData} />;
    </Card>
  );
}

export default DashBoard;
