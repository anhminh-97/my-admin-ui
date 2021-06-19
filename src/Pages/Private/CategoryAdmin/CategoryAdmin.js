import React, { useEffect, useMemo, useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  Form,
  Select,
  Switch,
} from "antd";
import moment from "moment";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import {
  addCategory,
  deleteCategory,
  getCategoriesFilter,
  updateCategory,
} from "Features/Category/CategorySlice";
import { CategoryModal } from "Components/FormModal";
import "./CategoryAdmin.Style.less";

const { Option } = Select;

const CategoryAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // Redux
  const allCategories = useSelector((state) => state.category.allCategories);
  const loading = useSelector((state) => state.category.loading);
  const total = useSelector((state) => state.category.total);

  // State
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 10,
  });

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    setFilter((prev) => ({ ...prev, ...params }));
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
    };
  }, [location.search]);

  // useEffect
  useEffect(() => {
    dispatch(getCategoriesFilter(queryParams));
  }, [queryParams, dispatch]);

  // Function
  const showModal = (value) => {
    setData(value);
    setVisible(true);
    setEditMode(true);
  };

  // Delete
  const onConfirm = async (id) => {
    const resultAction = await dispatch(deleteCategory(id));
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

  // Create
  const onHandleCreate = async (value) => {
    setVisible(false);
    setData({});
    const resultAction = await dispatch(addCategory(value));
    if (resultAction.error) {
      message.error("Create Failed");
    } else {
      message.success("Create Successfully");
      dispatch(getCategoriesFilter(queryParams));
    }
  };

  // Update
  const onHandleUpdate = async (value) => {
    const updatedValue = {
      ...data,
      ...value,
    };
    setVisible(false);
    setData({});
    const resultAction = await dispatch(updateCategory(updatedValue));
    if (resultAction.error) {
      message.error("Update Failed");
    } else {
      message.success("Update Successfully");
      dispatch(getCategoriesFilter(queryParams));
    }
  };

  // Search
  const handleSearch = (e) => {
    setFilter((prev) => ({ ...prev, name_like: e.target.value }));
  };

  // Filter
  const handleFilter = () => {
    history.push({ pathname: history.location.pathname, search: queryString.stringify(filter) });
    dispatch(getCategoriesFilter(queryParams));
  };

  const handlePagination = (pagination) => {
    const params = { ...queryParams, _page: pagination.current, _limit: pagination.pageSize };
    dispatch(getCategoriesFilter(params));
    history.push({ pathname: history.location.pathname, search: queryString.stringify(params) });
  };
  const handleFilterStatus = (value) => {
    setFilter((prev) => ({ ...prev, status: value }));
  };

  // Clear all filters
  const handleClear = () => {
    setFilter({ _page: 1, _limit: 10 });
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({ _page: 1, _limit: 10 }),
    });
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
    const resultAction = await dispatch(updateCategory(updatedValue));
    if (resultAction.error) {
      message.error("Update Failed");
    } else {
      message.success("Update Successfully");
      dispatch(getCategoriesFilter(queryParams));
    }
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
            <Form>
              <Space style={{ marginBottom: 16 }}>
                <Select
                  value={filter.status}
                  placeholder="Status"
                  style={{ width: 120 }}
                  onChange={handleFilterStatus}
                >
                  <Option value="true">Visible</Option>
                  <Option value="false">Hidden</Option>
                </Select>
                <Input
                  value={filter.name_like}
                  onChange={handleSearch}
                  placeholder="Search..."
                />
                <Button onClick={handleClear}>Clear</Button>
                <Button htmlType="submit" type="primary" onClick={handleFilter}>
                  Filter
                </Button>
              </Space>
            </Form>
          </Col>
        </Row>
        <Table
          dataSource={allCategories}
          columns={columns}
          onChange={handlePagination}
          pagination={{
            position: ["topRight", "bottomRight"],
            total: `${total}`,
            current: `${filter._page}`,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total}`,
          }}
        />
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
