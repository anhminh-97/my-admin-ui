import { DatePicker, Form, Input, message, Modal } from "antd";
import moment from "moment";
import React from "react";

const CategoryModal = ({ visible, onCreate, onCancel, data, editMode }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
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
        <Form.Item label="Created At:">
          <DatePicker defaultValue={moment(data.createdAt)} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Updated At:">
          <DatePicker defaultValue={moment(data.updateAt)} format="DD/MM/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
