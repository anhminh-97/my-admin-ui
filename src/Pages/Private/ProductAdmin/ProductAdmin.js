import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Popconfirm, Row, Select, Space, Spin, Table } from "antd";
import { ProductModal } from "Components/FormModal";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "Features/Product/ProductSlice";
import useGetCategory from "Hooks/CategoryHook";
import useGetProduct from "Hooks/ProductHook";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductAdmin.Style.less";

const { Option } = Select;

const ProductAdmin = () => {
  const dispatch = useDispatch();
  // Redux
  const allProducts = useSelector((state) => state.product.allProducts);
  const loading = useSelector((state) => state.product.loading);
  const allCategories = useSelector((state) => state.category.allCategories);

  // useState
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);

  // const [product, setProduct] = useState();

  // useEffect
  useGetProduct();
  useGetCategory();

  // Function
  const showModal = (value) => {
    setData(value);
    setEditMode(true);
    setVisible(true);
  };
  const onConfirm = (id) => {
    dispatch(deleteProduct({ id, mesResult }));
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
    await dispatch(addProduct({ value, mesResult }));
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
    await dispatch(updateProduct({ updatedValue, mesResult }));
    dispatch(getAllProducts());
  };
  const handleSelect = () => {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (id) =>
        // eslint-disable-next-line array-callback-return
        allCategories.map((item) => {
          if (item.id === id) {
            return item.name;
          }
        }),
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
      fixed: "right",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => showModal(record)} />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => {
              onConfirm(record.id);
            }}
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
    <div className="product-admin-wrapper">
      <Spin spinning={loading} tip="Loading..." className="spin-loading">
        <Row justify="space-between">
          <Col>
            <Button onClick={() => setVisible(true)} type="primary">
              <PlusOutlined /> Add new
            </Button>
          </Col>
          <Col>
            <Space style={{ marginBottom: 16 }}>
              <Select defaultValue="Color" style={{ width: 120 }} onChange={handleSelect}>
                {allProducts.map((item) => {
                  return (
                    <Option key={item.id} value={item.color}>
                      {item.color}
                    </Option>
                  );
                })}
              </Select>
              <Button>Sort age</Button>
              <Button>Clear</Button>
              <Button type="primary">Filter</Button>
            </Space>
          </Col>
        </Row>
        <Table scroll={{ x: 700, y: 500 }} dataSource={allProducts} columns={columns} />
        {visible && (
          <ProductModal
            visible={visible}
            onCancel={onCancel}
            onCreate={editMode ? onHandleUpdate : onHandleCreate}
            data={data}
            editMode={editMode}
          />
        )}
      </Spin>
    </div>
  );
};

export default ProductAdmin;
