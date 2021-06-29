import { Checkbox, Col, Form, Input, InputNumber, Modal, Row, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import useGetCategory from "Hooks/CategoryHook";
import React from "react";
import { useSelector } from "react-redux";

const ProductModal = ({ visible, onCreate, onCancel, data, editMode }) => {
  const [form] = Form.useForm();
  useGetCategory();

  // Redux
  const allCategories = useSelector((state) => state.category.allCategories);

  return (
    <Modal
      visible={visible}
      title={editMode ? "Quick Edit" : "Create a new product"}
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
          name: data.name || "",
          originalPrice: data.originalPrice || "",
          salePrice: data.salePrice || "",
          shortDescription: data.shortDescription || "",
          categories: data.categories || [],
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
          <Col span={12}>
            <Form.Item
              name="originalPrice"
              label="Original Price"
              rules={[
                {
                  required: true,
                  message: "Please input the price of product!",
                },
              ]}
            >
              <InputNumber
                min={0}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "200px" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="salePrice" label="Sale Price">
              <InputNumber
                min={0}
                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "200px" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Color">
              {data.color.map((item, index) => (
                <Tag key={index.toString()} color={data.color}>
                  {item}
                </Tag>
              ))}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Size">
              {data.size.map((item, index) => (
                <Tag key={index.toString()}>{item}</Tag>
              ))}
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={<Text strong>Categories</Text>}
              name="categories"
              valuePropName="value"
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={24}>
                    {allCategories.map((item) => {
                      return (
                        <Checkbox
                          value={item.name}
                          key={item.id}
                          style={{ width: "25%", margin: 0 }}
                        >
                          {item.name}
                        </Checkbox>
                      );
                    })}
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="shortDescription" label={<Text strong>Short Description</Text>}>
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
        </Form.Item>
        {/* {editMode && (
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Created At:">
                <DatePicker disabled defaultValue={moment(data.createdAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Updated At:">
                <DatePicker disabled defaultValue={moment(data.updatedAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        )} */}
      </Form>
    </Modal>
  );
};

export default ProductModal;
