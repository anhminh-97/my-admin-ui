import { Col, DatePicker, Form, Input, message, Modal, Row } from "antd";
import moment from "moment";
import React from "react";

const CategoryModal = ({ visible, onCreate, onCancel, data, editMode }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={editMode ? "Edit category" : "Create a new product"}
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
        onFinish={() => message.success("Create successfully")}
        onFinishFailed={() => message.error("Create failed")}
        initialValues={{
          name: data ? data.name : "",
        }}
      >
        <Form.Item
          name="name"
          label="Name:"
          rules={[
            {
              required: true,
              message: "Please input the name of product!",
            },
          ]}
        >
          <Input />
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
                <DatePicker disabled defaultValue={moment(data.updatedAt)} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default CategoryModal;
