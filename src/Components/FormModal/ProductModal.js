import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import moment from "moment";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

const { Option } = Select;

const ProductModal = ({ visible, onCreate, onCancel, data, editMode }) => {
  const [form] = Form.useForm();
  const allCategories = useSelector((state) => state.category.allCategories);

  const [value, setValue] = useState("");

  const handleSelect = (values) => {
    setValue(values);
  };
  const defaultValue = useMemo(() => {
    return data.name
      ? // eslint-disable-next-line array-callback-return
        allCategories.map((item) => {
          if (item.id === data.id) {
            return item.name;
          }
        })
      : value;
  }, [allCategories, data, value]);
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
            form.resetFields();
            onCreate(values);
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
          name: data ? data.name : "",
          color: data ? data.color : "",
          price: data ? data.price : "",
          description: data ? data.description : "",
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
        <Row gutter={24}>
          <Col>
            <Form.Item name="color" label="Color:">
              <Input />
            </Form.Item>
          </Col>
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
                  value={defaultValue}
                  style={{ width: 120 }}
                  onChange={handleSelect}
                >
                  {allCategories.map((item, key) => {
                    return (
                      <Option value={item.name} key={key.toString()}>
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
          <Input.TextArea />
        </Form.Item>
        {editMode && (
          <Row gutter={24}>
            <Col>
              <Form.Item label="Created At:">
                <DatePicker defaultValue={moment(data.createdAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Updated At:">
                <DatePicker defaultValue={moment(data.updateAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default ProductModal;
