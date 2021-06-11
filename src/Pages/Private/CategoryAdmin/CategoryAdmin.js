import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Popconfirm, Row, Space, Spin, Table } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import useGetCategory from "Hooks/CategoryHook";
import { addCategory, deleteCategory, updateCategory } from "Features/Category/CategorySlice";
import "./CategoryAdmin.Style.less";
import { CategoryModal } from "Components/FormModal";
import { getAllProducts } from "Features/Product/ProductSlice";

// const { Option } = Select;

const CategoryAdmin = () => {
  const dispatch = useDispatch();

  // Redux
  const allCategories = useSelector((state) => state.category.allCategories);
  const loading = useSelector((state) => state.category.loading);

  // State
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // useEffect
  useGetCategory();

  // Function
  const showModal = (value) => {
    setData(value);
    setVisible(true);
    setEditMode(true);
  };
  const onConfirm = (id) => {
    dispatch(deleteCategory({ id, mesResult }));
  };
  const onCancel = () => {
    setVisible(false);
    setEditMode(false);
    setData({});
  };

  const mesResult = (success) => {
    if (success) {
      message.success("Successfully");
    } else {
      message.error("Failed");
    }
  };

  const onHandleCreate = async (value) => {
    setVisible(false);
    setData({});
    await dispatch(addCategory({ value, mesResult }));
    dispatch(getAllProducts());
  };

  const onHandleUpdate = async (value) => {
    const updatedValue = {
      ...data,
      name: value.name,
      description: value.description,
      color: value.color,
      price: value.price,
    };
    setVisible(false);
    setData({});
    await dispatch(updateCategory({ updatedValue, mesResult }));
    dispatch(getAllProducts());
  };

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
      <Spin spinning={loading} tip="Loading..." className="spin-loading">
        <Row justify="space-between">
          <Col>
            <Button onClick={() => setVisible(true)} type="primary">
              <PlusOutlined /> Add new
            </Button>
          </Col>
          <Col>
            <Space style={{ marginBottom: 16 }}>
              <Button>Sort age</Button>
              <Button>Clear</Button>
              <Button type="primary">Filter</Button>
            </Space>
          </Col>
        </Row>
        <Table dataSource={allCategories} columns={columns} />
        {visible && (
          <CategoryModal
            editMode={editMode}
            data={data}
            visible={visible}
            onCancel={onCancel}
            onCreate={editMode ? onHandleUpdate : onHandleCreate}
          />
        )}
      </Spin>
    </div>
  );
};

export default CategoryAdmin;
