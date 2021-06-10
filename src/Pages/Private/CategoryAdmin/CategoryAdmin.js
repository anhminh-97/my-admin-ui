import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Popconfirm, Row, Select, Space, Spin, Table } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import useGetCategory from "Hooks/CategoryHook";
import { deleteCategory } from "Features/Category/CategorySlice";
import "./CategoryAdmin.Style.less";
import { CategoryModal } from "Components/FormModal";

const { Option } = Select;

const CategoryAdmin = () => {
  const dispatch = useDispatch();

  // Redux
  const allCategories = useSelector((state) => state.category.allCategories);
  const loading = useSelector((state) => state.category.loading);

  // State
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState({
    color: 0,
  });

  // useEffect
  useGetCategory();

  // Function
  const showModal = (value) => {
    setData(value);
    setVisible(true);
  };
  const onConfirm = (id) => {
    dispatch(deleteCategory({ id, mesDelete }));
  };
  const mesDelete = (success) => {
    if (success) {
      message.success("Delete successfully");
    } else {
      message.error("Delete failed");
    }
  };
  const handleSelect = () => {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Update At",
      dataIndex: "updateAt",
      key: "updateAt",
      render: (updateAt) => moment(updateAt).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => showModal(record)} />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => onConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="category-admin-wrapper">
      <Spin align="end" spinning={loading} tip="Loading..." className="spin-loading">
        <Row justify="end">
          <Col>
            <Button type="primary">
              <PlusOutlined /> Add new
            </Button>
          </Col>
        </Row>
        <br />
        <Space  style={{ marginBottom: 16 }}>
          <Button>Sort age</Button>
          <Button>Clear</Button>
          <Button type="primary">Filter</Button>
        </Space>
        <Table dataSource={allCategories} columns={columns} />
        {visible && (
          <CategoryModal
            editMode
            data={data}
            visible={visible}
            onCancel={() => setVisible(false)}
          />
        )}
      </Spin>
    </div>
  );
};

export default CategoryAdmin;
