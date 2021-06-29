import { Modal, Upload } from "antd";
import React, { useState } from "react";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const UploadImage = ({ showList, fileList, handleData, handleRemove }) => {
  const [imageList, setImageList] = useState(fileList || []);
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState("");
  // Function
  const onChange = async ({ fileList }) => {
    const file = fileList.map((item) => ({ ...item, status: "success" }));
    setImageList(file);
    const newFileList = [];
    for (const item of file) {
      if (item.url) {
        newFileList.push(item.url);
      } else {
        newFileList.push(await getBase64(item.originFileObj));
      }
    }
    handleData(newFileList);
  };

  const onRemove = (file) => {
    if (file.url) {
      handleRemove(file.url);
    } else handleRemove(file.thumbUrl);
  };

  const onPreview = async (file) => {
    setVisible(true);
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
    // const imgWindow = window.open(src);
    // imgWindow.document.write(image.outerHTML);
    setSrc(src);
  };

  return (
    <>
      <Upload
        beforeUpload={() => false}
        listType="picture-card"
        onChange={onChange}
        onRemove={onRemove}
        onPreview={onPreview}
        fileList={imageList}
      >
        {(!imageList.length && "+ Upload") || showList
          ? imageList?.length < 6 && "+ Upload"
          : imageList?.length < 1 && "+ Upload"}
      </Upload>
      <Modal
        centered
        width={550}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <img style={{ width: "100%", height: "80%" }} src={src} alt="" />
      </Modal>
    </>
  );
};

export default UploadImage;
