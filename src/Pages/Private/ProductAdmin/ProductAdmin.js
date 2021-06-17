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
import { ROUTER } from "Constants/CommonConstants";
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
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import isEmpty from "lodash";

import "./ProductAdmin.Style.less";

const { Option } = Select;

const ProductAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();

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
  const parsed = queryString.parse(location.search);
  const stringified = queryString.stringify(filter);
  // console.log(`location`, location, parsed);
  // filter
  useEffect(() => {
    console.log("!isEmty===>", parsed);
    if (!isEmpty(parsed)) {
      dispatch(getAllProducts(filter));
    } else {
      console.log("ELSE");
      const params = { ...filter, ...parsed };
      setFilter(params);
      dispatch(getAllProducts(params));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGetCategory();

  // Function
  const showModal = (value) => {
    setData(value);
    setEditMode(true);
    setVisible(true);
  };
  const onConfirm = async (id) => {
    const resultAction = await dispatch(deleteProduct(id));
    if (resultAction.error) {
      message.error("Delete Failed");
    } else {
      message.success("Delete Successfully");
    }
  };
  const onCancel = () => {
    setVisible(false);
    setEditMode(false);
    setData({});
  };
  const handleClear = () => {
    setFilter({ _page: 1, _limit: 10 });
    history.push(filter);
  };

  const onHandleCreate = async (value) => {
    setVisible(false);
    setData({});
    const resultAction = await dispatch(addProduct(value));
    if (resultAction.error) {
      message.error("Create Failed");
    } else {
      message.success("create Successfully");
      dispatch(getAllProducts(filter));
    }
  };

  const onHandleUpdate = async (value) => {
    const updatedValue = {
      ...data,
      ...value,
    };
    setVisible(false);
    setData({});
    setEditMode(false);
    const resultAction = await dispatch(updateProduct(updatedValue));
    if (resultAction.error) {
      message.error("Update Failed");
    } else {
      message.success("Update Successfully");
      dispatch(getAllProducts(filter));
    }
  };
  const handleSelect = (value) => {
    setFilter((prev) => ({ ...prev, _sort: "price", _order: value }));
  };
  const handleChange = (e) => {
    setFilter((prev) => ({ ...prev, name_like: e.target.value }));
  };
  const handlePagination = (pagination) => {
    const params = { ...filter, _page: pagination.current, _limit: pagination.pageSize };
    console.log("params :>> ", params);
    console.log("pagination :>> ", pagination);
    const stringifiedParams = queryString.stringify(params);

    setFilter((prev) => ({ ...prev, _page: pagination.current, _limit: pagination.pageSize }));
    console.log("filter :>> ", filter);
    dispatch(getAllProducts(params));
    history.push({ pathname: ROUTER.ProductAdmin, search: stringifiedParams });
  };
  const handleSortPrice = (value) => {
    setFilter((prev) => ({ ...prev, price_gte: value[0], price_lte: value[1] }));
  };
  const handleFilter = () => {
    dispatch(getAllProducts(filter));
    history.push({ pathname: ROUTER.ProductAdmin, search: stringified });
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
          .map((item, key) => {
            return <span key={key.toString()}>{item.name}</span>;
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
            <Slider
              value={[filter.price_gte, filter.price_lte]}
              marks={{ 0: "0", 1000: "1000" }}
              range
              max={1000}
              onChange={handleSortPrice}
            />
          </Col>
          <Col>
            <Space style={{ marginBottom: 16 }}>
              <Select
                value={filter._order}
                placeholder="Sort"
                style={{ width: 120 }}
                onChange={handleSelect}
              >
                <Option value="asc">ASC</Option>
                <Option value="desc">DESC</Option>
              </Select>
              <Input
                value={filter.name_like}
                onChange={handleChange}
                placeholder="Search..."
                // onSearch={onHandleSearch}
              />
              <Button onClick={handleClear}>Clear</Button>
              <Button type="primary" onClick={handleFilter}>
                Filter
              </Button>
            </Space>
          </Col>
        </Row>
        <Table
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
