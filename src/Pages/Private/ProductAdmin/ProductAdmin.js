import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Input,
  Slider,
} from "antd";
import { ProductModal } from "Components/FormModal";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "Features/Product/ProductSlice";
import useGetCategory from "Hooks/CategoryHook";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductAdmin.Style.less";

const { Search } = Input;
const { Option } = Select;

const ProductAdmin = () => {
  const dispatch = useDispatch();
  // Redux
  const allProducts = useSelector((state) => state.product.allProducts);
  const loading = useSelector((state) => state.product.loading);
  const total = useSelector((state) => state.product.total);
  const allCategories = useSelector((state) => state.category.allCategories);

  // useState
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 10,
  });

  // useEffect
  useEffect(() => {
    dispatch(getAllProducts(filter));
  }, [filter, dispatch]);
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
    dispatch(getAllProducts(filter));
  };

  const onHandleUpdate = async (value) => {
    const updatedValue = {
      ...data,
      name: value.name,
      description: value.description,
      color: value.color,
      price: value.price,
      categoryID: value.categoryID,
    };
    setVisible(false);
    setData({});
    setEditMode(false);
    await dispatch(updateProduct({ updatedValue, mesResult }));
    dispatch(getAllProducts(filter));
  };
  const handleSelect = (value) => {
    setFilter((prev) => ({ ...prev, _sort: "price", _order: value }));
  };
  const onHandleSearch = (value) => {
    setFilter((prev) => ({ ...prev, name_like: value }));
  };
  const handlePagination = (pagination) => {
    setFilter((prev) => ({ ...prev, _page: pagination.current, _limit: pagination.pageSize }));
  };
  const handleSortPrice = (value) => {
    setFilter((prev) => ({ ...prev, price_gte: value[0], price_lte: value[1] }));
  };

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
        allCategories
          .filter((item) => item.id === id)
          .map((item) => {
            return item.name;
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
          <Col span={6}>
            <Slider marks={{ 0: "0", 1000: "1000" }} range max={1000} onChange={handleSortPrice} />
          </Col>
          <Col>
            <Space style={{ marginBottom: 16 }}>
              <Select defaultValue="Order" style={{ width: 120 }} onChange={handleSelect}>
                <Option value="asc">ASC</Option>
                <Option value="desc">DESC</Option>
              </Select>
              <Search placeholder="Search..." onSearch={onHandleSearch} enterButton />
            </Space>
          </Col>
        </Row>
        <Table
          scroll={{ x: 700, y: 500 }}
          dataSource={allProducts}
          columns={columns}
          onChange={handlePagination}
          pagination={{ total: `${total}` }}
        />
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
