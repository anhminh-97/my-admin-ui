import { Line } from "@ant-design/charts";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Table, Tag } from "antd";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.Style.less";

const Dashboard = () => {
  const ref = useRef();
  const data = [
    {
      year: "1991",
      value: 3,
    },
    {
      year: "1992",
      value: 4,
    },
    {
      year: "1993",
      value: 3.5,
    },
    {
      year: "1994",
      value: 5,
    },
    {
      year: "1995",
      value: 4.9,
    },
  ];
  const config = {
    data,
    height: 300,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#2593fc",
        lineWidth: 2,
      },
    },
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Link>{text}</Link>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const dataTable = [
    {
      key: "1",
      name: "John Brown",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div className="dashboard-wrapper">
      <Row gutter={[24, 24]} className="dashboard-content">
        <Col span={6}>
          <Card hoverable title="Total">
            <Row>
              <Col span={24}>
                <h1 style={{ fontSize: "30px" }}>2,781</h1>
              </Col>
              <Col span={12}>
                12% <CaretUpOutlined style={{ color: "green" }} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable title="Total">
            <Row>
              <Col span={24}>
                <h1 style={{ fontSize: "30px" }}>3,241</h1>
              </Col>
              <Col span={12}>
                11% <CaretDownOutlined style={{ color: "red" }} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable title="Total">
            <Row>
              <Col span={24}>
                <h1 style={{ fontSize: "30px" }}>253</h1>
              </Col>
              <Col span={12}>
                12% <CaretUpOutlined style={{ color: "green" }} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable title="Total">
            <Row>
              <Col span={24}>
                <h1 style={{ fontSize: "30px" }}>4,324</h1>
              </Col>
              <Col span={12}>
                11% <CaretDownOutlined style={{ color: "red" }} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={18}>
          <Card hoverable>
            <Line {...config} chartRef={ref} />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable>
            <Table
              columns={columns}
              dataSource={dataTable}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
