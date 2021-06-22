import React, { useEffect, useState } from "react";
import {
  Descriptions,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Upload,
  Select,
  message,
  Form,
  Spin,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import useGetCategory from "Hooks/CategoryHook";
import { getProduct, updateProduct } from "Features/Product/ProductSlice";

const { TextArea } = Input;
const { Option } = Select;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // useEffect
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useGetCategory();

  // Redux
  const productDetail = useSelector((state) => state.product.productDetail);
  const loading = useSelector((state) => state.product.loading);
  const allCategories = useSelector((state) => state.category.allCategories);

  // state
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: productDetail.thumbnailUrl,
    },
  ]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (isEmpty(category)) {
      setCategory(
        !isEmpty(productDetail)
          ? {
              ...allCategories
                .filter((item) => item.id === productDetail.categoryId)
                .map((item, index) => {
                  <span key={index.toString()} />;
                  return { ...category, name: item.name, id: item.id };
                })[0],
            }
          : category
      );
    }
  }, [category, allCategories, productDetail]);

  // Function
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  // Handle select
  const handleSelect = (values, item) => {
    setCategory(item.attr);
  };

  // Handle update
  const handleUpdate = () => {
    form
      .validateFields()
      .then(async (values) => {
        const value = { ...values, categoryId: category.id };
        const updatedValue = {
          ...productDetail,
          ...value,
        };
        const resultAction = await dispatch(updateProduct(updatedValue));
        if (resultAction.error) {
          message.error("Update Failed");
        } else {
          message.success("Update Successfully");
          dispatch(getProduct(id));
        }
      })
      .catch((info) => {
        message.error(info);
      });
  };

  return (
    <>
      {isEmpty(productDetail) ? (
        <Spin tip="Loading..." className="spin-loading" />
      ) : (
        <Spin spinning={loading} tip="Loading..." className="spin-loading">
          <Row>
            <Col span={8}>
              <Upload
                action={process.env.REACT_APP_API_URL}
                listType="picture-card"
                onChange={onChange}
                onPreview={onPreview}
                fileList={fileList}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </Col>
            <Col span={16}>
              <Form
                form={form}
                initialValues={{
                  name: productDetail.name ? productDetail.name : "",
                  color: productDetail.color ? productDetail.color : "",
                  price: productDetail.price ? productDetail.price : "",
                  description: productDetail.description ? productDetail.description : "",
                }}
              >
                <Descriptions
                  column={1}
                  title="Product Detail"
                  bordered
                  extra={
                    <Button type="primary" onClick={handleUpdate}>
                      Update
                    </Button>
                  }
                >
                  <Descriptions.Item label="Name">
                    <Form.Item name="name" style={{ marginBottom: 0 }}>
                      <Input />
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                    <Form.Item name="color" style={{ marginBottom: 0 }}>
                      <Input />
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    <Form.Item name="price" style={{ marginBottom: 0 }}>
                      <InputNumber />
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    <Form.Item name="description" style={{ marginBottom: 0 }}>
                      <TextArea />
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
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
                  </Descriptions.Item>
                  <Descriptions.Item label="Created at">
                    {moment(productDetail.createdAt).format("DD/MM/YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Updated at">
                    {moment(productDetail.updateAt).format("DD/MM/YYYY")}
                  </Descriptions.Item>
                </Descriptions>
              </Form>
            </Col>
          </Row>
        </Spin>
      )}
    </>
  );
};

export default ProductDetail;
