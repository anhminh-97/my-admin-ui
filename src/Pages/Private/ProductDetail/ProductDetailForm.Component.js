import React, { useContext, useMemo, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
} from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import CKEditor from "react-ckeditor-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import UploadImage from "Components/UploadImage";
import { ROUTER } from "Constants/CommonConstants";
import { ProductContext } from "Context/SimpleProductContext";
import { deleteProduct, updateProduct } from "Features/Product/ProductSlice";
import useGetCategory from "Hooks/CategoryHook";
import ProductData from "./ProductData.Component";

const ProductDetailForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();

  // Redux
  const productDetail = useSelector((state) => state.product.productDetail);
  const allCategories = useSelector((state) => state.category.allCategories);
  useGetCategory();

  // state
  const [categories, setCategories] = useState([...productDetail.categories]);
  const [content, setContent] = useState(productDetail.description);
  const [fileList, setFileList] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [image, setImage] = useState({
    productImage: productDetail.productImage,
    productGallery: [...productDetail.productGallery],
  });
  const [type, setType] = useState(productDetail.type);
  const { simpleProduct, variableProduct } = useContext(ProductContext);
  const [price, setPrice] = useState({
    originalPrice: simpleProduct.originalPrice,
    salePrice: simpleProduct.salePrice,
  });

  useMemo(() => {
    setFileList((prev) =>
      productDetail.productGallery?.map((item) => ({
        ...prev,
        uid: uuidv4(),
        name: "image.png",
        status: "done",
        url: item,
      }))
    );
    setProductImage(
      (prev) =>
        productDetail.productImage && [
          {
            ...prev,
            uid: uuidv4(),
            name: "image.png",
            status: "done",
            url: productDetail.productImage,
          },
        ]
    );
  }, [productDetail.productGallery, productDetail.productImage]);

  // Handle categories
  const handleCategories = (value) => {
    setCategories(value);
  };
  // Handle description
  const handleDescription = (e) => {
    setContent(e.editor.getData());
  };

  // Handle type
  const handleType = (type) => {
    setType(type);
    if (type === "variable") {
      setPrice({
        originalPrice: null,
        salePrice: null,
      });
    }
  };

  // Handle product image
  const handleProductImage = (image) => {
    setImage((prev) => ({ ...prev, productImage: image[0] }));
  };
  const handleRemoveImage = (value) => {
    setImage((prev) => ({ ...prev, productImage: "" }));
  };

  // Handle gallery
  const handleProductGallery = (gallery) => {
    setImage((prev) => ({ ...prev, productGallery: gallery }));
  };
  const handleRemoveGallery = (value) => {
    setImage((prev) => prev.filter((item) => item !== value));
  };
  // Handle update
  const handleUpdate = () => {
    form
      .validateFields()
      .then(async (values) => {
        const updatedValue = {
          ...productDetail,
          ...values,
          ...simpleProduct,
          ...price,
          ...image,
          type: type,
          description: content,
          categories: categories,
          variations: variableProduct,
        };
        const resultAction = await dispatch(updateProduct(updatedValue));
        if (resultAction.error) {
          message.error("Update Failed");
        } else {
          message.success("Update Successfully");
        }
      })
      .catch((info) => {
        message.error(info);
      });
  };

  // Handle delete
  const handleDelete = async () => {
    const resultAction = await dispatch(deleteProduct(id));
    if (resultAction.error) {
      message.error("Delete Failed");
    } else {
      message.success("Delete Successfully");
      history.push(ROUTER.ProductAdmin);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: productDetail.name ? productDetail.name : "",
        shortDescription: productDetail.shortDescription ? productDetail.shortDescription : "",
      }}
    >
      <Row gutter={[24, 24]}>
        <Col span={15}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Form.Item
                name="name"
                label={<Text strong>Product name</Text>}
                valuePropName="value"
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please input the name of product!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <ProductData handleType={handleType} type={type} />
            </Col>

            <Col span={24}>
              <Form.Item
                name="shortDescription"
                label={<Text strong>Short Description</Text>}
                valuePropName="value"
              >
                <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label={<Text strong>Product description</Text>}>
                <CKEditor
                  content={content}
                  events={{
                    change: handleDescription,
                  }}
                  config={{ resize_maxHeight: 350 }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Popconfirm
                title="Are you sure to delete this product?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ color: "red" }} danger>
                  <DeleteOutlined /> Remove product
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </Col>
        <Col span={9}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Descriptions
                column={1}
                bordered
                extra={
                  <Button type="primary" onClick={handleUpdate}>
                    Update
                  </Button>
                }
              >
                <Descriptions.Item label="Author">{productDetail.author}</Descriptions.Item>
                <Descriptions.Item label="Created at">
                  {moment(productDetail.createdAt).format("DD/MM/YYYY, h:mm:ss A")}
                </Descriptions.Item>
                <Descriptions.Item label="Updated at">
                  {moment(productDetail.updatedAt).format("DD/MM/YYYY, h:mm:ss A")}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={24}>
              <Card type="inner" title={<Text strong>Product categories</Text>}>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  defaultValue={categories}
                  onChange={handleCategories}
                >
                  <Row>
                    <Col span={24}>
                      {allCategories.map((item) => {
                        return (
                          <Checkbox
                            value={item.name}
                            key={item.id}
                            style={{ width: "33%", margin: 0 }}
                          >
                            {item.name}
                          </Checkbox>
                        );
                      })}
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Card>
            </Col>
            <Col span={24}>
              <Card type="inner" title={<Text strong>Product image</Text>}>
                <UploadImage
                  fileList={productImage}
                  handleData={handleProductImage}
                  handleRemove={handleRemoveImage}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card type="inner" title={<Text strong>Product gallery</Text>}>
                <UploadImage
                  fileList={fileList}
                  handleData={handleProductGallery}
                  showList
                  handleRemove={handleRemoveGallery}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductDetailForm;
