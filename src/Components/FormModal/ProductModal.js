import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import moment from "moment";
import React, { useState ,useEffect } from "react";
import { useSelector } from "react-redux";

const { Option } = Select;

const ProductModal = ({ visible, onCreate, onCancel, data, editMode }) => {
  const [form] = Form.useForm();
  const allCategories = useSelector((state) => state.category.allCategories);

  const [value, setValue] = useState(null);
  console.log("🚀 ~ file: ProductModal.js ~ line 14 ~ ProductModal ~ value", value)

  const handleSelect = (values) => {
    console.log("values :>>",`0${values}0`);
    setValue(values);
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
              <InputNumber />
            </Form.Item>
          </Col>
          <Col>
          {value}
            {/* <Form.Item label="Category:"> */}
              <Select
                placeholder="Select a category"
                value={
                  data
                    ? // eslint-disable-next-line array-callback-return
                      allCategories.map((item)  => {
                        if (item.id === data.id) {
                          return item.name;
                        }
                      })
                    : value
                }
                style={{ width: 120 }}
                onChange={handleSelect}
              >
                {allCategories.map((item, key) => {
                  return (
                    <Option value={item.name} key={key}>
                      {item.color}
                    </Option>
                  );
                })}
              </Select>
            {/* </Form.Item> */}
          </Col>
        </Row>
        <Form.Item name="description" label="Description:">
          <Input.TextArea />
        </Form.Item>
        {editMode && (
          <Row gutter={24}>
            <Col>
              <Form.Item label="Created At:">
                <DatePicker defaultValue={data & moment(data.createdAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Updated At:">
                <DatePicker defaultValue={data && moment(data.updateAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default ProductModal;
