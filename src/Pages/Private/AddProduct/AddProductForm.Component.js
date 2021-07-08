import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Checkbox, Col, Descriptions, Form, Input, message, Row } from "antd";
import Text from "antd/lib/typography/Text";
import UploadImage from "Components/UploadImage";
import { ROUTER } from "Constants/CommonConstants";
import { ProductContext } from "Context/SimpleProductContext";
import { addProduct } from "Features/Product/ProductSlice";
import useGetCategory from "Hooks/CategoryHook";
import moment from "moment";
import React, { useContext, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProductData from "./ProductData.Component";
import { storage } from "../../../Firebase";

const AddProductForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Redux
  const allCategories = useSelector((state) => state.category.allCategories);
  const user = useSelector((state) => state.user.current);

  useGetCategory();

  // state
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({
    productImage: "",
    productGallery: [],
  });
  const [type, setType] = useState("simple");
  const { simpleProduct } = useContext(ProductContext);

  const product = {
    name: "",
    originalPrice: null,
    salePrice: null,
    color: [],
    size: [],
    variations: [],
    type: "",
    description: "",
    shortDescription: "",
    author: "",
    categories: [],
    status: true,
    quantity: null,
    productImage: "",
    productGallery: [],
  };

  // Handle categories
  const handleCategories = (value) => {
    setCategories(value);
  };
  // Handle description
  const handleDescription = (e, editor) => {
    const data = editor.getData();
    setContent(data);
    console.log("data :>> ", data);
  };

  // Handle type
  const handleType = (type) => {
    setType(type);
  };

  // Handle product image
  const handleProductImage = (value) => {
    setImage((prev) => ({ ...prev, productImage: value[0].url }));
  };
  const handleRemoveImage = () => {
    setImage((prev) => ({ ...prev, productImage: "" }));
  };

  // Handle gallery
  const handleProductGallery = (gallery) => {
    setImage((prev) => ({ ...prev, productGallery: gallery }));
  };
  const handleRemoveGallery = (value) => {
    const newValue = image.productGallery.filter((item) => item.id !== value.uid);
    setImage((prev) => ({ ...prev, productGallery: newValue }));
  };
  // Handle update
  const handleCreate = () => {
    form
      .validateFields()
      .then(async (values) => {
        const updatedValue = {
          ...product,
          ...values,
          ...simpleProduct,
          type: type,
          description: content,
          categories: categories,
          productImage: image.productImage,
          productGallery: image.productGallery,
          author: user.email,
        };
        const resultAction = await dispatch(addProduct(updatedValue));
        const newProduct = unwrapResult(resultAction);
        console.log("newProduct :>> ", newProduct);
        if (resultAction.error) {
          message.error("Create Failed");
        } else {
          message.success("Create Successfully");
          history.push(`${ROUTER.ProductDetail}/${newProduct.id}`);
        }
      })
      .catch((info) => {
        message.error(info);
      });
  };

  // class MyUploadAdapter {
  //   constructor(loader) {
  //     this.loader = loader;
  //   }
  //   // Starts the upload process.
  //   upload() {
  //     return this.loader.file.then(
  //       (file) =>
  //         new Promise((resolve, reject) => {
  //           let storages = storage.ref();
  //           let uploadTask = storages.child(file.name).put(file);
  //           uploadTask.on(
  //             storages.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //             function (snapshot) {
  //               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //               var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //               console.log("Upload is " + progress + "% done");
  //               switch (snapshot.state) {
  //                 case storages.TaskState.PAUSED: // or 'paused'
  //                   console.log("Upload is paused");
  //                   break;
  //                 case storages.TaskState.RUNNING: // or 'running'
  //                   console.log("Upload is running");
  //                   break;
  //                 default:
  //                   return;
  //               }
  //             },
  //             function (error) {
  //               // A full list of error codes is available at
  //               // https://firebase.google.com/docs/storage/web/handle-errors
  //               // eslint-disable-next-line default-case
  //               switch (error.code) {
  //                 case "storage/unauthorized":
  //                   reject(" User doesn't have permission to access the object");
  //                   break;

  //                 case "storage/canceled":
  //                   reject("User canceled the upload");
  //                   break;

  //                 case "storage/unknown":
  //                   reject("Unknown error occurred, inspect error.serverResponse");
  //                   break;
  //               }
  //             },
  //             function () {
  //               // Upload completed successfully, now we can get the download URL
  //               uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //                 // console.log("File available at", downloadURL);
  //                 resolve({
  //                   default: downloadURL,
  //                 });
  //               });
  //             }
  //           );
  //         })
  //     );
  //   }
  // }
  //

  const MyUploadAdapter = (file) => {
    const uploadImage = storage.ref(`images/${file.id}`).put(file);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("progress :>> ", progress);
      },
      (error) => {
        console.log("error :>> ", error);
      },
      () => {
        storage
          .ref("images")
          .child(file.id)
          .getDownloadURL()
          .then((url) => {
            console.log("url :>> ", url);
          });
      }
    );
  };

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      loader.on("change:uploadResponse", (evt, name, val, oldval) => {
        if (val) {
          console.log(val); // object response {default: image_link }
        }
      });
      console.log("loader :>> ", loader);
      return MyUploadAdapter(loader);
    };
  }

  const editorConfiguration = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: "",
        shortDescription: "",
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
                  data={content}
                  editor={ClassicEditor}
                  onChange={handleDescription}
                  config={editorConfiguration}
                />
              </Form.Item>
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
                  <Button type="primary" onClick={handleCreate}>
                    Create
                  </Button>
                }
              >
                <Descriptions.Item label="Author">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Created at">
                  {moment(new Date()).format("DD/MM/YYYY, h:mm:ss A")}
                </Descriptions.Item>
                <Descriptions.Item label="Updated at">
                  {moment(new Date()).format("DD/MM/YYYY, h:mm:ss A")}
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
                <UploadImage handleData={handleProductImage} handleRemove={handleRemoveImage} />
              </Card>
            </Col>
            <Col span={24}>
              <Card type="inner" title={<Text strong>Product gallery</Text>}>
                <UploadImage
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

export default AddProductForm;
