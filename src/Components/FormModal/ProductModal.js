import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputColor from "Components/InputColor";

const { Option } = Select;

const ProductModal = ({ visible, onCreate, onCancel, data, editMode }) => {
  const [form] = Form.useForm();
  const allCategories = useSelector((state) => state.category.allCategories);

  const [category, setCategory] = useState({});

  useEffect(() => {
    if (isEmpty(category)) {
      setCategory(
        !isEmpty(data)
          ? {
              ...allCategories
                .filter((item) => item.id === data.categoryId)
                .map((item, index) => {
                  <span key={index.toString()} />;
                  return { ...category, name: item.name, id: item.id };
                })[0],
            }
          : category
      );
    }
  }, [allCategories, data, category]);

  // Select
  const handleSelect = (values, item) => {
    setCategory(item.attr);
  };

  return (
    <Modal
      visible={visible}
      title={editMode ? "Edit product" : "Create a new product"}
      okText={editMode ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const value = { ...values, categoryId: category.id };
            form.resetFields();
            onCreate(value);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          name: data.name ? data.name : "",
          color: data.color ? data.color : "",
          price: data.price ? data.price : "",
          description: data.description ? data.description : "",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of product!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color:" valuePropName="color">
          <InputColor />
        </Form.Item>
        <Row gutter={24}>
          <Col>
            <Form.Item
              name="price"
              label="Price:"
              rules={[
                {
                  required: true,
                  message: "Please input the price of product!",
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Category:">
              {allCategories && (
                <Select
                  placeholder="Select a category"
                  value={category.name}
                  style={{ width: 120 }}
                  onChange={handleSelect}
                >
                  {allCategories.map((item, index) => {
                    return (
                      <Option value={item.name} key={index.toString()} attr={item}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="Description:">
          <Input.TextArea autoSize />
        </Form.Item>
        {editMode && (
          <Row gutter={24}>
            <Col>
              <Form.Item label="Created At:">
                <DatePicker disabled defaultValue={moment(data.createdAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Updated At:">
                <DatePicker disabled defaultValue={moment(data.updateAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default ProductModal;
