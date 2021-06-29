import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Slider,
  Space,
  Spin,
  Statistic,
  Switch,
  Table,
  Tag,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { ProductModal } from "Components/FormModal";
import { ROUTER } from "Constants/CommonConstants";
import { deleteProduct, getAllProducts, updateProduct } from "Features/Product/ProductSlice";
import moment from "moment";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./ProductAdmin.Style.less";

const { Option } = Select;

const ProductAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // Redux
  const allProducts = useSelector((state) => state.product.allProducts);
  const loading = useSelector((state) => state.product.loading);
  const total = useSelector((state) => state.product.total);

  // useState
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
  });

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    setFilters({
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
    });
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
    };
  }, [location.search]);

  // get products with query params
  useEffect(() => {
    dispatch(getAllProducts(queryParams));
  }, [queryParams, dispatch]);

  const stringified = queryString.stringify(filters);

  const showModal = (value) => {
    setData(value);
    setEditMode(true);
    setVisible(true);
  };

  // Delete
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

  // Update
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
      dispatch(getAllProducts(queryParams));
    }
  };

  // Change status
  const handleStatus = async (record) => {
    const updatedValue = {
      ...record,
      status: !record.status,
    };
    setVisible(false);
    setData({});
    setEditMode(false);
    const resultAction = await dispatch(updateProduct(updatedValue));
    if (resultAction.error) {
      message.error("Update Failed");
    } else {
      message.success("Update Successfully");
      dispatch(getAllProducts(queryParams));
    }
  };

  // Filters
  const handleSortBy = (value) => {
    setFilters((prev) => ({ ...prev, _sort: "originalPrice", _order: value }));
  };
  const handleSearch = (e) => {
    setFilters((prev) => ({ ...prev, name_like: e.target.value }));
  };
  const handlePagination = (pagination) => {
    const params = { ...queryParams, _page: pagination.current, _limit: pagination.pageSize };
    const stringifiedParams = queryString.stringify(params);
    setFilters((prev) => ({ ...prev, _page: pagination.current, _limit: pagination.pageSize }));
    // dispatch(getAllProducts(params));
    history.push({ pathname: history.location.pathname, search: stringifiedParams });
  };
  const handleSortPrice = (value) => {
    setFilters((prev) => ({ ...prev, originalPrice_gte: value[0], originalPrice_lte: value[1] }));
  };
  const handleFilterStatus = (value) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };
  const handleFilter = () => {
    history.push({ pathname: history.location.pathname, search: stringified });
  };

  // Clear all filters
  const handleClear = () => {
    setFilters({ _page: 1, _limit: 10 });
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({ _page: 1, _limit: 10 }),
    });
  };

  // Views details
  const handleView = (id) => {
    history.push(`${ROUTER.ProductDetail}/${id}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <Paragraph ellipsis={{ rows: 2 }}>{name}</Paragraph>,
    },
    {
      title: "Price",
      key: "price",
      render: (value, record) => (
        <>
          {record.originalPrice ? (
            <Statistic
              value={record.originalPrice}
              valueStyle={{ fontSize: "14px" }}
              className={record.salePrice && "original-price"}
            />
          ) : (
            "-"
          )}
          <div>
            {record.salePrice ? (
              <Statistic valueStyle={{ fontSize: "14px" }} value={record.salePrice} />
            ) : (
              "-"
            )}
          </div>
        </>
      ),
    },
    {
      title: "Short Description",
      dataIndex: "shortDescription",
      key: "shortDescription",
      render: (description) => <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>,
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      render: (categories) =>
        categories.map((item, index) => <Tag key={index.toString()}>{item}</Tag>),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Update At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => moment(updatedAt).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={status}
            onChange={() => handleStatus(record)}
          />
        );
      },
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
    {
      title: "View",
      key: "view",
      fixed: "right",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleView(record.id)}>
            <EyeOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = allProducts.map((item) => ({ ...item, key: item.id }));

  return (
    <div className="product-admin-wrapper">
      <Spin spinning={loading} tip="Loading..." className="spin-loading">
        <Row justify="end">
          <Col>
            <Button type="primary">
              <Link to={ROUTER.AddProduct}>
                <PlusOutlined /> Add new
              </Link>
            </Button>
          </Col>
        </Row>
        <br />
        <Row justify="space-between">
          <Col span={8}>
            <Slider
              value={[filters.originalPrice_gte, filters.originalPrice_lte]}
              marks={{ 0: "0", 100000: "100.000" }}
              range
              max={100000}
              onChange={handleSortPrice}
            />
          </Col>
          <Col>
            <Form>
              <Space style={{ marginBottom: 16 }}>
                <Select
                  value={filters._order}
                  placeholder="Sort By"
                  style={{ width: 120 }}
                  onChange={handleSortBy}
                >
                  <Option value="asc">ASC</Option>
                  <Option value="desc">DESC</Option>
                </Select>
                <Select
                  value={filters.status}
                  placeholder="Status"
                  style={{ width: 120 }}
                  onChange={handleFilterStatus}
                >
                  <Option value="true">Visible</Option>
                  <Option value="false">Hidden</Option>
                </Select>
                <Input value={filters.name_like} onChange={handleSearch} placeholder="Search..." />
                <Button onClick={handleClear}>Clear</Button>
                <Button htmlType="submit" type="primary" onClick={handleFilter}>
                  Filter
                </Button>
              </Space>
            </Form>
          </Col>
        </Row>
        <Table
          dataSource={dataSource}
          columns={columns}
          onChange={handlePagination}
          pagination={{
            position: ["topRight", "bottomRight"],
            total: `${total}`,
            current: Number.parseInt(filters._page),
            pageSize: Number.parseInt(filters._limit),
            showTotal: (total) => (
              <span>
                {total}
                {total > 1 ? " items" : " item"}
              </span>
            ),
          }}
        />
        {visible && (
          <ProductModal
            visible={visible}
            onCancel={onCancel}
            onCreate={onHandleUpdate}
            data={data}
            editMode={editMode}
          />
        )}
      </Spin>
    </div>
  );
};

export default ProductAdmin;
